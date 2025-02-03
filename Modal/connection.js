import mongoose from "mongoose"

const handleconnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://muzammil1244:8446411038@jobcluster.04e2m.mongodb.net/muzammil1244", { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Connected to MongoDB successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1) // Exit the process if MongoDB connection fails
  }
}

export default handleconnection
