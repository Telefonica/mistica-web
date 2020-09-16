const template = ({template}, opts, {imports, interfaces, componentName, /* props, */ jsx, exports}) => {
    const plugins = ['jsx'];

    if (opts.typescript) {
        plugins.push('typescript');
    }

    const typeScriptTemplate = template.smart({plugins});
    return typeScriptTemplate.ast`${imports}
        import {useIsInverseVariant, useTheme} from '../..';

        ${interfaces}

        type Props = {
            color?: string,
            size?: number,
        }

        const ${componentName}: React.FC<Props> = ({color, size}) => {
            const {colors} = useTheme();
            const isInverse = useIsInverseVariant();
            const fillColor = color ?? (isInverse ? colors.iconInverse : colors.iconPrimary);

            return ${jsx};
        }

        ${exports}
    `;
};

module.exports = template;
