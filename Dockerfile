FROM node:16

WORKDIR /backgroundma_ms

COPY package*.json /backgroundma_ms/
RUN npm install
COPY . /backgroundma_ms/
EXPOSE 9040

CMD ["npm", "run", "start"]