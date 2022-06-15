import * as React from 'react';
import {SnapCard} from '../card';

<SnapCard title="title" />;
<SnapCard title="title" href="/" />;
<SnapCard title="title" to="/" />;
<SnapCard title="title" onPress={() => {}} />;
// @ts-expect-error onPress and href can't be used together
<SnapCard title="title" onPress={() => {}} href="/" />;
// @ts-expect-error onPress and to can't be used together
<SnapCard title="title" onPress={() => {}} to="/" />;
// @ts-expect-error href and to can't be used together
<SnapCard title="title" href="/" to="/" />;

(isTouchable: boolean) => <SnapCard title="title" href={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" to={isTouchable ? '/' : undefined} />;
(isTouchable: boolean) => <SnapCard title="title" onPress={isTouchable ? () => {} : undefined} />;
