import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconStarRegular from '@telefonica/mistica-icons/icon-star-regular';
import {IconButton, ToggleIconButton} from '../icon-button';
import {Row, BoxedRow} from '../list';
import Tabs from '../tabs';
import {Accordion, AccordionItem, BoxedAccordion, BoxedAccordionItem} from '../accordion';
import {DataCard} from '../card-data';
import {MediaCard} from '../card-media';
import {CoverCard} from '../card-cover';
import {NakedCard} from '../card-naked';
import AdvancedDataCard from '../community/advanced-data-card';
import Popover from '../popover';
import Chip from '../chip';
import AiCard from '../community/ai-card';
import {Logo, MovistarLogo} from '../logo';
import Message from '../message';
import Switch from '../switch-component';
import Touchable from '../touchable';
import ThemeContextProvider from '../theme-context-provider';
import {TrackingConfig} from '../utils/analytics';
import {makeTheme} from './test-utils';

import type {TrackingEvent} from '../utils/types';

type TrackingProps = {
    trackEvent?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
};

type TrackingCase = {
    name: string;
    componentType: string;
    role: 'button' | 'link' | 'tab';
    renderComponent: (props: TrackingProps) => React.ReactElement;
};

const trackingCases: Array<TrackingCase> = [
    {
        name: 'Touchable link',
        componentType: 'link',
        role: 'link',
        renderComponent: (props) => (
            <Touchable {...props} to="#details">
                Details
            </Touchable>
        ),
    },
    {
        name: 'Touchable button',
        componentType: 'button',
        role: 'button',
        renderComponent: (props) => (
            <Touchable {...props} onPress={() => {}}>
                Details
            </Touchable>
        ),
    },
    {
        name: 'IconButton',
        componentType: 'icon',
        role: 'link',
        renderComponent: (props) => (
            <IconButton {...props} Icon={IconStarRegular} aria-label="Details" to="#details" />
        ),
    },
    {
        name: 'ToggleIconButton',
        componentType: 'icon',
        role: 'button',
        renderComponent: (props) => (
            <ToggleIconButton
                {...props}
                uncheckedProps={{Icon: IconStarRegular, 'aria-label': 'Details'}}
                checkedProps={{Icon: IconStarRegular, 'aria-label': 'Hide details'}}
            />
        ),
    },
    {
        name: 'Row',
        componentType: 'row',
        role: 'link',
        renderComponent: (props) => <Row {...props} title="Details" to="#details" />,
    },
    {
        name: 'BoxedRow',
        componentType: 'row',
        role: 'link',
        renderComponent: (props) => <BoxedRow {...props} title="Details" to="#details" />,
    },
    {
        name: 'Tabs',
        componentType: 'tab',
        role: 'tab',
        renderComponent: (props) => (
            <Tabs
                selectedIndex={0}
                onChange={() => {}}
                tabs={[{text: 'Overview'}, {text: 'Details', ...props}]}
            />
        ),
    },
    {
        name: 'AccordionItem',
        componentType: 'accordion',
        role: 'button',
        renderComponent: (props) => (
            <Accordion>
                <AccordionItem {...props} title="Details" content="Panel content" />
            </Accordion>
        ),
    },
    {
        name: 'BoxedAccordionItem',
        componentType: 'accordion',
        role: 'button',
        renderComponent: (props) => (
            <BoxedAccordion>
                <BoxedAccordionItem {...props} title="Details" content="Panel content" />
            </BoxedAccordion>
        ),
    },
    {
        name: 'DataCard',
        componentType: 'card',
        role: 'link',
        renderComponent: (props) => <DataCard {...props} title="Details" to="#details" />,
    },
    {
        name: 'MediaCard',
        componentType: 'card',
        role: 'link',
        renderComponent: (props) => <MediaCard {...props} title="Details" to="#details" />,
    },
    {
        name: 'CoverCard',
        componentType: 'card',
        role: 'link',
        renderComponent: (props) => <CoverCard {...props} title="Details" to="#details" />,
    },
    {
        name: 'NakedCard',
        componentType: 'card',
        role: 'link',
        renderComponent: (props) => <NakedCard {...props} title="Details" to="#details" />,
    },
    {
        name: 'AdvancedDataCard',
        componentType: 'card',
        role: 'link',
        renderComponent: (props) => <AdvancedDataCard {...props} title="Details" to="#details" />,
    },
    {
        name: 'Chip button',
        componentType: 'chip',
        role: 'button',
        renderComponent: (props) => (
            <Chip {...props} onPress={() => {}}>
                Details
            </Chip>
        ),
    },
    {
        name: 'Chip link',
        componentType: 'chip',
        role: 'link',
        renderComponent: (props) => (
            <Chip {...props} to="#details">
                Details
            </Chip>
        ),
    },
    {
        name: 'Chip close button',
        componentType: 'icon',
        role: 'button',
        renderComponent: (props) => (
            <Chip {...props} onClose={() => {}} closeButtonLabel="Details">
                Filter
            </Chip>
        ),
    },
    {
        name: 'AiCard button',
        componentType: 'card',
        role: 'button',
        renderComponent: (props) => <AiCard {...props} text="Details" onPress={() => {}} />,
    },
    {
        name: 'AiCard link',
        componentType: 'card',
        role: 'link',
        renderComponent: (props) => <AiCard {...props} text="Details" to="#details" />,
    },
    {
        name: 'Logo link',
        componentType: 'link',
        role: 'link',
        renderComponent: (props) => <Logo {...props} aria-label="Details" to="#details" />,
    },
    {
        name: 'brand Logo button',
        componentType: 'button',
        role: 'button',
        renderComponent: (props) => <MovistarLogo {...props} aria-label="Details" onPress={() => {}} />,
    },
    {
        name: 'Message button',
        componentType: 'button',
        role: 'button',
        renderComponent: (props) => (
            <Message
                {...props}
                type="incoming"
                contentText="Details"
                aria-label="Details"
                onPress={() => {}}
            />
        ),
    },
    {
        name: 'Message link',
        componentType: 'link',
        role: 'link',
        renderComponent: (props) => (
            <Message {...props} type="incoming" contentText="Details" aria-label="Details" to="#details" />
        ),
    },
];

