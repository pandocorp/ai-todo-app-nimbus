FROM gramcha/ubuntu-node-nginx:4.0.0 AS basestage

RUN mkdir /root/ai-todo-app-nimbus/
ADD . /root/ai-todo-app-nimbus/
WORKDIR /root/ai-todo-app-nimbus/

FROM  basestage AS finalstage
RUN mkdir -p /root/ai-todo-app-nimbus/
WORKDIR /root/ai-todo-app-nimbus/
COPY --from=basestage /root/ai-todo-app-nimbus/ ./
RUN npm i --legacy-peer-deps

RUN cd /root/ai-todo-app-nimbus && npm run build \
    && chmod +x /root/ai-todo-app-nimbus/entry-point/*.sh \
    && ulimit -S -c 0


#Expose ports
EXPOSE 65080
EXPOSE 80
EXPOSE 443
EXPOSE 3000 3001

ENTRYPOINT ["sh", "-c", "/root/ai-todo-app-nimbus/entry-point/init.sh"]

# Stage 1: Build React App
#FROM node:18 AS build
#WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install --legacy-peer-deps
#COPY . .
#RUN npm run build
#
## Stage 2: Serve with NGINX
#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

