const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const Jimp = require('jimp');
const {
    git,
    parseChanges,
    pairSnapshots,
    resolveRevision,
    createComparison,
    compareImages,
} = require('./compare');
const {startServer} = require('./server');

const snapshot = (name) => `src/__screenshot_tests__/__image_snapshots__/${name}-snap.png`;
const preparedSnapshot = (name) => snapshot(name).replace('__image_snapshots__', '__playwright_snapshots__');
const image = async (color = 0xffffffff, width = 2, height = 2) =>
    new Jimp(width, height, color).getBufferAsync(Jimp.MIME_PNG);
const files = (...entries) => new Map(entries.map(([file, sha]) => [file, {path: file, sha}]));

test('Git status parsing preserves spaces and both paths of a rename', () => {
    assert.deepEqual(parseChanges('M\0a path.png\0R100\0old name.png\0new name.png\0'), [
        {status: 'M', before: 'a path.png', after: 'a path.png'},
        {status: 'R', before: 'old name.png', after: 'new name.png'},
    ]);
});

test('a directory move is one comparison without losing either changed path', () => {
    const oldPath = snapshot('menu-1');
    const newPath = preparedSnapshot('menu-1');
    const result = pairSnapshots(
        [
            {status: 'D', before: oldPath},
            {status: 'A', after: newPath},
        ],
        files([oldPath, 'old']),
        files([newPath, 'new'])
    );
    assert.equal(result.length, 1);
    assert.equal(result[0].before.path, oldPath);
    assert.equal(result[0].after.path, newPath);
    assert.equal(result[0].type, 'renamed');
});

test('new Playwright references compare against the legacy images still present', () => {
    const oldPath = snapshot('menu-1');
    const newPath = preparedSnapshot('menu-1');
    const result = pairSnapshots(
        [{status: 'A', after: newPath}],
        files([oldPath, 'old']),
        files([oldPath, 'old'], [newPath, 'new'])
    );
    assert.equal(result.length, 1);
    assert.equal(result[0].type, 'prepared');
    assert.equal(result[0].before.path, oldPath);
});

test('a legacy reference is not reused for an additional new test case', () => {
    const oldPath = snapshot('menu-1');
    const exact = preparedSnapshot('menu-1');
    const extra = preparedSnapshot('menu-case-4-1');
    const result = pairSnapshots(
        [
            {status: 'A', after: exact},
            {status: 'A', after: extra},
        ],
        files([oldPath, 'old']),
        files([oldPath, 'old'], [exact, 'new'], [extra, 'extra'])
    );
    assert.equal(result.length, 2);
    assert.equal(result.filter((item) => item.type === 'prepared').length, 1);
    assert.equal(result.find((item) => item.after.path === extra).before, null);
});

test('removing unused legacy images remains a deletion even if a replacement exists', () => {
    const oldPath = snapshot('menu-1');
    const newPath = preparedSnapshot('menu-1');
    const result = pairSnapshots(
        [{status: 'D', before: oldPath}],
        files([oldPath, 'old'], [newPath, 'new']),
        files([newPath, 'new'])
    );
    assert.equal(result.length, 1);
    assert.equal(result[0].type, 'deleted');
    assert.equal(result[0].after, null);
});

test('a uniquely named parameterized rename pairs images even when their pixels changed', () => {
    const oldPath = snapshot('menu-1');
    const newPath = snapshot('menu-case-4-1');
    const result = pairSnapshots(
        [
            {status: 'D', before: oldPath},
            {status: 'A', after: newPath},
        ],
        files([oldPath, 'old']),
        files([newPath, 'new'])
    );
    assert.equal(result.length, 1);
    assert.equal(result[0].type, 'renamed');
});

test('ambiguous identical images are not silently assigned to unrelated tests', () => {
    const before = files([snapshot('a-1'), 'same'], [snapshot('b-1'), 'same']);
    const after = files([snapshot('c-1'), 'same'], [snapshot('d-1'), 'same']);
    const changes = [...before.keys()]
        .map((file) => ({status: 'D', before: file}))
        .concat([...after.keys()].map((file) => ({status: 'A', after: file})));
    assert.equal(pairSnapshots(changes, before, after).length, 4);
});

test('the pixel count distinguishes a visual edit from a different PNG encoding', async () => {
    const beforeImage = new Jimp(2, 2, 0xffffffff);
    const before = await beforeImage.deflateLevel(0).getBufferAsync(Jimp.MIME_PNG);
    const reencoded = await new Jimp(2, 2, 0xffffffff).deflateLevel(9).getBufferAsync(Jimp.MIME_PNG);
    assert.notDeepEqual(before, reencoded);
    assert.equal((await compareImages(before, reencoded)).metrics.different, 0);
    const editedImage = new Jimp(2, 2, 0xffffffff);
    editedImage.setPixelColor(0xff0000ff, 0, 0);
    const result = await compareImages(before, await editedImage.getBufferAsync(Jimp.MIME_PNG), true);
    assert.equal(result.metrics.different, 1);
    assert.equal(result.metrics.ratio, 0.25);
    assert.deepEqual((await Jimp.read(result.diff)).bitmap.data.slice(0, 4), Buffer.from([237, 28, 46, 255]));
});

