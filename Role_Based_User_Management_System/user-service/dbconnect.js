// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db_password = process.env.db_password;

if (!db_password) {
  throw new Error("DB_PASSWORD is missing from the .env file");
}

const encodedPassword = encodeURIComponent(db_password);

// Database Connection URL
const uri =
  `mongodb+srv://chansonazapan_db_user:${encodedPassword}@cluster0.bcir9e8.mongodb.net/?appName=Cluster0`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    // STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = { connectDB };
