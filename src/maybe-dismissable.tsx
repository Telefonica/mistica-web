import * as React from 'react';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {useTheme} from './hooks';
import IconButton from './icon-button';
import {vars} from './skins/skin-contract.css';
import * as styles from './maybe-dismissable.css';

const DismissableContext = React.createContext<boolean>(false);
export const useIsDismissable = (): boolean => React.useContext(DismissableContext);

type MaybeDismissableProps = {
    children: React.ReactNode;
    onClose?: () => void;
    width?: string | number;
    'aria-label'?: string;
};

const MaybeDismissable = ({
    children,
    width,
    onClose,
    'aria-label': ariaLabel,
}: MaybeDismissableProps): JSX.Element => {
    const {texts} = useTheme();

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
            <IconButton
                className={styles.dismissableButton}
                onPress={onClose}
                aria-label={texts.closeButtonLabel}
                style={{display: 'flex', width: 48, height: 48}}
            >
                <div className={styles.dismissableCircleContainer}>
                    <IconCloseRegular color={vars.colors.neutralHigh} />
                </div>
            </IconButton>
        </section>
    );
};

export default MaybeDismissable;
