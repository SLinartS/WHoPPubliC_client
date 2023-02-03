FROM node

WORKDIR /app

COPY package.json /app

RUN ["npm", "install"]

COPY . .

CMD ["npm", "start"]

ENV DOCKER_PORT=3000

EXPOSE $DOCKER_PORT

