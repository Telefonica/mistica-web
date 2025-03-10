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

const IconLockDeDataFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M9.891 5.5c-1.24-.35-1.997-.827-2.196-1.373V4.12q-.002-.004-.008-.01c.199-.546.955-1.033 2.187-1.38 1.308-.37 3.037-.575 4.871-.575s3.563.205 4.86.574c1.3.37 2.034.852 2.196 1.426 0 0-.008.008-.008.017-.218.53-.964.986-2.176 1.328-1.309.37-3.028.574-4.86.574-1.838.003-3.558-.205-4.866-.574m-.353 10.296c0-1.89-1.63-2.05-2.047-2.058l-.075-.002-.082-.001h-.045c-.429.005-2.023.146-2.023 2.05 0 1.908 1.608 2.056 2.037 2.062h.196c.409-.009 2.04-.154 2.04-2.05m-1.14 0c0 .294 0 .905-.921.922h-.16c-.913-.011-.913-.61-.913-.933 0-.322 0-.913.896-.921h.163c.935.022.935.638.935.932m1.58-5.344v.585l-4.9.003v-.608c0-2.084 1.438-2.409 2.292-2.417l.255.003h.017c.703.017 2.336.288 2.336 2.434M3.61 19.208c-.24-.252-.227-.636-.224-.678v-5.333c0-.325.076-.557.238-.706.21-.196.56-.238.728-.238q.034 0 .06.002h.038l6.143-.005q.606 0 .866.272c.238.25.218.63.215.678 0 0-.002 3.566 0 5.32 0 .321-.078.55-.238.702-.243.23-.663.263-.843.252l-6.137.003q-.589 0-.846-.269m7.591-8.151c1.064.182 2.274.283 3.552.283 1.832 0 3.56-.199 4.854-.572 1.289-.367 1.997-.921 2.235-1.344V5.477c-.479.359-1.128.647-1.957.88-1.393.395-3.219.61-5.138.61-1.918 0-3.742-.215-5.137-.61-.849-.233-1.51-.538-1.986-.897v1.348l-.266-.003c-1.614.014-3.501.975-3.501 3.627v.653a2.2 2.2 0 0 0-1.06.507c-.29.266-.638.76-.638 1.602l.003 5.291c-.006.093-.05.908.543 1.541.41.44.997.661 1.745.661l3.98-.003c.362.216.835.412 1.438.583 1.316.367 3.045.574 4.87.574 1.824 0 3.553-.207 4.86-.574 1.494-.42 2.247-.994 2.247-1.695v-3.54c-.507.367-1.173.68-1.958.896-1.384.395-3.21.61-5.137.61-.639 0-1.255-.033-1.857-.08v-.902c.597.05 1.213.086 1.857.086 1.835 0 3.563-.207 4.863-.574 1.288-.37 1.997-.924 2.235-1.347v-3.983c-.507.367-1.174.672-1.958.888-1.384.395-3.21.61-5.137.61-.72 0-1.418-.039-2.093-.098a1.8 1.8 0 0 0-.294-.428c-.297-.32-.689-.519-1.165-.611z"
            />
        </svg>
    );
};

export default IconLockDeDataFilled;
