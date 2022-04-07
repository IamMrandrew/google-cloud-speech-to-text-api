import express, { Request, Response } from "express";
import fs from "fs";

import dotenv from "dotenv";
import multer from "multer";

// Imports the Google Cloud client library
import speech from "@google-cloud/speech";

// Initialize dotenv to read .env file
dotenv.config();

const PORT = process.env.PORT || 3000;
const SAMPLE_RATE = process.env.SAMPLE_RATE || 44100;

// Create express app
const app: express.Application = express();

// Initialize multer
const upload = multer({ dest: "uploads/" });

// Creates a client
const client = new speech.SpeechClient();

// Define a route handler for the default
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// Define a route handler for the speech-to-text with audio upload
app.post(
  "/sts",
  upload.single("audio"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.send("No file received");
    }

    // Get the audio bytes from the file uploaded
    const filename = req.file!.path;
    const file = fs.readFileSync(filename);
    const audioBytes = file.toString("base64");

    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: "LINEAR16",
      sampleRateHertz: SAMPLE_RATE,
      languageCode: "en-US",
    };

    const request: any = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file from Google Cloud Speech-to-Text service
    const [response] = await client.recognize(request);

    if (!response || !response.results || response.results.length <= 0) {
      res.send("No response received");
    }

    const transcription = response
      .results!.map((result: any) => result.alternatives[0].transcript)
      .join("\n");

    const confidence = response.results![0].alternatives![0].confidence || 0;

    console.log(`Transcription: ${transcription}`);

    res.json({ transcription, confidence });
  }
);

// Start the express server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
