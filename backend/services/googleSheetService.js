const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');


const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

function getAuthUrl() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
    throw new Error('Missing required Google OAuth credentials in environment variables.');
  }

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

async function setCredentials(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
}

async function getSheetData() {
  const googleSheets = google.sheets({ version: 'v4', auth: oauth2Client });
  const spreadsheetId = '1zq14FSx0DQpkquC0lWfjELbUrE4HiVCxnH4rGl4St9U';

  const getRows = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Overview!A1:E",
  });

  const rows = getRows.data.values;
  return rows;
}

module.exports = { getAuthUrl, setCredentials, getSheetData };
