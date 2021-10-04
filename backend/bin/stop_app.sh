#!/bin/sh
PROCESS=`pgrep -fl ../src/app.py | cut -d " " -f 1`
if [ -n "$PROCESS" ]; then
    kill -term $PROCESS
fi
