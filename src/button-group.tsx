import React, {useEffect} from 'react';
import {createUseStyles} from './jss';
import {ButtonLink, ButtonLinkProps, ButtonPrimary, ButtonProps, ButtonSecondary} from './button';
import {useIsomorphicLayoutEffect} from './hooks';
import Stack from './stack';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 6;

const useStyles = createUseStyles(() => ({
    container: {
        flex: 1,
    },
    inline: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& > div': {
            flexShrink: () => 0,
        },
        '& > div:not(:empty) ~ div:not(:empty)': {
            marginLeft: 16,
        },
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
    const [isMeasuring, setIsMeasuring] = React.useState(true);

    const classes = useStyles({bothButtons});

    const containerElRef = React.useRef<HTMLDivElement | null>(null);

    const calcLayout = (): number => {
        setIsMeasuring(true);

        return window.requestAnimationFrame(() => {
            if (containerElRef.current) {
                setIsOverflowing(containerElRef.current.scrollWidth > containerElRef.current.offsetWidth);
            }
            setIsMeasuring(false);
        });
    };

    useEffect(() => {
        window.addEventListener('resize', calcLayout);
        return () => window.removeEventListener('resize', calcLayout);
    }, []);

    useIsomorphicLayoutEffect(() => {
        const req = calcLayout();
        return () => {
            window.cancelAnimationFrame(req);
        };
    }, [primaryButton, secondaryButton, link]);

    const actions = anyButton ? (
        !isMeasuring && isOverflowing ? (
            <Stack className={classes.fullWidthButtons} space={16}>
                {primaryButton}
                {secondaryButton}
                {!bothButtons && link}
            </Stack>
        ) : (
            <div className={classes.inline}>
                {primaryButton && <div>{primaryButton}</div>}
                {secondaryButton && <div>{secondaryButton}</div>}
                {!bothButtons && link && <div>{link}</div>}
            </div>
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
