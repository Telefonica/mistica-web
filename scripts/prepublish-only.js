// @flow
if (!process.env.CI) {
    console.error();
    console.error('Cannot publish from this machine');
    console.error();
    console.error('Execute:');
    console.error('    tu-ci npm_publish');
    console.error();
    console.error('Or for a dry-run:');
    console.error('    tu-ci npm_publish_dry_run');
    console.error();
    process.exit(1);
}
