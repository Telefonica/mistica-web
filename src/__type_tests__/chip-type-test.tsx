import * as React from 'react';
import Chip from '../chip';

<Chip>hello</Chip>;
<Chip badge={3}>hello</Chip>;
<Chip badge>hello</Chip>;
<Chip id="someid">hello</Chip>;
<Chip onClose={() => {}}>hello</Chip>;

// @ts-expect-error Chip only accepts string children
<Chip>
    <div>hello</div>
</Chip>;

<Chip href="/">hello</Chip>;
<Chip to="/">hello</Chip>;
<Chip onPress={() => {}}>hello</Chip>;
<Chip onPress={() => {}} trackingEvent={{name: 'do-something'}}>
    hello
</Chip>;
// @ts-expect-error onPress and href can't be used together
<Chip onPress={() => {}} href="/">
    hello
</Chip>;
// @ts-expect-error onPress and to can't be used together
<Chip onPress={() => {}} to="/">
    hello
</Chip>;
// @ts-expect-error href and to can't be used together
<Chip href="/" to="/">
    hello
</Chip>;

<Chip active>hello</Chip>;
<Chip active={false}>hello</Chip>;
<Chip active onPress={() => {}}>
    hello
</Chip>;
<Chip to="/" active>
    hello
</Chip>;
<Chip href="/" active>
    hello
</Chip>;

// @ts-expect-error active can't be used with onClose
<Chip active onClose={() => {}}>
    hello
</Chip>;

// @ts-expect-error onPress can't be used with onClose
<Chip onPress={() => {}} onClose={() => {}}>
    hello
</Chip>;

// @ts-expect-error href can't be used with onClose
<Chip href="/" onClose={() => {}}>
    hello
</Chip>;

// @ts-expect-error to can't be used with onClose
<Chip to="/" onClose={() => {}}>
    hello
</Chip>;
