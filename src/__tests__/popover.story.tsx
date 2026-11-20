import * as React from 'react';
import Popover from '../popover';
import {ButtonPrimary} from '../button';

export const Content = ({
    withAsset = false,
    ...props
}: {withAsset?: boolean} & Omit<
    React.ComponentProps<typeof Popover>,
    'description' | 'target'
>): JSX.Element => (
    <Popover
        {...props}
        asset={withAsset ? <svg data-testid="icon" /> : undefined}
        description="Content"
        target={<span>Press me!</span>}
    />
);
export const Interactive = ({controlled}: {controlled: boolean}): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [closes, setCloses] = React.useState(0);
    return (
        <>
            <Popover
                open={controlled ? open : undefined}
                description="Content"
                onClose={() => {
                    setCloses((count) => count + 1);
                    setOpen(false);
                }}
                target={
                    <ButtonPrimary
                        onPress={() => {
                            if (controlled) setOpen(!open);
                        }}
                    >
                        Press me!
                    </ButtonPrimary>
                }
            />
            <input type="hidden" data-testid="closes" value={closes} />
        </>
    );
};
