'use client';
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import FocusTrap from './focus-trap';
import {Portal} from './portal';
import {useTheme} from './hooks';
import {isRunningAcceptanceTest} from './utils/platform';
import * as tokens from './text-tokens';
import * as styles from './navigation-shared.css';

/**
 * The panel that a burger menu opens on mobile. It holds two panes that slide horizontally: the first
 * level, and the second level of the item the user pressed. `MainNavigationBar` and `SidenavBar` share it,
 * so both keep the same animation, the same focus behavior and the same overlay.
 *
 * The panel is a shell: each component passes the content of the two panes, because their data models
 * differ.
 */

type MobileNavigationMenuStatus = 'opening' | 'opened' | 'closing' | 'closed';
type MobileNavigationMenuAction = 'open' | 'finishOpen' | 'close' | 'finishClose';

const mobileNavigationMenuTransitions: Record<
    MobileNavigationMenuStatus,
    Partial<Record<MobileNavigationMenuAction, MobileNavigationMenuStatus>>
> = {
    opening: {
        close: 'closing',
        finishOpen: 'opened',
    },
    opened: {
        close: 'closing',
    },
    closing: {
        open: 'opening',
        finishClose: 'closed',
    },
    closed: {
        open: 'opening',
    },
};

const secondLevelReducer = (state: MobileNavigationMenuStatus, action: MobileNavigationMenuAction) => {
    return mobileNavigationMenuTransitions[state][action] || state;
};

type MobileNavigationMenuProps = {
    /** True while the menu shows. The panel animates on every change of this prop. */
    open: boolean;
    /** Id of the panel, which the burger button points to with `aria-controls`. */
    id: string;
    /** Distance from the top of the viewport, which leaves the top bar visible. */
    topOffset: number;
    /** Content of the first pane. */
    firstLevel: React.ReactNode;
    /** Content of the second pane. */
    secondLevel?: React.ReactNode;
    /** True while the second pane must show. The panel slides both panes on every change of this prop. */
    secondLevelOpen?: boolean;
    /** Called once the panel finished its exit, so the consumer resets its own state. */
    onExited?: () => void;
    /** Accessible name of the navigation landmark. */
    'aria-label'?: string;
    /** Group of the focus trap, which the consumer shares with its own top bar. */
    focusTrapGroup: string;
    disableFocusTrap: boolean;
    setDisableFocusTrap: (value: boolean) => void;
};

const MobileNavigationMenu = ({
    open,
    id,
    topOffset,
    firstLevel,
    secondLevel,
    secondLevelOpen = false,
    onExited,
    'aria-label': ariaLabel,
    focusTrapGroup,
    disableFocusTrap,
    setDisableFocusTrap,
}: MobileNavigationMenuProps): JSX.Element => {
    const {isDarkMode, texts, t} = useTheme();
    const [secondLevelStatus, dispatch] = React.useReducer(secondLevelReducer, 'closed');
    const menuRef = React.useRef<HTMLDivElement>(null);
    const secondLevelRef = React.useRef<HTMLDivElement>(null);

    const shadowAlpha = isDarkMode ? 1 : 0.2;
    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.BURGER_MENU_ANIMATION_DURATION_MS;

    React.useEffect(() => {
        let id: NodeJS.Timeout;

        // menu starts opening or closing
        if (secondLevelOpen) {
            dispatch('open');
            id = setTimeout(() => dispatch('finishOpen'), menuAnimationDuration);
        } else {
            dispatch('close');
            id = setTimeout(() => dispatch('finishClose'), menuAnimationDuration);
        }

        return () => clearTimeout(id);
    }, [secondLevelOpen, menuAnimationDuration]);

    React.useEffect(() => {
        // Make screen reader focus on back button when opening any section's menu
        if (secondLevelStatus === 'opening') {
            const backButtonElement = secondLevelRef.current?.querySelector<HTMLButtonElement>(
                `button[aria-label="${texts.backNavigationBar || t(tokens.backNavigationBar)}"]`
            );

            backButtonElement?.focus();
        }
    }, [secondLevelStatus, t, texts]);

    return (
        <Portal>
            <FocusTrap disabled={disableFocusTrap} group={focusTrapGroup}>
                <CSSTransition
                    onEntered={() => setDisableFocusTrap(false)}
                    onExiting={() => setDisableFocusTrap(true)}
                    onExited={onExited}
                    classNames={styles.burgerMenuTransition}
                    in={open}
                    nodeRef={menuRef}
                    timeout={menuAnimationDuration}
                    mountOnEnter
                    unmountOnExit
                >
                    <nav
                        className={styles.burgerMenu}
                        style={{
                            boxShadow: `6px 0 4px -4px rgba(0, 0, 0, ${shadowAlpha})`,
                            top: topOffset,
                        }}
                        id={id}
                        ref={menuRef}
                        aria-label={ariaLabel}
                    >
                        <div className={styles.burgerMenuContainer}>
                            <div
                                className={styles.burgerMenuContentContainer}
                                style={{
                                    transform: `translate(${secondLevelOpen ? '-100vw' : '0'})`,
                                }}
                            >
                                {secondLevelStatus !== 'opened' && firstLevel}
                            </div>

                            <div
                                className={styles.burgerMenuContentContainer}
                                ref={secondLevelRef}
                                style={{
                                    transform: `translate(${secondLevelOpen ? '0' : '100vw'})`,
                                }}
                            >
                                {secondLevelStatus !== 'closed' && secondLevel}
                            </div>
                        </div>
                    </nav>
                </CSSTransition>
            </FocusTrap>
        </Portal>
    );
};

export {MobileNavigationMenu};
export type {MobileNavigationMenuProps};
