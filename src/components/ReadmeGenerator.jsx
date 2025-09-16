import { useState } from "react";
import { FileText, Copy, Check, Loader2 } from "lucide-react";

export default function ReadmeGenerator() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [readme, setReadme] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!owner || !repo) {
      alert("Please enter both owner and repo name");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/generate-readme?owner=${owner}&repo=${repo}`
      );
      const text = await response.text();
      setReadme(text);
      setOwner("")
      setRepo("")
    } catch (error) {
      console.error(error);
      alert("Failed to fetch README");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(readme);
    setCopied(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh]">
      <div className="flex items-center justify-center">
        <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-md p-8 -ml-20 w-full max-w-lg mt-7">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-white">
              Repository Information
            </h2>
          </div>
          <p className="text-sm text-gray-400 mb-8">
            Enter your GitHub repository details to generate a comprehensive
            README file
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <p className="block text-sm font-medium text-white mb-2">
                GitHub Owner
              </p>
              <input
                type="text"
                placeholder="e.g., facebook"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full rounded-lg border border-[#30363d] bg-[#010409] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <p className="block text-sm font-medium text-white mb-2">
                Repository Name
              </p>
              <input
                type="text"
                placeholder="e.g., react"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="w-full rounded-lg border border-[#30363d] bg-[#010409] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Generate README
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-md mt-5 p-6 flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <p className="text-gray-400 text-lg">Generating README...</p>
          </div>
        ) : !readme ? (
          <img
            src="/github.png"
            alt="GitHub"
            className="w-50 h-50 opacity-80"
          />
        ) : (
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                📄 Generated README
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy README
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#010409] border border-[#30363d] rounded-md p-4 text-sm text-gray-200 overflow-auto max-h-[50vh] whitespace-pre-wrap font-mono">
              {readme}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
