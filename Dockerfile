# Stage 1: Build the React application
FROM node:latest AS builder

WORKDIR /app

# files
COPY package*.json ./

# react package fix
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .

# build
RUN npm run build

# Stage 2: Serve the React app with nginx
FROM nginx:stable-alpine

# remove the default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# copy the build output from the builder stage into nginx's public folder
COPY --from=builder /app/build /usr/share/nginx/html

# copy your custom nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port
EXPOSE 1122:80

# start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
