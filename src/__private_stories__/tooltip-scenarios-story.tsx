import * as React from 'react';
import {
    Stack,
    Text3,
    Tooltip,
    Placeholder,
    IconShopRegular,
    Title3,
    Grid,
    GridItem,
    SnapCard,
    Circle,
    IconAcademicRegular,
} from '..';
import {vars} from '../skins/skin-contract.css';

export default {
    title: 'Private/Tooltip',
};

export const InsideFixedContainer: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Stack space={8}>
                <Title3>Tooltip inside a fixed container with overflow hidden</Title3>
                <Text3 regular as="p">
                    If the container has fixed position and overflow hidden, the tooltip should be visible and
                    appear next to the target.
                </Text3>
            </Stack>
            <div
                style={{
                    position: 'fixed',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '50%',
                    left: '50%',
                    width: 50,
                    height: 50,
                    border: '1px solid black',
                    overflow: 'hidden',
                }}
            >
                <Tooltip
                    target={
                        <div
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                            tabIndex={0}
                            data-testid="target"
                        >
                            <IconShopRegular style={{display: 'block'}} />
                        </div>
                    }
                    title="Title"
                    description="Description"
                    extra={<Placeholder />}
                />
            </div>
        </Stack>
    );
};

InsideFixedContainer.storyName = 'Inside fixed container';

export const MovingTarget: StoryComponent = () => {
    const [offsetX, setOffsetX] = React.useState(100);
    const [offsetY, setOffsetY] = React.useState(100);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setOffsetX(Math.random() * 300);
            setOffsetY(Math.random() * 300);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Stack space={16}>
            <Stack space={8}>
                <Title3>Tooltip with moving target</Title3>
                <Text3 regular as="p">
                    The tooltip should follow the target position while it's open. Try focusing the target
                    with the keyboard to keep it open.
                </Text3>
            </Stack>
            <div
                style={{
                    width: 300,
                    height: 300,
                    padding: 24,
                    position: 'relative',
                    border: '1px solid black',
                }}
            >
                <Tooltip
                    target={
                        <div
                            style={{
                                position: 'absolute',
                                left: offsetX,
                                top: offsetY,
                                transition: 'all 1s',
                            }}
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                            tabIndex={0}
                        >
                            <IconShopRegular style={{display: 'block'}} />
                        </div>
                    }
                    title="Title"
                    description="This is long long long description"
                />
            </div>
        </Stack>
    );
};

MovingTarget.storyName = 'With moving target';

export const MultipleTooltips: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Stack space={8}>
                <Title3>Interaction between multiple tooltips</Title3>
                <Text3 regular as="p">
                    There will always be at most one active tooltip. Try opening different tooltips with mouse
                    hover and keyboard focus.
                </Text3>
            </Stack>
            <Stack space={0}>
                {Array.from({length: 9}).map((_, index) => (
                    <div key={index} style={{width: 'fit-content'}}>
                        <Tooltip
                            target={
                                <div
                                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                                    tabIndex={0}
                                    data-testid={`target-${index}`}
                                >
                                    <IconShopRegular style={{display: 'block'}} />
                                </div>
                            }
                            title="Title"
                            delay={false}
                            position="right"
                            description="Description"
                        />
                    </div>
                ))}
            </Stack>
        </Stack>
    );
};

MultipleTooltips.storyName = 'Multiple tooltips';

export const WithTargetStyles: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Stack space={8}>
                <Title3>Tooltip with custom CSS styles for the target wrapper</Title3>
                <Text3 regular as="p">
                    Sometimes you may need to style the element that wraps the target content. You can use the
                    targetStyle prop for this.
                </Text3>
            </Stack>
            <Grid columns={2} gap={8}>
                <GridItem>
                    <Tooltip
                        targetStyle={{height: '100%'}}
                        position="bottom"
                        target={
                            <SnapCard
                                dataAttributes={{testid: 'target-0'}}
                                asset={
                                    <Circle size={40} backgroundColor={vars.colors.brandLow}>
                                        <IconAcademicRegular color={vars.colors.brand} />
                                    </Circle>
                                }
                                description="Description description description description description description description description description description description description description description description description description description description description"
                                title="Title"
                            />
                        }
                        title="Title"
                        description="Description"
                    />
                </GridItem>
                <GridItem>
                    <Tooltip
                        targetStyle={{height: '100%'}}
                        position="bottom"
                        target={
                            <SnapCard
                                dataAttributes={{testid: 'target-1'}}
                                asset={
                                    <Circle size={40} backgroundColor={vars.colors.brandLow}>
                                        <IconAcademicRegular color={vars.colors.brand} />
                                    </Circle>
                                }
                                title="Title"
                                description="Description"
                            />
                        }
                        title="Title"
                        description="Description"
                    />
                </GridItem>
            </Grid>
        </Stack>
    );
};

WithTargetStyles.storyName = 'With custom styles for target';
