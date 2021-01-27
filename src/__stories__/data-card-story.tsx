import * as React from 'react';
import {StorySection, useTextField, useSelect} from './helpers';
import {
    Stack,
    DataCard,
    ButtonPrimary,
    ButtonLink,
    Inline,
    Text7,
    createUseStyles,
    ResponsiveLayout,
    IconAcademicLight,
} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/DataCard',
};

export const Default: StoryComponent = () => {
    const [asset, assetSelect] = useSelect('asset', 'icon', ['icon', 'image', 'none']);
    const [headline, headlineTextField] = useTextField('headline', 'priority', true);
    const [pretitle, pretitleTextField] = useTextField('pretitle', 'Some pretitle', true);
    const [title, titleTextField] = useTextField('title', 'Some title', true);
    const [description, descriptionTextField] = useTextField(
        'description',
        'This is a description for the card',
        true
    );
    const [actions, actionsSelect] = useSelect('actions', 'button', [
        'button',
        'link',
        'button & link',
        'none',
    ]);

    const icon = <IconAcademicLight />;
    const image =
        'https://cdn.vox-cdn.com/thumbor/lfpXTYMyJpDlMevYNh0PfJu3M6Q=/39x0:3111x2048/920x613/filters:focal(39x0:3111x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png';

    const button = actions.includes('button') ? (
        <ButtonPrimary small href="https://google.com">
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink href="https://google.com">Link</ButtonLink>
    ) : undefined;

    return (
        <>
            <Stack space={16}>
                {assetSelect}
                {headlineTextField}
                {pretitleTextField}
                {titleTextField}
                {descriptionTextField}
                {actionsSelect}
            </Stack>
            <div data-testid="data-card">
                <StorySection title="DataCard">
                    <DataCard
                        headline={headline}
                        pretitle={pretitle}
                        title={title}
                        description={description}
                        icon={asset === 'icon' ? icon : undefined}
                        iconBackgroundImage={asset === 'image' ? image : undefined}
                        button={button}
                        buttonLink={buttonLink}
                    />
                </StorySection>
            </div>
        </>
    );
};

Default.storyName = 'DataCard';

export const WithBody: StoryComponent = () => (
    <DataCard
        headline="headline"
        pretitle="pretitle"
        title="title"
        description="description"
        body={<Placeholder />}
        icon={<IconAcademicLight />}
        button={
            <ButtonPrimary small href="https://google.com">
                Action
            </ButtonPrimary>
        }
        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
    />
);

WithBody.storyName = 'DataCard with body';

export const WithIconImage: StoryComponent = () => (
    <DataCard
        headline="headline"
        pretitle="pretitle"
        title="title"
        description="description"
        iconBackgroundImage="https://fr.movistar-es-dev.svc.dev.mad.tuenti.io/2sP0YWlvvYakK6rvNvr__TpCfL4OZKPBLO4_KOPY-L2cxWaTloZDB0Q"
        button={
            <ButtonPrimary small href="https://google.com">
                Action
            </ButtonPrimary>
        }
        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
    />
);

WithIconImage.storyName = 'DataCard with icon image';

const useCardGroupStyles = createUseStyles(() => ({
    group: {
        '& > *': {
            width: 300,
        },
    },
}));

export const Group: StoryComponent = () => {
    const classes = useCardGroupStyles();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text7 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom:
                </Text7>
                <Inline space={16} className={classes.group}>
                    <DataCard
                        headline="headline"
                        pretitle="pretitle"
                        title="title"
                        description="description"
                        icon={<IconAcademicLight />}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                    <DataCard
                        title="title"
                        description="description"
                        icon={<IconAcademicLight />}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'DataCard group';
