'use client';
import * as React from 'react';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {useTheme} from './hooks';
import {IconButton} from './icon-button';
import * as styles from './maybe-dismissable.css';
import {ThemeVariant} from './theme-variant-context';
import * as tokens from './text-tokens';

import type {Variant} from './theme-variant-context';

const DismissableContext = React.createContext<boolean>(false);
export const useIsDismissable = (): boolean => React.useContext(DismissableContext);

type MaybeDismissableProps = {
    children: React.ReactNode;
    onClose?: () => void;
    width?: string | number;
    'aria-label'?: string;
    variant?: Variant;
};

const MaybeDismissable = ({
    children,
    width,
    onClose,
    'aria-label': ariaLabel,
    variant,
}: MaybeDismissableProps): JSX.Element => {
    const {texts, t} = useTheme();

    if (!onClose) {
        return <>{children}</>;
    }

    return (
        <section
            className={styles.dismissableContainer}
            aria-label={ariaLabel}
            style={{width: width || '100%', minHeight: '100%'}}
        >
            <DismissableContext.Provider value>{children}</DismissableContext.Provider>
            <ThemeVariant variant={variant}>
                <div className={styles.dismissableButton}>
                    <IconButton
                        dataAttributes={{testid: 'closeButton'}}
                        onPress={onClose}
                        aria-label={texts.closeButtonLabel || t(tokens.closeButtonLabel)}
                        small
                        Icon={IconCloseRegular}
                    />
                </div>
            </ThemeVariant>
        </section>
    );
};

export default MaybeDismissable;
