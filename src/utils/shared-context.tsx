'use client';
import * as React from 'react';
import {PACKAGE_VERSION} from '../package-version';

type ContextRegistry = Record<symbol, React.Context<any> | undefined>;

/**
 * A module federation remote, or a page that mixes the CommonJS and the ES builds, can evaluate a
 * module of this package twice. Each evaluation would create its own context, and a consumer of one
 * copy would never see the provider of the other one. The icons of @telefonica/mistica-icons read
 * the theme through @telefonica/mistica/icon-runtime, so they hit this case unless the application
 * shares that entry point.
 *
 * React is always a singleton on the page, so the context lives on it. Apollo Client applies the
 * same pattern. The key holds the version, because the CSS variables of each version have different
 * names, and two versions must not share a theme.
 */
export const getSharedContext = <T,>(name: string, defaultValue: T): React.Context<T> => {
    const key = Symbol.for(`@telefonica/mistica/${name}@${PACKAGE_VERSION}`);
    const registry = React.createContext as unknown as ContextRegistry;
    const existingContext = registry[key];
    if (existingContext) {
        return existingContext;
    }

    const context = React.createContext<T>(defaultValue);
    Object.defineProperty(registry, key, {value: context, enumerable: false});
    return context;
};
