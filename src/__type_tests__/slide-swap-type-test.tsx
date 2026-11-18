import * as React from 'react';
import {SlideSwap} from '..';

// @ts-expect-error - no children, no swappedContent, no showSwappedContent
<SlideSwap />;

// @ts-expect-error - no swappedContent, no showSwappedContent
<SlideSwap>Text</SlideSwap>;

// @ts-expect-error - no children, no showSwappedContent
<SlideSwap swappedContent="loading" />;

// @ts-expect-error - no children
<SlideSwap showSwappedContent={false} swappedContent="loading" />;

<SlideSwap showSwappedContent={false} swappedContent="loading">
    Text
</SlideSwap>;

// @ts-expect-error - unexpected prop
<SlideSwap fake showSwappedContent={false} swappedContent="loading">
    Text
</SlideSwap>;
