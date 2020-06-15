# clean
rm -rf dist-ts
rm -rf dist
# killall flow

# build typescript
yarn gen-flow-defs
mv dist dist-ts

# build flow
yarn build
mv dist/index.js dist/index.js.tmp
mv dist/index.js.flow dist/index.js.flow.tmp

# merge builds
cp -r dist-ts/* dist
rm dist/index.js
rm dist/index.js.flow
mv dist/index.js.tmp dist/index.js 
mv dist/index.js.flow.tmp dist/index.js.flow


# clean
rm -rf dist-ts

# check
yarn flow