/* eslint-env browser */
(() => {
    const byId = (id) => document.getElementById(id);
    const format = new Intl.NumberFormat('es', {maximumFractionDigits: 2});
    const labels = {
        modified: 'Modificada',
        prepared: 'Referencia nueva de Playwright',
        added: 'Añadida',
        deleted: 'Eliminada',
        renamed: 'Cambio de ruta o nombre',
    };
    const pageSize = 25;
    let comparison;
    let items = [];
    let filtered = [];
    let activeId;
    let page = 0;
    let generation = 0;
    let timer;
    let version = 0;

    async function api(url, body) {
        const response = await fetch(
            url,
            body === undefined
                ? {}
                : {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)}
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'No se ha podido completar la petición.');
        return result;
    }
    function message(text, error = false) {
        byId('message').textContent = text;
        byId('message').classList.toggle('error', error);
    }
    async function loadBranches(initial = false) {
        const refs = await api('/api/branches');
        byId('branches').replaceChildren(...refs.branches.map((name) => new Option(name, name)));
        if (initial) {
            const query = new URLSearchParams(location.search);
            byId('base').value = query.get('base') || refs.base;
            byId('head').value = query.get('head') || refs.head;
            if (query.get('mode') === 'tips') byId('mode').value = 'tips';
        }
        message(
            `${format.format(refs.branches.length)} ramas disponibles. Elige las dos que quieres comparar.`
        );
    }
    const shortName = (item) =>
        item.title
            .replace(/^.*?-(?:screenshot|ssr-acceptance)-test-tsx-/, '')
            .replace(/-snap$/, '')
            .replaceAll('-', ' ');
    const percentage = (item) => {
        if (!item.metrics) return 'Analizando…';
        const number = item.metrics.ratio * 100;
        return number > 0 && number < 0.01 ? '<0,01 %' : `${format.format(number)} %`;
    };
    function resultLabel(item) {
        if (item.error) return 'Error al comparar';
        if (item.metrics?.different === 0) return 'Mismos píxeles · ' + labels[item.type];
        return labels[item.type] + (item.metrics ? ' · ' + percentage(item) : ' · Analizando…');
    }
    function renderSummary(summary) {
        byId('png-total').textContent = format.format(summary.pngFiles);
        byId('comparison-total').textContent = format.format(summary.comparisons);
        byId('visual-total').textContent = format.format(summary.visualChanges);
        byId('pending-total').textContent = format.format(summary.pending);
        byId('analysis').max = Math.max(1, summary.comparisons);
        byId('analysis').value = summary.analyzed;
        byId('analysis-text').textContent =
            summary.analyzed === summary.comparisons
                ? `Análisis completo · ${format.format(summary.identicalPixels)} con los mismos píxeles${summary.errors ? ` · ${summary.errors} errores` : ''}`
                : `Analizando ${format.format(summary.analyzed)} de ${format.format(summary.comparisons)} · el contador de diferencias visuales aún está calculándose`;
        byId('review-count').textContent =
            `${format.format(summary.reviewed)} revisadas · ${format.format(summary.pending)} pendientes en total`;
        byId('git-summary').textContent =
            `Git: ${format.format(summary.gitFiles)} archivos cambiados en total; ${format.format(summary.pngFiles)} son cambios de archivos PNG de tests. ${summary.pngFiles > summary.comparisons ? `${format.format(summary.pngFiles - summary.comparisons)} pares de altas/bajas se han agrupado para verlos antes y después.` : ''}`;
        byId('revision-summary').textContent =
            `${comparison.base} (${comparison.baseSha.slice(0, 9)}) → ${comparison.head} (${comparison.headSha.slice(0, 9)}). ${comparison.mode === 'branch' ? 'La base de la comparación es el punto común de las dos ramas, como en una PR.' : 'Se comparan directamente las dos versiones elegidas.'}`;
    }
    function setImage(side, available, item) {
        const image = byId(`${side}-image`);
        const missing = byId(`${side}-missing`);
        image.hidden = !available;
        missing.hidden = Boolean(available);
        if (available) {
            const url = `/api/comparisons/${comparison.id}/${item.id}/${side}`;
            if (image.getAttribute('src') !== url) image.src = url;
        } else image.removeAttribute('src');
    }
    const viewInputs = [...document.querySelectorAll('input[name="image-view"]')];
    const overlayPositions = {onion: 50, slide: 50};
    const imageView = () => viewInputs.find((input) => input.checked).value;
    function sizeOverlay(sizes) {
        const width = Math.max(...sizes.map((size) => size[0]));
        const height = Math.max(...sizes.map((size) => size[1]));
        const stage = byId('overlay-stage');
        stage.style.width = `${width}px`;
        stage.style.aspectRatio = `${width} / ${height}`;
        for (const [side, size] of [
            ['before', sizes[0]],
            ['after', sizes[1]],
        ]) {
            byId(`overlay-${side}`).style.width = `${(size[0] / width) * 100}%`;
        }
    }
    function sizeLoadedOverlay() {
        const images = [byId('overlay-before'), byId('overlay-after')];
        if (images.every((image) => image.complete && image.naturalWidth > 0))
            sizeOverlay(images.map((image) => [image.naturalWidth, image.naturalHeight]));
    }
    function updateOverlayPosition() {
        const mode = imageView();
        if (mode === 'grid') return;
        const value = Number(byId('overlay-slider').value);
        overlayPositions[mode] = value;
        byId('overlay-value').textContent = `${value} %`;
        byId('overlay-after-layer').style.opacity = mode === 'onion' ? value / 100 : 1;
        byId('overlay-after-layer').style.clipPath = mode === 'slide' ? `inset(0 0 0 ${value}%)` : 'none';
        byId('overlay-stage').style.setProperty('--divider-position', `${value}%`);
    }
    function renderImageView(item) {
        const available = Boolean(item.before && item.after && !item.error);
        for (const input of viewInputs) input.disabled = input.value !== 'grid' && !available;
        if (!available) viewInputs[0].checked = true;
        const mode = imageView();
        byId('overlay-unavailable').hidden = available;
        byId('image-grid').hidden = mode !== 'grid';
        byId('overlay-view').hidden = mode === 'grid';
        if (mode === 'grid') return;
        const stage = byId('overlay-stage');
        stage.classList.toggle('slide', mode === 'slide');
        stage.classList.toggle('actual-size', byId('actual-size').checked);
        const sizes = [item.metrics?.beforeSize, item.metrics?.afterSize].filter(Boolean);
        if (sizes.length === 2) sizeOverlay(sizes);
        else {
            stage.style.width = '';
            stage.style.aspectRatio = '';
            for (const side of ['before', 'after']) byId(`overlay-${side}`).style.width = '';
        }
        for (const side of ['before', 'after']) {
            const image = byId(`overlay-${side}`);
            const url = `/api/comparisons/${comparison.id}/${item.id}/${side}`;
            if (image.getAttribute('src') !== url) image.src = url;
        }
        sizeLoadedOverlay();
        byId('overlay-slider-label').textContent =
            mode === 'onion' ? 'Opacidad de Después' : 'Posición del separador';
        byId('overlay-help').textContent =
            mode === 'onion'
                ? '0 % muestra Antes; 100 % muestra Después. Ajusta la transparencia para ver los cambios superpuestos.'
                : 'Antes a la izquierda y Después a la derecha. Arrastra sobre la imagen o usa el control para mover el separador.';
        byId('overlay-slider').value = overlayPositions[mode];
        updateOverlayPosition();
    }
    function renderCapture() {
        const index = filtered.findIndex((item) => item.id === activeId);
        const item = filtered[index];
        byId('empty-list').hidden = Boolean(item);
        byId('empty-list').textContent = items.length
            ? 'No hay capturas con estos filtros. Prueba a limpiar los filtros.'
            : 'No hay cambios de capturas entre estas referencias.';
        byId('capture').hidden = !item;
        if (!item) return;
        byId('previous').disabled = index === 0;
        byId('next').disabled = index + 1 === filtered.length;
        byId('mark').textContent = item.reviewed ? 'Marcar como pendiente' : 'Marcar como revisada';
        byId('mark').setAttribute('aria-pressed', String(item.reviewed));
        byId('capture-title').textContent = `${item.suite} · ${shortName(item)}`;
        const metrics = item.metrics;
        byId('capture-description').textContent =
            item.error ||
            (metrics
                ? `${metrics.resized ? 'Dimensiones distintas · ' : ''}${percentage(item)} · ${format.format(metrics.different)} píxeles distintos. Incluye antialiasing.`
                : 'Calculando diferencias de píxeles… Puedes seguir revisando mientras termina el análisis.');
        for (const side of ['before', 'after']) {
            const size = metrics?.[`${side}Size`];
            byId(`${side}-size`).textContent = size ? `${size[0]} × ${size[1]}` : '';
            byId(`${side}-path`).textContent = item[side]?.path || '—';
            setImage(side, Boolean(item[side]), item);
        }
        const sizes = [metrics?.beforeSize, metrics?.afterSize].filter(Boolean);
        byId('diff-size').textContent = sizes.length
            ? `${Math.max(...sizes.map((s) => s[0]))} × ${Math.max(...sizes.map((s) => s[1]))}`
            : '';
        byId('diff-missing').textContent = item.error || '';
        setImage('diff', !item.error, item);
        renderImageView(item);
    }
    function renderList() {
        byId('result-count').textContent =
            `Mostrando ${format.format(filtered.length)} de ${format.format(items.length)} comparaciones`;
        const focusedItem = document.activeElement.closest('#entries button')?.dataset.id;
        const scrollTop = byId('entries').scrollTop;
        byId('entries').replaceChildren(
            ...filtered.slice(page * pageSize, (page + 1) * pageSize).map((item) => {
                const li = document.createElement('li');
                const button = document.createElement('button');
                const title = document.createElement('strong');
                const meta = document.createElement('span');
                button.type = 'button';
                button.dataset.id = item.id;
                button.setAttribute('aria-pressed', String(item.id === activeId));
                title.textContent = `${item.reviewed ? '✓ ' : ''}${item.suite} · ${shortName(item)}`;
                meta.textContent = resultLabel(item);
                button.append(title, meta);
                li.append(button);
                return li;
            })
        );
        byId('entries').scrollTop = scrollTop;
        if (focusedItem)
            [...byId('entries').querySelectorAll('button')]
                .find((button) => button.dataset.id === focusedItem)
                ?.focus({preventScroll: true});
        const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        byId('page-number').textContent = `Página ${page + 1} de ${pages}`;
        byId('previous-page').disabled = page === 0;
        byId('next-page').disabled = page + 1 === pages;
    }
    function select(id) {
        activeId = id;
        const index = filtered.findIndex((item) => item.id === id);
        page = Math.floor(Math.max(index, 0) / pageSize);
        renderList();
        renderCapture();
    }
    function filterItems(preservePage = false) {
        const terms = byId('search').value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const kind = byId('kind').value;
        filtered = items.filter((item) => {
            const key =
                `${item.title} ${item.suite} ${item.before?.path || ''} ${item.after?.path || ''}`.toLowerCase();
            return (
                (!byId('suite').value || item.suite === byId('suite').value) &&
                (!byId('pending').checked || !item.reviewed) &&
                terms.every((term) => key.includes(term)) &&
                (!kind ||
                    (kind === 'identical'
                        ? item.metrics?.different === 0
                        : kind === 'error'
                          ? Boolean(item.error)
                          : item.type === kind))
            );
        });
        filtered.sort(
            (a, b) =>
                (byId('sort').value === 'impact' ? (b.metrics?.ratio ?? -1) - (a.metrics?.ratio ?? -1) : 0) ||
                a.suite.localeCompare(b.suite) ||
                a.title.localeCompare(b.title, 'es', {numeric: true})
        );
        if (!filtered.some((item) => item.id === activeId)) activeId = filtered[0]?.id;
        const index = filtered.findIndex((item) => item.id === activeId);
        if (!preservePage || index < 0) page = index >= 0 ? Math.floor(index / pageSize) : 0;
        page = Math.min(page, Math.max(0, Math.ceil(filtered.length / pageSize) - 1));
        renderList();
        renderCapture();
    }
    async function poll(ownGeneration) {
        if (ownGeneration !== generation) return;
        try {
            const data = await api(`/api/comparisons/${comparison.id}?since=${version}`);
            if (ownGeneration !== generation) return;
            const updates = new Map(data.updates.map((item) => [item.id, item]));
            items = items.map((item) => updates.get(item.id) || item);
            version = data.version;
            renderSummary(data.summary);
            filterItems(true);
            if (!data.complete) timer = setTimeout(() => poll(ownGeneration), 900);
            else if (!byId('message').classList.contains('error'))
                message('Comparación lista. Análisis de píxeles completo.');
        } catch (error) {
            message(error.message, true);
        }
    }
    byId('comparison-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        clearTimeout(timer);
        const ownGeneration = ++generation;
        byId('compare').disabled = true;
        message('Leyendo los cambios de Git…');
        try {
            const data = await api('/api/comparisons', {
                base: byId('base').value.trim(),
                head: byId('head').value.trim(),
                mode: byId('mode').value,
            });
            if (ownGeneration !== generation) return;
            comparison = data;
            items = data.items;
            version = data.version;
            activeId = items[0]?.id;
            page = 0;
            document.body.classList.add('has-comparison');
            byId('welcome').hidden = true;
            byId('review').hidden = false;
            const suites = [...new Set(items.map((item) => item.suite))].sort();
            byId('suite').replaceChildren(
                new Option('Todas', ''),
                ...suites.map((suite) => new Option(suite, suite))
            );
            for (const id of ['search', 'kind']) byId(id).value = '';
            byId('pending').checked = false;
            renderSummary(data.summary);
            filterItems();
            const url = new URL(location.href);
            for (const key of ['base', 'head', 'mode']) url.searchParams.set(key, data[key]);
            history.replaceState(null, '', url);
            message(
                items.length
                    ? data.complete
                        ? 'Comparación lista. Análisis de píxeles completo.'
                        : 'Comparación lista. El análisis de píxeles continúa en segundo plano.'
                    : 'No hay cambios de capturas entre estas referencias.'
            );
            if (!data.complete) timer = setTimeout(() => poll(ownGeneration), 900);
        } catch (error) {
            message(error.message, true);
        } finally {
            byId('compare').disabled = false;
        }
    });
    byId('refresh').addEventListener('click', () =>
        loadBranches().catch((error) => message(error.message, true))
    );
    for (const id of ['search', 'suite', 'kind', 'sort', 'pending'])
        byId(id).addEventListener('input', () => filterItems());
    byId('clear-filters').addEventListener('click', () => {
        for (const id of ['search', 'suite', 'kind']) byId(id).value = '';
        byId('pending').checked = false;
        byId('sort').value = 'name';
        filterItems();
    });
    byId('entries').addEventListener('click', (event) => {
        const button = event.target.closest('button[data-id]');
        if (button) select(button.dataset.id);
    });
    [
        ['previous', -1],
        ['next', 1],
    ].forEach(([button, direction]) => {
        byId(button).addEventListener('click', () => {
            const index = filtered.findIndex((item) => item.id === activeId);
            if (filtered[index + direction]) select(filtered[index + direction].id);
        });
    });
    [
        ['previous-page', -1],
        ['next-page', 1],
    ].forEach(([button, direction]) => {
        byId(button).addEventListener('click', () => {
            page += direction;
            renderList();
        });
    });
    byId('mark').addEventListener('click', async () => {
        const item = items.find((candidate) => candidate.id === activeId);
        if (!item) return;
        byId('mark').disabled = true;
        try {
            const data = await api(`/api/comparisons/${comparison.id}/${item.id}`, {
                reviewed: !item.reviewed,
            });
            item.reviewed = data.reviewed;
            renderSummary(data.summary);
            filterItems();
        } catch (error) {
            message(error.message, true);
        } finally {
            byId('mark').disabled = false;
        }
    });
    byId('actual-size').addEventListener('input', () => {
        byId('image-grid').classList.toggle('actual-size', byId('actual-size').checked);
        byId('overlay-stage').classList.toggle('actual-size', byId('actual-size').checked);
    });
    viewInputs.forEach((input) =>
        input.addEventListener('change', () => {
            const item = items.find((candidate) => candidate.id === activeId);
            if (item) renderImageView(item);
        })
    );
    byId('overlay-slider').addEventListener('input', updateOverlayPosition);
    for (const side of ['before', 'after'])
        byId(`overlay-${side}`).addEventListener('load', sizeLoadedOverlay);
    const moveDivider = (event) => {
        const bounds = byId('overlay-stage').getBoundingClientRect();
        const position = Math.round(((event.clientX - bounds.left) / bounds.width) * 100);
        byId('overlay-slider').value = Math.max(0, Math.min(100, position));
        updateOverlayPosition();
    };
    byId('overlay-stage').addEventListener('pointerdown', (event) => {
        if (imageView() !== 'slide' || event.button !== 0) return;
        event.preventDefault();
        byId('overlay-stage').setPointerCapture(event.pointerId);
        moveDivider(event);
    });
    byId('overlay-stage').addEventListener('pointermove', (event) => {
        if (imageView() === 'slide' && byId('overlay-stage').hasPointerCapture(event.pointerId))
            moveDivider(event);
    });
    document.addEventListener('keydown', (event) => {
        if (
            event.target.matches('input,select,textarea,button') ||
            event.target.isContentEditable ||
            !comparison
        )
            return;
        if (event.key === 'ArrowLeft' && !byId('previous').disabled) {
            event.preventDefault();
            byId('previous').click();
        }
        if (event.key === 'ArrowRight' && !byId('next').disabled) {
            event.preventDefault();
            byId('next').click();
        }
        if (event.key.toLowerCase() === 'r' && !byId('mark').disabled) {
            event.preventDefault();
            byId('mark').click();
        }
    });
    loadBranches(true).catch((error) => message(error.message, true));
})();
