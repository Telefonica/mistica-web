import * as React from 'react';
import {ButtonPrimary} from '../button';
import {DataCard} from '../card-data';
import {CoverCard} from '../card-cover';
import {NakedCard} from '../card-naked';
import {MediaCard} from '../card-media';

<NakedCard imageSrc="/something.png" title="title" />;
<NakedCard title="title" />;
<NakedCard
    imageSrc="/something.png"
    title="title"
    buttonPrimary={<ButtonPrimary href="/action">Action</ButtonPrimary>}
/>;
<NakedCard imageSrc="/something.png" title="title" href="/" />;
<NakedCard imageSrc="/something.png" title="title" to="/" />;
<NakedCard imageSrc="/something.png" title="title" onPress={() => {}} />;
<NakedCard
    imageSrc="/something.png"
    title="title"
    onPress={() => {}}
    trackingEvent={{name: 'do-something'}}
    role="link"
/>;
// @ts-expect-error onPress and href can't be used together
<NakedCard imageSrc="/something.png" title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<NakedCard imageSrc="/something.png" title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<NakedCard imageSrc="/something.png" title="title" href="/" to="/" />;
// @ts-expect-error trackingEvent can't be used if the card is not touchable
<NakedCard imageSrc="/something.png" title="title" trackingEvent={{name: 'do-something'}} />;
// @ts-expect-error footerBackgroundColor not allowed in NakedCard
<NakedCard title="title" footerBackgroundColor="blue" />;
// @ts-expect-error NakedCard expects no children
<NakedCard title="title">hello</NakedCard>;

(isTouchable: boolean) => <DataCard title="title" href={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <DataCard title="title" to={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <DataCard title="title" onPress={isTouchable ? () => {} : undefined} />;

// @ts-expect-error MediaCard expects no children
<MediaCard title="title">hello</MediaCard>;

// @ts-expect-error DataCard expects no children
<DataCard title="title">hello</DataCard>;

// @ts-expect-error CoverCard expects no children
<CoverCard title="title">hello</CoverCard>;
