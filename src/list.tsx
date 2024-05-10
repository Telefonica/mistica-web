/*
 * Specs:
 *   - Structure: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A2
 *   - Behavior: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A608
 *   - Assets: https://www.figma.com/file/Be8QB9onmHunKCCAkIBAVr/Lists-Component-Specs?node-id=0%3A1
 */

'use client';
import * as React from 'react';
import classNames from 'classnames';
import {BaseTouchable} from './touchable';
import {Text3, Text2, Text1} from './text';
import Box from './box';
import Stack from './stack';
import Badge from './badge';
import {useAriaId} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
import IconChevron from './icons/icon-chevron';
import Switch from './switch-component';
import RadioButton, {useRadioContext} from './radio-button';
import Checkbox from './checkbox';
import {Boxed} from './boxed';
import Divider from './divider';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './list.css';
import * as mediaStyles from './image.css';
import {vars} from './skins/skin-contract.css';
import {applyCssVars} from './utils/css';
import {IconButton, ToggleIconButton} from './icon-button';
import {sprinkles} from '../src/sprinkles.css';

import type {IconButtonProps, ToggleIconButtonProps} from './icon-button';
import type {TouchableElement, TouchableProps} from './touchable';
import type {DataAttributes, TrackingEvent} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

type Right = (({centerY}: {centerY: boolean}) => React.ReactNode) | React.ReactNode;

interface CommonProps {
    children?: void; // no children allowed
    headline?: string | React.ReactNode;
    title: string;
    titleAs?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string | null;
    descriptionLinesMax?: number;
    detail?: string;
    asset?: React.ReactNode;
    badge?: boolean | number;
    role?: string;
    extra?: React.ReactNode;
    dataAttributes?: DataAttributes;
    disabled?: boolean;
    withChevron?: boolean;
    'aria-label'?: string;
    right?: Right;
    danger?: boolean;
}

const renderRight = (right: Right, centerY: boolean) => {
    if (typeof right === 'function') return right?.({centerY});

    return centerY ? (
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <div>{right}</div>
        </div>
    ) : (
        right
    );
};

interface ContentProps extends CommonProps {
    headlineRef?: React.Ref<HTMLDivElement>;
    extraRef?: React.Ref<HTMLDivElement>;
    control?: React.ReactNode;
    /** This id is to link the title with the related control */
    labelId?: string;
}

export const Content: React.FC<ContentProps> = ({
    withChevron,
    headline,
    headlineRef,
    extraRef,
    title,
    titleAs,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    detail,
    asset,
    danger,
    badge,
    right,
    extra,
    labelId,
    disabled,
    control,
}) => {
    const isInverse = useIsInverseVariant();
    const numTextLines = [headline, title, subtitle, description, extra].filter(Boolean).length;
    const centerY = numTextLines === 1;

    return (
        <Box paddingY={16} className={styles.content}>
            {asset && (
                <Box
                    paddingRight={16}
                    className={classNames({[styles.center]: centerY, [styles.disabled]: disabled})}
                >
                    <div
                        className={styles.asset}
                        style={applyCssVars({
                            color: danger
                                ? isInverse
                                    ? vars.colors.textErrorInverse
                                    : vars.colors.textError
                                : isInverse
                                ? vars.colors.textPrimaryInverse
                                : vars.colors.textPrimary,
                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                        })}
                    >
                        {asset}
                    </div>
                </Box>
            )}

            <div
                className={classNames(styles.rowBody, {[styles.disabled]: disabled})}
                style={{justifyContent: centerY ? 'center' : 'flex-start'}}
                id={labelId}
            >
                <Text3
                    regular
                    color={danger ? vars.colors.textError : vars.colors.textPrimary}
                    truncate={titleLinesMax}
                    hyphens="auto"
                    as={titleAs}
                >
                    {title}
                </Text3>
                {headline && (
                    <div ref={headlineRef} style={{order: -1, paddingBottom: 4}}>
                        <Text1 regular color={vars.colors.textPrimary} hyphens="auto">
                            {headline}
                        </Text1>
                    </div>
                )}
                {subtitle && (
                    <Box paddingTop={2}>
                        <Text2
                            regular
                            color={vars.colors.textSecondary}
                            truncate={subtitleLinesMax}
                            hyphens="auto"
                        >
                            {subtitle}
                        </Text2>
                    </Box>
                )}
                {description && (
                    <Box paddingTop={2}>
                        <Text2
                            regular
                            color={vars.colors.textSecondary}
                            truncate={descriptionLinesMax}
                            hyphens="auto"
                        >
                            {description}
                        </Text2>
                    </Box>
                )}
                {extra && (
                    <Box ref={extraRef} paddingTop={2}>
                        {extra}
                    </Box>
                )}
            </div>

            {badge && (
                <Box paddingLeft={16}>
                    <div className={classNames(styles.badge, {[styles.disabled]: disabled})}>
                        <Badge value={badge === true ? undefined : badge} />
                    </div>
                </Box>
            )}

            {(detail || right || withChevron || control) && (
                <div className={classNames(styles.rightContent, {[styles.rightRestrictedWidth]: !!detail})}>
                    {detail && (
                        <div className={classNames(styles.detail, {[styles.disabled]: disabled})}>
                            <Text2 regular color={vars.colors.textSecondary} hyphens="auto">
                                {detail}
                            </Text2>
                        </div>
                    )}

                    {right && (
                        <div
                            className={classNames({
                                [styles.detailRight]: !!detail,
                                [styles.disabled]: disabled,
                            })}
                        >
                            {renderRight(right, centerY)}
                        </div>
                    )}

                    {withChevron && (
                        <Box
                            paddingLeft={detail || right ? 4 : 0}
                            className={classNames(styles.center, {[styles.disabled]: disabled})}
                        >
                            <IconChevron
                                color={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                                direction="right"
                            />
                        </Box>
                    )}

                    {control && (
                        <Box paddingLeft={detail || right ? 8 : 0} className={styles.center}>
                            {control}
                        </Box>
                    )}
                </div>
            )}
        </Box>
    );
};

type ControlProps = {
    name?: string;
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};

type BasicRowContentProps = CommonProps;

interface SwitchRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    switch: ControlProps | undefined;
}

