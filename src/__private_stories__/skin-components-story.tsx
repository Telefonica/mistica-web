import * as React from 'react';
import {
    ResponsiveLayout,
    Stack,
    Box,
    Text2,
    skinVars,
    BoxedAccordion,
    BoxedAccordionItem,
    Inline,
    Avatar,
    NavigationBreadcrumbs,
    ButtonPrimary,
    IconPhotoCameraRegular,
    ButtonSecondary,
    ButtonDanger,
    ButtonLink,
    Callout,
    IconBoxLight,
    DataCard,
    IconLightningRegular,
    ButtonLinkDanger,
    PageBullets,
    Checkbox,
    Chip,
    Counter,
    TextField,
    ProgressBar,
    RadioButton,
    RadioGroup,
    Slider,
    Stepper,
    Switch,
    Tag,
    TextLink,
    RowList,
    Row,
    Image,
    SkeletonText,
    Title1,
    Title2,
    Title3,
    Title4,
    IconButton,
    Hero,
    Table,
    Timer,
    HeaderLayout,
    Header,
    Placeholder,
    NegativeBox,
    IconInvoicePlanFileRegular,
    Meter,
    Timeline,
    TimelineItem,
    IconShopRegular,
    CoverCard,
} from '..';
import avatarImg from '../__stories__/images/avatar.jpg';
import usingVrImg from '../__stories__/images/using-vr.jpg';

