FROM node:current-buster-slim

RUN apt-get update && apt-get install git -y
WORKDIR /usr/local/src
RUN git clone https://github.com/digitalsleuth/letsplaybingo
WORKDIR /usr/local/src/letsplaybingo
RUN npm install && npm audit fix && npx browserslist --update-db
ENTRYPOINT ["npm start"]

