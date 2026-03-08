import React from 'react';
import Dialog from '../dialog';
import {ButtonPrimary, ButtonLink, IconInformationUserLight, Text1, skinVars} from '../../dist';
import figma from '@figma/code-connect';

// Desktop - Confirm dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5689%3A4566',
    {
        props: {
            title: figma.boolean('Title', {
                true: figma.textContent('Title'),
                false: undefined,
            }),
            message: figma.textContent('Description text'),
        },
        example: (props) => (
            <ButtonPrimary
                onPress={() =>
                    confirm({
                        title: props.title,
                        message: props.message,
                        acceptText: 'Accept',
                        cancelText: 'Cancel',
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        ),
    }
);

// Desktop - Alert dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1217%3A4059',
    {
        props: {
            title: figma.boolean('Title', {
                true: figma.textContent('Title'),
                false: undefined,
            }),
            message: figma.textContent('Description text'),
        },
        example: (props) => (
            <ButtonPrimary
                onPress={() =>
                    alert({
                        title: props.title,
                        message: 'Message',
                        acceptText: 'Accept',
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        ),
    }
);

// Desktop - Extended dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5680%3A5004',
    {
        props: {
            asset: figma.boolean('Icon', {
                true: <IconInformationUserLight color={skinVars.colors.brand} />,
                false: undefined,
            }),
            title: figma.textContent('Title'),
            subtitle: figma.boolean('Subtitle', {
                true: figma.textContent('Subtitle'),
                false: undefined,
            }),
            message: figma.boolean('Description', {
                true: figma.textContent('Description text'),
                false: undefined,
            }),
        },
        example: (props) => (
            <ButtonPrimary
                onPress={() =>
                    dialog({
                        asset: props.asset,
                        title: props.title,
                        subtitle: props.subtitle,
                        message: props.message,
                        acceptText: 'Accept',
                        cancelText: 'Cancel',
                        extra: <Text1 regular>This is the slot zone</Text1>,
                        showCancel: true,
                        link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        ),
    }
);

// Mobile
figma.connect(
    Dialog,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=10720-7368&t=5PCXgGCWm5Z9d7Us-4',
    {
        props: {
            asset: figma.boolean('Asset', {
                true: <IconInformationUserLight color={skinVars.colors.brand} />,
                false: undefined,
            }),
            title: figma.boolean('Title', {
                true: figma.textContent('Title'),
                false: undefined,
            }),
            subtitle: figma.boolean('Subtitle', {
                true: figma.textContent('Subtitle'),
                false: undefined,
            }),
            message: figma.boolean('Description', {
                true: figma.textContent('Description'),
                false: undefined,
            }),
            slot: figma.boolean('Slot', {
                true: figma.children('*'),
                false: undefined,
            }),
        },
        example: (props) => (
            <ButtonPrimary
                onPress={() =>
                    dialog({
                        asset: props.asset,
                        title: props.title,
                        message: props.message,
                        acceptText: 'Accept',
                        cancelText: 'Cancel',
                        forceWeb: true,
                        extra: props.slot,
                        showCancel: true,
                        link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        ),
    }
);

// Mobile - Alert dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1953-10250&t=5PCXgGCWm5Z9d7Us-4',
    {
        props: {
            title: figma.boolean('Title', {
                true: figma.textContent('Title'),
                false: undefined,
            }),
            message: figma.textContent('Description text'),
        },
        example: (props) => (
            <ButtonPrimary
                onPress={() =>
                    alert({
                        title: props.title,
                        message: 'Message',
                        acceptText: 'Accept',
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        ),
    }
);

// Mobile - Confirm dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=10722-6907&t=5PCXgGCWm5Z9d7Us-4',
    {
        props: {
            title: figma.boolean('Title', {
                true: figma.textContent('Title'),
                false: undefined,
            }),
            message: figma.textContent('Description text'),
        },
        example: (props) => (
            <ButtonPrimary
                onPress={() =>
                    alert({
                        title: props.title,
                        message: 'Message',
                        acceptText: 'Accept',
                        cancelText: 'Cancel',
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        ),
    }
);
