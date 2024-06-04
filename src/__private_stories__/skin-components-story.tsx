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
    DisplayMediaCard,
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
    IconButton,
    Hero,
    Timer,
} from '..';
import {InternalIconButton} from '../icon-button';
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

export const Default: StoryComponent<Args> = ({variant}) => {
    return (
        <ResponsiveLayout fullWidth variant={variant}>
            <Box padding={16}>
                <Stack space={32}>
                    <Text2 regular>
                        This story is created to verify how some of the components look like when using
                        different skins
                    </Text2>

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
                    {/** BoxedAccordion */}
                    <BoxedAccordion index={1}>
                        <BoxedAccordionItem
                            asset={<Image src={usingVrImg} width={64} height={64} />}
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
                        icon={<IconBoxLight />}
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

                    {/** DataCard */}
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

                    {/** DisplayMediaCard */}
                    <DisplayMediaCard
                        backgroundImage={usingVrImg}
                        title="Title"
                        pretitle="Pretitle"
                        description="Description"
                        onClose={() => {}}
                        actions={[{label: 'action', Icon: IconLightningRegular, onPress: () => {}}]}
                        button={
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
                        <Chip Icon={IconLightningRegular} active>
                            Active chip
                        </Chip>
                        <Chip badge={10} Icon={IconLightningRegular} active>
                            Active chip with badge
                        </Chip>
                    </Inline>

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

                    {/** TextLink */}
                    <TextLink onPress={() => {}}>This is a text link</TextLink>

                    {/** Skeleton */}
                    <SkeletonText />

                    {/** Titles */}
                    <Inline space={16} alignItems="baseline" wrap>
                        <Title1>Title 1</Title1>
                        <Title2>Title 2</Title2>
                        <Title3>Title 3</Title3>
                    </Inline>

                    {/** Tag */}
                    <Inline space={16} wrap>
                        <Tag type="promo">Promo</Tag>
                        <Tag type="active">Active</Tag>
                        <Tag type="inactive">Inactive</Tag>
                        <Tag type="success">Success</Tag>
                        <Tag type="warning">Warning</Tag>
                        <Tag type="error">Error</Tag>
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

                        <div style={{background: 'black'}}>
                            <InternalIconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 10"
                                type="neutral"
                                isOverMedia
                            />
                        </div>
                        <div style={{background: 'black'}}>
                            <InternalIconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 11"
                                type="brand"
                                isOverMedia
                            />
                        </div>
                        <div style={{background: 'black'}}>
                            <InternalIconButton
                                Icon={IconLightningRegular}
                                aria-label="icon button 12"
                                type="danger"
                                isOverMedia
                            />
                        </div>
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

                    {/** Timer */}
                    <Inline space={16}>
                        <Timer endTimestamp={0} minTimeUnit="seconds" maxTimeUnit="days" />
                        <Timer endTimestamp={0} minTimeUnit="seconds" maxTimeUnit="days" boxed />
                    </Inline>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Components in different skins';
Default.args = {
    variant: 'default',
};
