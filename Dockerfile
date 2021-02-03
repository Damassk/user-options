FROM node:10-alpine
RUN mkdir /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN apk add --no-cache git
RUN npm install pm2 -g
USER node
RUN git clone https://github.com/Damassk/user-options.git /home/node/app
RUN npm install
EXPOSE 3021
CMD [ "pm2-runtime", "app.js" ]