import * as functions from "firebase-functions/v1";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

// import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

initializeApp();
const firestore = new Firestore();
const storage = new Storage();
const rawVideoBucketName = "xiuxiu-yt-raw-videos";

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
export const createUser = functions.auth.user().onCreate((
  user: functions.auth.UserRecord) => {
  const userInfo = {
    uid: user.uid,
    email: user.email || "",
    photoURL: user.photoURL || "",
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info("User created", {userInfo});
  return;
});

export const generateUploadUrl = onCall({maxInstances: 1}, async (request) => {
  // Check if the user is authentication
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);

  // Generate a unique filename for upload
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

  // Get a v4 signed URL for uploading file
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return {url, fileName};
});
