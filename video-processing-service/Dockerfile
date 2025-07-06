# 第一阶段：builder
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y ffmpeg

RUN npm install

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

EXPOSE 3000

CMD ["npm", "start"]