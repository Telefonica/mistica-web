'use client';
import * as React from 'react';
import classnames from 'classnames';
import Touchable from './touchable';
import Checkbox from './checkbox';
import Switch from './switch-component';
import RadioButton from './radio-button';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import * as styles from './card-internal.css';
import * as touchableStyles from './touchable.css';

import type {useSelectableCard} from './card-selection';
import type {Variant} from './theme-variant-context';
import type {TouchableProps} from './touchable';

type Props = TouchableProps & {selection: ReturnType<typeof useSelectableCard>; variant?: Variant};

export const CardSelectionSurface = ({selection, variant, ...props}: Props): JSX.Element => {
    const id = React.useId();
    const contentVariant = useThemeVariant();
    if (!selection.isSelectionMode) {
        return <Touchable {...props} />;
    }
    if (!selection.hasSelector) {
        return (
            <div className={classnames(touchableStyles.notTouchable, props.className)} style={props.style}>
                {props.children}
            </div>
        );
    }

    const render = ({controlElement}: {controlElement: React.ReactElement}) => (
        <>
            <ThemeVariant variant={contentVariant}>{props.children}</ThemeVariant>
            <div className={styles.topActionsContainer} data-testid="cardSelector" aria-hidden>
                {controlElement}
            </div>
        </>
    );
    const config = selection.checkbox || selection.switch;
    const Control = selection.switch ? Switch : Checkbox;
    return (
        <div className={classnames(styles.selectionControl, props.className)} style={props.style}>
            <ThemeVariant variant={variant}>
                {config ? (
                    <Control
                        name={config.name || id}
                        checked={selection.isSelected}
                        onChange={selection.onChange}
                        disabled={config.disabled}
                        aria-label={props['aria-label']}
                        aria-labelledby={props['aria-labelledby']}
                        render={render}
                    />
                ) : (
                    <RadioButton
                        value={selection.radioValue ?? ''}
                        aria-label={props['aria-label']}
                        aria-labelledby={props['aria-labelledby']}
                        render={render}
                    />
                )}
            </ThemeVariant>
        </div>
    );
};
