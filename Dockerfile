# Stage 0
ARG NODE_VERSION=8.11.3
FROM node:${NODE_VERSION} as build-stage

ARG BUILD_MODE=build-i18n-prod

WORKDIR /app

COPY package*.json ./

RUN npm install -g webpack@4.8.3
RUN npm install -g @angular/cli@6.0.3

# COPY package*.json ./
RUN npm install

COPY . .

RUN npm run ${BUILD_MODE}

# Stage 1, Based on Nginx
FROM nginx:1.15.2-alpine

# Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

