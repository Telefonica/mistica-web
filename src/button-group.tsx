import React from 'react';
import {createUseStyles} from './jss';
import {Inline} from '.';
import {ButtonLink, ButtonLinkProps, ButtonPrimary, ButtonProps, ButtonSecondary} from './button';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    fullWidthLink: {
        marginLeft: -buttonLinkPadding,
        width: '100%',
        marginTop: ({bothButtons}) => (bothButtons ? buttonLayoutSpacing : 0),
    },
}));

export interface ButtonGroupProps {
    primaryButton?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    link?: React.ReactElement<ButtonLinkProps, typeof ButtonLink>;
}

interface Props extends ButtonGroupProps {
    className?: string;
}

const ButtonGroup: React.FC<Props> = ({primaryButton, secondaryButton, link, className}) => {
    const anyButton = !!primaryButton || !!secondaryButton;
    const bothButtons = !!primaryButton && !!secondaryButton;

    const classes = useStyles({bothButtons});

    return (
        <div className={className}>
            {anyButton && (
                <Inline space={buttonLayoutSpacing} alignItems="center">
                    {primaryButton}
                    {secondaryButton}
                    {!bothButtons && link}
                </Inline>
            )}
            {link && (bothButtons || !anyButton) && <div className={classes.fullWidthLink}>{link}</div>}
        </div>
    );
};

export default ButtonGroup;
