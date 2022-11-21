import * as React from 'react';
import * as styles from './circle.css';

type Props = {
    backgroundColor?: string;
    backgroundImage?: string;
    size?: number | string;
    children?: React.ReactElement;
};

const Circle: React.FC<Props> = ({children, backgroundColor, backgroundImage, size}) => {
    return (
        <div
            className={styles.circle}
            style={{
                width: size,
                height: size,
                backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            }}
        >
            {children}
        </div>
    );
};

export default Circle;
