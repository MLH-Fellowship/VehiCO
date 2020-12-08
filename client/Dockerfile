FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/VehiCO-client

COPY package.json /srv/app/VehiCO-client
COPY package-lock.json /srv/app/VehiCO-client

RUN npm install


WORKDIR /srv/app/VehiCO-client
COPY . /srv/app/VehiCO-client

EXPOSE 3000 

CMD ["npm","start"]