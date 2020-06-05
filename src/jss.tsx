// @flow
import * as React from 'react';
import {create as createJss} from 'jss';
import injectSheet, {createUseStyles as jssCreateUseStyles} from 'react-jss';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import ruleValueFunction from 'jss-plugin-rule-value-function';
import nested from 'jss-plugin-nested';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import ThemeContext from './theme-context';

import type {Theme} from './theme';
import type {Rule} from 'jss';

const autoBoxSizing = () => {
    const affectedCssProps = ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'];
    return {
        onProcessRule(rule: Rule): void {
            if (rule.style && affectedCssProps.some((cssKey) => cssKey in rule.style)) {
                rule.style['box-sizing'] = 'border-box';
            }
        },
    };
};

const jss = createJss();
jss.use(ruleValueFunction(), nested(), camelCase(), defaultUnit(), vendorPrefixer(), autoBoxSizing());

export const getJss = (): any => jss;

type CssClass = {[K: string]: string | number | boolean | CssClass, ...};
type Sheet = {[K: string]: CssClass, ...};

declare class StyledComponent<P, +WC> extends React.Component<P> {
    static +WrappedComponent: WC;
}

/*
 * This function does nothing, this is just used to make css-in-js autocomplete
 * editor extensions work with JSS. @see https://github.com/ansumanshah/css-in-js
 */
// $FlowFixMe
export const createSheet = <S: Sheet>(s: S): $ObjMap<S, () => string> => s;

type CreateStyledComponent = <P, Comp: React.ComponentType<P>, ST: {[_: $Keys<Comp>]: any, ...}>(
    Component: Comp
) => Class<StyledComponent<$Diff<React.ElementConfig<Comp>, {classes: *}>, Comp>> & $Shape<ST>;

export const withSheet = <S: {...}>(sheet: S): CreateStyledComponent => (Component) => {
    const StyledComponent = injectSheet(sheet)(Component);

    if (process.env.STORYBOOK_BUILD) {
        // $FlowFixMe proptypes is missing in React.AbstractComponentStatics
        StyledComponent.propTypes = Component.propTypes;
        if (StyledComponent.propTypes) {
            delete StyledComponent.propTypes.sheet;
        }

        // $FlowFixMe
        StyledComponent.defaultProps = Component.defaultProps;
        StyledComponent.displayName = Component.displayName || Component.name;
    }

    StyledComponent.WrappedComponent = Component;

    return StyledComponent;
};

export const removeJssProps = (props: Object): Object => {
    const {sheet, classes, ...withoutJssProps} = props;
    return withoutJssProps;
};

type CSSValue<P> = void | number | boolean | string | ((P) => void | string | number | boolean);
type ClassDef<P> = {
    [cssProp: string]:
        | CSSValue<P>
        | {
              [cssProp: string]:
                  | CSSValue<P>
                  | {
                        [cssProp: string]: CSSValue<P>,
                        ...
                    },
              ...
          },
    ...
};
type StylesDef<P> = {[className: string]: ClassDef<P>, ...};

type UseStyles<P, S: StylesDef<any>> = (props: P) => $ObjMap<S, () => string>;

export const createUseStyles = <P, S: StylesDef<P>>(styles: (theme: Theme) => S): UseStyles<P, S> => {
    if (styles.length === 0) {
        // $FlowFixMe
        styles = styles();
    }
    const useStyles = jssCreateUseStyles(styles, {theming: {context: ThemeContext}});

    return (...args) => {
        try {
            return useStyles(...args);
        } catch (err) {
            err.message = `${err.message} (Did you forget to add <ThemeContextProvider>?)`;
            throw err;
        }
    };
};
