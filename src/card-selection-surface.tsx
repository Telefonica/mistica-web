'use client';
import * as React from 'react';
import classnames from 'classnames';
import Touchable from './touchable';
import Checkbox from './checkbox';
import Switch from './switch-component';
import RadioButton from './radio-button';
import {CardSelectionContext} from './card-selection-context';
import {ThemeVariant} from './theme-variant-context';
import * as styles from './card-internal.css';
import * as touchableStyles from './touchable.css';

import type {CardSelectionProps, useSelectableCard} from './card-selection-context';
import type {Variant} from './theme-variant-context';
import type {TouchableProps} from './touchable';

type Props = TouchableProps & {selection: ReturnType<typeof useSelectableCard>};

export const CardSelectionSurface = ({selection, ...props}: Props): JSX.Element => {
    if (!selection.isSelectionMode) {
        return <Touchable {...props} />;
    }

    const {control, isSelected, context} = selection;
    const role = control?.role;

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- The semantic role moves between the control and the card surface.
        <div
            ref={context.interactionRef}
            className={classnames(
                control ? styles.selectionSurface : touchableStyles.notTouchable,
                props.className
            )}
            style={props.style}
            aria-label={props['aria-label']}
            aria-labelledby={props['aria-labelledby']}
            aria-description={props['aria-description']}
            aria-describedby={props['aria-describedby']}
            role={role}
            aria-checked={control ? isSelected : undefined}
            aria-disabled={control?.disabled}
            data-value={control?.value}
            tabIndex={!control || control.disabled ? undefined : control.tabIndex ?? 0}
            onClick={(event) => {
                if (control) {
                    event.stopPropagation();
                }
                if (control && !control.disabled) {
                    event.currentTarget.focus();
                    control.onPress?.();
                }
            }}
            onKeyDown={control?.disabled ? undefined : control?.onKeyDown}
        >
            {props.children}
        </div>
    );
};

export const CardSelector = ({
    selection,
    checkbox,
    switch: switchProps,
    radioValue,
    variant,
}: {checkbox?: CardSelectionProps['checkbox']; switch?: CardSelectionProps['switch']; radioValue?: string} & {
    selection: ReturnType<typeof useSelectableCard>;
    variant?: Variant;
}): JSX.Element | null => {
    const id = React.useId();
    const config = checkbox || switchProps;
    if (!config && radioValue === undefined) {
        return null;
    }
    const Control = switchProps ? Switch : Checkbox;
    return (
        <ThemeVariant variant={variant}>
            <div className={styles.topActionsContainer} data-testid="cardSelector">
                <CardSelectionContext.Provider value={selection.context}>
                    {config ? (
                        <Control
                            name={config.name || id}
                            checked={config.value}
                            defaultChecked={config.defaultValue}
                            onChange={config.onChange}
                            disabled={config.disabled}
                            aria-label=""
                            children=""
                        />
                    ) : (
                        <RadioButton value={radioValue ?? ''} />
                    )}
                </CardSelectionContext.Provider>
            </div>
        </ThemeVariant>
    );
};
