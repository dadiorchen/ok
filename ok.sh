#!/bin/bash

echo ok! && curl http://localhost:3333/ok || (curl http://localhost:3333/notok  && xxx)
