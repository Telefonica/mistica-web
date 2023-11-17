import * as React from 'react';
import {ButtonLink, ButtonPrimary} from '../../button';
import {AdvancedDataCard} from '../advanced-data-card';

<AdvancedDataCard title="title" />;
<AdvancedDataCard title="title" href="/" />;
<AdvancedDataCard title="title" to="/" />;
<AdvancedDataCard title="title" onPress={() => {}} />;
<AdvancedDataCard title="title" button={<ButtonPrimary href="/action">Action</ButtonPrimary>} />;
<AdvancedDataCard title="title" buttonLink={<ButtonLink href="/action">Link</ButtonLink>} />;
<AdvancedDataCard
    title="title"
    button={<ButtonPrimary href="/action">Action</ButtonPrimary>}
    buttonLink={<ButtonLink href="/action">Link</ButtonLink>}
/>;
<AdvancedDataCard
    onPress={() => {}}
    title="title"
    button={<ButtonPrimary href="/action">Action</ButtonPrimary>}
/>;
<AdvancedDataCard title="title" href="/" button={<ButtonPrimary href="/action">Action</ButtonPrimary>} />;
<AdvancedDataCard title="title" to="/" button={<ButtonPrimary href="/action">Action</ButtonPrimary>} />;
<AdvancedDataCard
    title="title"
    onPress={() => {}}
    button={<ButtonPrimary href="/action">Action</ButtonPrimary>}
    buttonLink={<ButtonLink href="/action">Link</ButtonLink>}
/>;
<AdvancedDataCard
    title="title"
    onPress={() => {}}
    buttonLink={<ButtonLink href="/action">Link</ButtonLink>}
/>;

// @ts-expect-error onPress and href can't be used together
<AdvancedDataCard title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<AdvancedDataCard title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<AdvancedDataCard title="title" href="/" to="/" />;
