import * as React from 'react';
import * as styles from './circle.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type Props = {
    backgroundColor?: string;
    backgroundImage?: string;
    size?: number | string;
    children?: React.ReactElement;
    border?: boolean | string;
    dataAttributes?: DataAttributes;
};

const Circle: React.FC<Props> = ({
    children,
    backgroundColor,
    backgroundImage,
    size,
    border = false,
    dataAttributes,
}) => {
    const borderColor = border === true ? vars.colors.border : border;
    const borderProp = border ? `1px solid ${borderColor}` : undefined;

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
            {...getPrefixedDataAttributes(dataAttributes, 'Circle')}
        >
            {children}
        </div>
    );
};

export default Circle;
