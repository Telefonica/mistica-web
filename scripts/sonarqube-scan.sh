#!/bin/bash

# To run this script you need to have the SONAR_TOKEN environment variable set

# Change working directory to the root of the project
cd "$(dirname "$0")"/..

# Extract version from package.json
SONAR_PROJECT_VERSION=`node -e "console.log(require('./package.json').version)"`

echo "Running SonarQube analysis for mistica-web..."
docker run \
    --rm \
    -e SONAR_TOKEN="${SONAR_TOKEN}" \
    -e ACCEPTANCE_TESTING_COLLECT_COVERAGE="1" \
    -e SONAR_PROJECT_VERSION="${SONAR_PROJECT_VERSION}" \
    -v "${PWD}:/usr/src" \
    sonarsource/sonar-scanner-cli