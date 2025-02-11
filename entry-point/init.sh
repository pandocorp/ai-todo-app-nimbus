#!/bin/bash

cd /root/ai-todo-app-nimbus/entry-point
cp /root/ai-todo-app-nimbus/config/nginx.staging.conf /etc/nginx/nginx.conf
# bashrc has code ```[ -z "$PS1" ] && return``` this will return without executing the source
# in order to execute entire the .bashrc add ```PS1='$ '``` before source command.
PS1='$ '
source ~/.bashrc

pm2 delete all

echo 'starting nginx...'
service nginx restart -d

echo "I am sleeping"
sleep infinity
