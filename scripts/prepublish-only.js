// @flow
if (!process.env.CI) {
    const lines = [
        '',
        'Cannot publish from this machine',
        '',
        'To publish, execute:',
        '    tu-ci npm_publish',
        '',
        'Or, for a dry-run:',
        '    tu-ci npm_publish_dry_run',
        '',
    ];
    console.error(lines.join('\n'));
    process.exit(1);
}
