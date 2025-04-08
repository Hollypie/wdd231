const axios = require("axios");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const gamesFilePath = path.join(__dirname, "small_games.json");
let games = require(gamesFilePath);

const BGG_API_URL = "https://www.boardgamegeek.com/xmlapi2/thing?id=";

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

// Main function to update image URLs in games.json
const updateGameImageUrls = async () => {
  for (const game of games) {
    console.log(`Fetching image for ${game.name} (ID: ${game.id})...`);
    const imageUrl = await fetchImageUrl(game.id);
    
    if (imageUrl) {
      game.imageUrl = imageUrl;
      console.log(`Updated image URL for ${game.name}`);
    } else {
      console.log(`No image found for ${game.name}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between requests
  }

  // Write the updated games array back to games.json
  fs.writeFileSync(gamesFilePath, JSON.stringify(games, null, 2));
  console.log("games.json has been updated with the correct image URLs.");
};

updateGameImageUrls();
