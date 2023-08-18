 import mongoose from "mongoose";
 export async function connect() {
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL as string );
        mongoose.connection.on("error", (err) => {
            console.log("Mongodb error", err);
            process.exit();
        });

    } catch (error) {
        console.log("Mongodb error", error);
 }
}