interface CheckboxRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    checkbox: ControlProps | undefined;
}

interface RadioRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    radioValue: string;
}

interface IconButtonRowContentProps extends CommonProps {
    onPress?: (() => void) | undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;

    iconButton: ExclusifyUnion<IconButtonProps | ToggleIconButtonProps> | undefined;
}

interface HrefRowContentProps extends CommonProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    href: string | undefined;
    newTab?: boolean;
    loadOnTop?: boolean;
    onNavigate?: () => void | Promise<void>;
}

interface ToRowContentProps extends CommonProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    to: string | undefined;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    onNavigate?: () => void | Promise<void>;
}

interface OnPressRowContentProps extends CommonProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    onPress: (() => void) | undefined;
}

type RowContentProps = ExclusifyUnion<
    | BasicRowContentProps
    | SwitchRowContentProps
    | RadioRowContentProps
    | IconButtonRowContentProps
    | CheckboxRowContentProps
    | HrefRowContentProps
    | ToRowContentProps
    | OnPressRowContentProps
>;

const useControlState = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (isChecked: boolean) => void;
}): [boolean, () => void] => {
    const isControlledByParent = value !== undefined;
    const [isChecked, setIsChecked] = React.useState<boolean>(!!defaultValue);

    const toggle = () => {
        if (!isControlledByParent) {
            setIsChecked(!isChecked);
        }
        onChange?.(isControlledByParent ? !value : !isChecked);
    };

    return [isControlledByParent ? !!value : isChecked, toggle];
};

const hasControlProps = (
    obj: any
): obj is
    | SwitchRowContentProps
    | CheckboxRowContentProps
    | RadioRowContentProps
    | IconButtonRowContentProps => {
    return ['switch', 'checkbox', 'radioValue', 'iconButton'].some((prop) => obj[prop] !== undefined);
};

