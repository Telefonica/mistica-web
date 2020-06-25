export * from '../src';

// This is a bit hacky because theme is not a component, but exporting it here lets us use it inside playroom
// The global __playroom_theme__ object is set in frame-component.js according to the active theme skin.
export const theme = {
    get colors(): any {
        // @ts-expect-error __playroom_theme__ does not exist in window
        return window.__playroom_theme__.colors;
    },
};
