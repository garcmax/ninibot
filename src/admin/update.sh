#!/bin/bash

echo "We pull from last commit"
git pull
rc=$?
if [[ $rc != 0 ]]; then
  echo "git pull error"
  exit 1
fi
echo "pull successful"


exit 0
