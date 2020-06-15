// @flow
import * as React from 'react';
import Tooltip from '../tooltip';
import {StorySection} from './helpers';
import IcnClose from '../icons/icon-close';
import IcnInfo from '../icons/icon-info-cvv';
import IconVisa from '../icons/icon-visa';
import IconMastercard from '../icons/icon-mastercard';

export default {
    title: 'Components|Hints/Tooltip',
};

export const Default = (): React.Node => (
    <StorySection title="Tooltip">
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
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
            />
            <Tooltip
                targetLabel="help text"
                target={<span>Tooltip top</span>}
                position="top"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={360}
            />
            <Tooltip
                targetLabel="help text"
                target={<span>Tooltip bottom</span>}
                position="bottom"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={260}
            />
            <Tooltip
                targetLabel="help text"
                target={<span>Tooltip left</span>}
                position="left"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={100}
            />
            <Tooltip
                targetLabel="help text"
                target={<span>Tooltip right</span>}
                position="right"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={300}
            />
            <Tooltip
                targetLabel="help text"
                target={<span>Tooltip with link</span>}
                position="top"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
            >
                <a href="#whatever">Ir a la web</a>
            </Tooltip>
        </div>
        <div style={{width: 600}} />
        <strong style={{display: 'block', marginBottom: 20}}>Mobile examples: (look on mobile mode)</strong>
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
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={100}
            />
            <Tooltip
                targetLabel="help text"
                target={<IcnInfo />}
                position="right"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={100}
            />
            <Tooltip
                targetLabel="help text"
                target={<IconVisa />}
                position="top"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={100}
            />
            <Tooltip
                targetLabel="help text"
                target={<IconMastercard />}
                position="bottom"
                description="When working on a project and the customer has not yet delivered the copy, something is missing... text."
                width={100}
            />
        </div>
    </StorySection>
);

Default.story = {name: 'Tooltip'};
