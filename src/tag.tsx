import * as React from 'react';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {Text} from './text';
import {ThemeVariant} from './theme-variant-context';
import {applyAlpha} from './utils/color';

const useStyles = createUseStyles(() => ({
    tag: {
        backgroundColor: ({color}) => applyAlpha(color, 0.1),
        padding: '8px 13px',
        borderRadius: 50,
        minWidth: 48,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

type Props = {
    children: string;
    color: string;
};

const Tag: React.FC<Props> = ({children, color}) => {
    const classes = useStyles({color});
    const {colors, isDarkMode} = useTheme();
    // Hardcode black text in darkmode because there isn't a black text color constant that we can use in dark mode
    const blackText = isDarkMode ? '#313235' : colors.textPrimary;
    const textColor = color === colors.textPrimary ? blackText : colors.textPrimary;
    return (
        <span className={classes.tag}>
            <ThemeVariant isInverse={false}>
                <Text color={color} size={14} lineHeight={16} weight="medium">
                    {children}
                </Text>
            </ThemeVariant>
        </span>
    );
};

export default Tag;
