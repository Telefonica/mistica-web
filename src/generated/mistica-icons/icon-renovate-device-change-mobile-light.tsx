'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useTheme} from '../../hooks';
import {useIsInverseOrMediaVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconRenovateDeviceChangeMobileLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.203 17.377a.7.7 0 0 1 .789.615.73.73 0 0 1-.588.828l-3.723.559-.535-3.887c-.058-.396.21-.769.589-.824a.7.7 0 0 1 .789.614l.214 1.55A8.75 8.75 0 0 0 20.178 12c0-4.711-3.674-8.547-8.185-8.547a7.8 7.8 0 0 0-3.5.819.683.683 0 0 1-.927-.345.74.74 0 0 1 .33-.968A9.15 9.15 0 0 1 11.993 2c5.278 0 9.576 4.483 9.576 10 0 2.011-.567 3.934-1.619 5.568zm-5.064 3.64a.746.746 0 0 0 .325-.972.687.687 0 0 0-.932-.34 7.86 7.86 0 0 1-3.54.838c-4.51 0-8.184-3.836-8.184-8.548 0-1.745.513-3.426 1.449-4.841l.223 1.56a.705.705 0 0 0 .686.623q.041-.001.086-.008l.012-.001c.38-.056.642-.429.589-.824l-.535-3.888-3.723.559c-.379.056-.642.428-.588.824.053.396.41.675.789.615l1.253-.191A10.3 10.3 0 0 0 2.42 12c0 5.512 4.294 10 9.576 10a9.15 9.15 0 0 0 4.142-.982M7.985 16.06V7.93c0-1.243.972-2.258 2.162-2.258h3.687c1.19 0 2.162 1.015 2.162 2.258v8.133c0 1.243-.972 2.258-2.162 2.258h-3.687c-1.19-.005-2.162-1.015-2.162-2.262m1.048-.973h5.92V8.899h-5.92zm5.907 1.094H9.042c.058.586.53 1.047 1.105 1.047h3.687c.58 0 1.048-.46 1.106-1.047m0-8.37c-.058-.588-.531-1.048-1.106-1.048h-3.687c-.575 0-1.047.46-1.105 1.047z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.692 18.705a.38.38 0 0 0 .304-.43.36.36 0 0 0-.41-.319l-2.153.324c1.372-1.773 2.12-3.966 2.12-6.28 0-5.512-4.286-10-9.56-10A9.2 9.2 0 0 0 6.89 3.546a.39.39 0 0 0-.111.522.354.354 0 0 0 .499.116 8.5 8.5 0 0 1 4.72-1.43c4.872 0 8.84 4.15 8.84 9.246a9.43 9.43 0 0 1-2.088 5.961l-.347-2.502a.37.37 0 0 0-.41-.319.38.38 0 0 0-.305.43l.503 3.662zM15.96 7.47c0-1.04-.808-1.89-1.806-1.89H9.823c-.992 0-1.805.846-1.805 1.89v9.053c0 1.038.808 1.889 1.805 1.889h4.333c.992 0 1.805-.846 1.805-1.89zm-.72 0v.376H8.746V7.47c0-.624.485-1.13 1.081-1.13h4.332c.596 0 1.08.506 1.08 1.13m0 9.062c0 .624-.485 1.13-1.08 1.13H9.826c-.596 0-1.08-.506-1.08-1.13v-.376h6.493zm-6.494-1.135V8.604h6.494v6.792zm8.66 4.908c0 .416-.323.754-.72.754-.398 0-.721-.338-.721-.754 0-.415.323-.753.72-.753.398 0 .72.333.72.753m-2.536 1.237a.38.38 0 0 0 .236-.473.36.36 0 0 0-.453-.247c-.859.28-1.75.425-2.66.425-4.872 0-8.84-4.15-8.84-9.246 0-2.213.74-4.304 2.102-5.971L5.6 8.531c.023.189.18.324.356.324q.022.001.05-.005a.37.37 0 0 0 .306-.425l-.504-3.662-3.5.527a.37.37 0 0 0-.305.425.36.36 0 0 0 .406.319l2.152-.324C3.182 7.483 2.433 9.681 2.433 12c0 5.512 4.286 10 9.56 10 .984 0 1.949-.155 2.877-.459"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.33 18.27c0-.34.195-.497.498-.497.302 0 .498.157.498.496q-.002.244-.125.364c-.087.09-.216.132-.373.132s-.286-.042-.373-.132c-.08-.08-.126-.201-.126-.364"
                />
                <path
                    fill={fillColor}
                    d="M19.06 20.776h-6.467c-.877 0-1.56-.232-2.034-.686-.49-.474-.74-1.177-.74-2.087V5.992c0-.91.25-1.614.74-2.087.476-.454 1.16-.686 2.034-.686h6.467c.877 0 1.56.232 2.034.686.49.473.74 1.177.74 2.087V18c0 .91-.25 1.614-.74 2.087-.473.457-1.157.69-2.034.69M12.593 3.78c-1.488 0-2.213.723-2.213 2.213V18c0 1.49.722 2.213 2.213 2.213h6.467c1.49 0 2.213-.723 2.213-2.213V5.992c0-1.49-.722-2.213-2.213-2.213zM5.03 19.278c0-.202.117-.297.3-.297.181 0 .299.095.299.297 0 .098-.022.165-.076.218q-.08.08-.224.079a.32.32 0 0 1-.224-.079c-.047-.048-.075-.12-.075-.218"
                />
                <path
                    fill={fillColor}
                    d="M3.7 20.748h3.484c.479 0 .857-.132 1.117-.386.275-.266.415-.653.415-1.152v-6.224c0-.498-.137-.885-.415-1.151-.263-.258-.641-.387-1.12-.387H3.696c-.479 0-.854.132-1.12.387-.275.266-.415.653-.415 1.151v6.224c0 .499.14.886.418 1.152.263.257.641.386 1.12.386m0-8.74h3.484c.675 0 .977.303.977.978v6.224c0 .675-.302.978-.977.978H3.699c-.675 0-.978-.303-.978-.978v-6.224c0-.675.303-.977.978-.977M7.088 7.597a.28.28 0 0 0 .463.213c.084-.07.82-.703.944-.827.319-.316.316-.686-.006-1.008a22 22 0 0 0-.883-.787L7.55 5.14a.28.28 0 1 0-.365.426c.007.005.446.378.733.642h-.5c-.877 0-1.56.23-2.034.686-.49.473-.74 1.176-.74 2.087v1.098c0 .154.127.28.281.28a.28.28 0 0 0 .28-.283V8.98c0-1.488.726-2.213 2.213-2.213h.479c-.198.175-.496.433-.712.616a.28.28 0 0 0-.098.213"
                />
            </svg>
        );
    }
};

export default IconRenovateDeviceChangeMobileLight;
