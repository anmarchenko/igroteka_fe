FROM nginx:latest
COPY server/site.conf /etc/nginx/conf.d/nginx.conf
COPY build /usr/share/nginx/html
