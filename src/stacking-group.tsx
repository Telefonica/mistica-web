'use client';
import * as React from 'react';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';
import * as styles from './stacking-group.css';
import * as mediaStyles from './image.css';
import {applyCssVars} from './utils/css';
import {renderText} from './avatar';

type Props = {
    stacked?: boolean;
    moreItemsStyle: {
        type: 'circle' | 'square';
        size: number;
    };
    maxItems?: number;
    children: React.ReactNode;
};

const StackingGroup = ({
    moreItemsStyle,
    stacked = true,
    maxItems = Infinity,
    children,
}: Props): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const countChildren = React.Children.count(children);
    const moreItemsCount = countChildren - maxItems + 1;
    const space = stacked ? -8 : 8;
    const size = moreItemsStyle.size;

    const borderRadius = moreItemsStyle.type === 'circle' ? '50%' : vars.borderRadii.mediaSmall;
    const textColor = isInverse ? vars.colors.textPrimaryInverse : vars.colors.textBrand;

    return (
        <div
            style={applyCssVars({
                [mediaStyles.vars.mediaBorderRadius]: borderRadius,
            })}
        >
            <Inline space={space}>
                {React.Children.toArray(children).slice(
                    0,
                    countChildren > maxItems ? maxItems - 1 : maxItems
                )}
                {countChildren > maxItems && (
                    <div
                        className={styles.moreItems}
                        style={{
                            width: size,
                            height: size,
                            color: textColor,
                            borderRadius,
                            backgroundColor: isInverse ? vars.colors.brandHigh : vars.colors.brandLow,
                            border: stacked ? `1px solid ${vars.colors.borderLow}` : 'none',
                        }}
                    >
                        {renderText(size, `+${moreItemsCount}`)}
                    </div>
                )}
            </Inline>
        </div>
    );
};

export default StackingGroup;
