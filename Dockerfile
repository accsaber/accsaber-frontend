FROM node:lts AS build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --only=dev
RUN npm install

# Copy and build app
COPY . .
RUN npx ng build --prod --subresource-integrity

FROM alpine
RUN apk add nginx
RUN apk add nginx-mod-http-brotli
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/* .
ADD nginx.conf /etc/nginx/nginx.conf
ENV NGINX_PORT=8080
CMD [ "nginx" ]
