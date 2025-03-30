# Stage 1: Build the Vite application
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# RUN corepack enable

# COPY package.json yarn.lock ./
COPY package.json ./

# RUN YARN_CHECKSUM_BEHAVIOR=update yarn install
RUN npm install --legacy-peer-deps

COPY . .

# RUN yarn build
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

# Add a script to inject environment variables
COPY env-config.sh /
RUN chmod +x /env-config.sh

CMD ["sh", "-c", "/env-config.sh && nginx -g 'daemon off;'"]

# Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# # # Stage 2: Create production image
# FROM nginx:latest
# COPY --from=builder /app/dist /var/www
# COPY ./resources/nginx.conf /etc/nginx/conf.d/default.conf
