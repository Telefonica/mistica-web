import * as React from 'react';
import {Boxed} from './boxed';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './advanced-card.css';
import Image from './image';
import IconMeatballFilled from './generated/mistica-icons/icon-meatball-filled';
import Divider from './divider';
import NegativeBox from './negative-box';
import {Placeholder} from './placeholder';
import {Text2} from './text';

import type {ButtonPrimary, ButtonLink} from './button';
import type {DataAttributes} from './utils/types';
import type {RendersNullableElement} from './utils/renders-element';

interface AdvancedDataCardProps {
    title?: string;
    'aria-label'?: string;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    icon?: React.ReactElement;
    image?: string;
    showOptions?: boolean;
    footerText?: string;
}

const AdvancedDataCard = React.forwardRef<HTMLDivElement, AdvancedDataCardProps>(
    (
        {
            title,
            'aria-label': ariaLabel,
            dataAttributes,
            icon,
            showOptions,

            button,
            image,
            footerText,
            buttonLink,
        },
        ref
    ) => {
        const hasIcon = !!icon;
        const hasButton = !!button;
        const hasImage = !!image;
        const hasFooterText = !!footerText;
        const hasButtonLink = !!buttonLink;
        const hasFooter = hasButton || hasImage || hasFooterText || hasButtonLink;

        const margin = {marginLeft: '16px'};

        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;

        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.dataCard}>
                        <div
                            className={sprinkles({
                                display: 'flex',
                            })}
                        >
                            <Stack space={16} className={sprinkles({flex: 1})}>
                                {hasIcon ? icon : null}
                                {title}
                            </Stack>
                            {showOptions && (
                                <div style={topActionsStylesWithIcon}>
                                    <IconMeatballFilled />
                                </div>
                            )}
                        </div>

                        <div
                            className={sprinkles({
                                paddingTop: 24,
                            })}
                        >
                            <Placeholder />
                        </div>

                        {hasFooter && (
                            <div
                                className={sprinkles({
                                    paddingTop: 24,
                                })}
                            >
                                <NegativeBox>
                                    <Divider />
                                </NegativeBox>
                            </div>
                        )}

                        <div className={styles.actions}>
                            {hasButton && button}
                            {hasImage && (
                                <div
                                    style={hasButton ? margin : {}}
                                    className={sprinkles({alignItems: 'center', display: 'flex'})}
                                >
                                    <Image height={40} src={image} />
                                </div>
                            )}
                            {hasFooterText && (
                                <div
                                    style={hasButton || hasImage ? margin : {}}
                                    className={styles.footerText}
                                >
                                    <Text2 medium>{footerText}</Text2>
                                </div>
                            )}
                            {hasButtonLink && buttonLink}
                        </div>
                    </div>
                </Boxed>
            </section>
        );
    }
);

export default AdvancedDataCard;
