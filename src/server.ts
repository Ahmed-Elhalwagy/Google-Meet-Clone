import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
  }));



const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});