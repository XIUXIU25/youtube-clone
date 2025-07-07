import * as functions from "firebase-functions/v1";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";


import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

initializeApp();
const firestore = new Firestore();

setGlobalOptions({maxInstances: 10});

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
