 FROM node:12-alpine
 WORKDIR /app
 COPY . .
 ADD ./environments/docker.env .env
 RUN npm install --only=prod
 EXPOSE 18001
 CMD ["node", "server.js"]