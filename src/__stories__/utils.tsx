/**
 * Replaces node util.inspect for storybook usage
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const inspect = (obj: any): string => {
    if ((typeof obj === 'object' && obj !== null) || Array.isArray(obj) || typeof obj === 'string') {
        try {
            return JSON.stringify(obj, null, 2);
        } catch (e) {
            // ignore
        }
    }
    return String(obj);
};
