// @flow
import * as React from 'react';
import {ButtonPrimary} from '../button';
/* eslint-disable babel/no-unused-expressions */

// $ExpectError - no children
<ButtonPrimary />;

// $ExpectError - no children
<ButtonPrimary fake />;

// $ExpectError - missing props
<ButtonPrimary>Text</ButtonPrimary>;

// $ExpectError - press handler must return void
<ButtonPrimary onPress={() => false}>Text</ButtonPrimary>;

// $ExpectError - unexpected prop
<ButtonPrimary fake foo>
    Text
</ButtonPrimary>;

// $ExpectError - bad combination
<ButtonPrimary href="/foo" fullPageOnWebView>
    Text
</ButtonPrimary>;

// $ExpectError - bad combination
<ButtonPrimary fake onPress={() => {}}>
    Text
</ButtonPrimary>;

// $ExpectError - bad combination
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