describe.each(trackingCases)('$name default tracking', ({componentType, role, renderComponent}) => {
    test.each([
        {
            eventFormat: 'universal-analytics',
            expectedEvent: {
                category: 'user_interaction',
                action: `${componentType}_tapped`,
                label: 'Details',
            },
        },
        {
            eventFormat: 'google-analytics-4',
            expectedEvent: {
                name: 'user_interaction',
                component_type: componentType,
                component_copy: 'Details',
            },
        },
    ] as const)(
        'uses the $eventFormat payload when enabled in the theme',
        async ({eventFormat, expectedEvent}) => {
            const logEvent = jest.fn();
            render(
                <ThemeContextProvider
                    theme={makeTheme({analytics: {logEvent, eventFormat, trackEventsByDefault: true}})}
                >
                    {renderComponent({})}
                </ThemeContextProvider>
            );

            const target = await screen.findByRole(role, {name: 'Details'});
            await userEvent.click(target);

            expect(logEvent).toHaveBeenCalledTimes(1);
            expect(logEvent).toHaveBeenCalledWith(expectedEvent);
        }
    );

    test.each([
        {trackEventsByDefault: undefined, trackEvent: undefined, expectedEventCount: 0},
        {trackEventsByDefault: false, trackEvent: true, expectedEventCount: 1},
        {trackEventsByDefault: true, trackEvent: false, expectedEventCount: 0},
    ])(
        'tracks $expectedEventCount events with trackEventsByDefault=$trackEventsByDefault and trackEvent=$trackEvent',
        async ({trackEventsByDefault, trackEvent, expectedEventCount}) => {
            const logEvent = jest.fn();
            render(
                <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault}})}>
                    {renderComponent({trackEvent})}
                </ThemeContextProvider>
            );

            const target = await screen.findByRole(role, {name: 'Details'});
            await userEvent.click(target);

            expect(logEvent).toHaveBeenCalledTimes(expectedEventCount);
        }
    );

    test.each([
        {
            name: 'custom event',
            trackEvent: undefined,
            trackingEvent: {name: 'custom_event'},
            expectedEvents: [{name: 'custom_event'}],
        },
        {
            name: 'custom event with explicit opt-out',
            trackEvent: false,
            trackingEvent: {name: 'custom_event'},
            expectedEvents: [{name: 'custom_event'}],
        },
        {
            name: 'custom event list',
            trackEvent: undefined,
            trackingEvent: [{name: 'first_event'}, {name: 'second_event'}],
            expectedEvents: [{name: 'first_event'}, {name: 'second_event'}],
        },
        {name: 'empty event list', trackEvent: undefined, trackingEvent: [], expectedEvents: []},
    ])(
        'preserves the $name when default tracking is enabled',
        async ({trackingEvent, trackEvent, expectedEvents}) => {
            const logEvent = jest.fn();
            render(
                <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault: true}})}>
                    {renderComponent({trackingEvent, trackEvent})}
                </ThemeContextProvider>
            );

            const target = await screen.findByRole(role, {name: 'Details'});
            await userEvent.click(target);

            expect(logEvent.mock.calls).toEqual(expectedEvents.map((event) => [event]));
        }
    );
});

