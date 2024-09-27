const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const revenueRoutes = require("./routes/revenue");
const beehiivRoutes = require("./routes/beehiiv");
const authRoutes = require('./routes/auth');
const sheetRoutes = require('./routes/sheet');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/revenue", revenueRoutes);
app.use("/api/beehiiv", beehiivRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});