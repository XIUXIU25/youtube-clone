"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDirectories = setupDirectories;
exports.convertVideo = convertVideo;
exports.downloadRawVideo = downloadRawVideo;
exports.uploadProcessedVideo = uploadProcessedVideo;
exports.deleteRawVideo = deleteRawVideo;
exports.deleteProcessedVideo = deleteProcessedVideo;
const storage_1 = require("@google-cloud/storage");
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const storage = new storage_1.Storage();
const rawVideoBucketName = "neetcode-yt-raw-videos";
const processedVideoBucketName = "neetcode-yt-processed-videos";
const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";
/**
 * Creates the local directories for raw and processed videos.
 */
function setupDirectories() {
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
}
/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
function convertVideo(rawVideoName, processedVideoName) {
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)(path_1.default.join(localRawVideoPath, rawVideoName))
            .outputOptions("-vf", "scale=-1:360") // 360p
            .on("end", function () {
            console.log("Processing finished successfully");
            resolve();
        })
            .on("error", function (err) {
            console.log("An error occurred: " + err.message);
            reject(err);
        })
            .save(path_1.default.join(localProcessedVideoPath, processedVideoName));
    });
}
/**
 * @param fileName - The name of the file to download from the
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */
function downloadRawVideo(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield storage.bucket(rawVideoBucketName)
            .file(fileName)
            .download({
            destination: path_1.default.join(localRawVideoPath, fileName),
        });
        console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${path_1.default.join(localRawVideoPath, fileName)}.`);
    });
}
/**
 * @param fileName - The name of the file to upload from the
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
 * @returns A promise that resolves when the file has been uploaded.
 */
function uploadProcessedVideo(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = storage.bucket(processedVideoBucketName);
        // Upload video to the bucket
        yield storage.bucket(processedVideoBucketName)
            .upload(path_1.default.join(localProcessedVideoPath, fileName), {
            destination: fileName,
        });
        console.log(`${path_1.default.join(localProcessedVideoPath, fileName)} uploaded to gs://${processedVideoBucketName}/${fileName}.`);
        // Set the video to be publicly readable
        yield bucket.file(fileName).makePublic();
    });
}
/**
 * @param fileName - The name of the file to delete from the
 * {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted.
 *
 */
function deleteRawVideo(fileName) {
    return deleteFile(path_1.default.join(localRawVideoPath, fileName));
}
/**
* @param fileName - The name of the file to delete from the
* {@link localProcessedVideoPath} folder.
* @returns A promise that resolves when the file has been deleted.
*
*/
function deleteProcessedVideo(fileName) {
    return deleteFile(path_1.default.join(localProcessedVideoPath, fileName));
}
/**
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file has been deleted.
 */
function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Failed to delete file at ${filePath}`, err);
                    reject(err);
                }
                else {
                    console.log(`File deleted at ${filePath}`);
                    resolve();
                }
            });
        }
        else {
            console.log(`File not found at ${filePath}, skipping delete.`);
            resolve();
        }
    });
}
/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check.
 */
function ensureDirectoryExistence(dirPath) {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true }); // recursive: true enables creating nested directories
        console.log(`Directory created at ${dirPath}`);
    }
}
