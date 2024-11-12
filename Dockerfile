
FROM node:16-alpine3.18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]