test('new default events respect a nested TrackingConfig', async () => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'universal-analytics', trackEventsByDefault: true},
            })}
        >
            <TrackingConfig eventFormat="google-analytics-4">
                <Row title="Details" to="#details" />
            </TrackingConfig>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('link', {name: 'Details'}));

    expect(logEvent).toHaveBeenCalledWith({
        name: 'user_interaction',
        component_type: 'row',
        component_copy: 'Details',
    });
});

test('IconButton uses its referenced labels as the event copy', async () => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <span id="action">Show</span>
            <span id="subject">details</span>
            <IconButton Icon={IconStarRegular} aria-labelledby="action subject" onPress={() => {}} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Show details'}));

    expect(logEvent).toHaveBeenCalledWith({
        name: 'user_interaction',
        component_type: 'icon',
        component_copy: 'Show details',
    });
});

test('IconButton resolves referenced labels at press time', async () => {
    const logEvent = jest.fn();
    const iconButton = <IconButton Icon={IconStarRegular} aria-labelledby="subject" onPress={() => {}} />;
    const renderContent = (label: string) => (
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <span id="subject">{label}</span>
            {iconButton}
        </ThemeContextProvider>
    );
    const {rerender} = render(renderContent('Details'));

    rerender(renderContent('Preferences'));
    await userEvent.click(screen.getByRole('button', {name: 'Preferences'}));

    expect(logEvent).toHaveBeenCalledWith({
        name: 'user_interaction',
        component_type: 'icon',
        component_copy: 'Preferences',
    });
});

test('IconButton captures the event copy before asynchronous href navigation', async () => {
    const logEvent = jest.fn();
    const onNavigate = jest.fn().mockResolvedValue(undefined);
    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <span id="destination">Details</span>
            <IconButton
                Icon={IconStarRegular}
                aria-labelledby="destination"
                href="#details"
                onNavigate={onNavigate}
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('link', {name: 'Details'}));

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith({
        name: 'user_interaction',
        component_type: 'icon',
        component_copy: 'Details',
    });
});

