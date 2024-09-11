import * as React from 'react';

type Props = {
    children: React.ReactNode;
    right?: boolean;
    left?: boolean;
};

const NegativeBox = ({left, right, children}: Props): JSX.Element => {
    const marginLeft = left || (!left && !right) ? -16 : undefined;
    const marginRight = right || (!left && !right) ? -16 : undefined;
    return <div style={{marginLeft, marginRight}}>{children}</div>;
};

export default NegativeBox;
