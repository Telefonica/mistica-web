import React from 'react';
import {createUseStyles} from './jss';
import Inline from './inline';
import {ButtonLink, ButtonLinkProps, ButtonPrimary, ButtonProps, ButtonSecondary} from './button';
import {useIsomorphicLayoutEffect} from './hooks';
import {Stack} from '.';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    container: {
        flex: 1,
    },
    fullWidthButtons: {
        '& > div > *': {
            width: '100%',
        },
    },
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

const ButtonGroup: React.FC<ButtonGroupProps> = ({primaryButton, secondaryButton, link}) => {
    const anyButton = !!primaryButton || !!secondaryButton;
    const bothButtons = !!primaryButton && !!secondaryButton;
    const [isOverflowing, setIsOverflowing] = React.useState(false);

    const classes = useStyles({bothButtons});

    const containerElRef = React.useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (containerElRef.current) {
            setIsOverflowing(containerElRef.current.scrollWidth > containerElRef.current.clientWidth);
        }
    }, []);

    const actions = anyButton ? (
        isOverflowing ? (
            <Stack className={classes.fullWidthButtons} space={16}>
                {primaryButton}
                {secondaryButton}
                {!bothButtons && link}
            </Stack>
        ) : (
            <Inline space={buttonLayoutSpacing} alignItems="center">
                {primaryButton}
                {secondaryButton}
                {!bothButtons && link}
            </Inline>
        )
    ) : undefined;

    return (
        <div ref={containerElRef} className={classes.container}>
            {actions}
            {link && (bothButtons || !anyButton) && <div className={classes.fullWidthLink}>{link}</div>}
        </div>
    );
};

export default ButtonGroup;
