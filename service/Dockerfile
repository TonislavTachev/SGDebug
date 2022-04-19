 FROM node:14-alpine
 WORKDIR /app
 COPY . .
 ADD ./environments/docker.env .env
 RUN npm install --only=prod
 EXPOSE 18001
 CMD ["node", "server.js"]