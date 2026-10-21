import * as React from 'react';
import Message from '../message';

<Message text="Hello" />;
<Message error text="Hello" errorMessage="Contact support" />;
<Message error text="Hello" errorMessage="Try again" onPress={() => {}} />;

// @ts-expect-error Error messages must be supplied by the product
<Message error text="Hello" />;

// @ts-expect-error A retry action does not provide an error message
<Message error text="Hello" onPress={() => {}} />;
