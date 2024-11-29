import type {HeadingType} from './types';

export const isBiggerHeading = (heading: HeadingType, otherHeading?: HeadingType): boolean => {
    // In case headings are equal, we consider that the first one has more priority
    if (!otherHeading || heading === otherHeading) {
        return true;
    }

    if (heading === 'span') {
        return false;
    }

    // Both are header tags
    return heading < otherHeading;
};
