import * as React from 'react';
import {useIsInverseVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';
import {Text4} from './text';

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
    const border = stacked ? `1px solid ${vars.colors.borderLow}` : 'none';

    const styleCircle = moreItemsStyle.type === 'circle';
    const space = stacked ? -8 : 8;
    const countChildren = React.Children.count(children);
    const plusCase = countChildren - maxItems;

    const styleBorderRadius = styleCircle ? vars.borderRadii.avatar : vars.borderRadii.container;
    const size = moreItemsStyle.size;

    return (
        <Inline space={space}>
            {React.Children.map(children, (child, index: number) => index < maxItems && <>{child}</>)}
            {countChildren > maxItems && (
                <div
                    style={{
                        position: 'relative',
                        width: size,
                        height: size,
                        backgroundColor,
                        borderRadius: styleBorderRadius,
                        boxSizing: 'border-box',
                        border,
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            width: size,
                            height: size,
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: textColor,
                        }}
                        aria-label={'+' + plusCase.toString()}
                    >
                        <Text4 regular color={textColor}>
                            {'+' + plusCase}
                        </Text4>
                    </div>
                </div>
            )}
        </Inline>
    );
};

export default StackingGroup;
