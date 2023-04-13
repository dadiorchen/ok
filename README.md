say ok when finished

usage:

on client:

alias ok='echo ok! && curl https://xxx/okservices/ok || (curl https://xxx/okservices/notok  && xxx)'


# How to run

```
sed -i "s#const host = false#const host = 'ws://host'#" public/client.html && PORT=3001 WS_PORT=3002 node app.js
```
