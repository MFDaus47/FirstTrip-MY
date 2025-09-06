# Stage 1: Build React App
FROM node:20-alpine AS build

WORKDIR /app

# Install dependecies first (better caching)
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx Config (Optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["npm", "run", "dev"]