const RowContent = React.forwardRef<TouchableElement, RowContentProps>((props, ref) => {
    const titleId = useAriaId();
    const isInverse = useIsInverseVariant();
    const {
        asset,
        headline,
        title,
        titleAs,
        titleLinesMax,
        subtitle,
        subtitleLinesMax,
        description,
        descriptionLinesMax,
        detail,
        danger,
        badge,
        role,
        extra,
        withChevron,
        dataAttributes,
        right,
        'aria-label': ariaLabelProp,
    } = props;

    const [headlineText, setHeadlineText] = React.useState<string>('');
    const [extraText, setExtraText] = React.useState<string>('');

    // iOS voiceover reads links with multiple lines as separate links. By setting aria-label and marking content as aria-hidden, we can make it read the whole row as one link.
    const computedAriaLabelForLink = [title, headlineText, subtitle, description, extraText, detail]
        .filter(Boolean)
        .join(' ');

    const ariaLabel = ariaLabelProp ?? (props.href || props.to) ? computedAriaLabelForLink : undefined;

    const radioContext = useRadioContext();
    const disabled = props.disabled || (props.radioValue !== undefined && radioContext.disabled);
    const hasHoverDefault = !disabled && !isInverse;
    const hasHoverInverse = !disabled && isInverse;
    const hasControl = hasControlProps(props);
    const isInteractive = !!props.onPress || !!props.href || !!props.to;
    const hasChevron = hasControl ? false : withChevron ?? isInteractive;

    const interactiveProps = {
        href: props.href,
        newTab: props.newTab,
        loadOnTop: props.loadOnTop,

        to: props.to,
        fullPageOnWebView: props.fullPageOnWebView,
        replace: props.replace,

        onNavigate: props.onNavigate,
        onPress: props.onPress,
        trackingEvent: props.trackingEvent,
    } as unknown as TouchableProps;

    const [isChecked, toggle] = useControlState(props.switch || props.checkbox || {});

    const renderContent = (contentProps?: {control?: React.ReactNode; labelId?: string}) => (
        <Content
            asset={asset}
            headline={headline}
            headlineRef={(node) => {
                if (node) {
                    setHeadlineText(node.textContent || '');
                }
            }}
            title={title}
            titleAs={titleAs}
            subtitle={subtitle}
            description={description}
            badge={badge}
            titleLinesMax={titleLinesMax}
            subtitleLinesMax={subtitleLinesMax}
            descriptionLinesMax={descriptionLinesMax}
            detail={detail}
            danger={danger}
            right={right}
            control={contentProps?.control}
            extra={extra}
            extraRef={(node) => {
                if (node) {
                    // jsdom doesn't support innerText so we fallback to textContent https://github.com/jsdom/jsdom/issues/1245
                    setExtraText(node.innerText || node.textContent || '');
                }
            }}
            labelId={contentProps?.labelId}
            disabled={disabled}
            withChevron={hasChevron}
        />
    );

    if (isInteractive && !hasControl) {
        return (
            <BaseTouchable
                ref={ref}
                className={classNames(styles.rowContent, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                    [styles.pointer]: !disabled,
                })}
                {...interactiveProps}
                role={role}
                dataAttributes={dataAttributes}
                disabled={disabled}
                aria-label={ariaLabel}
            >
                <Box paddingX={16} aria-hidden={!!props.to || !!props.href || undefined}>
                    {renderContent()}
                </Box>
            </BaseTouchable>
        );
    }

    const renderRowWithDoubleInteraction = (control: React.ReactNode) => (
        <div
            className={styles.dualActionContainer}
            ref={ref as React.Ref<HTMLDivElement>}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <BaseTouchable
                disabled={disabled}
                {...interactiveProps}
                role={role}
                className={classNames(styles.dualActionLeft, {
                    [styles.touchableBackground]: hasHoverDefault,
                    [styles.touchableBackgroundInverse]: hasHoverInverse,
                })}
                aria-label={ariaLabel}
            >
                {renderContent({labelId: titleId})}
            </BaseTouchable>

            <div className={styles.dualActionDivider} />

            {control}
        </div>
    );

    const renderRowWithSingleControl = (content: React.ReactNode, isContentInsideControl?: boolean) => (
        <div
            className={classNames(styles.rowContent, {
                [styles.touchableBackground]: hasHoverDefault && isContentInsideControl,
                [styles.touchableBackgroundInverse]: hasHoverInverse && isContentInsideControl,
                [styles.pointer]: !disabled && isContentInsideControl,
            })}
            ref={ref as React.Ref<HTMLDivElement>}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {content}
        </div>
    );

    if (props.switch || props.checkbox) {
        const Control = props.switch ? Switch : Checkbox;
        const name = props.switch?.name ?? props.checkbox?.name ?? titleId;

        return isInteractive
            ? renderRowWithDoubleInteraction(
                  <Control
                      disabled={disabled}
                      name={name}
                      checked={isChecked}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      onChange={toggle}
                      render={({controlElement}) => (
                          <div className={styles.dualActionRight}>{controlElement}</div>
                      )}
                  />
              )
            : renderRowWithSingleControl(
                  <Control
                      disabled={disabled}
                      name={name}
                      checked={isChecked}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      onChange={toggle}
                      render={({controlElement, labelId}) => (
                          <Box paddingX={16} role={role}>
                              {renderContent({
                                  labelId,
                                  control: <Stack space="around">{controlElement}</Stack>,
                              })}
                          </Box>
                      )}
                  />,
                  true
              );
    }

    if (props.radioValue) {
        return isInteractive
            ? renderRowWithDoubleInteraction(
                  <RadioButton
                      value={props.radioValue}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      render={({controlElement}) => (
                          <Stack space="around">
                              <Box paddingX={16}>{controlElement}</Box>
                          </Stack>
                      )}
                  />
              )
            : renderRowWithSingleControl(
                  <RadioButton
                      value={props.radioValue}
                      aria-label={ariaLabel}
                      aria-labelledby={titleId}
                      render={({controlElement}) => (
                          <Box paddingX={16} role={role}>
                              {renderContent({
                                  labelId: titleId,
                                  control: <Stack space="around">{controlElement}</Stack>,
                              })}
                          </Box>
                      )}
                  />,
                  true
              );
    }

    if (props.iconButton) {
        return isInteractive
            ? renderRowWithDoubleInteraction(
                  <Box padding={16}>
                      <Stack space="around">
                          {props.iconButton.Icon ? (
                              <IconButton {...props.iconButton} disabled={props.disabled} />
                          ) : (
                              <ToggleIconButton {...props.iconButton} disabled={props.disabled} />
                          )}
                      </Stack>
                  </Box>
              )
            : renderRowWithSingleControl(
                  <Box paddingX={16}>
                      {renderContent({
                          labelId: titleId,
                          control: (
                              <Stack space="around">
                                  {props.iconButton.Icon ? (
                                      <IconButton
                                          {...props.iconButton}
                                          disabled={props.disabled}
                                          role={role}
                                      />
                                  ) : (
                                      <ToggleIconButton
                                          {...props.iconButton}
                                          disabled={props.disabled}
                                          role={role}
                                      />
                                  )}
                              </Stack>
                          ),
                      })}
                  </Box>
              );
    }

    return (
        <Box
            paddingX={16}
            className={styles.rowContent}
            role={role}
            dataAttributes={dataAttributes}
            ref={ref as React.Ref<HTMLDivElement>}
        >
            {renderContent()}
        </Box>
    );
});

