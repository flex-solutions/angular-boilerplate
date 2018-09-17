# Stage 0
ARG NODE_VERSION=8.111.3
FROM node:${NODE_VERSION} as build-stage
WORKDIR /app

COPY package*.json ./
RUN npm i npm@latest -g
RUN npm install

COPY . .

# RUN npm run build-i18n

# Stage 1, Based on Nginx
FROM nginx:1.15.2-alpine

# Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

