import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
  console.log('Received request to process video');
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=trunc(iw*360/ih/2)*2:360') // 360p
    .on('start', function(commandLine) {
      console.log('Spawned FFmpeg with command:', commandLine);
    })
    .on('end', function() {
      console.log('Processing finished successfully');
      res.status(200).send('Processing finished successfully');
    })
    .on('error', function(err: any, stdout: any, stderr: any) {
      console.error('FFmpeg error:', err.message);
      console.error('FFmpeg stderr:', stderr);
      res.status(500).send('FFmpeg failed: ' + err.message);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
