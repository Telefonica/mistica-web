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

const IconApiLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M6.342 7.238a.563.563 0 0 1-.572-.551.56.56 0 0 1 .572-.552.56.56 0 0 1 .571.552.56.56 0 0 1-.571.551M7.485 6.687c0 .302.254.551.571.551a.56.56 0 0 0 .569-.551.56.56 0 0 0-.569-.552.56.56 0 0 0-.571.552M4.63 7.238a.563.563 0 0 1-.571-.551.56.56 0 0 1 .571-.552.56.56 0 0 1 .572.552.56.56 0 0 1-.572.551M6.403 11.177h-.907l-1.208 3.61h.785l.28-.907h1.17l.3.907h.883zm-.473.902.395 1.204h-.782l.376-1.204zM8.129 11.177h1.238c.566 0 .924.078 1.157.297q.293.268.291.846c0 .386-.09.675-.269.876-.21.239-.538.348-1.014.348h-.58v1.246H8.13zm1.706 1.61q.143-.143.143-.459c0-.196-.042-.339-.138-.428-.1-.09-.252-.127-.507-.127h-.386v1.152h.409c.263 0 .375-.037.479-.138M11.406 11.177h.824v3.61h-.824zM18.504 14.076c1.356 0 2.165.784 2.165 2.098s-.81 2.098-2.165 2.098c-1.356 0-2.165-.784-2.165-2.098s.81-2.098 2.165-2.098m1.345 2.1c0-.876-.44-1.302-1.345-1.302s-1.344.426-1.344 1.303.44 1.302 1.344 1.302 1.345-.425 1.345-1.302"
            />
            <path
                fill={fillColor}
                d="M21.838 5.835c0-.67-.564-1.216-1.255-1.216H3.406c-.692 0-1.255.547-1.255 1.216v12.333c0 .67.563 1.216 1.255 1.216h17.177c.692 0 1.255-.546 1.255-1.216zm-18.432-.42h17.177c.24 0 .434.188.434.42v2.008H2.972V5.835c0-.232.196-.42.434-.42m0 13.174a.426.426 0 0 1-.434-.42V8.635h18.045v3.622a.87.87 0 0 0-.423.224l-.426.415q-.221-.083-.46-.14v-.493a.845.845 0 0 0-.856-.832h-.687a.847.847 0 0 0-.857.832v.493q-.24.057-.46.14l-.425-.412a.91.91 0 0 0-1.224 0l-.499.485a.81.81 0 0 0-.255.593c0 .222.09.432.252.591l.423.41a3.4 3.4 0 0 0-.14.45h-.51a.847.847 0 0 0-.857.832v.664c0 .46.384.832.858.832h.51c.033.137.078.294.14.448l-.424.41a.8.8 0 0 0-.212.389zm17.61-.423c0 .232-.195.42-.433.42v-.003h-5.13l.449-.431a.39.39 0 0 0 .067-.48c-.112-.19-.204-.537-.25-.8a.41.41 0 0 0-.405-.334l-.883-.036.037-.7h.846c.201 0 .375-.14.406-.334.045-.26.137-.613.25-.801a.39.39 0 0 0-.068-.476l-.625-.661.563-.485.625.605c.123.12.314.151.473.076.244-.118.53-.202.846-.252a.4.4 0 0 0 .345-.392l.036-.855.723.037v.818c0 .196.143.36.345.392.316.05.585.131.845.255a.42.42 0 0 0 .471-.076l.468-.431z"
            />
        </svg>
    );
};

export default IconApiLight;
