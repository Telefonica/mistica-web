import * as React from 'react';
import {applyAlpha} from './utils/color';
import {useTheme} from './hooks';

type PlaceholderProps = {
    width?: string | number;
    height?: string | number;
    children?: void;
};

export const Placeholder: React.FC<PlaceholderProps> = ({width = 'auto', height = 120}) => {
    const {colors} = useTheme();
    return (
        <div
            style={{
                height,
                width,
                boxSizing: 'border-box',
                background: applyAlpha(colors.neutralHigh, 0.08),
                border: `2px solid ${applyAlpha(colors.neutralHigh, 0.3)}`,
                position: 'relative',
            }}
        >
            <svg width="100%" height="100%">
                <line
                    style={{strokeWidth: 2, stroke: applyAlpha(colors.neutralHigh, 0.1)}}
                    x1={0}
                    y1={0}
                    x2="100%"
                    y2="100%"
                />
                <line
                    style={{strokeWidth: 2, stroke: applyAlpha(colors.neutralHigh, 0.1)}}
                    x1="100%"
                    y1={0}
                    x2={0}
                    y2="100%"
                />
            </svg>
        </div>
    );
};
