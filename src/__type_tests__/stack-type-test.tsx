import * as React from 'react';
import Stack from '../stack';

<Stack space="between">
    <div>1</div>
    <div>2</div>
</Stack>;
<Stack space="around">
    <div>1</div>
    <div>2</div>
</Stack>;
<Stack space="evenly">
    <div>1</div>
    <div>2</div>
</Stack>;

<Stack space={8}>
    <div>1</div>
    <div>2</div>
</Stack>;

<Stack space={{mobile: 8, tablet: 16, desktop: 24}}>
    <div>1</div>
    <div>2</div>
</Stack>;

<Stack space={{mobile: 8, desktop: 24}}>
    <div>1</div>
    <div>2</div>
</Stack>;

// @ts-expect-error - no children
<Stack space="between" />;

// @ts-expect-error wrong space numeric value
<Stack space={7}>
    <div>1</div>
    <div>2</div>
</Stack>;

// @ts-expect-error when using object notation, desktop and mobile are required
<Stack space={{mobile: 8}}>
    <div>1</div>
    <div>2</div>
</Stack>;

<Stack
    space={{
        // @ts-expect-error when using object notation, we only support numeric values
        mobile: 'between',
        desktop: 8,
    }}
>
    <div>1</div>
    <div>2</div>
</Stack>;
