import * as React from 'react';
import {CoverHero, Tag, ButtonPrimary, Placeholder} from '../../..';

const CarouselTest = (): JSX.Element => (
    <CoverHero
        backgroundImage="using-vr.jpg"
        headline={<Tag type="active">Novedad</Tag>}
        pretitle="Conecta Max"
        title="Vuela con la Fibra 1Gb"
        description="Para teletrabajar, ver series y películas y además, tener varios dispositivos conectados."
        button={<ButtonPrimary fake>Lo quiero</ButtonPrimary>}
        extra={<Placeholder />}
        sideExtra={<Placeholder />}
    />
);

export default CarouselTest;
