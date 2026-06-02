import express from 'express'
import cors from "cors"
import cookieParser  from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import locationRoutes from "./routes/location.routes.js"
const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    'https://adbite-admin.onrender.com',
    'https://react-mui-crafter.onrender.com'
  ],  
  credentials: true,                
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello World!'))


app.use('/api',authRoutes)
app.use('/api',locationRoutes)




export default app; 