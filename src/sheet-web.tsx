'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import Image from './image';

import type {SheetPromiseResolve, SheetTypeWithPropsUnion} from './sheet-types';

const ActionsSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-actions" */
            './sheet-actions'
        )
);

const InfoSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-info" */
            './sheet-info'
        )
);
const ActionsListSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-action-list" */
            './sheet-actions-list'
        )
);

const RadioListSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-radio-list" */
            './sheet-radio-list'
        )
);

type SheetWebProps = {
    sheetProps: SheetTypeWithPropsUnion;
    onResolve: SheetPromiseResolve;
};

const SheetWeb = ({sheetProps, onResolve}: SheetWebProps): JSX.Element => {
    const {isDarkMode} = useTheme();
    const selectionRef = React.useRef<string | null>(null);

    const handleSelect = (id: string): void => {
        selectionRef.current = id;
    };

    const handleClose = () => {
        if (!onResolve) {
            throw new Error('onResolve handler is not set');
        }
        switch (sheetProps.type) {
            case 'INFO':
                onResolve<'INFO'>({action: 'DISMISS'});
                break;
            case 'ACTIONS_LIST':
                if (selectionRef.current) {
                    onResolve<'ACTIONS_LIST'>({
                        action: 'SUBMIT',
                        selectedId: selectionRef.current,
                    });
                } else {
                    onResolve<'ACTIONS_LIST'>({action: 'DISMISS'});
                }
                break;
            case 'RADIO_LIST':
                if (selectionRef.current) {
                    onResolve<'RADIO_LIST'>({
                        action: 'SUBMIT',
                        selectedId: selectionRef.current,
                    });
                } else {
                    onResolve<'RADIO_LIST'>({action: 'DISMISS'});
                }
                break;
            case 'ACTIONS':
                if (
                    selectionRef.current === 'PRIMARY' ||
                    selectionRef.current === 'SECONDARY' ||
                    selectionRef.current === 'LINK'
                ) {
                    onResolve<'ACTIONS'>({action: selectionRef.current});
                } else {
                    onResolve<'ACTIONS'>({action: 'DISMISS'});
                }
                break;
            default:
                // @ts-expect-error sheetProps is never
                throw new Error(`Unknown sheet type: ${sheetProps.type}`);
        }
        selectionRef.current = null;
    };

    switch (sheetProps.type) {
        case 'INFO':
            return <InfoSheet {...sheetProps.props} onClose={handleClose} />;

        case 'ACTIONS_LIST':
            return <ActionsListSheet {...sheetProps.props} onClose={handleClose} onSelect={handleSelect} />;

        case 'RADIO_LIST':
            return (
                <RadioListSheet
                    {...sheetProps.props}
                    items={sheetProps.props.items.map((item) => ({
                        ...item,
                        asset: item.icon && (
                            <Image
                                circular
                                src={isDarkMode && item.icon.urlDark ? item.icon.urlDark : item.icon.url}
                                width={item.icon.size === 'small' ? 24 : 40}
                            />
                        ),
                    }))}
                    onClose={handleClose}
                    onSelect={handleSelect}
                />
            );

        case 'ACTIONS':
            return (
                <ActionsSheet
                    {...sheetProps.props}
                    buttonLink={sheetProps.props.link}
                    onClose={handleClose}
                    onPressButton={handleSelect}
                />
            );

        default:
            // @ts-expect-error sheetProps is never. This switch is exhaustive.
            throw new Error(`Unknown sheet type: ${sheetProps.type}`);
    }
};

export default SheetWeb;
