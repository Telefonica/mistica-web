import * as React from 'react';
import * as styles from './stacking-group.css';
import {useIsInverseVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';

type Props = {
    stacked?: boolean;
    moreItemsStyle: {
        type: 'circle' | 'square';
        size: number;
    };
    maxItems?: number;
    children: React.ReactNode;
};

const StackingGroup: React.FC<Props> = ({moreItemsStyle, stacked = false, maxItems = Infinity, children}) => {
    const isInverse = useIsInverseVariant();
    const backgroundColor = isInverse ? vars.colors.brandHigh : vars.colors.brandLow;
    const textColor = isInverse ? vars.colors.textPrimaryInverse : vars.colors.brand;

    const styleCircle = moreItemsStyle.type === 'circle';
    const space = stacked ? -8 : 8;
    const countChildren = React.Children.count(children);
    const plusCase = countChildren - maxItems;

    const styleBorderRadius = styleCircle ? 64 : 8;
    const sizeAdjustment = stacked ? moreItemsStyle.size - 2 : moreItemsStyle.size;

    return (
        <Inline space={space}>
            {React.Children.map(children, (child, index: number) => index < maxItems && <div>{child}</div>)}
            {countChildren > maxItems && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            width: sizeAdjustment,
                            height: sizeAdjustment,
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: textColor,
                            borderRadius: 8,
                            zIndex: 2,
                        }}
                        aria-label={'+' + plusCase.toString()}
                    >
                        {'+' + plusCase}
                    </div>
                    <div
                        className={stacked ? styles.border : 'none'}
                        style={{
                            position: 'relative',
                            width: sizeAdjustment,
                            height: sizeAdjustment,
                            backgroundColor,
                            borderRadius: styleBorderRadius,
                            zIndex: 1,
                        }}
                    />
                </>
            )}
        </Inline>
    );
};

export default StackingGroup;
