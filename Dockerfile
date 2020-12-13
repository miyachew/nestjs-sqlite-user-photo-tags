FROM node:15
WORKDIR /app

COPY package.json package.json 

EXPOSE 3000

RUN npm i --force

CMD npm run build && npm run start:dev