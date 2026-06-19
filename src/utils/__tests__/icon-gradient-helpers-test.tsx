import {
    angleToCoords,
    directionToAngle,
    splitGradientParts,
    parseColorStop,
    parseLinearGradient,
    parseRadialGradient,
    parseCSSGradient,
    extractGradientContent,
} from '../icon-gradient-helpers';

test('angleToCoords converts angle to svg coordinates', () => {
    expect(angleToCoords(90)).toEqual({
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '50%',
    });
});

test('directionToAngle converts css directions to angles', () => {
    expect(directionToAngle('to right')).toBe(90);
    expect(directionToAngle('to bottom')).toBe(180);
    expect(directionToAngle('invalid')).toBe(180);
});

test('splitGradientParts ignores commas inside functions', () => {
    expect(splitGradientParts('rgba(0,0,0,1), rgba(255,255,255,1)')).toEqual([
        'rgba(0,0,0,1)',
        ' rgba(255,255,255,1)',
    ]);
});

test('parseColorStop parses correct offsets or falls back to defaults', () => {
    expect(parseColorStop('#fff 25%', 0, 2)).toEqual({color: '#fff', offset: '25%'});
    expect(parseColorStop('#fff', 0, 2)).toEqual({color: '#fff', offset: '0%'});
    expect(parseColorStop('', 0, 2)).toBeNull();
});

test('parseLinearGradient parses direction, stops and angle units', () => {
    expect(parseLinearGradient('to right, red, blue')).toEqual({
        type: 'linear',
        angle: 90,
        stops: [
            {color: 'red', offset: '0%'},
            {color: 'blue', offset: '100%'},
        ],
    });
    expect(parseLinearGradient('45deg, red, blue')?.angle).toBe(45);
    expect(parseLinearGradient('100grad, red, blue')?.angle).toBe(90);
    expect(parseLinearGradient('1rad, red, blue')?.angle).toBeCloseTo(57.2958, 4);
    expect(parseLinearGradient('0.5turn, red, blue')?.angle).toBe(180);
});

test('parseLinearGradient returns null if no color stops are found', () => {
    expect(parseLinearGradient('to right')).toBeNull();
    expect(parseLinearGradient('45deg')).toBeNull();
});

test('parseRadialGradient parses configurations, shapes and center positions', () => {
    expect(parseRadialGradient('circle at center, red, blue')).toEqual({
        type: 'radial',
        center: {x: '50%', y: '50%'},
        radius: undefined,
        stops: [
            {color: 'red', offset: '0%'},
            {color: 'blue', offset: '100%'},
        ],
    });
    expect(parseRadialGradient('circle at 25% 75%, red, blue')?.center).toEqual({
        x: '25%',
        y: '75%',
    });
    expect(parseRadialGradient('50% at center, red, blue')?.radius).toBe('50%');
    expect(parseRadialGradient('circle, red, blue')?.type).toBe('radial');
    expect(parseRadialGradient('ellipse, red, blue')?.type).toBe('radial');
});

test('parseRadialGradient returns null if invalid or no color stops are found', () => {
    expect(parseRadialGradient('circle at center')).toBeNull();
    expect(parseRadialGradient('ellipse')).toBeNull();
});

test('parseCSSGradient returns null for invalid input', () => {
    expect(parseCSSGradient('red')).toBeNull();
});

test('extractGradientContent handles valid and invalid inputs', () => {
    expect(extractGradientContent('linear-gradient(red, blue)', 'linear')).toBe('red, blue');
    expect(extractGradientContent('linear-gradient', 'linear')).toBeNull();
    expect(extractGradientContent('linear-gradient(red, blue', 'linear')).toBeNull();
});
