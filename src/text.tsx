'use client';
import * as React from 'react';
import classnames from 'classnames';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {pxToRem, applyCssVars} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import * as styles from './text.css';
import {VIVO_NEW_SKIN} from './skins/constants';
import ScreenReaderOnly from './screen-reader-only';
import * as textProps from './text-props';

import type {ExclusifyUnion} from './utils/utility-types';
import type {FontWeight} from './skins/types';
import type {DataAttributes} from './utils/types';

export const mapToWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
};

const lineClamp = (truncate?: boolean | number) => {
    if (truncate === true) {
        return 1;
    }
    if (truncate) {
        return truncate;
    }
    return 'initial';
};

const VIVINHO_CHAR = 'Ħ'; // vivo-type font replaces this char with a vivinho icon
const vivinhoForScreenReaders = (
    <>
        <span aria-hidden>{VIVINHO_CHAR}</span>
        <ScreenReaderOnly>
            <span>Vivo</span>
        </ScreenReaderOnly>
    </>
);

const makeVivinhoCharReadableForScreenReaders = ({
    children,
    ariaLabel,
    as,
}: {
    children: React.ReactNode;
    ariaLabel?: string;
    as?: React.ComponentType<any> | string;
}) => {
    // When the Text is a heading (<hx>), we set an aria-label replacing the vivinho char with "Vivo" for
    // screen readers and hide the original text.
    // If we used the generic solution, Safari/iOS VoiceOver would read "Vivo" as a separated heading
    if (
        typeof as === 'string' &&
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as) &&
        typeof children === 'string' &&
        children.includes(VIVINHO_CHAR)
    ) {
        return {
            ariaLabel: children.replace(new RegExp(VIVINHO_CHAR, 'g'), 'Vivo'),
            children: <span aria-hidden>{children}</span>,
        };
    }

    return {
        children: React.Children.map(children, (child) => {
            if (typeof child !== 'string') {
                return child;
            }
            if (!child.includes(VIVINHO_CHAR)) {
                return child;
            }
            return (
                <>
                    {child.split(VIVINHO_CHAR).map((segment, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && vivinhoForScreenReaders}
                            {segment}
                        </React.Fragment>
                    ))}
                </>
            );
        }),
        ariaLabel,
    };
};

export interface TextPresetProps {
    color?: string;
    decoration?: 'underline' | 'line-through' | 'inherit' | 'none';
    transform?: 'uppercase' | 'capitalize' | 'lowercase' | 'inherit' | 'none';
    children?: React.ReactNode;
    truncate?: boolean | number;
    wordBreak?: boolean;
    hyphens?: 'auto' | 'manual' | 'none';
    textAlign?: 'center' | 'right' | 'left';
    id?: string;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-level'?: number;
    'aria-label'?: string;
    'aria-hidden'?: React.HTMLAttributes<HTMLDivElement>['aria-hidden'];
    'aria-live'?: React.HTMLAttributes<HTMLDivElement>['aria-live'];
    dataAttributes?: DataAttributes;
    forceMobileSizes?: boolean;
    textShadow?: string;
}

interface TextProps extends TextPresetProps {
    weight?: FontWeight;
    /** in pixels, will be converted to rem in runtime */
    size?: number;
    /** in pixels, will be converted to rem in runtime */
    mobileSize?: number;
    /** in pixels, will be converted to rem in runtime */
    desktopSize?: number;
    /** in pixels, will be converted to rem in runtime */
    lineHeight?: string | number;
    /** in pixels, will be converted to rem in runtime */
    mobileLineHeight?: string | number;
    /** in pixels, will be converted to rem in runtime */
    desktopLineHeight?: string | number;
    letterSpacing?: number;

    forzeMobileSize?: never;
}

