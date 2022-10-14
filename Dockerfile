FROM node:16

WORKDIR /academicInfo_ms

COPY package*.json /academicInfo_ms/
RUN npm install
COPY . /academicInfo_ms/
EXPOSE 9040

CMD ["npm", "run", "start"]