import * as React from 'react';
import * as styles from './logo.css';
import {getBlauSkin} from './skins/blau';
import {applyCssVars} from './utils/css';
import {calcInlineVars} from './logo-common';

import type {LogoImageProps} from './logo-common';

const BlauLogoImage = ({
    size,
    type,
    isDarkMode,
    isInverse,
    color: colorProp,
}: LogoImageProps): JSX.Element => {
    const {colors} = getBlauSkin();
    const color = colorProp || (isInverse && !isDarkMode ? colors.inverse : colors.brand);
    const colorSecondary = colorProp || (isInverse && !isDarkMode ? colors.inverse : colors.promo);

    if (type === 'vertical') {
        return (
            <svg
                className={styles.svg}
                style={applyCssVars(calcInlineVars(size))}
                viewBox="0 0 73 72"
                fill={color}
                role="presentation"
            >
                <path d="M56.42 52.2003H18.2V63.0003H56.42V52.2003Z" fill={colorSecondary} />
                <path d="M38.8069 36.431H35.0651V31.658H38.8069C40.7615 31.658 41.5432 32.865 41.5432 34.0171C41.5432 35.2789 40.7615 36.431 38.8069 36.431ZM35.121 19.0948H37.9132C40.6496 19.0948 40.4821 23.0447 37.9132 23.0447H35.121V19.0948ZM49.6963 26.2267C52.7119 25.1844 54.3312 22.3864 54.3871 19.369C54.5546 13.7182 50.0316 9 44.3355 9H18.2V19.0398H21.8859V36.7602H18.2V46.8H44.2237C50.925 46.8 56.1188 42.3013 56.3981 35.8276C56.6773 30.89 54.2756 27.9275 49.6963 26.2267Z" />
            </svg>
        );
    }

    if (type === 'imagotype') {
        return (
            <svg
                className={styles.svg}
                style={applyCssVars(calcInlineVars(size))}
                viewBox="0 0 138 72"
                fill={color}
                role="presentation"
            >
                <path d="M135.557 54.5729H6.16162V65.184H135.557V54.5729Z" fill={colorSecondary} />
                <path d="M37.7269 25.9921C42.1878 27.7129 44.5575 30.6343 44.2869 35.6127C44.0163 42.0913 38.9696 46.5732 32.3623 46.5732H6.83155V36.5296H10.4229V18.8042H6.83155V8.75793H32.47C38.0579 8.75793 42.5215 13.5131 42.3507 19.1299C42.2929 22.1512 40.6877 24.9701 37.7269 25.9921ZM26.1359 17.9477H22.7942V23.2703H26.1359C29.4277 23.2703 29.6484 17.9477 26.1359 17.9477ZM30.3393 34.0259C30.3393 32.4812 29.3437 30.9443 27.0449 30.9443H22.7915V37.1076H27.0423C29.2806 37.1102 30.3393 35.5917 30.3393 34.0259Z" />
                <path d="M45.2905 8.75794V18.8042H48.8477V46.5732H61.8442V8.75794H45.2905Z" />
                <path d="M99.2576 46.5732H87.0676L86.7996 43.7674C84.8108 46.1975 81.8553 47.0592 79.0705 47.117C60.5884 47.3325 60.5884 16.6525 79.0705 16.8627C81.8553 16.8627 84.8108 17.727 86.7996 20.1572L87.0676 17.3435H99.2576V46.5732ZM86.3188 31.9846C86.3188 26.3126 78.3191 26.3704 78.3191 31.9846C78.3191 37.6067 86.3188 37.6619 86.3188 31.9846Z" />
                <path d="M134.858 17.3435H121.972V33.1222C121.972 35.2844 120.359 36.309 118.748 36.309C117.13 36.309 115.843 35.2345 115.843 33.1774V17.3435H102.949V33.2378C102.949 41.072 106.009 46.9043 114.661 47.1171C117.506 47.1696 120.467 46.2501 122.5 43.6571L122.773 46.5733L134.861 46.5917L134.858 17.3435Z" />
            </svg>
        );
    }

    return (
        <svg
            className={styles.svg}
            style={applyCssVars(calcInlineVars(size))}
            viewBox="0 0 72 72"
            fill={color}
            role="presentation"
        >
            <path d="M55.8 52.2003H18V63.0003H55.8V52.2003Z" fill={colorSecondary} />
            <path d="M38.3805 36.431H34.6798V31.658H38.3805C40.3136 31.658 41.0868 32.865 41.0868 34.0171C41.0868 35.2789 40.3136 36.431 38.3805 36.431ZM34.7351 19.0948H37.4966C40.2029 19.0948 40.0373 23.0447 37.4966 23.0447H34.7351V19.0948ZM49.1503 26.2267C52.1327 25.1844 53.7342 22.3864 53.7895 19.369C53.9552 13.7182 49.4819 9 43.8483 9H18V19.0398H21.6454V36.7602H18V46.8H43.7377C50.3654 46.8 55.5022 42.3013 55.7784 35.8276C56.0545 30.89 53.6792 27.9275 49.1503 26.2267Z" />
        </svg>
    );
};

export default BlauLogoImage;
