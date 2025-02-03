import mongoose from "mongoose"

const handleconnection = async (url) => {
  try {
    await mongoose.connect(url)
    console.log("Connected to MongoDB successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1) // Exit the process if MongoDB connection fails
  }
}

export default handleconnection
