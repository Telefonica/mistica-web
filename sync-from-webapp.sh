#!/bin/bash
set -e

# copy some files from webapp
cp -r ../webapp/packages/ui/src .
cp -r ../webapp/packages/ui/doc .
cp -r ../webapp/packages/playroom/src/* ./playroom
rm ./playroom/roboto.css # we already have roboto.css in /css folder
git checkout playroom/themes.js

#  fix some imorts 
find src -type f -exec sed -i -e 's/@tuenti\/ui/@telefonica\/mistica/g' {} \;
find doc -type f -exec sed -i -e 's/@tuenti\/ui/@telefonica\/mistica/g' {} \;
find src -type f -exec sed -i -e 's/@tuenti\/libphonenumber/@telefonica\/libphonenumber/g' {} \;
find playroom -type f -exec sed -i -e 's/\.\/roboto\.css/\.\.\/css\/roboto\.css/g' {} \;
find playroom -type f -exec sed -i -e 's/@tuenti\/ui\/css\/reset\.css/\.\.\/css\/reset\.css/g' {} \;
find playroom -type f -exec sed -i -e 's/@tuenti\/ui/\.\.\/src/g' {} \;

find src -type f -exec sed -i -e 's/Core|/Components|/g' {} \;

# remove some eslint suppression comments for rules we don't have in this repo
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

yarn prettier --write .