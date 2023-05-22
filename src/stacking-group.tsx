import * as React from 'react';
import {useIsInverseVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';
import {Text4} from './text';
import * as styles from './stacking-group.css';

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
    const moreItemsCount = countChildren - maxItems;
    const space = stacked ? -8 : 8;
    const size = moreItemsStyle.size;

    return (
        <Inline space={space}>
            {React.Children.toArray(children).slice(0, maxItems - 1)}
            {countChildren > maxItems && (
                <div
                    className={styles.moreItems}
                    style={{
                        width: size,
                        height: size,
                        backgroundColor: isInverse ? vars.colors.brandHigh : vars.colors.brandLow,
                        borderRadius: moreItemsStyle.type === 'circle' ? 64 : vars.borderRadii.container,
                        border: stacked ? `1px solid ${vars.colors.borderLow}` : 'none',
                    }}
                >
                    <Text4 regular color={isInverse ? vars.colors.textPrimaryInverse : vars.colors.brand}>
                        {'+' + moreItemsCount}
                    </Text4>
                </div>
            )}
        </Inline>
    );
};

export default StackingGroup;
