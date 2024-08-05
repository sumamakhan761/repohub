const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".RepoHub");
  const commitsPath = path.join(repoPath, ".commits");

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S33_BUCKET })
    );
    console.log("Reposetory initialised!")
  } catch (err) {
    console.error("Error initialise reposetry", err)
  }
}

module.exports = { initRepo };