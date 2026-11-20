import * as React from 'react';
import {Boxed, Text2} from '..';

export const Container = (props: Partial<React.ComponentProps<typeof Boxed>>): JSX.Element => (
    <Boxed role="region" aria-label="boxed" {...props}>
        <Text2 regular>Content</Text2>
    </Boxed>
);
