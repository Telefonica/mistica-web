import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {useIsomorphicLayoutEffect} from './hooks';
import {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from './button';
import {BUTTON_MIN_WIDTH} from './button.css';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-layout.css';

import type {DataAttributes, RendersNullableElement} from './utils/types';
import type {NullableButtonElement} from './button';

type MaybeButtonElement = NullableButtonElement | void | false;

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
            observer.observe(el, {childList: true, attributes: false, subtree: true});
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
    link?: RendersNullableElement<typeof ButtonLink>;
    withMargins?: boolean;
    dataAttributes?: DataAttributes;
};

const buttonsRange = [ButtonSecondary, ButtonDanger, ButtonPrimary];

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
    children,
    align = 'full-width',
    link,
    withMargins = false,
    dataAttributes,
}) => {
    const childrenCount = React.Children.count(children);
    const [buttonStatus, setButtonStatus] = React.useState({isMeasuring: true, buttonWidth: 0});

    const updateButtonStatus = ({isMeasuring, buttonWidth}: {isMeasuring: boolean; buttonWidth: number}) => {
        if (process.env.NODE_ENV !== 'test') {
            setButtonStatus({isMeasuring, buttonWidth});
        }
    };

    const wrapperElRef = React.useRef<HTMLDivElement | null>(null);
    useIsomorphicLayoutEffect(() => {
        if (buttonStatus.isMeasuring) {
            const req = window.requestAnimationFrame(() => {
                if (wrapperElRef.current) {
                    const childrenWidths = Array.from(wrapperElRef.current.children).map((el) => {
                        /*
                        We are using offsetWidth instead of getBoundingClientRect().width because
                        getBoundingClientRect returns the scaled size when the element has some CSS transform applied.

                        getBoundingClientRect returns a float (eg: 268.65625) and offsetWidth an integer (eg: 268)
                        The `+1` is important, it rounds up the size to avoid unwanted text truncation with ellipsis.
                        */
                        return (el as HTMLElement).dataset.link ? 0 : (el as HTMLElement).offsetWidth + 1;
                    });
                    const maxChildWidth = Math.ceil(Math.max(...childrenWidths, BUTTON_MIN_WIDTH));
                    updateButtonStatus({isMeasuring: false, buttonWidth: maxChildWidth});
                }
            });
            return () => {
                window.cancelAnimationFrame(req);
            };
        }
        return () => {};
    }, [buttonStatus.isMeasuring]);

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

    const sortedButtons = React.Children.toArray(children as any).sort((b1: any, b2: any) => {
        const range1 = buttonsRange.indexOf(b1.type);
        const range2 = buttonsRange.indexOf(b2.type);
        return range1 - range2;
    });

    const content = (
        <div
            ref={wrapperElRef}
            className={classnames(
                styles.baseContainer,
                styles.alignVariant[align],
                buttonStatus.buttonWidth
                    ? align === 'full-width'
                        ? styles.fullWidthContainer
                        : styles.container
                    : styles.noButtonWidth,
                {
                    [styles.alignMoreThanOneChildred]: childrenCount > 1,
                }
            )}
            style={assignInlineVars({
                [styles.vars.buttonWidth]: buttonStatus.buttonWidth
                    ? `${buttonStatus.buttonWidth}px`
                    : 'auto',
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonLayout')}
        >
            {link ? (
                <div
                    className={classnames(styles.link, {[styles.linkAlignment]: align === 'left'})}
                    data-link="true"
                >
                    {link}
                </div>
            ) : null}
            {sortedButtons}
        </div>
    );

    return withMargins ? <div className={styles.margins}>{content}</div> : content;
};

export default ButtonLayout;
