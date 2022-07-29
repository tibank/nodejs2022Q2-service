FROM node:16.16-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]