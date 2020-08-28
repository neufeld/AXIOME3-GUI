# Install frontend
FROM node:12.16.0-alpine AS frontend
WORKDIR /frontend
ENV PATH /app/node_modules/.bin:$PATH
# Install node modules
COPY ./frontend/package.json /frontend/package.json
COPY ./frontend/package-lock.json /frontend/package-lock.json
# Copy necessary files for production
COPY ./frontend/src /frontend/src
COPY ./frontend/public /frontend/public

RUN npm install --silent
RUN npm run build

# Nginx configuration
FROM nginx:stable

COPY --from=frontend /frontend/build /usr/share/nginx/html