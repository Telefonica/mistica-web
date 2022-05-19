// https://www.figma.com/file/U4ipIXOk64bdM5tSvaqPKS/%5BREADY%5D--Avatar?node-id=2%3A61
import * as React from 'react';
import Badge from './badge';
import IconUserAccountRegular from './generated/mistica-icons/icon-user-account-regular';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {Text2, Text3, Text4} from './text';
import {useIsInverseVariant} from './theme-variant-context';
import {IconProps} from './utils/types';

const useStyles = createUseStyles(() => ({
    avatar: {
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ({textColor}) => textColor,
        background: ({backgroundColor}) => backgroundColor,
        width: ({size}) => size,
        height: ({size}) => size,
        overflow: 'hidden',
    },
    image: {
        width: ({size}) => size,
        height: ({size}) => size,
        objectFit: 'cover',
    },
}));

/**
 * Returns a right/top distance for the badge.
 * The badge will be placed over the avatar's edge
 * This is calculated using the `radius * (1 - sin(45deg))` distance minus a
 * constant offset that depends on the badge size
 */
const getBadgeDistance = (size: number, badge?: boolean | number): number => {
    if (!badge) {
        return 0;
    }
    const radius = size / 2;
    const badgeOffset = badge === true ? 5 : 10; // badge=true renders a small circle
    return radius * (1 - Math.sin(Math.PI / 4)) - badgeOffset;
};

type AvatarProps = {
    size: number;
    url?: string;
    initials?: string;
    textColor?: string;
    backgroundColor?: string;
    Icon?: React.FC<IconProps>;
    badge?: boolean | number;
    'aria-label'?: string;
};

const renderText = (size: number, text: string): JSX.Element | null => {
    if (!text) {
        return null;
    }
    const props = {regular: true, transform: 'uppercase', color: 'currentColor'} as const;
    if (size <= 40) {
        return <Text2 {...props}>{text}</Text2>;
    }
    if (size <= 64) {
        return <Text3 {...props}>{text}</Text3>;
    }
    return <Text4 {...props}>{text}</Text4>;
};

const Avatar = ({
    size,
    url,
    Icon = IconUserAccountRegular,
    badge,
    initials = '',
    'aria-label': ariaLabel,
    ...props
}: AvatarProps): JSX.Element => {
    const {colors} = useTheme();
    const isInverse = useIsInverseVariant();
    const backgroundColor =
        props.backgroundColor ?? (isInverse ? colors.brandDark : colors.tagBackgroundActive);
    const textColor = props.textColor ?? isInverse ? colors.textPrimaryInverse : colors.brand;
    const [imgLoadError, setImgLoadError] = React.useState(false);
    const classes = useStyles({textColor, backgroundColor, size});

    React.useEffect(() => {
        setImgLoadError(false); // reset error state when url changes
    }, [url]);

    const letters = initials.trim().slice(0, 2);
    const badgePosition = getBadgeDistance(size, badge);
    const badgeValue = badge === true ? undefined : badge || 0;
    const shouldRenderImage = !!url && !imgLoadError;
    const iconSize = size <= 40 ? 16 : 24;

    return (
        <Badge value={badgeValue} top={badgePosition} right={badgePosition}>
            <div className={classes.avatar} role="img" aria-label={ariaLabel ?? initials}>
                {shouldRenderImage ? (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <img
                        src={url}
                        className={classes.image}
                        onError={() => setImgLoadError(true)}
                        role="none"
                    />
                ) : (
                    renderText(size, letters) || <Icon size={iconSize} color="currentColor" />
                )}
            </div>
        </Badge>
    );
};

export default Avatar;
