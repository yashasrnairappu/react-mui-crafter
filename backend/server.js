import dontenv from "dotenv";
dontenv.config()
import connectDB from "./src/config/db.js"
import app from "./src/app.js"


connectDB()

app.listen(process.env.PORT||5000,()=>{
console.log(`Server running on port ${process.env.PORT}`);
})