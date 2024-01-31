import * as React from 'react';
import {
    ResponsiveLayout,
    Stack,
    Box,
    Text2,
    Accordion,
    AccordionItem,
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
} from '..';
import avatarImg from '../__stories__/images/avatar.jpg';

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
                <Stack space={16}>
                    <Text2 regular>
                        This story is created to verify how some of the components look like when using
                        different skins
                    </Text2>
                    <Stack space={16}>
                        {/** Accordion */}
                        <Accordion>
                            <AccordionItem
                                title="Title 1"
                                content={
                                    <Text2 regular color={skinVars.colors.textSecondary}>
                                        Content 2
                                    </Text2>
                                }
                            />
                            <AccordionItem
                                title="Title 2"
                                content={
                                    <Text2 regular color={skinVars.colors.textSecondary}>
                                        Content 2
                                    </Text2>
                                }
                            />
                        </Accordion>

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
                            <Avatar initials="MK" size={64} />
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

                        {/** ButtonPrimary */}
                        <Inline space={16} alignItems="center">
                            <ButtonPrimary
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                            >
                                Button
                            </ButtonPrimary>
                            <ButtonPrimary showSpinner loadingText="Loading" onPress={() => {}}>
                                Button
                            </ButtonPrimary>
                            <ButtonPrimary
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                                small
                            >
                                Button
                            </ButtonPrimary>
                        </Inline>

                        {/** ButtonSecondary */}
                        <Inline space={16} alignItems="center">
                            <ButtonSecondary
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                            >
                                Button
                            </ButtonSecondary>
                            <ButtonSecondary showSpinner loadingText="Loading" onPress={() => {}}>
                                Button
                            </ButtonSecondary>
                            <ButtonSecondary
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                                small
                            >
                                Button
                            </ButtonSecondary>
                        </Inline>

                        {/** ButtonDanger */}
                        <Inline space={16} alignItems="center">
                            <ButtonDanger
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                            >
                                Button
                            </ButtonDanger>
                            <ButtonDanger showSpinner loadingText="Loading" onPress={() => {}}>
                                Button
                            </ButtonDanger>
                            <ButtonDanger
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                                small
                            >
                                Button
                            </ButtonDanger>
                        </Inline>

                        {/** ButtonLink */}
                        <Inline space={16} alignItems="center">
                            <ButtonLink
                                StartIcon={IconPhotoCameraRegular}
                                EndIcon={IconPhotoCameraRegular}
                                onPress={() => {}}
                            >
                                Button
                            </ButtonLink>
                            <ButtonLink showSpinner loadingText="Loading" onPress={() => {}}>
                                Button
                            </ButtonLink>
                            <ButtonLink href="https://www.google.com/">Button</ButtonLink>
                        </Inline>

                        {/** Callout */}
                        <Callout
                            icon={<IconBoxLight />}
                            onClose={() => {}}
                            title="Title"
                            description="Description"
                        />
                    </Stack>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Components in different skins';
Default.args = {
    inverse: false,
};
