import express from 'express'
import cors from "cors"
import cookieParser  from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import locationRoutes from "./routes/location.routes.js"
const app = express()

app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "https://info.adbite.in",
    'https://admin.adbite.in'
  ],  
  credentials: true,                
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello World!'))


app.use('/api',authRoutes)
app.use('/api',locationRoutes)

// Add temporarily in server.js
app.get('/test-drive', async (req, res) => {
  try {
    const { uploadToDrive } = await import('./config/googleDrive.js')
    
    // Test with a small dummy buffer
    const testBuffer = Buffer.from('test')
    const result = await uploadToDrive(testBuffer, 'test.jpg', 'image/jpeg')
    res.json({ success: true, result })
  } catch (error) {
    res.json({ 
      success: false, 
      message: error.message,
      stack: error.stack  // ← full error trace
    })
  }
})


export default app; 
