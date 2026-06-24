export type ParsedGradient = {
    type: 'linear' | 'radial';
    angle?: number;
    center?: {
        x: string;
        y: string;
    };
    radius?: string;
    stops: Array<{
        color: string;
        offset: string;
    }>;
};

type ExtractedGradientContent = {
    type: 'linear' | 'radial';
    content: string;
};

export const directionToAngle = (direction: string): number => {
    const angleMap: Record<string, number> = {
        'to top': 0,
        'to top right': 45,
        'to right': 90,
        'to bottom right': 135,
        'to bottom': 180,
        'to bottom left': 225,
        'to left': 270,
        'to top left': 315,
    };

    return angleMap[direction.toLowerCase()] ?? 180;
};

export const splitGradientParts = (content: string): string[] => {
    const parts: string[] = [];
    let current = '';
    let depth = 0;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        if (char === '(') {
            depth++;
        }

        if (char === ')') {
            depth--;
        }

        if (char === ',' && depth === 0) {
            parts.push(current);
            current = '';
            continue;
        }

        current += char;
    }

    if (current) {
        parts.push(current);
    }

    return parts;
};

export const parseColorStop = (part: string, index: number, total: number) => {
    const trimmed = part.trim();

    const match = trimmed.match(/^(.+?)(?:\s+([\d.]+%))?$/);

    if (!match) {
        return null;
    }

    const color = match[1].trim();

    const offset = match[2] || `${(index / Math.max(total - 1, 1)) * 100}%`;

    return {
        color,
        offset,
    };
};

export const parseLinearGradient = (content: string): ParsedGradient | null => {
    const parts = splitGradientParts(content);

    let angle: number | undefined;
    let colorStartIndex = 0;

    const firstPart = parts[0].trim();

    const angleMatch = firstPart.match(/^(-?\d+\.?\d*)(deg|grad|rad|turn)$/i);

    if (angleMatch) {
        const value = parseFloat(angleMatch[1]);
        const unit = angleMatch[2].toLowerCase();

        switch (unit) {
            case 'deg':
                angle = value;
                break;

            case 'grad':
                angle = value * 0.9;
                break;

            case 'rad':
                angle = value * (180 / Math.PI);
                break;

            case 'turn':
                angle = value * 360;
                break;
        }

        colorStartIndex = 1;
    } else if (firstPart.startsWith('to ')) {
        angle = directionToAngle(firstPart);
        colorStartIndex = 1;
    }

    const stops = parts
        .slice(colorStartIndex)
        .map((part, index, array) => parseColorStop(part, index, array.length))
        .filter(Boolean) as Array<{
        color: string;
        offset: string;
    }>;

    if (stops.length === 0) {
        return null;
    }

    return {
        type: 'linear',
        angle,
        stops,
    };
};

export const extractGradientContent = (gradient: string): ExtractedGradientContent | null => {
    const trimmed = gradient.trim();

    const type = trimmed.toLowerCase().startsWith('linear-gradient')
        ? 'linear'
        : trimmed.toLowerCase().startsWith('radial-gradient')
          ? 'radial'
          : null;

    if (!type) {
        return null;
    }

    const startIdx = trimmed.indexOf('(');

    if (startIdx === -1) {
        return null;
    }

    let depth = 0;
    let endIdx = -1;

    for (let i = startIdx; i < trimmed.length; i++) {
        if (trimmed[i] === '(') {
            depth++;
        }

        if (trimmed[i] === ')') {
            depth--;

            if (depth === 0) {
                endIdx = i;
                break;
            }
        }
    }

    if (endIdx === -1) {
        return null;
    }

    return {
        type,
        content: trimmed.substring(startIdx + 1, endIdx).trim(),
    };
};

export const parseRadialGradient = (content: string): ParsedGradient | null => {
    const parts = splitGradientParts(content);

    let colorStartIndex = 0;
    let center: {x: string; y: string} | undefined;
    let radius: string | undefined;

    const firstPart = parts[0].trim().toLowerCase();

    if (firstPart.includes('at ') || firstPart.includes('circle') || firstPart.includes('ellipse')) {
        const atMatch = firstPart.match(/at\s+([\d.]+%?)\s+([\d.]+%?)/);

        if (atMatch) {
            center = {
                x: atMatch[1],
                y: atMatch[2],
            };
        }

        if (firstPart.includes('at center')) {
            center = {
                x: '50%',
                y: '50%',
            };
        }

        const sizeMatch = firstPart.match(/([\d.]+%?)\s+at/);

        if (sizeMatch) {
            radius = sizeMatch[1];
        }

        colorStartIndex = 1;
    }

    const stops = parts
        .slice(colorStartIndex)
        .map((part, index, array) => parseColorStop(part, index, array.length))
        .filter(Boolean) as Array<{
        color: string;
        offset: string;
    }>;

    if (stops.length === 0) {
        return null;
    }

    return {
        type: 'radial',
        center,
        radius,
        stops,
    };
};

export const parseCSSGradient = (cssGradient: string): ParsedGradient | null => {
    const gradient = extractGradientContent(cssGradient);

    if (!gradient) {
        return null;
    }

    if (gradient.type === 'linear') {
        return parseLinearGradient(gradient.content);
    }

    return parseRadialGradient(gradient.content);
};
