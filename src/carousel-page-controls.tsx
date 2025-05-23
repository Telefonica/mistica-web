'use client';
import * as React from 'react';
import {useCarouselContext, InternalCarouselPageControls} from './carousel';

import type {CarouselPageControlsProps} from './carousel';

export const CarouselPageControls = ({bleedLeft, bleedRight}: CarouselPageControlsProps): JSX.Element => {
    const controls = useCarouselContext();
    const {goPrev, goNext, prevArrowEnabled, nextArrowEnabled} = controls;
    return (
        <InternalCarouselPageControls
            goPrev={goPrev}
            goNext={goNext}
            bleedLeft={bleedLeft}
            bleedRight={bleedRight}
            prevArrowEnabled={prevArrowEnabled}
            nextArrowEnabled={nextArrowEnabled}
        />
    );
};
