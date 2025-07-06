import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();

app.post('/process-video', (req,res) => {
    const inputFilePath = req.body.inputFilePath; // Assuming you're using a middleware like multer to handle file uploads  
    const outputFilePath = req.body.outputFilePath; // Default output file name

   ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360") // Example filter to resize video
    .on('end', () => {
    res.status(200).send('Video processing completed successfully');
    })
    .on('error', (err) => {
      console.error(`Error processing video: ${err.message}`);
      return res.status(500).send('Internal Server Error: ' + err.message);
    })
    .save(outputFilePath);
    
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Video Processing Service is running on port ${PORT}`);
}); 
