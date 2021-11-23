import * as React from 'react';
import {
    Stack,
    Tag,
    useTheme,
    Text3,
    IconStarFilled,
    IconTimeRegular,
    IconAlarmLightRegular,
    IconLikeRegular,
    IconSkullRegular,
    IconSmileySadRegular,
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

export const Default: StoryComponent<Args> = ({label}) => {
    const {colors} = useTheme();

    const argsLabel = (s: string) => label || s;

    return (
        <Stack space={48} dataAttributes={{testid: 'tags'}}>
            <Inline space={48}>
                <Container>
                    <Text3 medium>Example</Text3>
                    <Tag Icon={IconAlarmLightRegular} type="promo">
                        {argsLabel('Promo')}
                    </Tag>
                    <Tag Icon={IconStarFilled} type="active">
                        {argsLabel('Active')}
                    </Tag>
                    <Tag Icon={IconTimeRegular} type="inactive">
                        {argsLabel('Inactive')}
                    </Tag>
                    <Tag Icon={IconLikeRegular} type="success">
                        {argsLabel('Success')}
                    </Tag>
                    <Tag Icon={IconSmileySadRegular} type="warning">
                        {argsLabel('Warning')}
                    </Tag>
                    <Tag Icon={IconSkullRegular} type="error">
                        {argsLabel('Error')}
                    </Tag>
                </Container>

                <Container>
                    <Text3 medium>Without icon</Text3>
                    <Tag type="promo">{argsLabel('Promo')}</Tag>
                    <Tag type="active">{argsLabel('Active')}</Tag>
                    <Tag type="inactive">{argsLabel('Inactive')}</Tag>
                    <Tag type="success">{argsLabel('Success')}</Tag>
                    <Tag type="warning">{argsLabel('Warning')}</Tag>
                    <Tag type="error">{argsLabel('Error')}</Tag>
                </Container>

                <Container inverse>
                    <Text3 medium>Inverse</Text3>
                    <Tag Icon={IconAlarmLightRegular} type="promo">
                        {argsLabel('Promo')}
                    </Tag>
                    <Tag Icon={IconStarFilled} type="active">
                        {argsLabel('Active')}
                    </Tag>
                    <Tag Icon={IconTimeRegular} type="inactive">
                        {argsLabel('Inactive')}
                    </Tag>
                    <Tag Icon={IconLikeRegular} type="success">
                        {argsLabel('Success')}
                    </Tag>
                    <Tag Icon={IconSmileySadRegular} type="warning">
                        {argsLabel('Warning')}
                    </Tag>
                    <Tag Icon={IconSkullRegular} type="error">
                        {argsLabel('Error')}
                    </Tag>
                </Container>
            </Inline>

            <Inline space={48}>
                <Container>
                    <Text3 medium>Deprecated *</Text3>
                    <Tag color={colors.promo}>{argsLabel('Promo')}</Tag>
                    <Tag color={colors.brand}>{argsLabel('In progress')}</Tag>
                    <Tag color={colors.success}>{argsLabel('Completed')}</Tag>
                    <Tag color={colors.warning}>{argsLabel('Pending')}</Tag>
                    <Tag color={colors.error}>{argsLabel('Overdue')}</Tag>
                    <Tag color={colors.neutralMedium}>{argsLabel('Removed')}</Tag>
                    <Tag color={colors.inverse}>{argsLabel('Priority')}</Tag>
                </Container>

                <Container inverse>
                    <Text3 medium>Deprecated inverse *</Text3>
                    <Tag color={colors.promo}>{argsLabel('Promo')}</Tag>
                    <Tag color={colors.brand}>{argsLabel('In progress')}</Tag>
                    <Tag color={colors.success}>{argsLabel('Completed')}</Tag>
                    <Tag color={colors.warning}>{argsLabel('Pending')}</Tag>
                    <Tag color={colors.error}>{argsLabel('Overdue')}</Tag>
                    <Tag color={colors.neutralMedium}>{argsLabel('Removed')}</Tag>
                    <Tag color={colors.inverse}>{argsLabel('Priority')}</Tag>
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
