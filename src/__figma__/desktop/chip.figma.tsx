import React from 'react';
import Chip from '../../chip';
import figma from '@figma/code-connect';

const chipUrl =
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2106%3A4571';

const commonProps = {
    active: figma.boolean('Selected'),
    badge: figma.boolean('Badge', {
        true: 2,
        false: undefined,
    }),
    Icon: figma.instance('Choose icon'),
    small: figma.boolean('Small'),
    children: figma.textContent('Text'),
};

// Closable chip
figma.connect(Chip, chipUrl, {
    variant: {Closable: true},
    props: commonProps,
    example: (props) => (
        <Chip small={props.small} active={props.active} Icon={props.Icon} onClose={() => {}}>
            {props.children}
        </Chip>
    ),
});

// Selection chip
figma.connect(Chip, chipUrl, {
    variant: {Closable: false, Type: 'Selection'},
    props: commonProps,
    example: (props) => (
        <Checkbox
            name="chip-checkbox"
            render={({labelId, checked}) => (
                <Chip
                    active={props.active}
                    small={props.small}
                    badge={props.badge}
                    id={labelId}
                    Icon={props.Icon}
                >
                    {props.children}
                </Chip>
            )}
        />
    ),
});

// Action chip
figma.connect(Chip, chipUrl, {
    variant: {Closable: false, Type: 'Action'},
    props: commonProps,
    example: (props) => (
        <Chip
            small={props.small}
            active={props.active}
            badge={props.badge}
            Icon={props.Icon}
            href="https://example.com"
        >
            {props.children}
        </Chip>
    ),
});

// Radio chip
figma.connect(Chip, chipUrl, {
    variant: {Closable: false, Type: 'Selection'},
    props: commonProps,
    example: (props) => (
        <RadioGroup name="chip-group" defaultValue="1">
            <RadioButton
                value="1"
                render={({checked, labelId}) => (
                    <Chip
                        active={props.active}
                        small={props.small}
                        badge={props.badge}
                        id={labelId}
                        Icon={props.Icon}
                    >
                        {props.children}
                    </Chip>
                )}
            />
            <RadioButton
                value="2"
                render={({checked, labelId}) => (
                    <Chip
                        active={props.active}
                        small={props.small}
                        badge={props.badge}
                        id={labelId}
                        Icon={props.Icon}
                    >
                        {props.children}
                    </Chip>
                )}
            />
        </RadioGroup>
    ),
});
