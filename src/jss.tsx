import * as React from 'react';
import {create as createJss} from 'jss';
import withStyles, {createUseStyles as jssCreateUseStyles} from 'react-jss';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import ruleValueFunction from 'jss-plugin-rule-value-function';
import nested from 'jss-plugin-nested';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import ThemeContext from './theme-context';

import type {Theme} from './theme';

const affectedBoxSizingProps = ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'];

const autoBoxSizing = () => {
    return {
        onProcessRule(rule: any /* this type should be StyleRule but it is not exposed by JSS */): void {
            if (rule.style && affectedBoxSizingProps.some((cssKey) => cssKey in rule.style)) {
                rule.style['box-sizing'] = 'border-box';
            }
        },
    };
};

const jss = createJss();
jss.use(ruleValueFunction(), nested(), camelCase(), defaultUnit(), vendorPrefixer(), autoBoxSizing());

export const getJss = (): any => jss;

type CssClass = {[K: string]: string | number | boolean | CssClass};
type Sheet = {[K: string]: CssClass};

type ObjValuesToStr<O> = {[Key in keyof O]: string};

/**
 * This function does nothing, this is just used to make css-in-js autocomplete
 * editor extensions work with JSS. @see https://github.com/ansumanshah/css-in-js
 *
 */
export const createSheet = <S extends Sheet>(sheet: S): ObjValuesToStr<S> =>
    // @ts-expect-error - This function casts a value to an incompatible type
    sheet;

export const withSheet = <S extends ObjValuesToStr<Sheet>>(sheet: S) => <P extends any>(
    Component: React.ComponentType<P>
): React.ComponentType<Omit<P, 'classes'>> & {WrappedComponent: typeof Component} => {
    // @ts-expect-error - our types are fine
    const StyledComponent = withStyles(sheet)(Component);
    if (process.env.STORYBOOK_BUILD) {
        StyledComponent.propTypes = Component.propTypes;
        if (StyledComponent.propTypes) {
            // @ts-expect-error - sheet does not exist in propTypes
            delete StyledComponent.propTypes.sheet;
        }
        StyledComponent.defaultProps = Component.defaultProps;
        StyledComponent.displayName = Component.displayName || Component.name;
    }

    // @ts-expect-error
    StyledComponent.WrappedComponent = Component;
    // @ts-expect-error
    return StyledComponent;
};

export const removeJssProps = <P extends {sheet?: any; classes?: any}>(
    props: P
): Omit<P, 'sheet' | 'classes'> => {
    const {sheet, classes, ...withoutJssProps} = props;
    return withoutJssProps;
};

type Props = Record<string, any>;

type CSSValue = void | number | boolean | string | ((props: Props) => void | string | number | boolean);

type ClassDefinition = {
    [cssProp: string]:
        | CSSValue
        | {
              [cssProp: string]:
                  | CSSValue
                  | {
                        [cssProp: string]: CSSValue;
                    };
          };
};

type StylesDefinition = {[className: string]: ClassDefinition};

type UseStyles<S extends StylesDefinition> = (props?: Props) => ObjValuesToStr<S>;

export const createUseStyles = <S extends StylesDefinition>(styles?: (theme: Theme) => S): UseStyles<S> => {
    // @ts-expect-error
    const useStyles = jssCreateUseStyles(styles, {theming: {context: ThemeContext}});
    return (...args) => {
        try {
            return useStyles(...args) as any; // casted because useStyles returns Record<string, string>
        } catch (err) {
            err.message = `${err.message} (Did you forget to add <ThemeContextProvider>?)`;
            throw err;
        }
    };
};