test.each([
    {title: 'Title', pretitle: 'Pretitle', description: 'Description', expectedCopy: 'Title'},
    {title: '', pretitle: 'Pretitle', description: 'Description', expectedCopy: 'Pretitle'},
    {title: undefined, pretitle: undefined, description: 'Description', expectedCopy: 'not_apply'},
])(
    'card copy is $expectedCopy for title=$title and pretitle=$pretitle',
    async ({title, pretitle, description, expectedCopy}) => {
        const logEvent = jest.fn();
        render(
            <ThemeContextProvider
                theme={makeTheme({
                    analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
                })}
            >
                <DataCard
                    title={title}
                    pretitle={pretitle}
                    description={description}
                    aria-label="Card details"
                    to="#details"
                />
            </ThemeContextProvider>
        );

        await userEvent.click(screen.getByRole('link', {name: 'Card details'}));

        expect(logEvent).toHaveBeenCalledWith({
            name: 'user_interaction',
            component_type: 'card',
            component_copy: expectedCopy,
        });
    }
);

test('disabled controls and static content do not emit default events', async () => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault: true}})}>
            <IconButton Icon={IconStarRegular} aria-label="Favorite" disabled onPress={() => {}} />
            <IconButton Icon={IconStarRegular} aria-label="Disabled icon link" disabled href="#details" />
            <Row title="Disabled row" disabled onPress={() => {}} />
            <Row title="Disabled row link" disabled href="#details" aria-label="Disabled row link" />
            <Row title="Static row" />
            <DataCard title="Static card" />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Favorite'}));
    await userEvent.click(screen.getByRole('button', {name: 'Disabled row'}));
    fireEvent.click(screen.getByLabelText('Disabled icon link'));
    fireEvent.click(screen.getByLabelText('Disabled row link'));
    await userEvent.click(screen.getByText('Static row'));
    await userEvent.click(screen.getByText('Static card'));

    expect(logEvent).not.toHaveBeenCalled();
});

const popoverCloseEvent = {name: 'user_interaction', component_type: 'icon', component_copy: 'Close details'};

test.each([
    {
        name: 'provider default',
        trackEvent: undefined,
        trackingEvent: undefined,
        expectedEvents: [popoverCloseEvent],
    },
    {name: 'explicit opt-out', trackEvent: false, trackingEvent: undefined, expectedEvents: []},
    {
        name: 'custom event',
        trackEvent: undefined,
        trackingEvent: {name: 'custom_close'},
        expectedEvents: [{name: 'custom_close'}],
    },
])('Popover close button respects the $name', async ({trackEvent, trackingEvent, expectedEvents}) => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <Popover
                trackEvent={trackEvent}
                trackingEvent={trackingEvent}
                open
                target={<span>Target</span>}
                closeButtonLabel="Close details"
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByLabelText('Close details'));

    expect(logEvent.mock.calls).toEqual(expectedEvents.map((event) => [event]));
});

test('segregated card content emits a single event and uses the pretitle when the title is missing', async () => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault: true}})}>
            <DataCard pretitle="Details" to="#details" segregateTouchableContent />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('link', {name: 'Details'}));

    expect(logEvent).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'card_tapped',
        label: 'Details',
    });
});

test.each([
    {
        componentType: 'row',
        renderComponent: () => (
            <Row
                title="Details"
                onPress={() => {}}
                iconButton={{Icon: IconStarRegular, 'aria-label': 'Favorite', onPress: () => {}}}
            />
        ),
    },
    {
        componentType: 'card',
        renderComponent: () => (
            <DataCard
                title="Details"
                onPress={() => {}}
                topActions={[{Icon: IconStarRegular, label: 'Favorite', onPress: () => {}}]}
            />
        ),
    },
])(
    'the $componentType content and its icon action emit separate events',
    async ({componentType, renderComponent}) => {
        const logEvent = jest.fn();
        render(
            <ThemeContextProvider
                theme={makeTheme({
                    analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
                })}
            >
                {renderComponent()}
            </ThemeContextProvider>
        );

        await userEvent.click(screen.getByRole('button', {name: 'Favorite'}));
        expect(logEvent.mock.calls).toEqual([
            [{name: 'user_interaction', component_type: 'icon', component_copy: 'Favorite'}],
        ]);

        await userEvent.click(screen.getByRole('button', {name: 'Details'}));
        expect(logEvent).toHaveBeenCalledTimes(2);
        expect(logEvent).toHaveBeenLastCalledWith({
            name: 'user_interaction',
            component_type: componentType,
            component_copy: 'Details',
        });
    }
);

