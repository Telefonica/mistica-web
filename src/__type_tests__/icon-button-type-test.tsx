import * as React from 'react';
import {Icon2GRegular, IconButton} from '..';

<IconButton Icon={Icon2GRegular} aria-label="something" />;
<IconButton Icon={Icon2GRegular} aria-labelledby="something" />;

// @ts-expect-error - aria-label or aria-labelledby is required
<IconButton Icon={Icon2GRegular} />;

// @ts-expect-error - aria-label and aria-labelledby can't be used together
<IconButton Icon={Icon2GRegular} aria-label="something" aria-labelledby="something" />;

<IconButton
    Icon={Icon2GRegular}
    aria-label="something"
    type="brand"
    backgroundType="solid"
    showSpinner
    small
    bleedLeft
    bleedRight
    bleedY
/>;

<IconButton
    Icon={Icon2GRegular}
    aria-label="something"
    trackingEvent={{name: 'something'}}
    onPress={() => {}}
/>;
<IconButton
    Icon={Icon2GRegular}
    aria-label="something"
    trackingEvent={{name: 'something'}}
    onPress={() => Promise.resolve()}
/>;
<IconButton
    Icon={Icon2GRegular}
    aria-label="something"
    trackingEvent={{name: 'something'}}
    href="/somewhere"
/>;
<IconButton
    Icon={Icon2GRegular}
    aria-label="something"
    trackingEvent={{name: 'something'}}
    to="/somewhere"
/>;
<IconButton Icon={Icon2GRegular} aria-label="something" to="/somewhere" newTab />;

// @ts-expect-error - onPress doesn't support href
<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} href="/somewhere" />;
// @ts-expect-error - onPress doesn't support to
<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} to="/somewhere" />;
// @ts-expect-error - href doesn't support to
<IconButton Icon={Icon2GRegular} aria-label="something" href="/somewhere" to="/somewhere" />;

<IconButton Icon={Icon2GRegular} aria-label="something" href="/somewhere" newTab />;

// @ts-expect-error - onPress doesn't support newTab
<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} newTab />;

<IconButton Icon={Icon2GRegular} aria-label="something" to="/somewhere" fullPageOnWebView />;
// @ts-expect-error - href doesn't support fullPageOnWebView
<IconButton Icon={Icon2GRegular} aria-label="something" href="/somewhere" fullPageOnWebView />;
// @ts-expect-error - onPress doesn't support fullPageOnWebView
<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} fullPageOnWebView />;

<IconButton Icon={Icon2GRegular} aria-label="something" to="/somewhere" replace />;
// @ts-expect-error - href doesn't support replace
<IconButton Icon={Icon2GRegular} aria-label="something" href="/somewhere" replace />;
// @ts-expect-error - onPress doesn't support replace
<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} replace />;

<IconButton Icon={Icon2GRegular} aria-label="something" href="/somewhere" onNavigate={() => {}} />;
<IconButton Icon={Icon2GRegular} aria-label="something" to="/somewhere" onNavigate={() => {}} />;
// @ts-expect-error - onPress doesn't support onNavigate
<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} onNavigate={() => {}} />;

<IconButton Icon={Icon2GRegular} aria-label="something" onPress={() => {}} role="link" />;
