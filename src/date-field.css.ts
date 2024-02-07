import {style} from '@vanilla-extract/css';
import {fieldRightPadding, iconButtonSize, iconSize} from './text-field-base.css';

export const iconContainer = style({
    position: 'absolute',
    pointerEvents: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: `calc(${fieldRightPadding}px + (${iconButtonSize} - ${iconSize}) / 2)`,
    marginRight: -8,
});
