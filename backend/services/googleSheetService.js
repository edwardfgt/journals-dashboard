const { google } = require('googleapis');
const oauth2Client = require('../config/oauth2Client');

async function getSheetData() {
  if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
    throw new Error('OAuth2 client is not authenticated. Please complete the OAuth flow.');
  }

  // Refresh the token if it's expired
  if (oauth2Client.isTokenExpiring()) {
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token. Please re-authenticate.');
    }
  }

  const googleSheets = google.sheets({ version: 'v4', auth: oauth2Client });
  const spreadsheetId = '1zq14FSx0DQpkquC0lWfjELbUrE4HiVCxnH4rGl4St9U';

  try {
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Overview!A1:E",
    });

    const rows = getRows.data.values;
    return rows;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch sheet data. Please check your permissions and try again.');
  }
}

module.exports = { getSheetData };
