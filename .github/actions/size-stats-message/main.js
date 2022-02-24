const core = require('@actions/core');
const prettyBytes = require('pretty-bytes');

const main = async () => {
    const master = {
        totalJs: Number(core.getInput('master-total-js')),
        withoutIcons: Number(core.getInput('master-js-without-icons')),
        libOverhead: Number(core.getInput('master-lib-overhead')),
    };
    const pr = {
        totalJs: Number(core.getInput('pr-total-js')),
        withoutIcons: Number(core.getInput('pr-js-without-icons')),
        libOverhead: Number(core.getInput('pr-lib-overhead')),
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
            <td>${prettyBytes(pr.totalJs - master.totalJs, {signed: true})}
        <tr>
            <td><b>JS without icons</b>
            <td>${prettyBytes(master.withoutIcons)}
            <td>${prettyBytes(pr.withoutIcons)}
            <td>${prettyBytes(pr.withoutIcons - master.withoutIcons, {signed: true})}
        <tr>
            <td><b>Lib overhead</b>
            <td>${prettyBytes(master.libOverhead)}
            <td>${prettyBytes(pr.libOverhead)}
            <td>${prettyBytes(pr.libOverhead - master.libOverhead, {signed: true})}
    </table>
    `
    );
};

main().catch((error) => {
    core.setFailed(error.message);
});
