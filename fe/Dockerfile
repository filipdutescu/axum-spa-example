# Build app

FROM node:alpine AS build-artifacts
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Serve app

FROM nginx:alpine
EXPOSE 80
COPY --from=build-artifacts /app/dist/axum-spa-example-fe /usr/share/nginx/html
