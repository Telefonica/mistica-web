import * as React from 'react';
import * as styles from './circle.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

type CommonProps = {
    size?: number | string;
    children?: React.ReactNode;
    border?: boolean | string;
    dataAttributes?: DataAttributes;
};

type BackgroundProps = {background: string};
type BackgroundShorthandProps = {backgroundColor?: string; backgroundImage?: string};

type Props = CommonProps & ExclusifyUnion<BackgroundProps | BackgroundShorthandProps>;

const Circle = ({
    children,
    background,
    backgroundColor,
    backgroundImage,
    size,
    border,
    dataAttributes,
}: Props): JSX.Element => {
    const borderColor = border === true ? vars.colors.border : border;
    const borderProp = border ? `1px solid ${borderColor}` : undefined;
    const imageStyle = backgroundImage ? `url(${backgroundImage})` : '';

    return (
        <div
            className={styles.circle}
            style={{
                width: size,
                height: size,
                background: background
                    ? background
                    : `center / cover no-repeat ${imageStyle} ${backgroundColor || ''}`,
                border: borderProp,
            }}
            {...getPrefixedDataAttributes(dataAttributes, 'Circle')}
        >
            {children}
        </div>
    );
};

export default Circle;
