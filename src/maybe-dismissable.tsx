import * as React from 'react';
import {createUseStyles} from './jss';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {useTheme} from './hooks';
import IconButton from './icon-button';
import {useIsInverseVariant} from './theme-variant-context';
import {applyAlpha} from './utils/color';

const DismissableContext = React.createContext<boolean>(false);
export const useIsDismissable = (): boolean => React.useContext(DismissableContext);

const useStyles = createUseStyles((theme) => ({
    dismissableContainer: {
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        width: ({width}) => width || '100%',
    },
    dismissableButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dismissableCircleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        margin: '0 0 8px 8px',
        borderRadius: '50%',
        backgroundColor: applyAlpha(theme.colors.background, 0.7),
    },
}));

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
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse, width});
    const {colors, texts} = useTheme();

    if (!onClose) {
        return <>{children}</>;
    }

    return (
        <section className={classes.dismissableContainer} aria-label={ariaLabel}>
            <DismissableContext.Provider value>{children}</DismissableContext.Provider>
            <IconButton
                className={classes.dismissableButton}
                onPress={onClose}
                aria-label={texts.closeButtonLabel}
                style={{display: 'flex', width: 48, height: 48}}
            >
                <div className={classes.dismissableCircleContainer}>
                    <IconCloseRegular color={colors.neutralHigh} />
                </div>
            </IconButton>
        </section>
    );
};

export default MaybeDismissable;
