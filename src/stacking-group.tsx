'use client';
import * as React from 'react';
import {useIsInverseVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';
import {Text4} from './text';
import * as styles from './stacking-group.css';
import * as mediaStyles from './image.css';
import {applyCssVars} from './utils/css';

type Props = {
    stacked?: boolean;
    moreItemsStyle: {
        type: 'circle' | 'square';
        size: number;
    };
    maxItems?: number;
    children: React.ReactNode;
};

const StackingGroup: React.FC<Props> = ({moreItemsStyle, stacked = true, maxItems = Infinity, children}) => {
    const isInverse = useIsInverseVariant();
    const countChildren = React.Children.count(children);
    const moreItemsCount = countChildren - maxItems + 1;
    const space = stacked ? -8 : 8;
    const size = moreItemsStyle.size;

    const borderRadius = moreItemsStyle.type === 'circle' ? '50%' : vars.borderRadii.mediaSmall;

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
                            borderRadius,
                            backgroundColor: isInverse ? vars.colors.brandHigh : vars.colors.brandLow,
                            border: stacked ? `1px solid ${vars.colors.borderLow}` : 'none',
                        }}
                    >
                        <Text4
                            regular
                            color={isInverse ? vars.colors.textPrimaryInverse : vars.colors.textBrand}
                        >
                            {'+' + moreItemsCount}
                        </Text4>
                    </div>
                )}
            </Inline>
        </div>
    );
};

export default StackingGroup;
