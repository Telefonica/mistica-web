import * as React from 'react';
import {useTheme} from '../hooks';

const ICON_SIZE_1 = 32;

type Props = {
    role?: string;
    size?: number;
    color?: string;
};

const IconChecked: React.FC<Props> = ({role = 'presentation', size = ICON_SIZE_1, color}) => {
    const {colors} = useTheme();
    const fillColor = color || colors.iconPrimary;
    return (
        <svg role={role} width={size} height={size} viewBox="0 0 32 32">
            <path
                fill={fillColor}
                d="M15.995 0c5.085 0 9.038 1.327 11.755 3.944C30.573 6.66 32 10.718 32 16.002s-1.432 9.337-4.25 12.054C25.033 30.673 21.08 32 15.995 32c-5.084 0-9.037-1.327-11.75-3.944C1.427 25.344 0 21.291 0 16.006c0-5.283 1.427-9.34 4.245-12.058C6.958 1.331 10.915 0 15.995 0zm0 1.773C6.557 1.773 1.77 6.56 1.77 16.007c0 9.437 4.788 14.224 14.226 14.224 9.444 0 14.236-4.787 14.236-14.224 0-9.442-4.792-14.234-14.236-14.234zM23.56 8.99c.37.279.447.803.169 1.172l-9.384 12.565c-.155.21-.397.333-.657.337h-.018c-.255 0-.497-.114-.657-.314l-4.295-5.398c-.287-.36-.228-.89.132-1.176.36-.288.89-.228 1.177.132l3.62 4.55 8.741-11.699c.278-.37.803-.447 1.172-.169z"
                transform="translate(-80 -461) translate(80 461)"
            />
        </svg>
    );
};

export default IconChecked;
