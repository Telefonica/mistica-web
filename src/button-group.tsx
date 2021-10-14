import React from 'react';
import {createUseStyles} from './jss';
import {ButtonLink, ButtonLinkProps, ButtonPrimary, ButtonProps, ButtonSecondary} from './button';
import classnames from 'classnames';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    inline: {
        display: 'inline-flex',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: -buttonLayoutSpacing,
        marginLeft: -buttonLayoutSpacing - buttonLinkPadding,
        '& > div': {
            marginTop: buttonLayoutSpacing,
            marginLeft: buttonLayoutSpacing + buttonLinkPadding,
        },
        '& > div:not(.link) + div': {
            marginRight: -buttonLinkPadding,
        },
        '& > div.link': {
            marginLeft: buttonLayoutSpacing,
            width: ({bothButtons}) => (bothButtons ? '100%' : 'auto'),
        },
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

    return (
        <div>
            {anyAction ? (
                // will be displayed in reverse mode to set a special alignment to link when it wraps.
                <div className={classes.inline}>
                    {link && <div className={classnames('link')}>{link}</div>}
                    {secondaryButton && <div>{secondaryButton}</div>}
                    {primaryButton && <div>{primaryButton}</div>}
                </div>
            ) : undefined}
        </div>
    );
};

export default ButtonGroup;
