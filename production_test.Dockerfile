# Install frontend
FROM node:12.16.0-alpine AS frontend
ENV REACT_APP_QIIME2_RELEASE 2020.6
ENV REACT_APP_SILVA_VERSION 138
ENV REACT_APP_RUN_ENV test

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