export const Row = React.forwardRef<TouchableElement, RowContentProps>(
    ({dataAttributes, role = 'listitem', ...props}, ref) => (
        <div role={role} className={sprinkles({width: '100%'})}>
            <RowContent {...props} ref={ref} dataAttributes={{'component-name': 'Row', ...dataAttributes}} />
        </div>
    )
);

type RowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
};

export const RowList: React.FC<RowListProps> = ({
    children,
    ariaLabelledby,
    role = 'list',
    dataAttributes,
}) => {
    const childrenContent = React.Children.toArray(children).filter(Boolean);
    const lastIndex = childrenContent.length - 1;
    return (
        <div
            role={role}
            aria-labelledby={ariaLabelledby}
            {...getPrefixedDataAttributes(dataAttributes, 'RowList')}
        >
            {childrenContent.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    {index < lastIndex && (
                        <Box paddingX={16}>
                            <Divider />
                        </Box>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// danger + isInverse is not allowed
type CommonBoxedRowProps =
    | {
          danger: true;
          isInverse?: false;
      }
    | {
          isInverse?: boolean;
          danger?: false;
      }
    | {
          isInverse?: false;
          danger: boolean;
      };

type BoxedRowProps = ExclusifyUnion<
    | BasicRowContentProps
    | SwitchRowContentProps
    | RadioRowContentProps
    | IconButtonRowContentProps
    | CheckboxRowContentProps
    | HrefRowContentProps
    | ToRowContentProps
    | OnPressRowContentProps
> &
    CommonBoxedRowProps;

export const BoxedRow = React.forwardRef<HTMLDivElement, BoxedRowProps>(({dataAttributes, ...props}, ref) => (
    <Boxed
        isInverse={props.isInverse}
        ref={ref}
        dataAttributes={{'component-name': 'BoxedRow', ...dataAttributes}}
    >
        <RowContent {...props} />
    </Boxed>
));

type BoxedRowListProps = {
    children: React.ReactNode;
    ariaLabelledby?: string;
    role?: string;
    dataAttributes?: DataAttributes;
};

export const BoxedRowList: React.FC<BoxedRowListProps> = ({
    children,
    ariaLabelledby,
    role = 'list',
    dataAttributes,
}) => (
    <Stack
        space={16}
        role={role}
        aria-labelledby={ariaLabelledby}
        dataAttributes={{'component-name': 'BoxedRowList', ...dataAttributes}}
    >
        {children}
    </Stack>
);
