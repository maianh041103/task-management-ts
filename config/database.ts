import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log("Connect success");
  } catch (error) {
    console.log("Connect error");
  }
}

