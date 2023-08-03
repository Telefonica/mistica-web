import * as React from 'react';
import {ButtonPrimary} from '../button';
import {DisplayMediaCard, NakedCard, PosterCard, SmallNakedCard, SnapCard} from '../card';
import Image from '../image';

<SnapCard title="title" />;
<SnapCard title="title" href="/" />;
<SnapCard title="title" to="/" />;
<SnapCard title="title" onPress={() => {}} />;
<SnapCard title="title" onPress={() => {}} trackingEvent={{name: 'do-something'}} />;
// @ts-expect-error onPress and href can't be used together
<SnapCard title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<SnapCard title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<SnapCard title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<SnapCard title="title" trackingEvent={{name: 'do-something'}} />;

// @ts-expect-error backgroundImage and backgroundVideo can't be used together
<DisplayMediaCard title="title" backgroundImage="" backgroundVideo="" />;

<PosterCard backgroundImage="background.png" title="title" />;
<PosterCard backgroundVideo="background.mp4" title="title" />;
<PosterCard backgroundImage="background.png" title="title" href="/" />;
<PosterCard backgroundImage="background.png" title="title" to="/" />;
<PosterCard backgroundImage="background.png" title="title" onPress={() => {}} />;
<PosterCard
    backgroundImage="background.png"
    title="title"
    onPress={() => {}}
    trackingEvent={{name: 'do-something'}}
/>;
<PosterCard title="title" isInverse />;
<PosterCard title="title" variant="inverse" />;
<PosterCard title="title" variant="alternative" />;
<PosterCard title="title" isInverse backgroundColor="red" />;
<PosterCard title="title" variant="inverse" backgroundColor="red" />;

// @ts-expect-error onPress and href can't be used together
<PosterCard title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<PosterCard title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<PosterCard title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<PosterCard title="title" trackingEvent={{name: 'do-something'}} />;
// @ts-expect-error backgroundImage and backgroundVideo can't be used together
<PosterCard title="title" backgroundImage="" backgroundVideo="" />;
// @ts-expect-error backgroundImage and backgroundColor can't be used together
<PosterCard title="title" backgroundImage="" backgroundColor="" />;
// @ts-expect-error backgroundVideo and backgroundColor can't be used together
<PosterCard title="title" backgroundVideo="" backgroundColor="" />;
// @ts-expect-error backtroundColor, backgroundImage or backgroundVideo are mandatory
<PosterCard title="title" />;
// @ts-expect-error if you set a custom backgroundColor, you should specify the variant
<PosterCard title="title" backgroundColor="red" />;

(isTouchable: boolean) => <SnapCard title="title" href={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" to={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" onPress={isTouchable ? () => {} : undefined} />;

<NakedCard media={<Image src="/something.png" />} title="title" />;
<NakedCard
    media={<Image src="/something.png" />}
    title="title"
    button={<ButtonPrimary href="/action">Action</ButtonPrimary>}
/>;
<NakedCard media={<Image src="/something.png" />} title="title" href="/" />;
<NakedCard media={<Image src="/something.png" />} title="title" to="/" />;
<NakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} />;
<NakedCard
    media={<Image src="/something.png" />}
    title="title"
    onPress={() => {}}
    trackingEvent={{name: 'do-something'}}
/>;
// @ts-expect-error onPress and href can't be used together
<NakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<NakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<NakedCard media={<Image src="/something.png" />} title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<NakedCard media={<Image src="/something.png" />} title="title" trackingEvent={{name: 'do-something'}} />;

<SmallNakedCard media={<Image src="/something.png" />} title="title" />;
<SmallNakedCard media={<Image src="/something.png" />} title="title" href="/" />;
<SmallNakedCard media={<Image src="/something.png" />} title="title" to="/" />;
<SmallNakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} />;
<SmallNakedCard
    media={<Image src="/something.png" />}
    title="title"
    onPress={() => {}}
    trackingEvent={{name: 'do-something'}}
/>;
// @ts-expect-error onPress and href can't be used together
<SmallNakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<SmallNakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<SmallNakedCard media={<Image src="/something.png" />} title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<SmallNakedCard
    media={<Image src="/something.png" />}
    title="title"
    trackingEvent={{name: 'do-something'}}
/>;
