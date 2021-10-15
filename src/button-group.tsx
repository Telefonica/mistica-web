import React from 'react';
import {createUseStyles} from './jss';
import {ButtonLink, ButtonLinkProps, ButtonPrimary, ButtonProps, ButtonSecondary} from './button';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    inline: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: -buttonLayoutSpacing,
        marginLeft: -buttonLayoutSpacing - buttonLinkPadding,
        '& > div': {
            marginTop: buttonLayoutSpacing,
            marginLeft: buttonLayoutSpacing + buttonLinkPadding,
        },
        '& > div.link': {
            marginLeft: buttonLayoutSpacing,
            width: ({bothButtons}) => (bothButtons ? '100%' : 'auto'),
        },
    },
    followedByButton: {
        marginRight: -buttonLinkPadding,
    },
}));

export interface ButtonGroupProps {
    primaryButton?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    link?: React.ReactElement<ButtonLinkProps, typeof ButtonLink>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({primaryButton, secondaryButton, link}) => {
    const anyAction = !!primaryButton || !!secondaryButton || !!link;
    const bothButtons = !!primaryButton && !!secondaryButton;
    const classes = useStyles({bothButtons});

    return anyAction ? (
        <div className={classes.inline}>
            {primaryButton && (
                <div className={secondaryButton ? classes.followedByButton : undefined}>{primaryButton}</div>
            )}
            {secondaryButton && <div>{secondaryButton}</div>}
            {link && <div className="link">{link}</div>}
        </div>
    ) : null;
};

export default ButtonGroup;
