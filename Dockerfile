FROM node:14-alpine

# Create app directory
RUN mkdir /app
WORKDIR /app

# Env
ENV NODE_ENV="production"
ENV MONGO_URL=""
ENV LOG_LEVEL="info"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]