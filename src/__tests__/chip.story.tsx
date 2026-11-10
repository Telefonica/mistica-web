import * as React from 'react';
import Chip from '../chip';

export const Interactive = ({
    closeButtonLabel,
    clickable = false,
}: {
    closeButtonLabel?: string;
    clickable?: boolean;
}): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    const handlePress = () => setCalls((count) => count + 1);
    return (
        <>
            <Chip {...(clickable ? {onPress: handlePress} : {onClose: handlePress, closeButtonLabel})}>
                some text
            </Chip>
            <input type="hidden" data-testid="calls" value={calls} />
        </>
    );
};
