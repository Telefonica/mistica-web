'use client';
import * as React from 'react';
import {CardActionsGroup, useVideoWithControls} from './card';
import * as styles from './cover-hero.css';
import Image from './image';

import type {ExclusifyUnion} from './utils/utility-types';
import type {VideoElement, VideoSource} from './video';

export type ImageProps = {
    backgroundImage: string;
};

export type VideoProps = {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

export const CoverHeroMedia = ({
    backgroundVideo,
    backgroundImage,
    poster,
    backgroundVideoRef,
}: ExclusifyUnion<ImageProps | VideoProps>): React.ReactElement => {
    const {video, videoAction} = useVideoWithControls(backgroundVideo, poster, backgroundVideoRef);
    return (
        <div className={styles.mediaLayer}>
            {backgroundImage && <Image width="100%" height="100%" src={backgroundImage} />}
            {backgroundVideo && video}
            <div className={styles.mediaOverlay} />
            {videoAction && <CardActionsGroup actions={[videoAction]} variant="media" />}
        </div>
    );
};
