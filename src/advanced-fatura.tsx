import * as React from 'react';
import Text2, {Text3, Text5, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import * as styles from './advanced-fatura.css';
import classNames from 'classnames';
import Box from './box';
import Inline from './inline';

interface faturaCardProps {
    title?: string;
    subtitle?: string;
    description?: string;
    mainValue?: string;
    secundaryValue?: string;
}

export const AdvancedFatura: React.FC<faturaCardProps> = ({
    title,
    subtitle,
    description,
    secundaryValue,
    mainValue,
}) => {
    return (
        <>
            <div className={styles.column}></div>
            <Box>
                <Inline space={'between'} alignItems="flex-end">
                    <div className={styles.column}>
                        <Text3 regular color={vars.colors.textPrimary}>
                            {title}
                        </Text3>
                        <Text2 lineHeight={20} color={vars.colors.textSecondary}>
                            {subtitle}
                        </Text2>
                        <Text2 lineHeight={20} color={vars.colors.textSecondary}>
                            {description}
                        </Text2>
                    </div>
                    <div className={classNames(styles.column, styles.secundaryContainer)}>
                        <Text2 color={vars.colors.textSecondary}>{secundaryValue}</Text2>
                        <Text5 color={vars.colors.brand}>{mainValue}</Text5>
                    </div>
                </Inline>
            </Box>
        </>
    );
};

export default AdvancedFatura;
