import * as React from 'react';
import {createUseStyles} from './jss';
import {ThemeVariant} from './theme-variant-context';
import {getPlatform} from './utils/platform';
import Box from './box';
import {ButtonPrimary, ButtonSecondary} from './button';
import TextLink from './text-link';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : theme.colors.background),
        border: ({isInverse}) => (isInverse ? '0' : `1px solid ${theme.colors.divider}`),
        borderRadius: 4,
    },
    title: {
        margin: 0,
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimaryInverse : theme.colors.textPrimary),
        fontSize: 18,
        fontWeight: 300,
        lineHeight: 1.33,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.45 : 'normal',
    },
    paragraph: {
        margin: '8px 0 16px',
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimaryInverse : theme.colors.textSecondary),
        lineHeight: 1.43,
        fontSize: 14,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.15 : 'normal',
    },
    imageContent: {
        display: 'flex',
        alignItems: 'flex-end',
        width: 100,
        minWidth: 100,
    },
}));

type HighlightedCardProps = {
    title: string;
    paragraph: string;
    image?: React.ReactElement<any> | string | null;
    backgroundImage?: string;
    isInverse?: boolean;
    action:
        | React.ReactElement<typeof ButtonPrimary>
        | React.ReactElement<typeof ButtonSecondary>
        | React.ReactElement<typeof TextLink>
        | null;
};

const HighlightedCard: React.FC<HighlightedCardProps> = ({
    title,
    paragraph,
    image,
    backgroundImage,
    isInverse = false,
    action,
}) => {
    const classes = useStyles({isInverse});

    return (
        <ThemeVariant isInverse={isInverse}>
            <div className={classes.container} style={{backgroundImage}}>
                <Box paddingLeft={16} paddingRight={image ? 8 : 16} paddingY={24}>
                    <h2 className={classes.title}>{title}</h2>
                    <p className={classes.paragraph}>{paragraph}</p>
                    {action}
                </Box>
                {image && <div className={classes.imageContent}>{image}</div>}
            </div>
        </ThemeVariant>
    );
};

export default HighlightedCard;
