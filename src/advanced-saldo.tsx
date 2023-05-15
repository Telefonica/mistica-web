import * as React from 'react';
import Text2, { Text3, Text5, Text8 } from './text';
import { vars } from './skins/skin-contract.css';
import Box from './box';

interface saltoCardProps {
    title?: string;
    value?: string;
    subtitle?: string;
    description?: string;
}

export const AdvancedSaldo: React.FC<saltoCardProps> = ({ title, value, subtitle, description }) => {
    return (
        <Box>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Text3 regular color={vars.colors.textPrimary}>
                    {title}
                </Text3>
                <Text8 color={vars.colors.brand}>{value}</Text8>
                <Text2 lineHeight={20} color={vars.colors.textSecondary}>
                    {subtitle}
                </Text2>
                <Text2 lineHeight={20} color={vars.colors.textSecondary}>
                    {description}
                </Text2>
            </div>
        </Box>
    );
};

export default AdvancedSaldo;
