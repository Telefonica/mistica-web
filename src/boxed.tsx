import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

type StylesProps = {
    isInverse: boolean;
};

const useStyles = createUseStyles(({colors}) => ({
    boxed: {
        border: ({isInverse}: StylesProps) => (isInverse ? '0' : `1px solid ${colors.border}`),
        borderRadius: 4,
        overflow: 'hidden',
    },
}));

type Props = {
    children: React.ReactNode;
    className?: string;
    role?: string;
    'data-testid'?: string;
    'data-qsysid'?: string;
};

export const Boxed: React.FC<Props> = ({children, className, role, ...dataProps}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse} as StylesProps);

    return (
        <div className={classNames(className, classes.boxed)} role={role} {...dataProps}>
            {children}
        </div>
    );
};
