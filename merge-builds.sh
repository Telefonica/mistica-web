# clean
rm -rf dist-ts
rm -rf dist
killall flow

# build typescript
yarn gen-flow-defs
mv dist dist-ts

# build flow
yarn build

# merge builds
cp -r dist-ts/* dist

# clean
rm -rf dist-ts