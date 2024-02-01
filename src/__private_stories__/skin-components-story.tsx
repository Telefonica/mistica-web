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
    IconCloseRegular,
    TextLink,
} from '..';
import avatarImg from '../__stories__/images/avatar.jpg';
import usingVrImg from '../__stories__/images/using-vr.jpg';

export default {
    title: 'Private/Components in different skins',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({inverse}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <Stack space={32}>
                    <Text2 regular>
                        This story is created to verify how some of the components look like when using
                        different skins
                    </Text2>

                    {/** BoxedAccordion */}
                    <BoxedAccordion>
                        <BoxedAccordionItem
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
                    <Inline space={16} alignItems="center">
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
                        headline="Headline"
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
                        headline={
                            <Tag type="error" Icon={IconCloseRegular}>
                                Headline
                            </Tag>
                        }
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
                    <Inline space={16}>
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
                        <Inline space={16}>
                            <RadioButton value="1">First</RadioButton>
                            <RadioButton value="2">Second</RadioButton>
                        </Inline>
                    </RadioGroup>

                    <Inline space={16}>
                        <Switch name="switch 1">Unchecked</Switch>

                        <Switch name="switch 2" checked>
                            Checked
                        </Switch>

                        <Switch name="switch 3" disabled>
                            Disabled
                        </Switch>
                    </Inline>

                    {/** Chip */}
                    <Inline space={16}>
                        <Chip Icon={IconLightningRegular} active>
                            Active chip
                        </Chip>
                        <Chip badge={10} Icon={IconLightningRegular} active>
                            Active chip with badge
                        </Chip>
                    </Inline>

                    {/** Counter */}
                    <Inline space={16}>
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
                    <Slider name="slider" min={0} max={100} defaultValue={50} />

                    {/** Stepper */}
                    <Stepper currentIndex={2} steps={['First', 'Second', 'Third', 'Fourth', 'Fifth']} />

                    {/** TextLink */}
                    <TextLink onPress={() => {}}>This is a text link</TextLink>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Components in different skins';
Default.args = {
    inverse: false,
};
