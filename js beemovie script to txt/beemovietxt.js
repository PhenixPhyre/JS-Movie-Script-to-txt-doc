const fs = require('fs');
const axios = require('axios');

// Gets the script on Github
async function fetchBeeMovieScript() {
    try {
        const response = await axios.get('https://gist.githubusercontent.com/MattIPv4/045239bc27b16b2bcf7a3a9a4648c08a/raw/2411e31293a35f3e565f61e7490a806d4720ea7e/bee%2520movie%2520script');
        return response.data.split('\n');
    } catch (error) {
        console.error('Error fetching Bee Movie script:', error);
        return null;
    }
}

// Formats it into the code line
function formatScriptLine(line) {
    return `{ text = "${line.trim()}", r = 0.00, g = 0.69, b = 0.94, codes = "BOR-1" },`;
}

// Process and makes it into a txt doc
async function processScript() {
    const scriptLines = await fetchBeeMovieScript();
    if (scriptLines) {
        const formattedLines = scriptLines.map(formatScriptLine);

        fs.writeFile('bee_movie_script.txt', formattedLines.join('\n'), (err) => {
            if (err) throw err;
            console.log('Formatted Bee Movie script has been saved to bee_movie_script.txt');
        });
    }
}

// Process
processScript();
