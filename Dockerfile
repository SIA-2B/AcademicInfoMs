FROM node:16

WORKDIR /academicinfo_ms

COPY package*.json /academicinfo_ms/
RUN npm install
COPY . /academicinfo_ms/
EXPOSE 9040

CMD ["npm", "run", "start"]