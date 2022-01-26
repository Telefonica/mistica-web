import * as React from 'react';
import {
    Stack,
    Tag,
    useTheme,
    Text3,
    IconStarFilled,
    IconTimeFilled,
    IconOfferPercentFilled,
    IconCheckRegular,
    IconCloseRegular,
    IconAlertRegular,
    Inline,
    Text1,
} from '..';
import {ThemeVariant} from '../theme-variant-context';

type Args = {
    label: string;
};

export default {
    title: 'Components/Others/Tag',
};

const Container: React.FC<{inverse?: boolean}> = ({children, inverse = false}) => {
    const {colors} = useTheme();
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    padding: 16,
                    width: 175,
                    background: inverse ? colors.backgroundBrand : colors.background,
                }}
            >
                <Stack space={16}>{children}</Stack>
            </div>
        </ThemeVariant>
    );
};

export const Default: StoryComponent<Args> = ({label: labelFromArgs}) => {
    const {colors} = useTheme();

    const getLabel = (fallback: string) => labelFromArgs || fallback;

    return (
        <Stack space={48} dataAttributes={{testid: 'tags'}}>
            <Inline space={48}>
                <Container>
                    <Text3 medium>Example</Text3>
                    <Tag Icon={IconOfferPercentFilled} type="promo">
                        {getLabel('Promo')}
                    </Tag>
                    <Tag Icon={IconStarFilled} type="active">
                        {getLabel('Active')}
                    </Tag>
                    <Tag Icon={IconTimeFilled} type="inactive">
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag Icon={IconCheckRegular} type="success">
                        {getLabel('Success')}
                    </Tag>
                    <Tag Icon={IconAlertRegular} type="warning">
                        {getLabel('Warning')}
                    </Tag>
                    <Tag Icon={IconCloseRegular} type="error">
                        {getLabel('Error')}
                    </Tag>
                </Container>

                <Container>
                    <Text3 medium>Without icon</Text3>
                    <Tag type="promo">{getLabel('Promo')}</Tag>
                    <Tag type="active">{getLabel('Active')}</Tag>
                    <Tag type="inactive">{getLabel('Inactive')}</Tag>
                    <Tag type="success">{getLabel('Success')}</Tag>
                    <Tag type="warning">{getLabel('Warning')}</Tag>
                    <Tag type="error">{getLabel('Error')}</Tag>
                </Container>

                <Container inverse>
                    <Text3 medium>Inverse</Text3>
                    <Tag Icon={IconOfferPercentFilled} type="promo">
                        {getLabel('Promo')}
                    </Tag>
                    <Tag Icon={IconStarFilled} type="active">
                        {getLabel('Active')}
                    </Tag>
                    <Tag Icon={IconTimeFilled} type="inactive">
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag Icon={IconCheckRegular} type="success">
                        {getLabel('Success')}
                    </Tag>
                    <Tag Icon={IconAlertRegular} type="warning">
                        {getLabel('Warning')}
                    </Tag>
                    <Tag Icon={IconCloseRegular} type="error">
                        {getLabel('Error')}
                    </Tag>
                </Container>
            </Inline>

            <Inline space={48}>
                <Container>
                    <Text3 medium>Deprecated *</Text3>
                    <Tag color={colors.promo}>{getLabel('Promo')}</Tag>
                    <Tag color={colors.brand}>{getLabel('In progress')}</Tag>
                    <Tag color={colors.success}>{getLabel('Completed')}</Tag>
                    <Tag color={colors.warning}>{getLabel('Pending')}</Tag>
                    <Tag color={colors.error}>{getLabel('Overdue')}</Tag>
                    <Tag color={colors.neutralMedium}>{getLabel('Removed')}</Tag>
                    <Tag color={colors.inverse}>{getLabel('Priority')}</Tag>
                </Container>

                <Container inverse>
                    <Text3 medium>Deprecated inverse *</Text3>
                    <Tag color={colors.promo}>{getLabel('Promo')}</Tag>
                    <Tag color={colors.brand}>{getLabel('In progress')}</Tag>
                    <Tag color={colors.success}>{getLabel('Completed')}</Tag>
                    <Tag color={colors.warning}>{getLabel('Pending')}</Tag>
                    <Tag color={colors.error}>{getLabel('Overdue')}</Tag>
                    <Tag color={colors.neutralMedium}>{getLabel('Removed')}</Tag>
                    <Tag color={colors.inverse}>{getLabel('Priority')}</Tag>
                </Container>
            </Inline>

            <Text1 medium>
                * <kbd>color</kbd> prop is deprecated. Please migrate your components to use the{' '}
                <kbd>type</kbd> prop.
            </Text1>
        </Stack>
    );
};

Default.storyName = 'Tag';
Default.args = {label: ''};
