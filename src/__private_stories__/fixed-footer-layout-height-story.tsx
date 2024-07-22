import * as React from 'react';
import {
    Box,
    ButtonLayout,
    ButtonPrimary,
    ButtonSecondary,
    FixedFooterLayout,
    Placeholder,
    ResponsiveLayout,
    Stack,
    Text2,
} from '..';

export default {
    title: 'Private/FixedFooter',
    parameters: {
        fullScreen: true,
    },
};

export const FixedFooterLayoutHeight: StoryComponent = () => {
    const [placeholderCount, setPlaceholderCount] = React.useState(1);
    const [footerHeight, setFooterHeight] = React.useState(0);
    const [isFooterBig, setIsFooterBig] = React.useState(false);

    return (
        <FixedFooterLayout
            footer={
                <ResponsiveLayout>
                    <Box paddingY={isFooterBig ? 32 : 16}>
                        <ButtonLayout
                            primaryButton={
                                <ButtonPrimary onPress={() => setPlaceholderCount((c) => c + 1)}>
                                    Add placeholder
                                </ButtonPrimary>
                            }
                            secondaryButton={
                                <ButtonSecondary onPress={() => setIsFooterBig((isBig) => !isBig)}>
                                    Change footer height
                                </ButtonSecondary>
                            }
                            align="full-width"
                        />
                    </Box>
                </ResponsiveLayout>
            }
            onChangeFooterHeight={setFooterHeight}
        >
            <div
                style={{
                    minHeight: `calc(100vh - ${footerHeight}px)`,
                    boxSizing: 'border-box',
                    border: '1px solid red',
                }}
            >
                <ResponsiveLayout>
                    <Box paddingY={24}>
                        <Stack space={16}>
                            <Text2 regular as="p">
                                Footer height is {footerHeight}
                            </Text2>
                            {Array.from({length: placeholderCount}, (_, idx) => (
                                <Placeholder key={idx} />
                            ))}
                        </Stack>
                    </Box>
                </ResponsiveLayout>
            </div>
        </FixedFooterLayout>
    );
};
