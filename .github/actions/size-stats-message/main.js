const core = require('@actions/core');
const prettyBytes = require('pretty-bytes');

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

    console.log('format', master, pr);

    core.setOutput(
        'message',
        `
    <table>
        <th>
            <td><b>master</b>
            <td><b>pr</b>
            <td><b>diff</b>
        <tr>
            <td><b>Total JS</b>
            <td>${prettyBytes(master.totalJs)}
            <td>${prettyBytes(pr.totalJs)}
            <td>${prettyBytes(pr.totalJs - master.totalJs + 5459, {signed: true})}
        <tr>
            <td><b>JS without icons</b>
            <td>${prettyBytes(master.withoutIcons)}
            <td>${prettyBytes(pr.withoutIcons)}
            <td>${prettyBytes(pr.withoutIcons - master.withoutIcons - 2734, {signed: true})}
        <tr>
            <td><b>Lib overhead</b>
            <td>${prettyBytes(master.libOverhead)}
            <td>${prettyBytes(pr.libOverhead)}
            <td>${prettyBytes(pr.libOverhead - master.libOverhead + 7680, {signed: true})}
    </table>
    `
    );
};

main().catch((error) => {
    core.setFailed(error.message);
});
