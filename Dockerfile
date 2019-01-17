FROM nginx:stable-alpine
COPY server/site.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
