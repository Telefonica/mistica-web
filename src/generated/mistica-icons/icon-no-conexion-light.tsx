'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useIsInverseOrMediaVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconNoConexionLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M20.536 14.978c.848.846 1.288 1.745 1.305 2.67.017.955-.417 1.902-1.291 2.818a6.3 6.3 0 0 1-.855.714c-.652.454-1.409.664-2.297.664-.893 0-1.888-.216-2.96-.645-2.146-.851-4.488-2.512-6.765-4.79l-.07-.07-.034-.036c-2.257-2.255-3.916-4.594-4.773-6.742-.851-2.137-.854-3.986-.011-5.207l.059-.079c.073-.104.37-.515.689-.823q1.377-1.31 2.82-1.292c.922.017 1.821.457 2.67 1.306.336.339.613.689.82 1.044.46.745.631 1.53.497 2.32-.132.773-.558 1.526-1.26 2.23a6 6 0 0 1-.362.333c.033.117.129.358.409.767.563.821 1.512 1.796 2.173 2.46l.082.078c.663.664 1.641 1.61 2.459 2.176.412.28.653.379.768.41.109-.13.204-.23.336-.362.703-.706 1.453-1.129 2.23-1.26.792-.132 1.573.033 2.33.504.342.199.695.476 1.03.812m-.58 4.922c.717-.751 1.075-1.505 1.064-2.236-.014-.703-.372-1.411-1.064-2.103a4.3 4.3 0 0 0-.874-.69q-.886-.544-1.77-.397c-.606.104-1.205.451-1.788 1.03q-.21.21-.394.443a.4.4 0 0 1-.121.101c-.336.188-.871.028-1.633-.496-.877-.602-1.89-1.585-2.577-2.271l-.081-.079c-.687-.686-1.67-1.697-2.272-2.577-.521-.759-.683-1.291-.496-1.63a.4.4 0 0 1 .104-.123c.182-.146.288-.241.442-.392.583-.583.93-1.185 1.034-1.788.1-.588-.03-1.179-.392-1.759a4.3 4.3 0 0 0-.698-.885c-.691-.694-1.4-1.053-2.103-1.064-.712-.017-1.482.344-2.236 1.064a5.6 5.6 0 0 0-.616.74c-.708 1.022-.672 2.6.073 4.473.815 2.045 2.412 4.289 4.614 6.49l.072.073c2.208 2.207 4.451 3.801 6.496 4.616 1.86.743 3.46.776 4.44.098.356-.255.605-.462.776-.638m-7.19-12.748c0 2.804 1.305 4.112 4.111 4.112 2.768 0 4.115-1.345 4.115-4.112 0-2.77-1.347-4.115-4.115-4.115-2.767 0-4.112 1.345-4.112 4.115m4.111 4.933c-3.117 0-4.932-1.572-4.932-4.933s1.815-4.936 4.932-4.936 4.936 1.575 4.936 4.936c0 3.358-1.818 4.93-4.936 4.933m-1.969-3.55a.41.41 0 0 0 .58.58l1.384-1.386 1.392 1.392a.41.41 0 0 0 .58-.58l-1.39-1.392 1.393-1.392a.411.411 0 0 0-.58-.58L16.875 6.57l-1.387-1.386a.41.41 0 0 0-.58.58l1.387 1.386z"
            />
        </svg>
    );
};

export default IconNoConexionLight;
