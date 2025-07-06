import {Storage} from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

const storage = new Storage();

const rawVideoBucketName = 'yt-raw-videos'; // Replace with your bucket name
const processedVideoBucketName = 'yt-processed-videos'; // Replace with your bucket name

const localRawVideoPath = './raw-videos';
const localProcessedVideoPath = './processed-videos';

export function setupDirectories() {

}


export function convertVideo(rawVideoName:string, processedVideoName:string){

}