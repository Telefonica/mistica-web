import * as React from 'react';
import Avatar from './avatar';
import Image from './image';
import * as styles from './stacking-group.css';
import {useIsInverseVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import classNames from 'classnames';

type dataArrayType = {
    src?: string;
    initials?: string;
};

type StackingGroupProps = {
    size: 24 | 32 | 64;
    data: dataArrayType[];
    type: 'avatar' | 'image';
    stacked?: boolean;
};

const StackingGroup: React.FC<StackingGroupProps> = ({size = 24, data, type, stacked = false}) => {
    // Due to the fact that the image does not have a variant to show the surplus of the array,
    // as in the case of the avatar, a pseudo-image had to be created in this component

    const isInverse = useIsInverseVariant();
    const backgroundColor = isInverse ? vars.colors.brandHigh : vars.colors.brandLow;
    const textColor = isInverse ? vars.colors.textPrimaryInverse : vars.colors.brand;

    let maxItems = 0;
    if (stacked) {
        maxItems = 4;
    } else {
        maxItems = 3;
    }

    const plusCase = data.length - maxItems;

    const verify = type === 'avatar';

    return (
        <div className={styles.inline}>
            {data.map(
                (_, index: number) =>
                    index < maxItems && (
                        <div
                            className={classNames(
                                styles.container,
                                stacked ? styles.stackedTrue : styles.stackedFalse
                            )}
                        >
                            {verify ? (
                                <Avatar
                                    key={index}
                                    size={size}
                                    src={data[index].src}
                                    initials={data[index].initials}
                                    aria-label={index.toString()}
                                    border
                                />
                            ) : (
                                <Image
                                    key={index}
                                    src={data[index].src || ''}
                                    height={size}
                                    width={size}
                                    aspectRatio="1:1"
                                    alt={index.toString()}
                                    border={stacked}
                                    zIndex={1}
                                />
                            )}
                        </div>
                    )
            )}
            {data[maxItems] && !data[maxItems + 1] && (
                <div
                    className={classNames(
                        styles.container,
                        stacked ? styles.stackedTrue : styles.stackedFalse
                    )}
                >
                    {verify ? (
                        <Avatar
                            size={size}
                            src={data[maxItems].src}
                            initials={data[maxItems].initials}
                            aria-label={maxItems.toString()}
                            border
                        />
                    ) : (
                        <Image
                            src={data[maxItems].src || ''}
                            height={size}
                            width={size}
                            aspectRatio="1:1"
                            alt={maxItems.toString()}
                            border={stacked}
                            noOpacityImageError
                        />
                    )}
                </div>
            )}
            {data[maxItems] && data[maxItems + 1] && (
                <div
                    className={classNames(
                        styles.container,
                        stacked ? styles.stackedTrue : styles.stackedFalse
                    )}
                >
                    {verify || !stacked ? (
                        <Avatar
                            size={size}
                            initials={'+' + plusCase}
                            aria-label={'+' + maxItems.toString()}
                            border
                        />
                    ) : (
                        // pseudo component Image
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    width: size,
                                    height: size,
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
                                    width: size,
                                    height: size,
                                    backgroundColor,
                                    borderRadius: 8,
                                    zIndex: 1,
                                }}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default StackingGroup;
