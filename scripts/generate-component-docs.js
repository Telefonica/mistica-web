const docgen = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');
const {categories} = require('../doc/components/component-categories');

const ROOT = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT, 'src/index.tsx');
const COMMUNITY_INDEX_FILE = path.join(ROOT, 'src/community/index.tsx');
const TSCONFIG = path.join(ROOT, 'tsconfig.json');
const REFERENCE_DIR = path.join(ROOT, 'skills', 'mistica-react', 'references');
const COMPONENTS_DIR = path.join(REFERENCE_DIR, 'components');
const INDEX_OUTPUT = path.join(REFERENCE_DIR, 'COMPONENTS.md');
const DESIGN_DOCS_DIR = path.join(ROOT, 'doc', 'components');

function resolveFile(relPath, baseDir = path.join(ROOT, 'src')) {
    const base = path.resolve(baseDir, relPath);
    for (const ext of ['.tsx', '.ts']) {
        const full = base + ext;
        if (fs.existsSync(full)) return full;
    }
    return null;
}

// Extract exported component names and source file paths from barrel export
function getExportedComponents() {
    const files = new Set();
    const exportedNames = new Set();
    const nameMap = new Map();

    function addMapping(filePath, internalName, exportedName) {
        if (!nameMap.has(filePath)) nameMap.set(filePath, new Map());
        nameMap.get(filePath).set(internalName.toLowerCase(), exportedName);
    }

    function parseBarrelExports(indexFile, baseDir) {
        const content = fs.readFileSync(indexFile, 'utf-8');

        const exportRegex = /export\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/gs;
        const starExportRegex = /export\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;

        let match;
        while ((match = exportRegex.exec(content)) !== null) {
            const namesStr = match[1];
            const relPath = match[2];

            if (relPath.includes('generated/mistica-icons')) continue;

            const prefix = content.slice(Math.max(0, match.index - 10), match.index + 7);
            if (/export\s+type\s+\{/.test(prefix)) continue;

            const filePath = resolveFile(relPath, baseDir);
            if (filePath) files.add(filePath);

            const names = namesStr.split(',');
            for (let name of names) {
                name = name.replace(/\/\*.*?\*\//gs, '').trim();
                if (!name || name.startsWith('type ') || name === '') continue;

                const aliasMatch = name.match(/(\w+)\s+as\s+(\w+)/);
                if (aliasMatch) {
                    const [, internalName, exportedName] = aliasMatch;
                    exportedNames.add(exportedName);
                    if (filePath) addMapping(filePath, internalName, exportedName);
                } else if (/^\w+$/.test(name)) {
                    exportedNames.add(name);
                    if (filePath) addMapping(filePath, name, name);
                }
            }
        }

        while ((match = starExportRegex.exec(content)) !== null) {
            exportedNames.add(match[1]);
            const relPath = match[2];
            if (relPath.includes('generated/mistica-icons')) continue;
            const filePath = resolveFile(relPath, baseDir);
            if (filePath) files.add(filePath);
        }
    }

    parseBarrelExports(INDEX_FILE, path.join(ROOT, 'src'));
    parseBarrelExports(COMMUNITY_INDEX_FILE, path.join(ROOT, 'src', 'community'));

    return {files: [...files], exportedNames, nameMap};
}

function escapeMarkdown(str) {
    return str.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function truncateType(typeStr, maxLen = 200) {
    if (typeStr.length <= maxLen) return typeStr;
    return typeStr.slice(0, maxLen - 3) + '...';
}

function simplifyType(typeStr) {
    const reactNodePattern =
        /^(?:null \| )?(?:string \| )?(?:number \| )?(?:bigint \| )?(?:boolean \| )?(?:ReactElement|ReactPortal|Iterable|Promise)/;
    if (
        reactNodePattern.test(typeStr) &&
        typeStr.includes('ReactElement') &&
        !typeStr.includes('kind:') &&
        !typeStr.includes('kind?:')
    ) {
        if (!typeStr.includes('{ ')) {
            return 'ReactNode';
        }
        typeStr = typeStr.replace(
            /null \| string \| number \| bigint \| (?:false \| true|boolean) \| ReactElement<[^>]*>(?:\s*\|\s*(?:Iterable|ReactPortal|Promise)<[^>]*>)*/g,
            'ReactNode'
        );
    }

    typeStr = typeStr.replace(/\bfalse \| true\b/g, 'boolean');
    typeStr = typeStr.replace(/\btrue \| false\b/g, 'boolean');
    typeStr = typeStr.replace(/ReactElement<unknown, string \| JSXElementConstructor<any>>/g, 'ReactElement');
    typeStr = typeStr.replace(
        /null \| string \| number \| bigint \| boolean \| ReactElement \| Iterable<ReactNode> \| ReactPortal \| Promise<AwaitedReactNode>/g,
        'ReactNode'
    );

    typeStr = typeStr.replace(/ReactComponentElement<[^>]*?(\w+)Props[^]*?(?:>>>|>>)/g, 'RendersElement<$1>');
    typeStr = typeStr.replace(
        /RendersElement<ForwardRefExoticComponent<(\w+)Props[^>]*>>/g,
        'RendersElement<$1>'
    );
    typeStr = typeStr.replace(/RendersElement<(\w+)>>/g, 'RendersElement<$1>');
    typeStr = typeStr.replace(/(Renders(?:Nullable)?Element<\w+>),\s*Pick<[^>]*(?:>>>|>>|>)/g, '$1');
    typeStr = typeStr.replace(/(Renders(?:Nullable)?Element<\w+>)[>,\s]+Pick<.*$/g, '$1');
    typeStr = typeStr.replace(/(Renders(?:Nullable)?Element<\w+>)[>,\s]+"[^"]*".*$/g, '$1');
    typeStr = typeStr.replace(
        /ReactComponentElement<\([^)]+\)\s*=>\s*\w+,\s*Pick<[^>]+>>/g,
        'RendersElement<StackingGroup>'
    );
    typeStr = typeStr.replace(/null \| RendersElement<(\w+)>/g, 'RendersNullableElement<$1>');
    typeStr = typeStr.replace(
        /null \| string \| RendersElement<(\w+)>/g,
        'string | RendersNullableElement<$1>'
    );
    typeStr = typeStr.replace(/ExclusifyUnion<(.+)>/s, '$1');

    const parts = typeStr.split(' | ');
    if (parts.length > 2) {
        const seen = new Set();
        const deduped = [];
        for (const part of parts) {
            const trimmed = part.trim();
            if (!seen.has(trimmed)) {
                seen.add(trimmed);
                deduped.push(trimmed);
            }
        }
        if (deduped.length < parts.length) {
            typeStr = deduped.join(' | ');
        }
    }

    return typeStr;
}

const NAMED_TYPE_REPLACEMENTS = [
    {
        match: (raw) =>
            raw.includes('Readonly<Skin>') && raw.includes('colorScheme') && raw.includes('locale'),
        replace: 'ThemeConfig',
    },
    {
        match: (raw) => raw.includes('IconButtonProps') && raw.includes('ToggleIconButtonProps'),
        replace: 'IconButtonProps | ToggleIconButtonProps',
    },
];

function formatType(prop) {
    const raw = prop.type.raw || prop.type.name || '';

    for (const rule of NAMED_TYPE_REPLACEMENTS) {
        if (rule.match(raw)) {
            return escapeMarkdown(rule.replace);
        }
    }

    const knownTypes = ['ReactNode', 'ReactElement', 'CSSProperties'];
    if (knownTypes.includes(raw)) {
        return raw;
    }

    let display = raw;
    if (prop.type.name === 'enum' && prop.type.value) {
        const values = prop.type.value.map((v) => v.value).join(' | ');
        display = simplifyType(values || raw);
    } else {
        display = simplifyType(display);
    }

    return truncateType(escapeMarkdown(display));
}

function toKebabCase(name) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
}

// Build a cache of design doc sections from grouped category files
// Returns Map<componentName, { description: string, body: string }>
function buildDesignDocCache() {
    const cache = new Map();
    const files = fs.existsSync(DESIGN_DOCS_DIR)
        ? fs.readdirSync(DESIGN_DOCS_DIR).filter((f) => f.endsWith('.md'))
        : [];

    // Build lookup: file slug -> number of components in that category
    const singleComponentCategories = new Map();
    for (const [slug, cat] of Object.entries(categories)) {
        if (cat.components.length === 1) {
            singleComponentCategories.set(slug, cat.components[0]);
        }
    }

    for (const file of files) {
        const slug = path.basename(file, '.md');
        const content = fs.readFileSync(path.join(DESIGN_DOCS_DIR, file), 'utf-8');

        // Strip YAML frontmatter
        let body = content;
        if (content.startsWith('---')) {
            const endIdx = content.indexOf('---', 3);
            if (endIdx !== -1) {
                body = content.slice(endIdx + 3).trim();
            }
        }

        // Single-component category: use the component name from categories
        // and treat the entire file body (after H1) as the component content
        const singleComponentName = singleComponentCategories.get(slug);
        if (singleComponentName) {
            // Strip the # H1 line
            const afterH1 = body.replace(/^#\s+.+\n?/, '').trim();

            // Extract description (first paragraph before any heading)
            const descMatch = afterH1.match(/^([^#\n][^\n]*(?:\n[^#\n][^\n]*)*)/);
            const description = descMatch ? descMatch[1].trim() : '';
            const bodyAfterDesc = description ? afterH1.slice(description.length).trim() : afterH1;

            cache.set(singleComponentName, {description, body: bodyAfterDesc});
            continue;
        }

        // Multi-component category: split by ## headings
        const sections = body.split(/^## /m);

        for (const section of sections) {
            if (!section.trim()) continue;

            const lines = section.split('\n');
            const heading = lines[0].trim();
            if (!heading || heading.startsWith('#')) continue; // Skip the # Category title

            const sectionBody = lines.slice(1).join('\n').trim();

            // Extract description (first paragraph before any heading)
            const descMatch = sectionBody.match(/^([^#\n][^\n]*(?:\n[^#\n][^\n]*)*)/);
            const description = descMatch ? descMatch[1].trim() : '';

            // The rest is the body (Usage, Use for, Don't use for sections)
            const bodyAfterDesc = description ? sectionBody.slice(description.length).trim() : sectionBody;

            cache.set(heading, {description, body: bodyAfterDesc});
        }
    }

    return cache;
}

// Generate props table markdown for a component
function generatePropsSection(doc, {propsHeadingLevel = 3} = {}) {
    const props = Object.values(doc.props);
    if (props.length === 0) return '';

    const heading = '#'.repeat(propsHeadingLevel);
    let md = `${heading} Props\n\n`;
    md += `| Prop | Type | Required | Default | Description |\n`;
    md += `|------|------|----------|---------|-------------|\n`;

    const sorted = props.sort((a, b) => {
        if (a.required !== b.required) return a.required ? -1 : 1;
        return a.name.localeCompare(b.name);
    });

    for (const prop of sorted) {
        const type = formatType(prop);
        const required = prop.required ? 'Yes' : 'No';
        const defaultVal =
            prop.defaultValue != null ? escapeMarkdown(String(prop.defaultValue.value ?? '')) : '-';
        const desc = prop.description ? escapeMarkdown(prop.description) : '';
        md += `| ${prop.name} | \`${type}\` | ${required} | ${defaultVal} | ${desc} |\n`;
    }

    return md;
}

function main() {
    const {files, exportedNames, nameMap} = getExportedComponents();
    console.log(`Found ${files.length} source files to parse (excluding icons)`);
    console.log(`Found ${exportedNames.size} exported names`);

    const parser = docgen.withCustomConfig(TSCONFIG, {
        savePropValueAsString: true,
        shouldExtractLiteralValuesFromEnum: true,
        shouldExtractValuesFromUnion: true,
        shouldRemoveUndefinedFromOptional: true,
        propFilter: (prop) => {
            if (prop.parent && prop.parent.fileName.includes('node_modules')) {
                return false;
            }
            return true;
        },
    });

    console.log('Parsing components...');
    const allDocs = [];
    const failures = [];

    for (const file of files) {
        try {
            const docs = parser.parse(file);
            for (const doc of docs) {
                allDocs.push(doc);
            }
        } catch (err) {
            failures.push({file: path.relative(ROOT, file), error: err.message});
        }
    }

    // Build a case-insensitive lookup for exported names
    const exportedNamesLower = new Map();
    for (const name of exportedNames) {
        exportedNamesLower.set(name.toLowerCase(), name);
    }

    // Build set of explicitly named (non-default) exports per file for disambiguation
    const explicitNamesPerFile = new Map();
    for (const [filePath, fileMap] of nameMap) {
        const explicit = new Set();
        for (const [internalLower] of fileMap) {
            if (internalLower !== 'default') {
                explicit.add(internalLower);
            }
        }
        explicitNamesPerFile.set(filePath, explicit);
    }

    // Filter to only components that are actually exported from the barrel
    const exportedDocs = [];
    const skipped = [];
    for (const doc of allDocs) {
        const fileMap = nameMap.get(doc.filePath);
        const docNameLower = doc.displayName.toLowerCase();

        let mappedName = fileMap && fileMap.get(docNameLower);

        if (!mappedName && fileMap && fileMap.has('default')) {
            const explicit = explicitNamesPerFile.get(doc.filePath);
            if (!explicit || !explicit.has(docNameLower)) {
                mappedName = fileMap.get('default');
            }
        }

        if (!mappedName) {
            mappedName = exportedNamesLower.get(docNameLower);
        }

        if (mappedName) {
            doc.displayName = mappedName;
            exportedDocs.push(doc);
        } else {
            skipped.push(doc);
        }
    }

    // Deduplicate by displayName (keep the one with more props)
    const deduped = new Map();
    for (const doc of exportedDocs) {
        const existing = deduped.get(doc.displayName);
        if (!existing || Object.keys(doc.props).length > Object.keys(existing.props).length) {
            deduped.set(doc.displayName, doc);
        }
    }
    const dedupedDocs = [...deduped.values()];

    console.log(
        `Parsed ${allDocs.length} components, kept ${dedupedDocs.length} exported (${exportedDocs.length} before dedup), skipped ${skipped.length} internal`
    );

    if (skipped.length > 0) {
        console.log('\n--- Skipped internal components ---');
        for (const d of skipped) {
            console.log(`  ${d.displayName} (${path.relative(ROOT, d.filePath)})`);
        }
    }

    if (failures.length > 0) {
        console.log('\n--- Parse Failures ---');
        for (const f of failures) {
            console.log(`  ${f.file}: ${f.error}`);
        }
    }

    // Build docgen lookup by component name
    const docsByName = new Map();
    for (const doc of dedupedDocs) {
        docsByName.set(doc.displayName, doc);
    }

    // Build design doc cache from grouped files
    const designDocCache = buildDesignDocCache();
    console.log(`\nDesign doc sections loaded: ${designDocCache.size}`);

    // Create output directories
    if (!fs.existsSync(COMPONENTS_DIR)) {
        fs.mkdirSync(COMPONENTS_DIR, {recursive: true});
    }

    // Clean old individual component files
    const existingFiles = fs.readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith('.md'));
    for (const f of existingFiles) {
        fs.unlinkSync(path.join(COMPONENTS_DIR, f));
    }

    // Build reverse lookup: componentName -> categorySlug
    const componentToCategory = new Map();
    for (const [slug, cat] of Object.entries(categories)) {
        for (const comp of cat.components) {
            componentToCategory.set(comp, slug);
        }
    }

    // Find components not assigned to any category
    const allComponentNames = new Set([...docsByName.keys(), ...designDocCache.keys()]);
    const unassigned = [];
    for (const name of allComponentNames) {
        if (!componentToCategory.has(name)) {
            unassigned.push(name);
        }
    }
    if (unassigned.length > 0) {
        console.log(`\n--- Components not in any category (${unassigned.length}) ---`);
        for (const name of unassigned.sort()) {
            console.log(`  ${name}`);
        }
    }

    // Write grouped category files
    let totalComponents = 0;
    const categoryEntries = []; // For the index

    for (const [slug, cat] of Object.entries(categories)) {
        let md = `# ${cat.title}\n\n`;
        let categoryComponentCount = 0;

        const isSingleComponent = cat.components.length === 1;

        for (const compName of cat.components) {
            const doc = docsByName.get(compName);
            const designDoc = designDocCache.get(compName);

            // Skip components with no docgen data and no design doc
            if (!doc && !designDoc) continue;

            if (!isSingleComponent) {
                md += `## ${compName}\n\n`;
            }
            categoryComponentCount++;

            // Add design doc content (description + usage)
            if (designDoc) {
                if (designDoc.description) {
                    md += `${designDoc.description}\n\n`;
                }
                if (designDoc.body) {
                    md += `${designDoc.body}\n\n`;
                }
            } else if (doc && doc.description) {
                md += `${escapeMarkdown(doc.description)}\n\n`;
            }

            // Add deprecation notice
            if (doc && doc.tags && doc.tags.deprecated) {
                md += `> **Deprecated**: ${doc.tags.deprecated}\n\n`;
            }

            // Add props table
            if (doc) {
                const propsSection = generatePropsSection(doc, {
                    propsHeadingLevel: isSingleComponent ? 2 : 3,
                });
                if (propsSection) {
                    md += propsSection + '\n';
                }
            }
        }

        if (categoryComponentCount > 0) {
            const filePath = path.join(COMPONENTS_DIR, `${slug}.md`);
            fs.writeFileSync(filePath, md.trimEnd() + '\n', 'utf-8');
            totalComponents += categoryComponentCount;
            categoryEntries.push({slug, title: cat.title, components: cat.components});
        }
    }

    console.log(
        `Written ${Object.keys(categories).length} category files (${totalComponents} components) to ${path.relative(ROOT, COMPONENTS_DIR)}/`
    );

    // Generate compact index file
    let index = `# Components\n\n`;
    index += `Component reference for Mística React. Components are grouped by category in \`components/\`.\n\n`;

    for (const entry of categoryEntries) {
        index += `## [${entry.title}](components/${entry.slug}.md)\n\n`;
        const compLinks = entry.components
            .filter((name) => docsByName.has(name) || designDocCache.has(name))
            .map((name) => {
                const anchor = name.toLowerCase();
                const desc = designDocCache.get(name)?.description || '';
                return desc
                    ? `- [${name}](components/${entry.slug}.md#${anchor}) — ${escapeMarkdown(desc)}`
                    : `- [${name}](components/${entry.slug}.md#${anchor})`;
            });
        index += compLinks.join('\n') + '\n\n';
    }

    fs.writeFileSync(INDEX_OUTPUT, index.trimEnd() + '\n', 'utf-8');
    console.log(`Written index to ${path.relative(ROOT, INDEX_OUTPUT)}`);
}

main();
