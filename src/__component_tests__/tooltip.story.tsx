import * as React from 'react';
import Tooltip from '../tooltip';
import {ButtonPrimary} from '../button';

export const Content = (
    props: Omit<React.ComponentProps<typeof Tooltip>, 'children' | 'target'>
): JSX.Element => (
    <Tooltip
        {...props}
        target={<span className="target">Press me!</span>}
        slot={<div className="content">Content</div>}
        delay={false}
    />
);
export const Anchor = (): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    return (
        <>
            <Tooltip target={<span className="target">Press me!</span>} delay={false}>
                <div className="content">
                    Content
                    <a tabIndex={-1} role="link" onClick={() => setCalls((count) => count + 1)}>
                        Link
                    </a>
                </div>
            </Tooltip>
            <input type="hidden" data-testid="calls" value={calls} />
        </>
    );
};
export const Controlled = (): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Tooltip
                open={open}
                target={<span className="target">Press me!</span>}
                slot={<div className="content">Content</div>}
                delay={false}
            />
            <ButtonPrimary onPress={() => setOpen(!open)}>Button</ButtonPrimary>
        </>
    );
};
