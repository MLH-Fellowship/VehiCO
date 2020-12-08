FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/VehiCO-server
WORKDIR /srv/app/VehiCO-server

COPY package.json /srv/app/VehiCO-server
COPY package-lock.json /srv/app/VehiCO-server

RUN npm install

EXPOSE 5000

COPY . /srv/app/VehiCO-server

CMD ["npm","start"]

LABEL org.opencontainers.image.source https://github.com/MLH-Fellowship/VehiCO