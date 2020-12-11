FROM node:13.12.0-alpine

RUN mkdir -p /srv/app/VehiCO-client
WORKDIR /srv/app/VehiCO-client

COPY package.json /srv/app/VehiCO-client
COPY package-lock.json /srv/app/VehiCO-client

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g serve

COPY . /srv/app/VehiCO-client

RUN npm run build --production
CMD serve -l 3000 -s build

EXPOSE 3000 

LABEL org.opencontainers.image.source https://github.com/MLH-Fellowship/VehiCO