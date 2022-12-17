say ok when finished

usage:

on client:

alias ok='echo ok! && curl https://xxx/okservices/ok || (curl https://xxx/okservices/notok  && xxx)'

on speaker:
for i in {1..10000000}; do say `curl https://xxx/okservices/receive`; sleep 10; done;
