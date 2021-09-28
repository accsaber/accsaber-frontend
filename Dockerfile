FROM node:lts AS build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --only=dev
RUN npx ng build --prod

# Copy and build app
COPY . .
RUN npm run ng build --prod

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/* .
ADD nginx.conf /etc/nginx/nginx.conf
ENV NGINX_PORT=8080
