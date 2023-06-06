FROM node

WORKDIR /app

# if there is no ready-made build folder, 
# then (for servers with RAM > 2gb)
# ----------
# COPY package.json /app
# RUN ["npm", "install"]
# COPY . .
# RUN ["npm", "run", "build"]
# ----------

# or
# ----------
COPY ./docker/package.json .
COPY ./docker/server.js .
RUN npm install
# ----------

CMD ["node", "server.js"]

ENV DOCKER_PORT=3000

EXPOSE $DOCKER_PORT

