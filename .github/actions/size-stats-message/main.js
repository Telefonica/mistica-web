const core = require('@actions/core');

const formatKb = (bytes) => (bytes / 1024).toFixed(2) + ' KB';

const main = async () => {
    const master = {
        totalJs: core.getInput('master-total-js'),
        withoutIcons: core.getInput('master-js-without-icons'),
        libOverhead: core.getInput('master-lib-overhead'),
    };
    const pr = {
        totalJs: core.getInput('pr-total-js'),
        withoutIcons: core.getInput('pr-js-without-icons'),
        libOverhead: core.getInput('pr-lib-overhead'),
    };

    // prettier-ignore
    core.setOutput('message', `
    |                  | master                           | pr                           | diff                                               |
    |------------------|----------------------------------|------------------------------|----------------------------------------------------|
    | Total JS         | ${formatKb(master.totalJs)}      | ${formatKb(pr.totalJs)}      | ${formatKb(pr.totalJs - master.totalJs)}           |
    | JS without icons | ${formatKb(master.withoutIcons)} | ${formatKb(pr.withoutIcons)} | ${formatKb(pr.withoutIcons - master.withoutIcons)} |
    | Lib overhead     | ${formatKb(master.libOverhead)}  | ${formatKb(pr.libOverhead)}  | ${formatKb(pr.libOverhead - master.libOverhead)}   |
    `);
};

main().catch((error) => {
    core.setFailed(error.message);
});
