import * as React from 'react';
import Image from '../image';

<Image src="https://example.com/image.png" />;
<Image src="https://example.com/image.png" noBorderRadius />;
<Image src="https://example.com/image.png" aspectRatio="16:9" />;
<Image src="https://example.com/image.png" aspectRatio="16:9" width={100} />;
<Image src="https://example.com/image.png" aspectRatio="16:9" width="80%" />;
<Image src="https://example.com/image.png" aspectRatio="16:9" height="30%" />;

// @ts-expect-error src is required
<Image />;
// @ts-expect-error children is not allowed
<Image src="https://example.com/image.png">some children</Image>;

<Image src="https://example.com/image.png" circular />;
<Image src="https://example.com/image.png" circular width={100} />;
<Image src="https://example.com/image.png" circular width="80%" />;
<Image src="https://example.com/image.png" circular height={100} />;
<Image src="https://example.com/image.png" circular height="30%" />;

// @ts-expect-error circular images can't have both width and height
<Image src="https://example.com/image.png" circular height={50} width={40} />;
// @ts-expect-error circular images can't have aspectRatio
<Image src="https://example.com/image.png" circular aspectRatio="16:9" />;
// @ts-expect-error circular images can't have noBorderRadius
<Image src="https://example.com/image.png" circular noBorderRadius />;
