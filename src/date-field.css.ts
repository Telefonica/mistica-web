import {style} from '@vanilla-extract/css';
import {iconSize} from './icon-button.css';
import {fieldRightPadding, iconButtonSize} from './text-field-base.css';

export const iconContainer = style({
    position: 'absolute',
    pointerEvents: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: `calc(${fieldRightPadding}px + (${iconButtonSize} - ${iconSize.default}) / 2)`,
    marginRight: -12,
});
