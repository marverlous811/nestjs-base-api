FROM node:10.13-alpine
WORKDIR /usr/app

COPY package*.json ./
COPY dist ./
RUN npm install --only=production

EXPOSE 3000
CMD [ "node", "main" ]
