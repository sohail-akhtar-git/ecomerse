FROM node:16

WORKDIR /front-end

EXPOSE 3000

COPY . .

RUN npm install

CMD [ "npm","start" ]