import * as React from 'react';
import {MediaCard, DataCard, Inline, ButtonPrimary, ButtonLink, IconAcademicLight} from '../../..';

const CardsTest = (): JSX.Element => (
    <Inline space={16}>
        <MediaCard
            imageSrc="using-vr.jpg"
            mediaAspectRatio="16:9"
            headline="headline"
            pretitle="pretitle"
            title="title"
            description="description"
            buttonPrimary={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Action</ButtonLink>}
        />
        <DataCard
            headline="headline"
            title="title"
            subtitle="subtitle"
            description="description"
            asset={<IconAcademicLight />}
            buttonPrimary={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
        />
    </Inline>
);

export default CardsTest;
