import * as React from 'react';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {Text} from './text';
import {ThemeVariant} from './theme-variant-context';

const useStyles = createUseStyles(() => ({
    tag: {
        backgroundColor: ({color}) => color,
        padding: '2px 8px',
        borderRadius: 2,
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
    const textColor = color === colors.inverse ? blackText : colors.textPrimaryInverse;
    return (
        <span className={classes.tag}>
            <ThemeVariant isInverse={false}>
                <Text color={textColor} size={12} lineHeight={16} weight="regular" uppercase>
                    {children}
                </Text>
            </ThemeVariant>
        </span>
    );
};

export default Tag;
