#!/bin/bash

GITPULL=`git pull`
rc=$?
if [[ $rc != 0 ]]; then
  echo "git pull error"
  exit 1
fi
LIST=($GITPULL)
#if [[ ${LIST[1]} = up-to-date. ]]; then
#  echo "I'm up to date !"
#  exit 0
#fi
echo "Updating to ${LIST[1]}..."
sleep 1
echo "Killing me"
ps -ef | grep babel-node | grep -v grep | awk '{print $2}' | xargs kill
sleep 1
echo "mon script existe toujours"
exit 0
