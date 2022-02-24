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
            <td>Total JS
            <td>${formatKb(master.totalJs)}
            <td>${formatKb(pr.totalJs)}
            <td>${formatKb(pr.totalJs - master.totalJs)}
        <tr>
            <td>JS without icons
            <td>${formatKb(master.withoutIcons)}
            <td>${formatKb(pr.withoutIcons)}
            <td>${formatKb(pr.withoutIcons - master.withoutIcons)}
        <tr>
            <td>Lib overhead
            <td>${formatKb(master.libOverhead)}
            <td>${formatKb(pr.libOverhead)}
            <td>${formatKb(pr.libOverhead - master.libOverhead)}
    </table>
    `
    );
};

main().catch((error) => {
    core.setFailed(error.message);
});
