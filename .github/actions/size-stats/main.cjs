const core = require('@actions/core');
const calcSizeStats = require('../../../scripts/size-stats/index.cjs');

const main = async () => {
    const sizeStats = calcSizeStats();

    core.setOutput('total-js', sizeStats.totalJs);
    core.setOutput('js-without-icons', sizeStats.jsWithoutIcons);
    core.setOutput('lib-overhead', sizeStats.libOverhead);
    core.setOutput('lib-overhead-gzip', sizeStats.libOverheadGzip);
};

main().catch((error) => {
    core.setFailed(error.message);
});
