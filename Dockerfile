FROM node

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 2000

CMD ["npm", "run", "start:dev"]

