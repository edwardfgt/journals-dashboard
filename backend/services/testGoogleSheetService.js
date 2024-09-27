const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const http = require('http');
const url = require('url');
const { getAuthUrl, setCredentials, getSheetData } = require('./googleSheetService');

async function testGoogleSheetService() {
  try {
    console.log('Environment variables:');
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
    console.log('GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI ? 'Set' : 'Not set');

    console.log('Attempting to get auth URL...');
    const authUrl = await getAuthUrl();
    console.log('Auth URL received:', authUrl);

    if (!authUrl) {
      throw new Error('Failed to generate auth URL. Check your client credentials.');
    }
    console.log('Please visit this URL to authorize the application:', authUrl);

    const server = http.createServer(async (req, res) => {
      const queryObject = url.parse(req.url, true).query;
      if (queryObject.code) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Authorization successful! You can close this window.');
        server.close();

        await setCredentials(queryObject.code);
        const sheetData = await getSheetData();
        console.log('Sheet data:', sheetData);
        process.exit(0);
      }
    });

    server.listen(3000, () => {
      console.log('Listening for Google redirect on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

testGoogleSheetService();