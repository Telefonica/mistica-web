import * as React from 'react';
import * as styles from './circle.css';
import {vars} from './skins/skin-contract.css';

type Props = {
    backgroundColor?: string;
    backgroundImage?: string;
    size?: number | string;
    children?: React.ReactElement;
    border?: boolean | string;
};

const Circle: React.FC<Props> = ({children, backgroundColor, backgroundImage, size, border = false}) => {
    const borderColor = border === true ? vars.colors.border : border;
    const borderProp = border ? `1px solid ${borderColor}` : 'none';

    return (
        <div
            className={styles.circle}
            style={{
                width: size,
                height: size,
                backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                border: borderProp,
            }}
        >
            {children}
        </div>
    );
};

export default Circle;
