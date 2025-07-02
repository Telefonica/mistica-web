import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

const sprinklesStyles = {
    position: 'absolute',
    padding: 0,
    overflow: 'hidden',
    border: 'none',
} as const;

const styles = {
    margin: -1,
    width: 1,
    height: 1,
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    fontSize: '1px',
} as const;

export const screenReaderOnlyStyles = {
    ...sprinklesStyles,
    ...styles,
};

export const screenReaderOnly = style([sprinkles(sprinklesStyles), styles]);
