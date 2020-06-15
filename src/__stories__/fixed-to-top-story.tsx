// @flow
import * as React from 'react';
import {FixedToTop} from '..';

export default {
    title: 'Components|Utils/FixedToTop',
};

const FixedDiv = ({background, height, top}) => (
    <div style={{position: 'fixed', top, height, width: 300, background}}>
        top: {top}, height: {height}
    </div>
);

const OtherComponent = () => (
    <FixedToTop height={40}>
        {(topDistance) => <FixedDiv background="pink" top={topDistance} height={40} />}
    </FixedToTop>
);

export const Default = (): React.Node => (
    <FixedToTop height={20}>
        {(topDistance) => (
            <>
                <FixedDiv background="cyan" top={topDistance} height={20} />

                <OtherComponent />
            </>
        )}
    </FixedToTop>
);

Default.story = {name: 'FixedToTop'};
