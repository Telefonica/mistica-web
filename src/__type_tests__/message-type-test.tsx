import * as React from 'react';
import Message from '../message';

<Message type="incoming" contentText="Hello" />;
<Message type="incoming" error contentText="Hello" errorMessage="Contact support" />;
<Message type="incoming" error contentText="Hello" errorMessage="Try again" onPress={() => {}} />;

// @ts-expect-error Error messages must be supplied by the product
<Message type="incoming" error contentText="Hello" />;

// @ts-expect-error A retry action does not provide an error message
<Message type="incoming" error contentText="Hello" onPress={() => {}} />;

<Message type="incoming" contentText="Hello" contentSlot={<span>Details</span>} />;
<Message
    type="incoming"
    error
    errorMessage="Try again"
    contentSlot={<span>Details</span>}
    footerSlot="Footer"
    side="Side"
/>;

// @ts-expect-error Message direction must be explicit
<Message contentText="Hello" />;
