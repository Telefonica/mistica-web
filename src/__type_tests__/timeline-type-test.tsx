import * as React from 'react';
import {IconShopRegular, Placeholder, TimelineItem} from '..';

<TimelineItem state="active">
    <Placeholder />
</TimelineItem>;

<TimelineItem state="active" asset={{kind: 'dot'}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="active" asset={{kind: 'number', number: 1}}>
    <Placeholder />
</TimelineItem>;

// @ts-expect-error - number is required
<TimelineItem state="active" asset={{kind: 'number'}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="completed" asset={{kind: 'number', number: 1}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="completed" asset={{kind: 'number'}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="active" asset={{kind: 'icon', Icon: IconShopRegular}}>
    <Placeholder />
</TimelineItem>;

// @ts-expect-error - Icon is required
<TimelineItem state="active" asset={{kind: 'icon'}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="completed" asset={{kind: 'icon', Icon: IconShopRegular}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="completed" asset={{kind: 'icon'}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="active" asset={{kind: 'circled-icon', Icon: IconShopRegular}}>
    <Placeholder />
</TimelineItem>;

// @ts-expect-error - Icon is required
<TimelineItem state="active" asset={{kind: 'circled-icon'}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="completed" asset={{kind: 'circled-icon', Icon: IconShopRegular}}>
    <Placeholder />
</TimelineItem>;

<TimelineItem state="completed" asset={{kind: 'circled-icon'}}>
    <Placeholder />
</TimelineItem>;
