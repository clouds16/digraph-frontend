FROM node:alpine
COPY . /client
WORKDIR /client
CMD react-scripts start