import * as React from 'react';
import {DisplayMediaCard, PosterCard, SnapCard} from '../card';

<SnapCard title="title" />;
<SnapCard title="title" href="/" />;
<SnapCard title="title" to="/" />;
<SnapCard title="title" onPress={() => {}} />;
// @ts-expect-error onPress and href can't be used together
<SnapCard title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<SnapCard title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<SnapCard title="title" href="/" to="/" />;

// @ts-expect-error backgroundImage and backgroundVideo can't be used together
<DisplayMediaCard title="title" backgroundImage="" backgroundVideo="" />;

// @ts-expect-error backgroundImage and backgroundVideo can't be used together
<PosterCard title="title" backgroundImage="" backgroundVideo="" />;

(isTouchable: boolean) => <SnapCard title="title" href={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" to={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" onPress={isTouchable ? () => {} : undefined} />;
