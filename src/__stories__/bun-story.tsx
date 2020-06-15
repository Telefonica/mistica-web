// @flow
import * as React from 'react';
import Bun from '../bun';
import {StorySection} from './helpers';

const fakeContentStyle = {
    background: `repeating-linear-gradient(
        45deg,
        #606dbc,
        #606dbc 10px,
        #465298 10px,
        #465298 20px
      )`,
    color: 'white',
    padding: 16,
    textAlign: 'center',
};

export default {
    title: 'Components|Cards/Bun',
};

export const bun = (): React.Element<'div'> => (
    <div data-testid="bun">
        <StorySection title="Bun without a description">
            <Bun title="Title" action={{href: 'whatever/url', text: 'Text link'}}>
                <div style={fakeContentStyle} />
            </Bun>
        </StorySection>
        <StorySection title="Bun without action">
            <Bun title="Title">
                <div style={fakeContentStyle} />
            </Bun>
        </StorySection>
    </div>
);
