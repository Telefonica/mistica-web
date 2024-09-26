'use client';
import * as React from 'react';
import Sheet, {SheetBody} from './sheet-common';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';

import type {DataAttributes, TrackingEvent} from './utils/types';

type PressedButton = 'PRIMARY' | 'SECONDARY' | 'LINK';

type ButtonProps = {
    text: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
};

type ActionsSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    button: ButtonProps;
    secondaryButton?: ButtonProps;
    buttonLink?: ButtonProps & {withChevron?: boolean};
    onClose?: () => void;
    onPressButton?: (pressedButton: PressedButton) => void;
    dataAttributes?: DataAttributes;
};

const ActionsSheet = React.forwardRef<HTMLDivElement, ActionsSheetProps>(
    (
        {
            title,
            subtitle,
            description,
            button,
            secondaryButton,
            buttonLink,
            onClose,
            dataAttributes,
            onPressButton,
        },
        ref
    ) => {
        const createPressHandler = (closeModal: () => void, pressedButton: PressedButton) => () => {
            onPressButton?.(pressedButton);
            closeModal();
        };

        const getButtonProps = <T extends {text: string}>({text, ...otherProps}: T) => ({
            children: text,
            ...otherProps,
        });

        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'ActionsSheet', ...dataAttributes}}
            >
                {({modalTitleId, closeModal}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                        button={
                            <ButtonPrimary
                                {...getButtonProps(button)}
                                onPress={createPressHandler(closeModal, 'PRIMARY')}
                            />
                        }
                        secondaryButton={
                            secondaryButton ? (
                                <ButtonSecondary
                                    {...getButtonProps(secondaryButton)}
                                    onPress={createPressHandler(closeModal, 'SECONDARY')}
                                />
                            ) : undefined
                        }
                        link={
                            buttonLink ? (
                                <ButtonLink
                                    small
                                    {...getButtonProps(buttonLink)}
                                    onPress={createPressHandler(closeModal, 'LINK')}
                                />
                            ) : undefined
                        }
                    />
                )}
            </Sheet>
        );
    }
);

export default ActionsSheet;
