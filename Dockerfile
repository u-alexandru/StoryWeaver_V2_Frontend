FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 4200
