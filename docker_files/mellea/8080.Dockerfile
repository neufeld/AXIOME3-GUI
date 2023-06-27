# Install frontend
FROM node:12.16.0-alpine AS frontend
ENV REACT_APP_QIIME2_RELEASE 2020.6
ENV REACT_APP_SILVA_VERSION 138
ENV REACT_APP_RUN_ENV 8080
ENV REACT_APP_OUTPUT_DIR_PATH /hostfs/Analysis/AXIOME3/output

WORKDIR /frontend
# ARG REACT_APP_QIIME2_RELEASE
# ARG REACT_APP_SILVA_VERSION
# ARG REACT_APP_RUN_ENV
# ARG REACT_APP_OUTPUT_DIR_PATH
# RUN echo ${REACT_APP_QIIME2_RELEASE}
# RUN echo ${REACT_APP_SILVA_VERSION}
# RUN echo ${REACT_APP_RUN_ENV}
# RUN echo ${REACT_APP_OUTPUT_DIR_PATH}
# ENV REACT_APP_QIIME2_RELEASE ${REACT_APP_QIIME2_RELEASE}
# ENV REACT_APP_SILVA_VERSION ${REACT_APP_SILVA_VERSION}
# ENV REACT_APP_RUN_ENV ${REACT_APP_RUN_ENV}
# ENV REACT_APP_OUTPUT_DIR_PATH ${REACT_APP_OUTPUT_DIR_PATH}

ENV PATH /app/node_modules/.bin:$PATH
# Install node modules
COPY ./frontend/package.json /frontend/package.json
COPY ./frontend/package-lock.json /frontend/package-lock.json

RUN npm install --silent

# Copy necessary files for production
COPY ./frontend/src /frontend/src
COPY ./frontend/public /frontend/public

RUN npm run build

# Nginx configuration
FROM nginx:stable

COPY --from=frontend /frontend/build /usr/share/nginx/html