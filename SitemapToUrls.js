const fs = require("fs");
const axios = require("axios");
const xml2js = require("xml2js");
const path = require("path");

// Function to read sitemap URLs from a file
function readSitemapFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return fileContent.split(/\r?\n/).filter((line) => line);
  } catch (error) {
    console.error(`Error reading sitemap file ${filePath}:`, error);
    return [];
  }
}

// Function to fetch and parse the sitemap
async function processSitemap(url) {
  try {
    const response = await axios.get(url);
    const result = await xml2js.parseStringPromise(response.data);
    const urls = result.urlset.url.map((u) => u.loc[0]);
    return urls;
  } catch (error) {
    console.error(`Error fetching or parsing sitemap from ${url}:`, error);
    return [];
  }
}

// Process each sitemap and append URLs to the file
async function main() {
  const sitemaps = readSitemapFile(path.join(__dirname, "Sitemaps.txt"));
  const allUrls = [];

  for (const sitemap of sitemaps) {
    const urls = await processSitemap(sitemap);
    allUrls.push(...urls);
  }

  fs.writeFileSync("UrlsToIndex.txt", allUrls.join("\n"));
  console.log("UrlsToIndex.txt has been created with the extracted URLs.");
}

main();
