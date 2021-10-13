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

# Download prometheus library
FROM alpine as prom
RUN apk add git
WORKDIR /var/app
RUN git clone https://github.com/knyar/nginx-lua-prometheus

# nginx server
FROM alpine
RUN apk add nginx
RUN apk add nginx-mod-http-brotli
RUN apk add nginx-mod-http-lua
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/* .
COPY --from=prom /var/app/nginx-lua-prometheus /var/lua/prom
ADD nginx.conf /etc/nginx/nginx.conf
ENV NGINX_PORT=8080
CMD [ "nginx" ]
