import * as React from 'react';
import Tooltip from '../tooltip';
import {ButtonPrimary} from '../button';
import Box from '../box';

const TARGET_PADDING = 64;

export const Content = (
    props: Omit<React.ComponentProps<typeof Tooltip>, 'children' | 'target'>
): JSX.Element => (
    <Box padding={TARGET_PADDING}>
        <Tooltip
            {...props}
            target={<span className="target">Press me!</span>}
            slot={<div className="content">Content</div>}
            delay={false}
        />
    </Box>
);
export const Anchor = (): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    return (
        <Box padding={TARGET_PADDING}>
            <Tooltip target={<span className="target">Press me!</span>} delay={false}>
                <div className="content">
                    Content
                    <a tabIndex={-1} role="link" onClick={() => setCalls((count) => count + 1)}>
                        Link
                    </a>
                </div>
            </Tooltip>
            <input type="hidden" data-testid="calls" value={calls} />
        </Box>
    );
};
export const Controlled = (): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    return (
        <Box padding={TARGET_PADDING}>
            <Tooltip
                open={open}
                target={<span className="target">Press me!</span>}
                slot={<div className="content">Content</div>}
                delay={false}
            />
            <ButtonPrimary onPress={() => setOpen(!open)}>Button</ButtonPrimary>
        </Box>
    );
};
