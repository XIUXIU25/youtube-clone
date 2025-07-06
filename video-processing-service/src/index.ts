import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
  console.log('Received request to process video');
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
