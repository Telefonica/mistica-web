import * as React from 'react';
import {ButtonPrimary} from '../button';
import HighlightedCard from '../highlighted-card';

const s = 'maybe string' as string | undefined;

<HighlightedCard title="title" />;
<HighlightedCard description="description" />;
<HighlightedCard title="title" description="description" />;
<HighlightedCard title="title" description={s} />;
<HighlightedCard title={s} description="description" />;

// @ts-expect-error a title or a description is required
<HighlightedCard />;
// @ts-expect-error a title or a description is required
<HighlightedCard title={s} description={s} />;

<HighlightedCard title="title" onPress={() => {}} />;
<HighlightedCard title="title" to="#" fullPageOnWebView />;
<HighlightedCard title="title" href="#" newTab />;
<HighlightedCard title="title" button={<ButtonPrimary onPress={() => {}}>button</ButtonPrimary>} />;

// @ts-expect-error incompatible touchable props
<HighlightedCard title="title" onPress={() => {}} to="#" />;

// @ts-expect-error incompatible touchable props
<HighlightedCard title="title" onPress={() => {}} href="#" />;

// @ts-expect-error incompatible touchable props
<HighlightedCard title="title" onPress={() => {}} newTab />;

// @ts-expect-error incompatible touchable props
<HighlightedCard title="title" to="#" newTab />;

// @ts-expect-error incompatible touchable props
<HighlightedCard title="title" onPress={() => {}} fullPageOnWebView />;

// @ts-expect-error incompatible touchable props
<HighlightedCard title="title" href="#" fullPageOnWebView />;