export const Text = ({
    weight,
    color = vars.colors.textPrimary,
    decoration,
    truncate,
    transform,
    wordBreak = true,
    hyphens = 'auto',
    as = 'span',
    children,
    size,
    mobileSize = size,
    desktopSize = size,
    lineHeight,
    mobileLineHeight = lineHeight,
    desktopLineHeight = lineHeight,
    letterSpacing,
    textAlign,
    textShadow,
    id,
    role,
    'aria-level': ariaLevel,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    dataAttributes,
}: TextProps): JSX.Element | null => {
    const {skinName} = useTheme();
    const isInverse = useIsInverseOrMediaVariant();
    const lineClampValue = lineClamp(truncate);

    const inverseColorsMap = {
        [vars.colors.textPrimary]: vars.colors.textPrimaryInverse,
        [vars.colors.textSecondary]: vars.colors.textSecondaryInverse,
        [vars.colors.textLink]: vars.colors.textLinkInverse,
        [vars.colors.textError]: vars.colors.textErrorInverse,
    };

    if (!children && children !== 0) {
        return null;
    }
    const className = classnames(styles.text, wordBreak ? styles.withWordBreak : styles.withoutWordBreak, {
        [styles.truncate]: truncate,
        [styles.truncateToOneLine]: truncate === 1 || truncate === true,
    });

    const sizeVars = applyCssVars({
        [styles.vars.mobileSize]: mobileSize ? pxToRem(mobileSize) : 'inherit',
        [styles.vars.mobileLineHeight]: mobileLineHeight ? pxToRem(mobileLineHeight) : 'inherit',
        [styles.vars.desktopSize]: desktopSize ? pxToRem(desktopSize) : 'inherit',
        [styles.vars.desktopLineHeight]: desktopLineHeight ? pxToRem(desktopLineHeight) : 'inherit',
    });
    const textVars = truncate
        ? applyCssVars({
              [styles.vars.lineClamp]: String(lineClampValue),
          })
        : {};

    if (skinName === VIVO_NEW_SKIN) {
        ({ariaLabel, children} = makeVivinhoCharReadableForScreenReaders({children, ariaLabel, as}));
    }

    return React.createElement(
        as,
        {
            className,
            id,
            role,
            'aria-level': ariaLevel,
            'aria-label': ariaLabel,
            'aria-hidden': ariaHidden,
            'aria-live': ariaLive,
            ...getPrefixedDataAttributes(dataAttributes, 'Text'),
            style: {
                ...sizeVars,
                ...textVars,
                hyphens,
                WebkitHyphens: hyphens,
                letterSpacing,
                fontWeight: weight ? mapToWeight[weight] : 'inherit',
                textTransform: transform || 'inherit',
                textDecoration: decoration ?? 'inherit',
                overflowWrap: wordBreak ? 'anywhere' : 'inherit',
                color: isInverse ? inverseColorsMap[color] ?? color : color,
                textAlign,
                textShadow,
                // When rendering as <pre/>, spaces are preserved and we don't want to remove them
                whiteSpace: as === 'pre' ? undefined : 'pre-line',
            },
        },
        children
    );
};

interface LightProps extends TextPresetProps {
    light: boolean;
}

interface MediumProps extends TextPresetProps {
    medium: boolean;
}

interface RegularProps extends TextPresetProps {
    regular: boolean;
}

interface RestrictedWeightTextProps<T> extends TextPresetProps {
    weight: T;
}

type RegularMediumProps = ExclusifyUnion<
    RegularProps | MediumProps | RestrictedWeightTextProps<'regular' | 'medium'>
>;
type LightRegularMediumProps = ExclusifyUnion<
    LightProps | RegularProps | MediumProps | RestrictedWeightTextProps<'light' | 'regular' | 'medium'>
>;

const getWeight = (props: LightRegularMediumProps) => {
    if (props.light) {
        return 'light';
    }
    if (props.regular) {
        return 'regular';
    }
    if (props.medium) {
        return 'medium';
    }
    if (props.weight) {
        return props.weight;
    }
    return undefined;
};

type TextSizes =
    | {
          size: number;
          lineHeight: string | number;
      }
    | {
          mobileSize: number;
          mobileLineHeight: string | number;
          desktopSize: number;
          desktopLineHeight: string | number;
      };