export default {
    title: 'Private/Components in different skins',
    argTypes: {
        variant: {
            options: ['default', 'inverse', 'alternative'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    variant: 'default' | 'inverse' | 'alternative';
};

const ComponentsGroup = ({children}: {children: React.ReactNode}): JSX.Element => {
    return (
        <Stack space={32} dataAttributes={{testid: `components-group`}}>
            {children}
        </Stack>
    );
};

export const Default: StoryComponent<Args> = ({variant}) => {
    // Only show inverse header when the rest of the screen is default
    const inverseHeader = variant === 'default';
    return (
        <ResponsiveLayout variant={variant}>
            <Box paddingTop={inverseHeader ? 0 : {mobile: 32, desktop: 48}} paddingBottom={16}>
                <Stack space={32}>
                    <ComponentsGroup>
                        {/** Header */}
                        <HeaderLayout
                            isInverse={inverseHeader}
                            bleed
                            header={
                                <Header
                                    title="Components in different skins"
                                    description="This story is created to verify how some of the components look like when using
                        different skins"
                                />
                            }
                            extra={<Placeholder />}
                            noPaddingY={!inverseHeader}
                        />

                        {/** Row */}
                        <NegativeBox>
                            <RowList>
                                <Row
                                    title="Title 1"
                                    subtitle="Subtitle"
                                    description="Description"
                                    href="https://www.google.com/"
                                />
                                <Row
                                    title="Title 2"
                                    subtitle="Subtitle"
                                    description="Description"
                                    href="https://www.google.com/"
                                />
                            </RowList>
                        </NegativeBox>

                        {/** BoxedAccordion */}
                        <BoxedAccordion index={1}>
                            <BoxedAccordionItem
                                asset={<IconInvoicePlanFileRegular />}
                                title="Title 1"
                                content={
                                    <Text2 regular color={skinVars.colors.textSecondary}>
                                        Content 2
                                    </Text2>
                                }
                            />
                            <BoxedAccordionItem
                                title="Title 2"
                                content={
                                    <Text2 regular color={skinVars.colors.textSecondary}>
                                        Content 2
                                    </Text2>
                                }
                            />
                        </BoxedAccordion>

                        {/** Avatar */}
                        <Inline space={16} alignItems="center" wrap>
                            <Avatar src={avatarImg} size={64} badge={5} />
                            <Avatar size={64} />
                            <Avatar initials="MK" size={64} border />
                        </Inline>

                        {/** Breadcrumbs */}
                        <NavigationBreadcrumbs
                            title="Subsection"
                            breadcrumbs={[
                                {title: 'Home', url: 'https://example.org?path=home'},
                                {title: 'Section', url: 'https://example.org?path=section'},
                            ]}
                        />

                        {/** Callout */}
                        <Callout
                            asset={<IconBoxLight />}
                            onClose={() => {}}
                            title="Title"
                            description="Description"
                            button={
                                <ButtonSecondary
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    ButtonSecondary
                                </ButtonSecondary>
                            }
                        />
                    </ComponentsGroup>

                    <ComponentsGroup>
                        <DataCard
                            title="Title"
                            subtitle="Subtitle"
                            pretitle="Pretitle"
                            description="Description"
                            onClose={() => {}}
                            actions={[{label: 'action', Icon: IconLightningRegular, onPress: () => {}}]}
                            button={
                                <ButtonPrimary
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    Button
                                </ButtonPrimary>
                            }
                            buttonLink={
                                <ButtonLink
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    Link
                                </ButtonLink>
                            }
                        />

                        <CoverCard
                            size="display"
                            imageSrc={usingVrImg}
                            title="Title"
                            pretitle="Pretitle"
                            description="Description"
                            onClose={() => {}}
                            topActions={[{label: 'action', Icon: IconLightningRegular, onPress: () => {}}]}
                            buttonPrimary={
                                <ButtonDanger
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    ButtonDanger
                                </ButtonDanger>
                            }
                            buttonLink={
                                <ButtonLinkDanger
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    LinkDanger
                                </ButtonLinkDanger>
                            }
                        />

                        <CoverCard
                            size="display"
                            imageSrc={usingVrImg}
                            title="Title"
                            pretitle="Pretitle"
                            description="Description"
                            onClose={() => {}}
                            topActions={[{label: 'action', Icon: IconLightningRegular, onPress: () => {}}]}
                            buttonPrimary={
                                <ButtonPrimary
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    ButtonPrimary
                                </ButtonPrimary>
                            }
                            buttonLink={
                                <ButtonLink
                                    StartIcon={IconPhotoCameraRegular}
                                    EndIcon={IconPhotoCameraRegular}
                                    onPress={() => {}}
                                >
                                    ButtonLink
                                </ButtonLink>
                            }
                        />

                        {/** Carousel page bullets */}
                        <PageBullets currentIndex={2} numPages={10} />

                        {/** Checkbox */}
                        <Inline space={16} wrap>
                            <Checkbox name="checkbox 1">Unchecked</Checkbox>

                            <Checkbox name="checkbox 2" defaultChecked>
                                Checked
                            </Checkbox>

                            <Checkbox name="checkbox 3" defaultChecked disabled>
                                Disabled
                            </Checkbox>
                        </Inline>

                        {/** RadioButton */}
                        <RadioGroup name="radio-group" defaultValue="1">
                            <Inline space={16} wrap>
                                <RadioButton value="1">First</RadioButton>
                                <RadioButton value="2">Second</RadioButton>
                            </Inline>
                        </RadioGroup>

                        <Inline space={16} wrap>
                            <Switch name="switch 1">Unchecked</Switch>

                            <Switch name="switch 2" checked>
                                Checked
                            </Switch>

                            <Switch name="switch 3" disabled>
                                Disabled
                            </Switch>
                        </Inline>

                        {/** Chip */}
                        <Inline space={16} wrap>
                            <Chip badge={10} Icon={IconLightningRegular}>
                                Default chip
                            </Chip>
                            <Chip Icon={IconLightningRegular} active>
                                Active chip
                            </Chip>
                            <Chip badge={10} Icon={IconLightningRegular} active>
                                Active chip with badge
                            </Chip>
                        </Inline>
                    </ComponentsGroup>

                    <ComponentsGroup>
                        {/** Counter */}
                        <Inline space={16} wrap>
                            <Counter min={0} max={10} defaultValue={10} />
                            <Counter min={0} max={10} defaultValue={0} onRemove={() => {}} />
                        </Inline>

                        {/** TextField */}
                        <TextField
                            name="text"
                            label="Label"
                            defaultValue="Value"
                            prefix="Prefix"
                            error
                            optional
                            endIcon={<IconLightningRegular />}
                            helperText="Helper text"
                        />

                        {/** ProgressBar */}
                        <ProgressBar progressPercent={50} />

                        {/** Slider */}
                        <Slider name="slider" aria-label="label" min={0} max={100} defaultValue={50} />

                        {/** Stepper */}
                        <Stepper
                            currentIndex={2}
                            aria-label="label"
                            steps={['First', 'Second', 'Third', 'Fourth', 'Fifth']}
                        />

                        {/** Meter */}
                        <Inline space={16}>
                            <Meter
                                width={200}
                                type="linear"
                                values={[30, 30, 0]}
                                arial-label="linear meter"
                            />
                            <Meter
                                width={200}
                                type="angular"
                                values={[30, 30, 0]}
                                arial-label="angular meter"
                            />
                            <Meter
                                width={200}
                                type="circular"
                                values={[30, 30, 0]}
                                arial-label="circular meter"
                            />
                        </Inline>

                        {/** TextLink */}
                        <TextLink onPress={() => {}}>This is a text link</TextLink>
                    </ComponentsGroup>

                    <ComponentsGroup>
                        {/** Skeleton */}
                        <SkeletonText />

                        {/** Titles */}
                        <Inline space={16} alignItems="baseline" wrap>
                            <Title1>Title 1</Title1>
                            <Title2>Title 2</Title2>
                            <Title3>Title 3</Title3>
                            <Title4>Title 4</Title4>
                        </Inline>

                        {/** Tag */}
                        <Inline space={16} wrap>
                            <Tag type="promo">Promo</Tag>
                            <Tag type="active">Active</Tag>
                            <Tag type="inactive">Inactive</Tag>
                            <Tag type="success">Success</Tag>
                            <Tag type="warning">Warning</Tag>
                            <Tag type="error">Error</Tag>
                            <Tag type="info">Info</Tag>
                        </Inline>

                        {/** IconButton */}
                        <Inline space={16} wrap>
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 1"
                                type="neutral"
                                backgroundType="transparent"
                            />
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 2"
                                type="neutral"
                                backgroundType="soft"
                            />
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 3"
                                type="neutral"
                                backgroundType="solid"
                            />

                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 4"
                                type="brand"
                                backgroundType="transparent"
                            />
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 5"
                                type="brand"
                                backgroundType="soft"
                            />
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 6"
                                type="brand"
                                backgroundType="solid"
                            />

                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 7"
                                type="danger"
                                backgroundType="transparent"
                            />
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 8"
                                type="danger"
                                backgroundType="soft"
                            />
                            <IconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 9"
                                type="danger"
                                backgroundType="solid"
                            />
                        </Inline>

                        {/** Hero */}
                        <Hero
                            background="none"
                            media={<Image src={usingVrImg} aspectRatio="16:9" />}
                            noPaddingY
                            headline={<Tag>headline</Tag>}
                            pretitle="pretitle"
                            title="title"
                            description="description"
                            button={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
                            buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
                        />

                        {/** Table */}
                        <Table
                            heading={[
                                'Type of food',
                                'Calories',
                                'Tasty Factor',
                                'Average Price',
                                'Rarity',
                                'Average Rating',
                            ]}
                            content={[
                                ['Slice of pizza', '450', '95%', '5,00€', <Tag>Common</Tag>, '8/10'],
                                ['Hamburger', '350', '87%', '3,50€', <Tag>Common</Tag>, '7.5/10'],
                                ['Salad', '150', '70%', '4,00€', <Tag>Common</Tag>, '6/10'],
                                ['Sushi', '200', '90%', '12,00€', <Tag type="warning">Rare</Tag>, '9/10'],
                                ['Ice cream', '350', '95%', '3,00€', <Tag>Common</Tag>, '8/10'],
                            ]}
                        />
                        <Table
                            boxed
                            heading={[
                                'Type of food',
                                'Calories',
                                'Tasty Factor',
                                'Average Price',
                                'Rarity',
                                'Average Rating',
                            ]}
                            content={[
                                ['Slice of pizza', '450', '95%', '5,00€', <Tag>Common</Tag>, '8/10'],
                                ['Hamburger', '350', '87%', '3,50€', <Tag>Common</Tag>, '7.5/10'],
                                ['Salad', '150', '70%', '4,00€', <Tag>Common</Tag>, '6/10'],
                                ['Sushi', '200', '90%', '12,00€', <Tag type="warning">Rare</Tag>, '9/10'],
                                ['Ice cream', '350', '95%', '3,00€', <Tag>Common</Tag>, '8/10'],
                            ]}
                        />

                        {/** Timer */}
                        <Inline space={16}>
                            <Timer endTimestamp={0} minTimeUnit="seconds" maxTimeUnit="days" />
                            <Timer endTimestamp={0} minTimeUnit="seconds" maxTimeUnit="days" boxed />
                        </Inline>
                        <Timeline>
                            <TimelineItem state="completed">
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="active">
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="inactive">
                                <Placeholder />
                            </TimelineItem>
                        </Timeline>
                        <Timeline orientation="horizontal">
                            <TimelineItem state="completed">
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="active">
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="inactive">
                                <Placeholder />
                            </TimelineItem>
                        </Timeline>
                        <Timeline>
                            <TimelineItem state="completed" asset={{kind: 'number'}}>
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="active" asset={{kind: 'number', number: 2}}>
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="inactive" asset={{kind: 'number', number: 3}}>
                                <Placeholder />
                            </TimelineItem>
                        </Timeline>
                        <Timeline>
                            <TimelineItem state="completed" asset={{kind: 'icon'}}>
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="active" asset={{kind: 'icon', Icon: IconShopRegular}}>
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem state="inactive" asset={{kind: 'icon', Icon: IconShopRegular}}>
                                <Placeholder />
                            </TimelineItem>
                        </Timeline>
                        <Timeline>
                            <TimelineItem state="completed" asset={{kind: 'circled-icon'}}>
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem
                                state="active"
                                asset={{kind: 'circled-icon', Icon: IconShopRegular}}
                            >
                                <Placeholder />
                            </TimelineItem>
                            <TimelineItem
                                state="inactive"
                                asset={{kind: 'circled-icon', Icon: IconShopRegular}}
                            >
                                <Placeholder />
                            </TimelineItem>
                        </Timeline>
                    </ComponentsGroup>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Components in different skins';
Default.args = {
    variant: 'default',
};
