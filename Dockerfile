# Stage 1: Build Angular App
FROM node:18.13.0 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Angular CLI globally and required dependencies
RUN npm install -g npm@8.19.2 @angular/cli@17.2.3 \
    && npm ci --force \
    && npm cache clean --force

# Set environment variable to increase memory for Node.js build process
ENV NODE_OPTIONS=--max_old_space_size=24576

# Copy source code and build Angular app
COPY . .
RUN npm run build

# Stage 2: Serve Angular App with Nginx
FROM nginx:1.23-alpine

# Copy custom nginx configuration
COPY angular.nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the build stage
COPY --from=build /app/dist/ko-manage-core-omt /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start nginx
CMD ["nginx", "-g", "daemon off;"]

#docker build -t ko-manage-core-omt .
#docker image rm tag docker.io/omtvn/ko-manage-core-omt
#docker image tag ko-manage-core-omt docker.io/omtvn/ko-manage-core-omt
#docker push docker.io/omtvn/ko-manage-core-omt