import * as React from 'react';
import {Menu} from '..';

const props = {renderTarget: () => null, renderMenu: () => null};

<Menu {...props} />;
<Menu {...props} position="left" />;
<Menu {...props} position="right" />;
<Menu {...props} placement="left" />;
<Menu {...props} alignment="middle" />;
<Menu {...props} placement="top" alignment="end" />;

// @ts-expect-error - legacy position cannot be combined with placement
<Menu {...props} position="left" placement="bottom" />;

// @ts-expect-error - legacy position cannot be combined with alignment
<Menu {...props} position="right" alignment="start" />;
