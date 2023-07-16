import mongoose from "mongoose";
import app from "./app";
import config from "./config";

// establish database connection
const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("DB Connected");
    app.listen(config.port, () => {
      console.log(`Server Running At ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to Connect with DB");
  }
};
bootstrap();
