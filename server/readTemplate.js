export function buildReadme({ title, description, features, usage, license }) {
  return `
# ${title}

##  Description
${description}

##  Features
${features}

##  Installation
\`\`\`bash
# clone the repo
git clone <your-repo-link>
cd ${title}
npm install
\`\`\`

##  Usage
${usage}

##  License
${license}
`;
}
