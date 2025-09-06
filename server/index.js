import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import { generateSection } from "./gemini.js";
import { buildReadme } from "./readTemplate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:process.env.FRONTEND_URL,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get("/repo", async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: "Owner and repo are required" });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch repo data" });
  }
});

app.get("/generate-readme", async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: "Owner and repo are required" });
  }

  try {
    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const repoData = repoResponse.data;

    const description =
      repoData.description ||
      (await generateSection(
        `Generate a project description for a repo named ${repoData.name}`
      ));

    const features = await generateSection(
      `The GitHub repository ${repoData.full_name} is about ${repoData.description}. 
  Generate a clear bullet-point list of its key features for a README file.`
    );

    const usage = await generateSection(
      `The GitHub repository ${repoData.full_name} is about ${repoData.description}. 
  Write concise usage instructions with code examples for its README file.`
    );

    const license = repoData.license?.name || "Not specified";

    
    const readmeContent = buildReadme({
      title: repoData.name,
      description,
      features,
      usage,
      license,
    });

    res.type("text/markdown").send(readmeContent);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate README" });
  }
});
