FROM node:18.20.0

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2@latest

RUN npm run compile-project

COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

RUN chmod +x /usr/src/app/wait-for-it.sh

CMD ["/usr/src/app/wait-for-it.sh", "mysql:${DB_PROD_PORT}", "--timeout=20", "--", "sh", "-c", "npm run db:migrate:up:production && npm run db:seed:all:production && pm2-runtime start dist/app.js --env production"]
