FROM node:12.18.2-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# COPY package.json /app/package.json
COPY . /app

RUN mv src/index.prod.html  src/index.html
RUN cat  src/index.html

RUN npm install
# RUN npm install @angular/cli@8.3.25

# CMD ng serve
RUN ng build --prod
RUN pwd
RUN ls /app

# Stage 2
FROM nginx:1.13.12-alpine

COPY --from=builder /app/dist/kcb-interview-automation-app /usr/share/nginx/html

# # set working directory

WORKDIR /app

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
