FROM node:10.15.0

RUN mkdir -p /opt/microservices/app
RUN mkdir -p /opt/microservices/conf
RUN mkdir -p /opt/microservices/logs
COPY ./ /opt/microservices/app/
RUN usermod -d /opt/microservices/ node
RUN mkdir -p opt/microservices/log && \
    mkdir -p /opt/service/log && \
    chown -R node.node /opt/microservices/ &&\
    chmod -R 775 /opt/microservices/

EXPOSE 3005


USER node

WORKDIR /opt/microservices/app

ENTRYPOINT ["node", "/opt/microservices/app/app.js"]