FROM nginx:1.19.10
COPY ./build /usr/share/nginx/html
COPY ./assets/nginx/default.conf /etc/nginx/conf.d/default.conf

# exposes the client portal
EXPOSE 18002
