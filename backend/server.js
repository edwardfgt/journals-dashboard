const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const revenueRoutes = require("./routes/revenue");
const beehiivRoutes = require("./routes/beehiiv");
const authRoutes = require('./routes/auth');
const sheetRoutes = require('./routes/sheet');
const oauth2Client = require('./config/oauth2Client');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to refresh token if necessary
app.use(async (req, res, next) => {
  if (oauth2Client.isTokenExpiring()) {
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  }
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/revenue", revenueRoutes);
app.use("/api/beehiiv", beehiivRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);


app.get('/setup-google-auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can now use the Google Sheets API.');
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.status(500).send('Authentication failed.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
