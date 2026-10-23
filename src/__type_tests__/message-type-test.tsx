import * as React from 'react';
import Message from '../message';

<Message type="incoming" text="Hello" />;
<Message type="incoming" error text="Hello" errorMessage="Contact support" />;
<Message type="incoming" error text="Hello" errorMessage="Try again" onPress={() => {}} />;

// @ts-expect-error Error messages must be supplied by the product
<Message type="incoming" error text="Hello" />;

// @ts-expect-error A retry action does not provide an error message
<Message type="incoming" error text="Hello" onPress={() => {}} />;

<Message type="incoming" text="Hello" contentSlot={<span>Details</span>} />;
<Message
    type="incoming"
    error
    errorMessage="Try again"
    contentSlot={<span>Details</span>}
    footer="Footer"
    side="Side"
/>;

// @ts-expect-error Message direction must be explicit
<Message text="Hello" />;
