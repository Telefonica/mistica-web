#!/bin/bash

PACKAGE_JSON="package.json"

# Use jq to extract the key (resolution) for playroom
PLAYROOM_RESOLUTION_KEY=$(jq -r '.resolutions | to_entries[] | select(.key | test("playroom")) | .key' "$PACKAGE_JSON")
PLAYROOM_PATCH_PATH=$(jq -r '.resolutions | to_entries[] | select(.key | test("playroom")) | .value' "$PACKAGE_JSON" | sed -n 's/^patch:[^#]*#\(.*\)$/\1/p')
# make the path absolute
PLAYROOM_PATCH_PATH=$(realpath $PLAYROOM_PATCH_PATH)

# Check if the resolution was found and extract the version
if [[ $PLAYROOM_RESOLUTION_KEY =~ playroom@\^([0-9]+\.[0-9]+\.[0-9]+) ]]; then
    PLAYROOM_VERSION="${BASH_REMATCH[1]}"
    echo "Playroom version: $PLAYROOM_VERSION"
    echo "Playroom patch: $PLAYROOM_PATCH_PATH"
else
    echo "Playroom version not found or incorrect format."
    exit 1
fi

yarn_patch_json=$(yarn patch playroom@npm:$PLAYROOM_VERSION --json)
yarn_patch_dir=$(echo $yarn_patch_json | jq -r '.path')

echo "patch dir: $yarn_patch_dir"

# Create a temporary directory
repo_tmp_dir=$(mktemp -d -t playroom-XXXXXXXXXX)
cd $repo_tmp_dir

echo "Cloning Playroom repository in $repo_tmp_dir"

echo "Clone the Playroom repository"
git clone git@github.com:seek-oss/playroom.git .

# Checkout the version of Playroom that is used in the project
git checkout tags/v$PLAYROOM_VERSION

# Apply the patch
git apply $PLAYROOM_PATCH_PATH
pnpm i
git add -A
git commit -m"apply mistica patch"

echo
echo "----------------------------------------------------------------------------------------------------------------------------------"
echo "| make changes in $repo_tmp_dir and when you're done, run the following command in mistica-web repo:"
echo "| cp -r $repo_tmp_dir/src $yarn_patch_dir && yarn patch-commit -s $yarn_patch_dir && yarn && yarn playroom"
echo "----------------------------------------------------------------------------------------------------------------------------------"
echo


code .
