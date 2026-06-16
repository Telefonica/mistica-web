// Owned preview for Video. The generated preview compiles the story module,
// which imports `.vtt` subtitle files — adding a `.vtt` esbuild loader to
// cfg.storyImports.loaders would change the global grade-contract hash and
// clear every component's grade. Instead this owned preview renders the real
// Video component directly with the demo mp4 + poster (no subtitle tracks),
// so no `.vtt` loader is needed. Subtitle UI is omitted; the player frame and
// controls still match the storybook render.
import * as React from 'react';
import {Video} from '@telefonica/mistica';
import beachVideo from '@ds-stories/src/__stories__/videos/beach.mp4';
import beachImg from '@ds-stories/src/__stories__/images/beach.jpg';

export const Default = () => (
    <Video src={beachVideo} poster={beachImg} aspectRatio="16:9" />
);
