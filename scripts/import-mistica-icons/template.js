// https://react-svgr.com/docs/custom-templates/#custom-templates

function defaultTemplate({template}, opts, {imports, interfaces, componentName, props: ppp, jsx, exports}) {
    const plugins = ['jsx'];

    if (opts.typescript) {
        plugins.push('typescript');
    }

    const typeScriptTpl = template.smart({plugins});

    console.log(jsx);

    const props = {
        type: 'Identifier',
        identifierName: 'props',
        name: 'props',
    };

    console.log(props);

    return typeScriptTpl.ast`${imports}

        ${interfaces}


        type Props = {
            color: string,
            size: number,
            role?: string,
            className: string,
        }

        const ${componentName}: React.FC<Props> = (${props}) => {
            return ${jsx};
        }

        ${exports}
    `;
}
module.exports = defaultTemplate;

// const ${componentName}: React.FC<Props> = ({role= 'presentation', size = 24, ...props}) => {
