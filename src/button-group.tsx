import React from 'react';
import {createUseStyles} from './jss';
import {Inline} from '.';
import {ButtonLink, ButtonLinkProps, ButtonPrimary, ButtonProps, ButtonSecondary} from './button';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    buttonsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    fullWidthLink: {
        marginLeft: -buttonLinkPadding,
        width: '100%',
        marginTop: buttonLayoutSpacing,
    },
}));

export interface ButtonGroupProps {
    primaryButton?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    link?: React.ReactElement<ButtonLinkProps, typeof ButtonLink>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({primaryButton, secondaryButton, link}) => {
    const fullWidthLink = (!!primaryButton && !!secondaryButton) || (!primaryButton && !secondaryButton);

    const classes = useStyles({});

    return (
        <div className={classes.buttonsContainer}>
            <Inline space={buttonLayoutSpacing} alignItems="center">
                {primaryButton}
                {secondaryButton}
                {!fullWidthLink && link}
            </Inline>
            {link && fullWidthLink && <div className={classes.fullWidthLink}>{link}</div>}
        </div>
    );
};

export default ButtonGroup;
