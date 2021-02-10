import * as React from 'react';
import Tooltip from '../tooltip';
import {DeprecationWarning, StorySection} from './helpers';
import IcnClose from '../icons/icon-close';
import IcnInfo from '../icons/icon-info-cvv';
import IconVisa from '../icons/icon-visa';
import IconMastercard from '../icons/icon-mastercard';

export default {
    title: 'Components/Hints/Tooltip',
};

export const Default: StoryComponent = () => {
    const description =
        'When working on a project and the customer has not yet delivered the copy, something is missing...';
    return (
        <StorySection title="Tooltip">
            <DeprecationWarning />
            <strong>Desktop examples:</strong>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: 300,
                }}
            >
                <Tooltip
                    targetLabel="help text"
                    target={<span>Tooltip default (bottom)</span>}
                    description={description}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<span>Tooltip top</span>}
                    position="top"
                    description={description}
                    width={360}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<span>Tooltip bottom</span>}
                    position="bottom"
                    description={description}
                    width={260}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<span>Tooltip left</span>}
                    position="left"
                    description={description}
                    width={100}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<span>Tooltip right</span>}
                    position="right"
                    description={description}
                    width={300}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<span>Tooltip with link</span>}
                    position="top"
                    description={description}
                >
                    <a href="#whatever">Ir a la web</a>
                </Tooltip>
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
                <Tooltip
                    targetLabel="help text"
                    target={<IcnClose />}
                    position="left"
                    description={description}
                    width={100}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<IcnInfo />}
                    position="right"
                    description={description}
                    width={100}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<IconVisa />}
                    position="top"
                    description={description}
                    width={100}
                />
                <Tooltip
                    targetLabel="help text"
                    target={<IconMastercard />}
                    position="bottom"
                    description={description}
                    width={100}
                />
            </div>
        </StorySection>
    );
};

Default.storyName = 'Tooltip';
