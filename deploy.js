const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const DOCS_DIR = path.resolve(__dirname, "docs");
const BROWSER_DIR = path.join(DOCS_DIR, "browser");

// Step 1: Build Angular project with output folder as 'docs'
console.log("Building Angular project...");
execSync("ng build --output-path=docs", {
  stdio: "inherit",
});

// Step 2: Move files from 'docs/browser/' to 'docs/' and delete 'browser' folder
if (fs.existsSync(BROWSER_DIR)) {
  console.log('Moving files from "docs/browser" to "docs"...');

  fs.readdirSync(BROWSER_DIR).forEach((file) => {
    const oldPath = path.join(BROWSER_DIR, file);
    const newPath = path.join(DOCS_DIR, file);

    fs.renameSync(oldPath, newPath);
  });

  console.log('Deleting "browser" folder...');
  fs.rmdirSync(BROWSER_DIR, { recursive: true });

  console.log('Deployment files are ready in "docs" folder!');
} else {
  console.error(
    '"browser" folder not found. Make sure your Angular build is configured correctly.',
  );
}
