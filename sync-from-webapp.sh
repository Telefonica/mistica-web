#!/bin/bash
set -e
# cp -r ../webapp/packages/ui/src .
# cp -r ../webapp/packages/ui/doc .
# cp -r ../webapp/packages/playroom/src/* ./playroom
rm ./playroom/roboto.css

for f in $(grep -rl src -e 'no-unused-prop-types'); do
    sed -i '/no-unused-prop-types/d' $f
done

for f in $(grep -rl src -e 'react/prop-types'); do
    sed -i '/react\/prop-types/d' $f
done

for f in $(grep -rl playroom -e 'no-underscore-dangle'); do
    sed -i '/no-underscore-dangle/d' $f
done

for f in $(grep -rl playroom -e 'no-extraneous-dependencies'); do
    sed -i '/no-extraneous-dependencies/d' $f
done