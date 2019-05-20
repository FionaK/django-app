#FROM node:lts-alpine AS jsbuilder
#
#WORKDIR /app
#COPY package*.json ./
#
#RUN npm install
#RUN npm run build
#
## Multi-stage means the build context needs to be the same, that's a bit disappointing (coupling!)...
#FROM nginx:stable-alpine
#
#COPY deploy/nginx.conf /etc/nginx/nginx.conf
#
#COPY --from=jsbuilder /client/dist/ app/
#


# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
