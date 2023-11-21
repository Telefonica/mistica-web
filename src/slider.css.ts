import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

const NOTCH_TOUCHABLE_AREA = 20;
const NOTCH_SIZE = 20;

export const container = style({
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
});

export const disabled = style({
    opacity: 0.5,
});

export const track = style({
    width: '100%',
    height: 4,
});

export const notchContainer = style({
    width: NOTCH_TOUCHABLE_AREA,
    height: NOTCH_TOUCHABLE_AREA,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const notch = style({
    width: NOTCH_SIZE,
    height: NOTCH_SIZE,
    borderRadius: '50%',
    opacity: 0.5,
    background: vars.colors.controlActivated,
});
