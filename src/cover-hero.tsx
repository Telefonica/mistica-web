import * as React from 'react';
import ResponsiveLayout from './responsive-layout';
import Box from './box';
import ButtonGroup from './button-group';
import Stack from './stack';
import {Text3, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import * as styles from './cover-hero.css';

import type {VideoElement, VideoSource} from './video';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type Tag from './tag';
import type {RendersNullableElement} from './utils/renders-element';
import type {Variant} from './theme-variant-context';

type BaseProps = {
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    title: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    rightExtra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

type ImageProps = {
    backgroundImage: string;
};

type VideoProps = {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

type BackgroundColorProps = {
    backgroundColor?: string;
    variant?: Variant;
};

type CoverHeroProps = BaseProps & ExclusifyUnion<ImageProps | VideoProps | BackgroundColorProps>;

const CoverHero = React.forwardRef<HTMLDivElement, CoverHeroProps>((props, ref) => {
    const responsiveLayoutBackground =
        props.backgroundVideo || props.backgroundImage ? 'none' : props.backgroundColor;
    const responsiveLayoutVariant =
        props.backgroundVideo || props.backgroundImage ? 'inverse' : props.variant;

    const image = renderBackgroundImage(backgroundImage);
    const {video, videoAction} = useVideoWithControls(backgroundVideo, poster, backgroundVideoRef);

    return (
        <div ref={ref}>
            <ResponsiveLayout variant={responsiveLayoutVariant} backgroundColor={responsiveLayoutBackground}>
                <Box paddingY={{desktop: 56, mobile: 24}}>
                    <Stack space={24}>
                        <div className={styles.textContainer}>
                            <div>
                                {props.headline && (
                                    <Box paddingBottom={{mobile: 16, desktop: 8}}>{props.headline}</Box>
                                )}
                                <Stack space={16}>
                                    <Stack space={8}>
                                        {props.pretitle && <Text3 regular>{props.pretitle}</Text3>}
                                        <Text8 as={props.titleAs}>{props.title}</Text8>
                                    </Stack>
                                    <div>
                                        <Text3
                                            regular
                                            truncate={props.descriptionLinesMax}
                                            color={vars.colors.textSecondary}
                                        >
                                            {props.description}
                                        </Text3>
                                        {props.extra}
                                    </div>
                                </Stack>
                            </div>
                            {props.rightExtra}
                        </div>
                        <ButtonGroup
                            primaryButton={props.button}
                            secondaryButton={props.secondaryButton}
                            link={props.buttonLink}
                        />
                    </Stack>
                </Box>
            </ResponsiveLayout>
        </div>
    );
});

export default CoverHero;
