import * as React from 'react';
import {ButtonPrimary} from '..';

// @ts-expect-error - no children
<ButtonPrimary />;

// @ts-expect-error - no children
<ButtonPrimary fake />;

// @ts-expect-error - missing props
<ButtonPrimary>Text</ButtonPrimary>;

// @ts-expect-error - press handler must return void
<ButtonPrimary onPress={() => false}>Text</ButtonPrimary>;

// @ts-expect-error - unexpected prop
<ButtonPrimary fake foo>
    Text
</ButtonPrimary>;

// @ts-expect-error - bad combination
<ButtonPrimary href="/foo" fullPageOnWebView>
    Text
</ButtonPrimary>;

// @ts-expect-error - bad combination
<ButtonPrimary fake onPress={() => {}}>
    Text
</ButtonPrimary>;

// @ts-expect-error - bad combination
<ButtonPrimary submit onPress={() => {}}>
    Text
</ButtonPrimary>;

// Good cases
<ButtonPrimary fake>Text</ButtonPrimary>;

<ButtonPrimary submit>Text</ButtonPrimary>;

<ButtonPrimary onPress={() => {}}>Text</ButtonPrimary>;

<ButtonPrimary to="/foo">Text</ButtonPrimary>;

<ButtonPrimary to="/foo" fullPageOnWebView>
    Text
</ButtonPrimary>;

<ButtonPrimary href="/foo">Text</ButtonPrimary>;

<ButtonPrimary href="/foo" newTab>
    Text
</ButtonPrimary>;
