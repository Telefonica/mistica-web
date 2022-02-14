import * as React from 'react';
import {createUseStyles} from './jss';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import classNames from 'classnames';

import type {RendersNullableElement} from './utils/types';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    inline: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    container: {
        marginTop: -buttonLayoutSpacing,
        marginLeft: -buttonLayoutSpacing - buttonLinkPadding,
    },
    buttons: {
        marginLeft: buttonLinkPadding,
        '& > div': {
            marginTop: buttonLayoutSpacing,
            marginLeft: buttonLayoutSpacing,
        },
    },
    link: {
        marginTop: buttonLayoutSpacing,
        marginLeft: buttonLayoutSpacing,
        width: ({bothButtons}) => (bothButtons ? '100%' : 'auto'),
    },
}));

export interface ButtonGroupProps {
    primaryButton?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({primaryButton, secondaryButton, link}) => {
    const anyAction = !!primaryButton || !!secondaryButton || !!link;
    const bothButtons = !!primaryButton && !!secondaryButton;
    const classes = useStyles({bothButtons});

    return anyAction ? (
        <div className={classNames(classes.inline, classes.container)}>
            {(primaryButton || secondaryButton) && (
                <div className={classNames(classes.inline, classes.buttons)}>
                    {primaryButton && <div>{primaryButton}</div>}
                    {secondaryButton && <div>{secondaryButton}</div>}
                </div>
            )}
            {link && <div className={classes.link}>{link}</div>}
        </div>
    ) : null;
};

export default ButtonGroup;
