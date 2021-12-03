import * as React from 'react';
import {create as createJss, SheetsRegistry} from 'jss';
import {createUseStyles as jssCreateUseStyles, JssProvider} from 'react-jss';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import ruleValueFunction from 'jss-plugin-rule-value-function';
import nested from 'jss-plugin-nested';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import ThemeContext from './theme-context';

import type {Theme} from './theme';

const affectedBoxSizingProps = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'];

const autoBoxSizing = () => {
    return {
        onProcessRule(rule: any /* this type should be StyleRule but it is not exposed by JSS */): void {
            if (rule.style && affectedBoxSizingProps.some((cssKey) => cssKey in rule.style)) {
                rule.style.boxSizing = 'border-box';
            }
        },
    };
};

const jss = createJss();
jss.use(ruleValueFunction(), nested(), camelCase(), defaultUnit(), vendorPrefixer(), autoBoxSizing());

export const getJss = (): any => jss;

type ObjValuesToStr<O> = {[Key in keyof O]: string};

type CSSValue = void | number | boolean | string | ((props: any) => string | number | boolean);

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

type UseStyles<S extends StylesDefinition> = (props?: any) => ObjValuesToStr<S>;

export const createUseStyles = <S extends StylesDefinition>(styles?: (theme: Theme) => S): UseStyles<S> => {
    // this checks the number of arguments
    if (styles?.length === 0) {
        // evaluate styles so JSS does not complain about declaring styles as a function
        // @ts-expect-error overwriting function as object
        styles = styles();
    }
    // @ts-expect-error - jss styles could be better
    const useStyles = jssCreateUseStyles(styles, {theming: {context: ThemeContext}});
    return (...args) => {
        try {
            return useStyles(...args) as any; // casted because useStyles returns Record<string, string>
        } catch (err: any) {
            err.message = `${err.message} (Did you forget to add <ThemeContextProvider>?)`;
            throw err;
        }
    };
};

export class ServerSideStyles {
    registry = new SheetsRegistry();

    render(el: React.ReactElement): React.ReactElement {
        return (
            <JssProvider jss={getJss()} registry={this.registry}>
                {el}
            </JssProvider>
        );
    }

    getStylesString(): string {
        return this.registry.toString();
    }

    renderStyles(): React.ReactElement {
        return (
            <style
                id="server-side-styles"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{__html: this.getStylesString()}}
            />
        );
    }

    static removeServerSideStyles(): void {
        document.getElementById('server-side-styles')?.remove();
    }
}
