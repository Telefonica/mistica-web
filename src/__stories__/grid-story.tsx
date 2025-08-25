import * as React from 'react';
import {
    Grid,
    GridItem,
    Stack,
    Box,
    SnapCard,
    Circle,
    IconAcademicRegular,
    skinVars,
    ResponsiveLayout,
    Title1,
} from '..';

export default {
    title: 'Layout/Grid',
    component: Stack,
    argTypes: {
        gap: {
            options: [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    gap: React.ComponentProps<typeof Grid>['gap'];
};

export const Default: StoryComponent<Args> = ({gap}) => (
    <ResponsiveLayout>
        <Box paddingY={24}>
            <Stack space={32}>
                <Stack space={16}>
                    <Title1 id="example-1">Example 1</Title1>
                    <Grid as="ul" aria-labelledby="example-1" columns={3} rows={3} gap={gap}>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 1"
                                subtitle="Subtitle 1"
                            />
                        </GridItem>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 2"
                                subtitle="Subtitle 2"
                            />
                        </GridItem>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 3"
                                subtitle="Subtitle 3"
                            />
                        </GridItem>
                        <GridItem as="li" columnSpan={2}>
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 4"
                                subtitle="Subtitle 4"
                            />
                        </GridItem>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 5"
                                subtitle="Subtitle 5"
                            />
                        </GridItem>
                        <GridItem as="li" columnSpan="full">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 6"
                                subtitle="Subtitle 6"
                            />
                        </GridItem>
                    </Grid>
                </Stack>

                <Stack space={16}>
                    <Title1 id="example-2">Example 2</Title1>
                    <Grid as="ul" aria-labelledby="example-2" columns={3} rows={3} gap={gap}>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 1"
                                subtitle="Subtitle 1"
                            />
                        </GridItem>
                        <GridItem as="li" rowSpan={2}>
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 2"
                                subtitle="Subtitle 2"
                            />
                        </GridItem>
                        <GridItem as="li" rowSpan={3}>
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 3"
                                subtitle="Subtitle 3"
                            />
                        </GridItem>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 4"
                                subtitle="Subtitle 4"
                            />
                        </GridItem>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 5"
                                subtitle="Subtitle 5"
                            />
                        </GridItem>
                        <GridItem as="li">
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 6"
                                subtitle="Subtitle 6"
                            />
                        </GridItem>
                    </Grid>
                </Stack>

                <Stack space={16}>
                    <Title1 id="example-3">Example 3</Title1>
                    <Grid as="ul" aria-labelledby="example-3" columns={3} rows={3} gap={gap}>
                        <GridItem as="li" columnSpan={2}>
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 1"
                                subtitle="Subtitle 1"
                            />
                        </GridItem>
                        <GridItem as="li" rowSpan={3}>
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 2"
                                subtitle="Subtitle 2"
                            />
                        </GridItem>
                        <GridItem as="li" rowSpan={2} columnSpan={2}>
                            <SnapCard
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconAcademicRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                                title="Title 3"
                                subtitle="Subtitle 3"
                            />
                        </GridItem>
                    </Grid>
                </Stack>
            </Stack>
        </Box>
    </ResponsiveLayout>
);

Default.storyName = 'Grid';

Default.args = {
    gap: 16,
};

type AutoColumnsArgs = {
    gap: React.ComponentProps<typeof Grid>['gap'];
    columnsMinSize: number;
    numItems: number;
};

export const AutoColumns: StoryComponent<AutoColumnsArgs> = ({gap, columnsMinSize, numItems}) => (
    <ResponsiveLayout>
        <Box paddingY={24}>
            <Grid columns={{minSize: columnsMinSize}} gap={gap}>
                {Array.from({length: numItems}, (_, idx) => (
                    <SnapCard
                        key={idx}
                        asset={
                            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                <IconAcademicRegular color={skinVars.colors.brand} />
                            </Circle>
                        }
                        title={`Title ${idx + 1}`}
                        subtitle="Subtitle"
                    />
                ))}
            </Grid>
        </Box>
    </ResponsiveLayout>
);

AutoColumns.storyName = 'Auto columns';
AutoColumns.args = {
    gap: 16,
    columnsMinSize: 100,
    numItems: 10,
};
