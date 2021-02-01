import * as React from 'react';
import {Text8} from './text';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';

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
            <Text8 color={colors.textPrimaryInverse} regular uppercase>
                {children}
            </Text8>
        </span>
    );
};

export default PromoTag;
