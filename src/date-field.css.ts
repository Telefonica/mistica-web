import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {
    fieldRightPadding,
    fieldVerticalPadding,
    iconButtonSize,
    iconSize,
    inputLineHeight,
    shrinkedLabelLineHeight,
} from './text-field-base.css';

export const iconContainer = style({
    position: 'absolute',
    top: `calc((${shrinkedLabelLineHeight.desktop} + 2 * ${fieldVerticalPadding}px + ${inputLineHeight} - 2px) / 2)`, // Field height / 2
    right: `calc(${fieldRightPadding}px + (${iconButtonSize} - ${iconSize}) / 2)`,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
    marginTop: `calc(-1 * ${iconSize} / 2)`, // center icon vertically

    '@media': {
        [mq.tabletOrSmaller]: {
            top: `calc((${shrinkedLabelLineHeight.mobile} + 2 * ${fieldVerticalPadding}px + ${inputLineHeight} - 2px) / 2)`, // Field height / 2
        },
    },
});
