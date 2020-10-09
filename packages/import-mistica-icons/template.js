const template = (
    {template},
    opts,
    {/*imports, interfaces,*/ componentName, /* props, */ jsx /* exports */}
) => {
    const plugins = ['jsx'];

    if (opts.typescript) {
        plugins.push('typescript');
    }

    const typeScriptTemplate = template.smart({plugins});
    return typeScriptTemplate.ast`
        const ${componentName}: React.FC<Props> = ({color, size = 24}) => {
            const {colors} = useTheme();
            const isInverse = useIsInverseVariant();
            const fillColor = color ?? (isInverse ? colors.iconInverse : colors.iconPrimary);

            return ${jsx};
        }

        export default ${componentName};
    `;
};

module.exports = template;
