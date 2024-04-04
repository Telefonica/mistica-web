import * as React from 'react';
import {TextLink} from '..';

<TextLink href="/foo" onNavigate={() => {}}>
    Text
</TextLink>;

<TextLink href="/foo" onNavigate={() => Promise.resolve()}>
    Text
</TextLink>;

<TextLink to="/foo" onNavigate={() => {}}>
    Text
</TextLink>;

<TextLink to="/foo" onNavigate={() => Promise.resolve()}>
    Text
</TextLink>;

// @ts-expect-error - onPress doesn't support onNavigate
<TextLink onPress={() => {}} onNavigate={() => Promise.resolve()}>
    Text
</TextLink>;
