// @flow
if (!process.env.CI) {
    console.error();
    console.error('You are not allowed to publish from your machine');
    console.error();
    process.exit(1);
}
