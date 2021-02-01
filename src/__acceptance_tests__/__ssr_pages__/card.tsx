import * as React from 'react';
import {MediaCard, DataCard, Inline, ButtonPrimary, ButtonLink, IconAcademicLight} from '../..';

const CardsTest: React.FC = () => (
    <Inline space={16}>
        <MediaCard
            media={{
                src: 'https://i.imgur.com/flZfkiX.png',
            }}
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
            icon={<IconAcademicLight />}
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
