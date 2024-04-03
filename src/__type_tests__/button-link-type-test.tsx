import * as React from 'react';
import {ButtonLink} from '..';

<ButtonLink href="/foo" onNavigate={() => {}}>
    Text
</ButtonLink>;

<ButtonLink href="/foo" onNavigate={() => Promise.resolve()}>
    Text
</ButtonLink>;

<ButtonLink to="/foo" onNavigate={() => {}}>
    Text
</ButtonLink>;

<ButtonLink to="/foo" onNavigate={() => Promise.resolve()}>
    Text
</ButtonLink>;

// @ts-expect-error - onPress doesn't support onNavigate
<ButtonLink onPress={() => {}} onNavigate={() => Promise.resolve()}>
    Text
</ButtonLink>;
