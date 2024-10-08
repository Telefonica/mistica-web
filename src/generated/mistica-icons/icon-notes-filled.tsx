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

const IconNotesFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M19.385 8.152a.87.87 0 0 0-.26-.619l-5.217-5.129a.83.83 0 0 0-.602-.249H5.998c-.72 0-1.378.661-1.378 1.378v16.93c0 .731.641 1.378 1.378 1.378h12c.753 0 1.387-.627 1.387-1.378zm-5.751-4.344 4.073 4.005v.003h-1.79c-.68 0-1.26-.218-1.664-.613-.406-.395-.62-.961-.62-1.614zm2.224 9.65c-.151.145-1.815 1.652-4.454 4.03l-1.989.692.65-1.966c.39-.347 4.25-3.815 4.502-4.07.238-.241.49-.292.675-.275a.965.965 0 0 1 .896.952c0 .242-.098.452-.28.636m-2.132-2.169c.936-.944 2.244-.742 2.972 0 .398.404.628.975.628 1.538 0 .572-.224 1.09-.636 1.499-.213.207-2.56 2.328-4.493 4.07l-.07.064a.94.94 0 0 1-.364.21l-2.26.765q-.17.047-.326.048c-.03 0-.064 0-.087-.009-.016.009-.03.009-.047.009H7.578a.604.604 0 0 1-.594-.605c0-.33.269-.605.594-.605h.58l.002-.013a.7.7 0 0 1 .037-.164l.286-.88h-.905a.604.604 0 0 1-.594-.604c0-.34.269-.605.594-.605h1.3l.07-.21c.064-.177.168-.34.302-.46l.429-.386H7.578a.604.604 0 0 1-.594-.606c0-.338.269-.605.594-.605h3.448l.604-.541q.305-.275.584-.523H7.578a.6.6 0 0 1-.594-.605c0-.33.269-.605.594-.605h5.966a4 4 0 0 1 .182-.177"
            />
        </svg>
    );
};

export default IconNotesFilled;
