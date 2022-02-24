const core = require('@actions/core');
const calcSizeStats = require('../../../scripts/size-stats');

const main = async () => {
    const sizeStats = calcSizeStats();
    console.log('size stats', sizeStats);
    core.setOutput('total-js', sizeStats.totalJs);
    core.setOutput('js-without-icons', sizeStats.jsWithoutIcons);
    core.setOutput('lib-overhead', sizeStats.libOverhead);
};

main().catch((error) => {
    core.setFailed(error.message);
});
