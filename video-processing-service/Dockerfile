# 第一阶段：builder
FROM node:22 AS builder

# Set the working directory in the container to /app
WORKDIR /app

COPY package*.json ./

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

RUN npm install

# Copy app source inside the docker image
COPY . .

RUN npm run build

# 第二阶段：production runtime
FROM node:22

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# ✅ 从 builder 阶段拷贝
COPY --from=builder /app/dist ./dist

# Make port 3000 available outside this container
EXPOSE 3000

# Define the command to run your app using CMD (only one CMD allowed)-
CMD ["npm", "start"]