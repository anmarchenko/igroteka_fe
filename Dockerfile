FROM nginx:latest
COPY server/site.conf /etc/nginx/default.conf
COPY build /usr/share/nginx/html
