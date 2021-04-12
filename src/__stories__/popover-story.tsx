import * as React from 'react';
import {StorySection} from './helpers';
import {Popover, Text2, Stack, useTheme} from '..';
import IcnClose from '../icons/icon-close';

export default {
    title: 'Components/Hints/Popover',
    component: Popover,
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    const description =
        'When working on a project and the customer has not yet delivered the copy, something is missing...';

    return (
        <StorySection title="Popover">
            <Text2 medium>Desktop examples:</Text2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: 1300,
                }}
            >
                <Popover
                    target={<Text2 regular>Popover with only description</Text2>}
                    description={description}
                />
                <Popover
                    target={<Text2 regular>Popover with title</Text2>}
                    title="default"
                    description={description}
                />
                <Popover
                    target={<Text2 regular>Popover with Icon</Text2>}
                    title="default"
                    asset={
                        <img width={40} src="https://imrl.tuenti.net/1gIGjpc4i4R8x6O0HA-AmhQA" alt="asset" />
                    }
                    description={description}
                />
                <Popover
                    target={<Text2 regular>Popover default (bottom)</Text2>}
                    title="default"
                    description={description}
                />
                <Popover
                    target={<Text2 regular>Popover right</Text2>}
                    position="right"
                    title="right"
                    description={description}
                    width={300}
                />
                <Popover
                    target={<Text2 regular>Popover top</Text2>}
                    position="top"
                    title="top"
                    description={description}
                    width={360}
                />
                <Popover
                    target={<Text2 regular>Popover left</Text2>}
                    position="left"
                    title="left"
                    description={description}
                    width={200}
                />
            </div>
            <div style={{width: 600}} />
            <Stack space={16}>
                <Text2 medium>Mobile examples: (look on mobile mode)</Text2>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        paddingTop: 20,
                        borderTop: `1px solid ${colors.border}`,
                    }}
                >
                    <Popover
                        target={<IcnClose />}
                        position="left"
                        title="left"
                        description={description}
                        width={150}
                    />
                    <Popover
                        target={<IcnClose />}
                        position="right"
                        title="right"
                        description={description}
                        width={150}
                    />
                </div>
            </Stack>
        </StorySection>
    );
};

Default.storyName = 'Popover';
