import * as React from 'react';
import {StorySection} from './helpers';
import Popover from '../popover';
import IcnClose from '../icons/icon-close';

export default {
    title: 'Components|Hints/Popover',
    component: Popover,
};

export const Default: StoryComponent = () => {
    const description =
        'When working on a project and the customer has not yet delivered the copy, something is missing...';

    return (
        <StorySection title="Popover">
            <strong>Desktop examples:</strong>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: 1300,
                }}
            >
                <Popover target="Popover with only description" description={description} />
                <Popover target="Popover with title" title="default" description={description} />
                <Popover
                    target="Popover with Icon"
                    title="default"
                    asset={
                        <img width={40} src="https://imrl.tuenti.net/1gIGjpc4i4R8x6O0HA-AmhQA" alt="asset" />
                    }
                    description={description}
                />
                <Popover target="Popover default (bottom)" title="default" description={description} />
                <Popover
                    target="Popover right"
                    position="right"
                    title="right"
                    description={description}
                    width={300}
                />
                <Popover
                    target="Popover top"
                    position="top"
                    title="top"
                    description={description}
                    width={360}
                />
                <Popover
                    target="Popover left"
                    position="left"
                    title="left"
                    description={description}
                    width={200}
                />
            </div>
            <div style={{width: 600}} />
            <strong style={{display: 'block', marginBottom: 20}}>
                Mobile examples: (look on mobile mode)
            </strong>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingTop: 20,
                    borderTop: '1px solid',
                }}
            >
                <Popover
                    target={<IcnClose />}
                    position="left"
                    title="left"
                    description={description}
                    width={150}
                />
                <Popover
                    target={<IcnClose />}
                    position="right"
                    title="right"
                    description={description}
                    width={150}
                />
            </div>
        </StorySection>
    );
};

Default.story = {name: 'Popover'};
