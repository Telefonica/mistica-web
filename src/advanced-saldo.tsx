import * as React from 'react';
import { Text2, Text8 } from './text';
import { vars } from './skins/skin-contract.css';

interface saltoCardProps {
    title?: string;
    value?: string;
    subtitle?: string;
    description?: string;
}

export const AdvancedSaldo: React.FC<saltoCardProps> = ({ title, value, subtitle, description }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Text2 regular color={vars.colors.textPrimary}>
                {title}
            </Text2>
            <Text8 color={vars.colors.brand}>{value}</Text8>
            <Text2 regular color={vars.colors.textSecondary}>
                {subtitle}
            </Text2>
            <Text2 regular color={vars.colors.textSecondary}>
                {description}
            </Text2>
        </div>
    );
};

export default AdvancedSaldo;
