import * as React from 'react';
import Message from '../message';
import Avatar from '../avatar';
import Image from '../image';
import IconCheckRegular from '../generated/mistica-icons/icon-check-regular';

<Message type="incoming" contentText="Hello" />;
<Message type="incoming" asset={<Avatar size={40} initials="AP" />} />;
<Message type="incoming" asset={<Image src="avatar.png" width={40} aspectRatio="1:1" />} />;
<Message type="incoming" asset={<IconCheckRegular />} />;

// @ts-expect-error Assets must be React elements
<Message type="incoming" asset="AP" />;

// @ts-expect-error Assets must be React elements
<Message type="incoming" asset={42} />;

// @ts-expect-error Assets must be a single React element
<Message type="incoming" asset={[<IconCheckRegular key="check" />]} />;

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
    sideSlot="Side"
/>;

// @ts-expect-error Message direction must be explicit
<Message contentText="Hello" />;
