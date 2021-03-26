import * as React from 'react';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {Text} from './text';

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
    const {colors} = useTheme();
    const textColor = color === colors.inverse ? colors.textPrimary : colors.textPrimaryInverse;
    return (
        <span className={classes.tag}>
            <Text color={textColor} size={12} lineHeight={16} weight="regular" uppercase>
                {children}
            </Text>
        </span>
    );
};

export default Tag;
