import * as React from 'react';
import {createUseStyles} from './jss';
import {useScreenSize, useIsomorphicLayoutEffect} from './hooks';
import {BUTTON_MIN_WIDTH, ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from './button';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import type {ButtonElement, ButtonLinkProps} from './button';

type MaybeButtonElement = ButtonElement | void | false;

const buttonLayoutSpacing = 16;

const useStyles = createUseStyles((theme) => ({
    margins: {
        margin: '16px 0',
        padding: '0 16px',
    },
    [theme.mq.desktopOrBigger]: {
        margins: {
            padding: 0,
            margin: 16,
        },
    },
    container: {
        display: 'flex',
        justifyContent: ({align, childrenCount, isTabletOrSmaller}) => {
            if (align === 'center' || (align === 'full-width' && isTabletOrSmaller)) {
                return 'center';
            }
            if (childrenCount > 1 && isTabletOrSmaller) {
                return 'center';
            }
            if (align === 'right') {
                return 'flex-end';
            }
            return 'flex-start';
        },
        flexWrap: 'wrap-reverse',
        margin: -buttonLayoutSpacing / 2,

        '&:empty': {
            margin: 0,
        },
        '& > *:not($link)': {
            width: ({buttonWidth, isTabletOrSmaller, align}) => {
                if (!buttonWidth) {
                    return 'auto';
                }
                if (!isTabletOrSmaller) {
                    return buttonWidth;
                }
                if (align === 'full-width') {
                    return `calc(100% - ${buttonLayoutSpacing}px)`;
                }
                return `calc(50% - ${buttonLayoutSpacing}px)`;
            },
            minWidth: ({buttonWidth}) => buttonWidth,
            margin: buttonLayoutSpacing / 2,
        },
    },
    link: {
        margin: buttonLayoutSpacing / 2,
        display: 'flex',
        width: '100%',
        justifyContent: 'inherit',
    },
    linkAlignment: {
        marginLeft: buttonLayoutSpacing / 2 - 6,
    },
}));

const useOnFontsReadyEffect = (effect: () => void) => {
    React.useEffect(() => {
        let cancel = false;
        if (document.fonts?.ready?.then) {
            document.fonts.ready.then(() => {
                if (!cancel) {
                    effect();
                }
            });
        }
        return () => {
            cancel = true;
        };
    }, [effect]);
};

const useOnChildrenChangeEffect = (el: HTMLElement | null, effect: MutationCallback) => {
    React.useEffect(() => {
        if (el) {
            const observer = new MutationObserver(effect);
            observer.observe(el, {childList: true, attributes: true, subtree: true});
            return () => {
                observer.disconnect();
            };
        }
        return () => {};
    }, [effect, el]);
};

type ButtonLayoutProps = {
    children?: MaybeButtonElement | [MaybeButtonElement, MaybeButtonElement];
    align?: 'center' | 'left' | 'right' | 'full-width';
    link?: React.ReactElement<ButtonLinkProps, typeof ButtonLink> | null;
    withMargins?: boolean;
};

const buttonsRange = [ButtonSecondary, ButtonDanger, ButtonPrimary];

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
    children,
    align = 'full-width',
    link,
    withMargins = false,
}) => {
    const {isTabletOrSmaller} = useScreenSize();
    const childrenCount = React.Children.count(children);
    const [buttonStatus, setButtonStatus] = React.useState({isMeasuring: true, buttonWidth: 0});

    const updateButtonStatus = ({isMeasuring, buttonWidth}: {isMeasuring: boolean; buttonWidth: number}) => {
        if (process.env.NODE_ENV !== 'test') {
            setButtonStatus({isMeasuring, buttonWidth});
        }
    };

    const classes = useStyles({
        buttonWidth: buttonStatus.buttonWidth,
        isTabletOrSmaller,
        align,
        childrenCount,
    });

    const wrapperElRef = React.useRef<HTMLDivElement | null>(null);
    useIsomorphicLayoutEffect(() => {
        if (buttonStatus.isMeasuring) {
            const req = window.requestAnimationFrame(() => {
                if (wrapperElRef.current) {
                    const childrenWidths = Array.from(wrapperElRef.current.children).map((el) =>
                        /*
                        We are using offsetWidth instead of getBoundingClientRect().width because
                        getBoundingClientRect returns the scaled size when the element has some CSS transform applied.

                        getBoundingClientRect returns a float (eg: 268.65625) and offsetWidth an integer (eg: 268)
                        The `+1` is important, it rounds up the size to avoid unwanted text truncation with ellipsis.
                        */
                        el.classList.contains(classes.link) ? 0 : (el as HTMLElement).offsetWidth + 1
                    );
                    const maxChildWidth = Math.ceil(Math.max(...childrenWidths, BUTTON_MIN_WIDTH));
                    updateButtonStatus({isMeasuring: false, buttonWidth: maxChildWidth});
                }
            });
            return () => {
                window.cancelAnimationFrame(req);
            };
        }
        return () => {};
    }, [classes.link, buttonStatus]);

    /**
     * Multiple calls to calcLayout are debounced to workaround an issue that can be reproduced in chrome when pressing
     * the button during a focus/visibility change. For example, pressing the button having the focus on the devTools.
     */
    const calcLayout = React.useMemo(
        () =>
            debounce(
                () => {
                    updateButtonStatus({isMeasuring: true, buttonWidth: 0});
                },
                5,
                {maxWait: 50}
            ),
        []
    );

    useOnChildrenChangeEffect(wrapperElRef.current, calcLayout);
    useOnFontsReadyEffect(calcLayout);

    /**
     * Listening to focus/visibility change solves a corner that can be reproduced in Novum iOS webviews. Just after logging in,
     * wait until everything loads (including hidden tabs), after a while, open Account tab (Mis productos) and the button appears
     * with ellipsis, even it has enough space.
     */
    React.useEffect(() => {
        window.addEventListener('resize', calcLayout);
        window.addEventListener('focus', calcLayout);
        document.addEventListener('visibilitychange', calcLayout);
        return () => {
            window.removeEventListener('resize', calcLayout);
            window.removeEventListener('focus', calcLayout);
            document.removeEventListener('visibilitychange', calcLayout);
        };
    }, [calcLayout]);

    const sortedButtons = React.Children.toArray(children).sort((b1: any, b2: any) => {
        const range1 = buttonsRange.indexOf(b1.type);
        const range2 = buttonsRange.indexOf(b2.type);
        return range1 - range2;
    });

    const needsLinkAlignment = !isTabletOrSmaller && align === 'left';

    const content = (
        <div ref={wrapperElRef} className={classes.container}>
            {link ? (
                <div className={classNames(classes.link, {[classes.linkAlignment]: needsLinkAlignment})}>
                    {link}
                </div>
            ) : null}
            {sortedButtons}
        </div>
    );

    return withMargins ? <div className={classes.margins}>{content}</div> : content;
};

export default ButtonLayout;
