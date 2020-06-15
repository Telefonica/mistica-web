// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import {useScreenSize} from './hooks';
import {BUTTON_MIN_WIDTH, ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from './button';

export type ButtonElement =
    | React.Element<typeof ButtonPrimary>
    | React.Element<typeof ButtonSecondary>
    | React.Element<typeof ButtonDanger>
    | void
    | false;

const buttonLayoutSpacing = 16;
const useStyles = createUseStyles((theme) => ({
    margins: {
        margin: '16px 0',
        padding: '0 16px',
    },
    [theme.mq.tabletOrBigger]: {
        margins: {
            padding: 0,
            margin: 16,
        },
    },
    container: {
        display: 'flex',
        justifyContent: ({align, childrenCount, isMobile}) => {
            if (align === 'center' || (align === 'full-width' && isMobile)) {
                return 'center';
            }
            if (childrenCount > 1 && isMobile) {
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
            width: ({buttonWidth, isMobile, align}) => {
                if (!buttonWidth) {
                    return 'auto';
                }
                if (!isMobile) {
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
}));

const useOnFontsReadyEffect = (effect) => {
    React.useEffect(() => {
        let cancel = false;
        // $FlowFixMe flow doesn't know document.fonts
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
            // $FlowFixMe
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

const useOnChildrenChangeEffect = (el, effect) => {
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
    children?: ButtonElement | [ButtonElement, ButtonElement],
    align?: 'center' | 'left' | 'right' | 'full-width',
    link?: ?React.Element<typeof ButtonLink>,
    withMargins?: boolean,
};

const buttonsRange = [ButtonSecondary, ButtonDanger, ButtonPrimary];

const ButtonLayout = ({
    children,
    align = 'full-width',
    link,
    withMargins = false,
}: ButtonLayoutProps): React.Element<'div'> => {
    const {isMobile} = useScreenSize();
    const [isMeasuring, setIsMeasuring] = React.useState(true);
    const childrenCount = React.Children.count(children);

    const [buttonWidth, setButtonWidth] = React.useState(0);

    const updateButtonWidth = (buttonWidth) => {
        if (process.env.NODE_ENV !== 'test') {
            setButtonWidth(buttonWidth);
        }
    };

    const updateIsMeasuring = (isMeasuring) => {
        if (process.env.NODE_ENV !== 'test') {
            setIsMeasuring(isMeasuring);
        }
    };

    const classes = useStyles({buttonWidth, isMobile, align, childrenCount});

    const wrapperElRef = React.useRef<HTMLDivElement | null>(null);
    React.useLayoutEffect(() => {
        if (isMeasuring) {
            const req = window.requestAnimationFrame(() => {
                if (wrapperElRef.current) {
                    const childrenWidths = [...wrapperElRef.current.children].map((el) =>
                        el.classList.contains(classes.link) ? 0 : el.getBoundingClientRect().width
                    );
                    const maxChildWidth = Math.ceil(Math.max(...childrenWidths, BUTTON_MIN_WIDTH));
                    updateButtonWidth(maxChildWidth);
                    updateIsMeasuring(false);
                }
            });
            return () => {
                window.cancelAnimationFrame(req);
            };
        }
        return () => {};
    }, [classes.link, isMeasuring]);

    const calcLayout = React.useCallback(() => {
        updateButtonWidth(0);
        updateIsMeasuring(true);
    }, []);

    useOnChildrenChangeEffect(wrapperElRef.current, calcLayout);
    useOnFontsReadyEffect(calcLayout);

    const sortedButtons = React.Children.toArray(children).sort((b1, b2) => {
        const range1 = buttonsRange.indexOf(b1.type);
        const range2 = buttonsRange.indexOf(b2.type);
        return range1 - range2;
    });

    const content = (
        <div ref={wrapperElRef} className={classes.container}>
            {link ? <div className={classes.link}>{link}</div> : null}
            {sortedButtons}
        </div>
    );

    return withMargins ? <div className={classes.margins}>{content}</div> : content;
};

export default ButtonLayout;
