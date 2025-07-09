

# YouTube Skeleton Clone 🎥

This is a simplified YouTube clone built as part of my Full Stack Development course. The purpose of this project is to focus on core YouTube functionality—**video uploading, processing, and viewing**—rather than building a full production system.
![image](https://github.com/user-attachments/assets/fd978e36-adef-4737-8471-0ad50dcdf730)

---

## ✨ Features

- 🔐 Google Sign-In via Firebase Auth
- ⬆️ Authenticated users can upload videos
- 🧾 Videos are transcoded to multiple resolutions (e.g. 360p, 720p) using `ffmpeg`
- 🎥 Uploaded videos are viewable by anyone
- 📄 Metadata stored in Firestore (title, description, processing status)
- 🧵 Asynchronous event-based processing pipeline using Pub/Sub

---

## 🧠 Architecture Overview

| Component                | Tech Stack                                 |
|--------------------------|--------------------------------------------|
| Frontend                 | Next.js on Cloud Run                       |
| Authentication           | Firebase Auth (Google Sign-In)            |
| File Storage             | Google Cloud Storage                       |
| Video Processing         | Cloud Run Workers + `ffmpeg`              |
| Message Queue            | Google Cloud Pub/Sub                      |
| API                      | Firebase Cloud Functions                   |
| Metadata DB              | Firestore                                  |

---

## 🧱 High-Level Flow

1. **User signs in** via Google with Firebase Auth
2. **User uploads a video**:
   - Calls a Firebase Function to get a signed URL
   - Uploads video directly to Cloud Storage using the signed URL
3. **Storage triggers a Pub/Sub event**
4. **Cloud Run workers** process the video with `ffmpeg`, generate multiple resolutions
5. Processed video is uploaded to a **public bucket**
6. Video metadata is stored in **Firestore**
7. **Frontend app** displays available videos and playback options

---

## 📦 Technologies Used

- [Next.js](https://nextjs.org/) (Frontend UI)
- [Firebase Auth](https://firebase.google.com/docs/auth) (Authentication)
- [Firebase Functions](https://firebase.google.com/docs/functions) (API)
- [Firestore](https://firebase.google.com/docs/firestore) (Database)
- [Google Cloud Storage](https://cloud.google.com/storage) (Video Storage)
- [Google Pub/Sub](https://cloud.google.com/pubsub) (Message Queue)
- [Cloud Run](https://cloud.google.com/run) (Auto-scaling video workers)
- [FFmpeg](https://ffmpeg.org/) (Video transcoding)

---

## 🚀 Setup & Deployment

> ⚠️ This project assumes you have access to a Firebase + Google Cloud project.

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/youtube-skeleton-clone.git
   cd youtube-skeleton-clone
