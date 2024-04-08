import * as React from 'react';
import {Touchable} from '..';

<Touchable href="/foo" onNavigate={() => {}}>
    Text
</Touchable>;

<Touchable href="/foo" onNavigate={() => Promise.resolve()}>
    Text
</Touchable>;

<Touchable to="/foo" onNavigate={() => {}}>
    Text
</Touchable>;

<Touchable to="/foo" onNavigate={() => Promise.resolve()}>
    Text
</Touchable>;

// @ts-expect-error - onPress doesn't support onNavigate
<Touchable onPress={() => {}} onNavigate={() => Promise.resolve()}>
    Text
</Touchable>;

<Touchable maybe onNavigate={() => Promise.resolve()}>
    Text
</Touchable>;
