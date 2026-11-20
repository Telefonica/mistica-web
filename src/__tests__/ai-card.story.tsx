import * as React from 'react';
import {AiCard} from '../community';

export const Content = ({
    interactive = false,
    href,
    ...props
}: {interactive?: boolean; href?: string} & Pick<
    React.ComponentProps<typeof AiCard>,
    'text' | 'words' | 'aria-label' | 'dataAttributes'
>): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    return (
        <>
            <AiCard
                {...props}
                {...(href ? {href} : interactive ? {onPress: () => setCalls((count) => count + 1)} : {})}
            />
            <input type="hidden" data-testid="calls" value={calls} />
        </>
    );
};
