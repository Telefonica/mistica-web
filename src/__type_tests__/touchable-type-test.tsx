import * as React from 'react';
import {Touchable} from '..';

import type {ExclusifyUnion} from '../utils/utility-types';
import type {TouchableComponentProps} from '../touchable';

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

<Touchable href="/foo" newTab loadOnTop>
    text
</Touchable>;

<Touchable to="/" newTab>
    text
</Touchable>;

// @ts-expect-error - onPress doesn't support newTab
<Touchable onPress={() => {}} newTab>
    text
</Touchable>;

const fn = (props: TouchableComponentProps<{foo: string}>) => {
    if (props.to || props.href || props.onPress) {
        const {foo, ...touchableProps} = props;
        return <Touchable {...touchableProps}>{foo}</Touchable>;
    }
};
