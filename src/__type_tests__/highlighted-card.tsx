import * as React from 'react';
import HighlightedCard from '../highlighted-card';

<HighlightedCard title="title" />;
<HighlightedCard description="description" />;
<HighlightedCard title="title" description="description" />;

// @ts-expect-error a title or a description is required
<HighlightedCard />;

<HighlightedCard title="title" onPress={() => {}} />;
<HighlightedCard title="title" to="#" fullPageOnWebView />;
<HighlightedCard title="title" href="#" newTab />;

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
