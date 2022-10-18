import * as React from 'react';
import {Tooltip, Text2, Text1, Stack, useTheme, Placeholder} from '..';
import {StorySection} from './helpers';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';
import IcnInfo from '../icons/icon-info-cvv';
import IconVisa from '../icons/icon-visa';
import IconMastercard from '../icons/icon-mastercard';

export default {
    title: 'Components/Tooltip',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    const description =
        'When working on a project and the customer has not yet delivered the copy, something is missing...';
    return (
        <StorySection title="Tooltip">
            <Text2 medium>Desktop examples:</Text2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: 300,
                }}
            >
                <Tooltip
                    targetLabel="help text"
                    target={<Text2 regular>Tooltip default (bottom)</Text2>}
                    description={description}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<Text2 regular>Tooltip top</Text2>}
                    position="top"
                    description={description}
                    width={360}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<Text2 regular>Tooltip bottom</Text2>}
                    position="bottom"
                    description={description}
                    width={260}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<Text2 regular>Tooltip left</Text2>}
                    position="left"
                    description={description}
                    width={100}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<Text2 regular>Tooltip right</Text2>}
                    position="right"
                    description={description}
                    width={300}
                />
                <Tooltip
                    targetLabel="help text"
                    target={
                        <div style={{textAlign: 'center'}}>
                            <Stack space={0}>
                                <Text2 regular>Tooltip with custom elements</Text2>
                                <Text1 regular color={colors.textSecondary}>
                                    (do not use interactive elements inside)
                                </Text1>
                            </Stack>
                        </div>
                    }
                    position="top"
                    description={description}
                    extra={<Placeholder />}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<Text2 regular>Tooltip without delay</Text2>}
                    description={description}
                    delay={false}
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
                    <Tooltip
                        targetLabel="help text"
                        target={<IconCloseRegular />}
                        position="left"
                        description={description}
                        width={100}
                    />
                    <Tooltip
                        targetLabel="help text"
                        target={<IcnInfo />}
                        position="right"
                        description={description}
                        width={100}
                    />
                    <Tooltip
                        targetLabel="help text"
                        target={<IconVisa />}
                        position="top"
                        description={description}
                        width={100}
                    />
                    <Tooltip
                        targetLabel="help text"
                        target={<IconMastercard />}
                        position="bottom"
                        description={description}
                        width={100}
                    />
                </div>
            </Stack>
        </StorySection>
    );
};

Default.storyName = 'Tooltip';