const getTextSizes = ({
    forceMobileSizes,
    textPreset,
    textProps,
}: {
    forceMobileSizes?: boolean;
    textPreset: {
        size: {mobile?: number; desktop?: number};
        lineHeight: {mobile?: string | number; desktop?: string | number};
    };
    // textProps is used as a fallback for textPreset values from textProps.tsx
    textProps: {
        mobileSize: number;
        mobileLineHeight: string | number;
        desktopSize: number;
        desktopLineHeight: string | number;
    };
}): TextSizes => {
    const mobileSize = textPreset.size.mobile || textProps.mobileSize;
    const mobileLineHeight = textPreset.lineHeight.mobile || textProps.mobileLineHeight;
    const desktopSize = textPreset.size.desktop || textProps.desktopSize;
    const desktopLineHeight = textPreset.lineHeight.desktop || textProps.desktopLineHeight;

    if (forceMobileSizes) {
        return {
            size: mobileSize,
            lineHeight: mobileLineHeight,
        };
    } else {
        return {
            mobileSize,
            mobileLineHeight,
            desktopSize,
            desktopLineHeight,
        };
    }
};

export const useTextPresetSizes = (presetName: keyof typeof textProps): TextSizes => {
    const {textPresets} = useTheme();
    const textPreset = textPresets[presetName];
    return getTextSizes({textPreset, textProps: textProps[presetName]});
};

export const Text10 = ({dataAttributes, forceMobileSizes, ...props}: TextPresetProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text10,
                textProps: textProps.text10,
            })}
            weight={textPresets.text10.weight}
            dataAttributes={{'component-name': 'Text10', testid: 'Text10', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text9 = ({dataAttributes, forceMobileSizes, ...props}: TextPresetProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text9,
                textProps: textProps.text9,
            })}
            weight={textPresets.text9.weight}
            dataAttributes={{'component-name': 'Text9', testid: 'Text9', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text8 = ({dataAttributes, forceMobileSizes, ...props}: TextPresetProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text8,
                textProps: textProps.text8,
            })}
            weight={textPresets.text8.weight}
            dataAttributes={{'component-name': 'Text8', testid: 'Text8', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text7 = ({dataAttributes, forceMobileSizes, ...props}: TextPresetProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text7,
                textProps: textProps.text7,
            })}
            weight={textPresets.text7.weight}
            dataAttributes={{'component-name': 'Text7', testid: 'Text7', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text6 = ({dataAttributes, forceMobileSizes, ...props}: TextPresetProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text6,
                textProps: textProps.text6,
            })}
            weight={textPresets.text6.weight}
            dataAttributes={{'component-name': 'Text6', testid: 'Text6', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text5 = ({dataAttributes, forceMobileSizes, ...props}: TextPresetProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text5,
                textProps: textProps.text5,
            })}
            weight={textPresets.text5.weight}
            dataAttributes={{'component-name': 'Text5', testid: 'Text5', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text4 = ({dataAttributes, forceMobileSizes, ...props}: LightRegularMediumProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text4,
                textProps: textProps.text4,
            })}
            weight={getWeight(props)}
            dataAttributes={{'component-name': 'Text4', testid: 'Text4', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text3 = ({dataAttributes, forceMobileSizes, ...props}: LightRegularMediumProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text3,
                textProps: textProps.text3,
            })}
            weight={getWeight(props)}
            dataAttributes={{'component-name': 'Text3', testid: 'Text3', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text2 = ({dataAttributes, forceMobileSizes, ...props}: RegularMediumProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text2,
                textProps: textProps.text2,
            })}
            weight={getWeight(props)}
            dataAttributes={{'component-name': 'Text2', testid: 'Text2', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text1 = ({dataAttributes, forceMobileSizes, ...props}: RegularMediumProps): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                textPreset: textPresets.text1,
                textProps: textProps.text1,
            })}
            weight={getWeight(props)}
            dataAttributes={{'component-name': 'Text1', testid: 'Text1', ...dataAttributes}}
            {...props}
        />
    );
};

export default Text;
