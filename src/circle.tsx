import * as React from 'react';
import * as styles from './circle.css';
import {vars} from './skins/skin-contract.css';

type Props = {
    backgroundColor?: string;
    backgroundImage?: string;
    size?: number | string;
    children?: React.ReactElement;
    border?: boolean;
};

const Circle: React.FC<Props> = ({children, backgroundColor, backgroundImage, size, ...props}) => {
    const border = props.border ? `1px solid ${vars.colors.borderLow}` : 'none';

    return (
        <div
            className={styles.circle}
            style={{
                width: size,
                height: size,
                backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                border,
            }}
        >
            {children}
        </div>
    );
};

export default Circle;
