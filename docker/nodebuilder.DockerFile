# FROM node:12 as builder
# # The following prevents errors when cwebp is installing.
# RUN apt-get update
# RUN apt-get install libglu1 -y
# WORKDIR /usr/src/app
# COPY package.json .
# COPY yarn.lock .
# COPY patches /usr/src/app/patches
# RUN yarn global add mocha
# RUN yarn --loglevel error
# # RUN yarn run postinstall
# COPY config /usr/src/app/config
# COPY public /usr/src/app/public

# COPY src /usr/src/app/src
# COPY webpack /usr/src/app/webpack
# COPY babel.config.js .
# COPY .env* ./
# COPY tsconfig.json .
# COPY jsconfig.json .
# COPY .eslintignore .
# COPY .eslintrc.js .
# COPY .nvmrc .
# COPY .prettierignore .
# COPY .prettierrc .
# COPY .stylelintrc .
# RUN yarn run build
# RUN mocha --timeout=5000 dist/server/start.js -tests
# COPY version.json /usr/src/app/dist/static/version.json
# RUN cat /usr/src/app/dist/static/version.json
FROM node:12 as builder
# RUN apk add --no-cache git
# The following prevents errors when cwebp is installing.
RUN apt-get update
RUN apt-get install libglu1 -y
RUN apt-get upgrade -y
WORKDIR /usr/src/app
RUN npm install -g mocha
COPY package.json .
COPY yarn.lock .
COPY patches /usr/src/app/patches
RUN yarn
#RUN npm install --loglevel error
RUN yarn run postinstall
COPY config /usr/src/app/config
COPY public /usr/src/app/public

COPY src /usr/src/app/src
RUN mkdir -p /usr/src/app/src/dist/static
COPY webpack /usr/src/app/webpack
COPY babel.config.js .
COPY .env* ./
COPY .eslintignore .
COPY .eslintrc.js .
COPY .nvmrc .
COPY .prettierignore .
COPY .prettierrc .
COPY .stylelintrc .
COPY tsconfig.json .
COPY jsconfig.json .
RUN yarn run build
RUN mocha --timeout=5000 dist/server/start.js -tests
COPY version.json /usr/src/app/dist/static/version.json
RUN cat /usr/src/app/dist/static/version.json
