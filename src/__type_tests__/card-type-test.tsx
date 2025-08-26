import * as React from 'react';
import {ButtonPrimary} from '../button';
import {DataCard, SnapCard} from '../card-data';
import {DisplayMediaCard, PosterCard, CoverCard} from '../card-cover';
import {NakedCard, SmallNakedCard} from '../card-naked';
import Image from '../image';
import {MediaCard} from '../card-media';

<SnapCard title="title" />;
<SnapCard title="title" href="/" />;
<SnapCard title="title" to="/" />;
<SnapCard title="title" onPress={() => {}} />;
<SnapCard title="title" onPress={() => {}} trackingEvent={{name: 'do-something'}} role="link" />;
// @ts-expect-error onPress and href can't be used together
<SnapCard title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<SnapCard title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<SnapCard title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<SnapCard title="title" trackingEvent={{name: 'do-something'}} />;

<DisplayMediaCard title="title" backgroundImage={{src: 'test', srcSet: 'test'}} />;
<DisplayMediaCard title="title" backgroundImage={{src: undefined, srcSet: 'test'}} />;
<DisplayMediaCard title="title" backgroundImage={{src: 'test', srcSet: undefined}} />;

// @ts-expect-error backgroundImage and backgroundVideo can't be used together
<DisplayMediaCard title="title" backgroundImage="" backgroundVideo="" />;
// @ts-expect-error backgroundImage should have src or srcSet
<DisplayMediaCard title="title" backgroundImage={{src: undefined, srcSet: undefined}} />;

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
    role="link"
/>;
<PosterCard title="title" isInverse />;
<PosterCard title="title" variant="inverse" />;
<PosterCard title="title" variant="alternative" />;
<PosterCard title="title" isInverse backgroundColor="red" />;
<PosterCard title="title" variant="inverse" backgroundColor="red" />;
<PosterCard title="title" backgroundImage={{src: 'test', srcSet: 'test'}} />;
<PosterCard title="title" backgroundImage={{src: undefined, srcSet: 'test'}} />;
<PosterCard title="title" backgroundImage={{src: 'test', srcSet: undefined}} />;

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
// @ts-expect-error backgroundImage should have src or srcSet
<PosterCard title="title" backgroundImage={{src: undefined, srcSet: undefined}} />;
// @ts-expect-error PosterCard expects no children
<PosterCard title="title">hello</PosterCard>;

(isTouchable: boolean) => <SnapCard title="title" href={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" to={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" onPress={isTouchable ? () => {} : undefined} />;

<NakedCard media={<Image src="/something.png" />} title="title" />;
<NakedCard title="title" />;
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
    role="link"
/>;
// @ts-expect-error onPress and href can't be used together
<NakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<NakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<NakedCard media={<Image src="/something.png" />} title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<NakedCard media={<Image src="/something.png" />} title="title" trackingEvent={{name: 'do-something'}} />;
// @ts-expect-error footerBackgroundColor not allowed in NakedCard
<NakedCard title="title" footerBackgroundColor="blue" />;
// @ts-expect-error NakedCard expects no children
<NakedCard title="title">hello</NakedCard>;

<SmallNakedCard media={<Image src="/something.png" />} title="title" />;
<SmallNakedCard media={<Image src="/something.png" />} title="title" href="/" />;
<SmallNakedCard media={<Image src="/something.png" />} title="title" to="/" />;
<SmallNakedCard media={<Image src="/something.png" />} title="title" onPress={() => {}} />;
<SmallNakedCard
    media={<Image src="/something.png" />}
    title="title"
    onPress={() => {}}
    trackingEvent={{name: 'do-something'}}
    role="link"
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

// @ts-expect-error MediaCard expects no children
<MediaCard title="title">hello</MediaCard>;

// @ts-expect-error DataCard expects no children
<DataCard title="title">hello</DataCard>;

// @ts-expect-error CoverCard expects no children
<CoverCard title="title">hello</CoverCard>;
