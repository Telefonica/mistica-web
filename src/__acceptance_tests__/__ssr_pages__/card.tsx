import * as React from 'react';
import {MediaCard, DataCard, Inline, Image, ButtonPrimary, ButtonLink, IconAcademicLight} from '../../..';

const CardsTest = (): JSX.Element => (
    <Inline space={16}>
        <MediaCard
            media={<Image aspectRatio="16:9" src="using-vr.jpg" />}
            headline="headline"
            pretitle="pretitle"
            title="title"
            description="description"
            button={
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
            button={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
        />
    </Inline>
);

export default CardsTest;