test('ToggleIconButton tracks the label of the current action on each press', async () => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <ToggleIconButton
                uncheckedProps={{Icon: IconStarRegular, 'aria-label': 'Favorite'}}
                checkedProps={{Icon: IconStarRegular, 'aria-label': 'Unfavorite'}}
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Favorite'}));
    await userEvent.click(screen.getByRole('button', {name: 'Unfavorite'}));

    expect(logEvent.mock.calls).toEqual([
        [{name: 'user_interaction', component_type: 'icon', component_copy: 'Favorite'}],
        [{name: 'user_interaction', component_type: 'icon', component_copy: 'Unfavorite'}],
    ]);
});

test('AiCard uses the complete final text as its event copy', async () => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <AiCard
                text="Explore "
                words={['TV', 'mobile']}
                aria-label="Open recommendations"
                onPress={() => {}}
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Open recommendations'}));

    expect(logEvent).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith({
        name: 'user_interaction',
        component_type: 'card',
        component_copy: 'Explore mobile',
    });
});

test.each([
    {name: 'inherited opt-out', trackEvent: false, actionTrackEvent: undefined, expectedEventCount: 0},
    {name: 'action opt-in', trackEvent: false, actionTrackEvent: true, expectedEventCount: 1},
    {name: 'action opt-out', trackEvent: true, actionTrackEvent: false, expectedEventCount: 0},
])('Message actions respect the $name', async ({trackEvent, actionTrackEvent, expectedEventCount}) => {
    const logEvent = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault: true}})}>
            <Message
                type="incoming"
                contentText="Details"
                trackEvent={trackEvent}
                actions={[
                    {
                        Icon: IconStarRegular,
                        'aria-label': 'Favorite',
                        onPress: () => {},
                        trackEvent: actionTrackEvent,
                    },
                ]}
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Favorite'}));

    expect(logEvent).toHaveBeenCalledTimes(expectedEventCount);
});

test.each([
    {trackEventsByDefault: true, trackEvent: false, expectedEventCount: 0},
    {trackEventsByDefault: false, trackEvent: true, expectedEventCount: 1},
])(
    'Message asset tracks $expectedEventCount events with trackEventsByDefault=$trackEventsByDefault and trackEvent=$trackEvent',
    async ({trackEventsByDefault, trackEvent, expectedEventCount}) => {
        const logEvent = jest.fn();
        render(
            <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault}})}>
                <Message
                    type="incoming"
                    contentText="Details"
                    trackEvent={trackEvent}
                    asset={<IconStarRegular />}
                    onAssetPress={() => {}}
                    assetLabel="Open profile"
                />
            </ThemeContextProvider>
        );

        await userEvent.click(screen.getByRole('button', {name: 'Open profile'}));

        expect(logEvent).toHaveBeenCalledTimes(expectedEventCount);
    }
);

test('switch changes and non-clickable chips do not emit automatic press events', async () => {
    const logEvent = jest.fn();
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent, trackEventsByDefault: true}})}>
            <Switch name="preference" onChange={onChange}>
                Preference
            </Switch>
            <Chip active>Selected filter</Chip>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('switch', {name: 'Preference'}));
    await userEvent.click(screen.getByText('Selected filter'));

    expect(onChange).toHaveBeenCalledWith(true);
    expect(logEvent).not.toHaveBeenCalled();
});
