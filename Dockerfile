FROM node:20

WORKDIR /front-end

EXPOSE 3000

COPY . .

RUN npm install
RUN npm install web-vitals


CMD [ "npm","start" ]