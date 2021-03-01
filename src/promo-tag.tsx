import * as React from 'react';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {Text} from './text';

const useStyles = createUseStyles((theme) => ({
    tag: {
        backgroundColor: theme.colors.backgroundPromo,
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
};

const PromoTag: React.FC<Props> = ({children}) => {
    const classes = useStyles();
    const {colors} = useTheme();
    return (
        <span className={classes.tag}>
            <Text color={colors.textPrimaryInverse} size={12} lineHeight={16} weight="regular" uppercase>
                {children}
            </Text>
        </span>
    );
};

export default PromoTag;
