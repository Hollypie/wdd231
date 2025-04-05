const axios = require("axios");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const games = require("./games.json"); 

const imagesFolder = path.join(__dirname, "images");
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
}

const BGG_API_URL = "https://www.boardgamegeek.com/xmlapi2/thing?id=";

// Function to download images
const downloadImage = async (url, filename) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const filePath = path.join(imagesFolder, filename);
    fs.writeFileSync(filePath, response.data);
    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Failed to download image for ${filename}: ${error.message}`);
  }
};

// Function to fetch image URL from BGG API
const fetchImageUrl = async (gameId) => {
  try {
    const response = await axios.get(`${BGG_API_URL}${gameId}`);
    const xmlData = response.data;
    
    // Parse XML to JSON
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    // Extract image URL
    const imageUrl = result.items.item[0].image?.[0];
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching data for game ID ${gameId}:`, error.message);
    return null;
  }
};

// Main function to process images
const fetchAndDownloadImages = async () => {
  for (const game of games) {
    console.log(`Fetching image for ${game.name} (ID: ${game.id})...`);
    const imageUrl = await fetchImageUrl(game.id);
    
    if (imageUrl) {
      const filename = `${game.id}.jpg`;
      await downloadImage(imageUrl, filename);
    } else {
      console.log(`No image found for ${game.name}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between requests
  }
};

fetchAndDownloadImages();
