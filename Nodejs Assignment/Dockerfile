#docker file by lavish
FROM node:20

# Create app directory
WORKDIR /book-store

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm i postman-request

# Bundle app source
COPY . /book-store/

CMD [ "node", "index.js" ]
EXPOSE 3000