test('different dimensions and added images count the extra pixels', async () => {
    const before = await image(0xffffffff, 1, 1);
    const after = await image(0xffffffff, 2, 1);
    const result = await compareImages(before, after);
    assert.equal(result.metrics.resized, true);
    assert.equal(result.metrics.different, 1);
    assert.equal((await compareImages(null, after)).metrics.different, 2);
});

async function fixture(t) {
    const repo = await fs.mkdtemp(path.join(os.tmpdir(), 'mistica-review-test-'));
    t.after(() => fs.rm(repo, {recursive: true, force: true}));
    await git(repo, ['init', '-b', 'main']);
    await git(repo, ['config', 'user.name', 'Snapshot reviewer']);
    await git(repo, ['config', 'user.email', 'reviewer@example.test']);
    await fs.mkdir(path.dirname(path.join(repo, snapshot('color-1'))), {recursive: true});
    await fs.writeFile(path.join(repo, snapshot('color-1')), await image());
    await fs.writeFile(path.join(repo, snapshot('menu-1')), await image(0x0000ffff));
    await git(repo, ['add', '.']);
    await git(repo, ['commit', '-m', 'Base images']);
    const base = (await git(repo, ['rev-parse', 'HEAD'])).trim();
    await git(repo, ['switch', '-c', 'feature']);
    await fs.writeFile(path.join(repo, snapshot('color-1')), await image(0xff0000ff));
    await fs.rename(path.join(repo, snapshot('menu-1')), path.join(repo, snapshot('menu-case-4-1')));
    const randomImage = new Jimp(30, 30);
    for (let i = 0; i < randomImage.bitmap.data.length; i++)
        randomImage.bitmap.data[i] = (i * 37 + Math.floor(i / 13)) % 256;
    await fs.writeFile(
        path.join(repo, snapshot('menu-case-4-1')),
        await randomImage.getBufferAsync(Jimp.MIME_PNG)
    );
    await fs.writeFile(path.join(repo, 'README.md'), 'Non-image changes\n');
    await git(repo, ['add', '.']);
    await git(repo, ['commit', '-m', 'Update references and rename a parameterized image']);
    await git(repo, ['switch', 'main']);
    await fs.writeFile(path.join(repo, snapshot('unrelated-1')), await image());
    await git(repo, ['add', '.']);
    await git(repo, ['commit', '-m', 'Unrelated change on main']);
    return {repo, base};
}

test('PR comparisons use the common ancestor and explain file counts versus image pairs', async (t) => {
    const {repo, base} = await fixture(t);
    const comparison = await createComparison(repo, 'main', 'feature');
    assert.equal(comparison.baseSha, base);
    assert.equal(comparison.counts.gitFiles, 4);
    assert.equal(comparison.counts.pngFiles, 3);
    assert.equal(comparison.counts.comparisons, 2);
    assert.equal(
        comparison.items.some((item) => item.before?.path.includes('unrelated')),
        false
    );
    const direct = await createComparison(repo, 'main', 'feature', 'tips');
    assert.equal(
        direct.items.some((item) => item.before?.path.includes('unrelated')),
        true
    );
    await assert.rejects(resolveRevision(repo, '--help'));
    await assert.rejects(resolveRevision(repo, 'main; touch injected'));
    await assert.rejects(fs.access(path.join(repo, 'injected')));
});

test('the local server serves images, saves review marks across restarts and rejects unrelated origins', async (t) => {
    const {repo} = await fixture(t);
    let server = await startServer({repo});
    t.after(() => server.close());
    const post = async (url, body, headers = {}) =>
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', ...headers},
            body: JSON.stringify(body),
        });
    assert.equal(
        (
            await post(
                server.url + '/api/comparisons',
                {base: 'main', head: 'feature'},
                {Origin: 'https://unrelated.example'}
            )
        ).status,
        403
    );
    assert.equal((await fetch(server.url + '/package.json')).status, 404);
    let comparison = await (
        await post(server.url + '/api/comparisons', {base: 'main', head: 'feature'})
    ).json();
    const item = comparison.items.find((candidate) => candidate.type === 'modified');
    assert.equal(
        (await fetch(`${server.url}/api/comparisons/${comparison.id}/${item.id}/before`)).headers.get(
            'content-type'
        ),
        'image/png'
    );
    const marked = await (
        await post(`${server.url}/api/comparisons/${comparison.id}/${item.id}`, {reviewed: true})
    ).json();
    assert.equal(marked.summary.pending, comparison.items.length - 1);
    const cached = await (
        await post(server.url + '/api/comparisons', {base: 'main', head: 'feature'})
    ).json();
    assert.equal(cached.id, comparison.id);
    assert.equal(cached.summary.reviewed, 1);
    await git(repo, ['tag', 'ámbito', 'main']);
    const aliased = await (
        await post(server.url + '/api/comparisons', {base: 'ámbito', head: 'feature'})
    ).json();
    assert.equal(aliased.id, comparison.id);
    assert.equal(aliased.base, 'ámbito');
    assert.equal(aliased.summary.reviewed, 1);
    await server.close();
    server = await startServer({repo});
    comparison = await (await post(server.url + '/api/comparisons', {base: 'main', head: 'feature'})).json();
    assert.equal(comparison.items.find((candidate) => candidate.id === item.id).reviewed, true);
    assert.equal(comparison.summary.reviewed, 1);
    assert.equal(
        (await post(server.url + '/api/comparisons', {base: '--help', head: 'feature'})).status,
        400
    );
});
