import * as React from 'react';
import Text2, {Text3, Text5, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import * as styles from './advanced-saldo.css';
import classNames from 'classnames';

interface saltoCardProps {
    title?: string;
    value?: string;
    subtitle?: string;
    description?: string;
    mainValue?: string;
    secundaryValue?: string;
}

export const AdvancedSaldo: React.FC<saltoCardProps> = ({
    title,
    value,
    subtitle,
    description,
    secundaryValue,
    mainValue,
}) => {
    return (
        <>
            <div className={styles.column}>
                <Text3 regular color={vars.colors.textPrimary}>
                    {title}
                </Text3>
                <Text8 color={vars.colors.brand}>{value}</Text8>
            </div>
            <div className={styles.container}>
                <div className={styles.column}>
                    <Text2 color={vars.colors.textSecondary}>{subtitle}</Text2>
                    <Text2 color={vars.colors.textSecondary}>{description}</Text2>
                </div>
                <div className={classNames(styles.column, styles.secundaryContainer)}>
                    <Text2 color={vars.colors.textSecondary}>{secundaryValue}</Text2>
                    <Text5 color={vars.colors.brand}>{mainValue}</Text5>
                </div>
            </div>
        </>
    );
};

export default AdvancedSaldo;
