'use client';
import * as React from 'react';
import classnames from 'classnames';
import Touchable from './touchable';
import * as styles from './card-internal.css';
import * as touchableStyles from './touchable.css';

import type {useSelectableCard} from './card-selection-context';
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
            ref={context.surfaceRef}
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
