import * as React from 'react';
import {ButtonPrimary, Stack, Title1, Inline} from '..';

export default {
    title: 'Private/Inline cases',
};

export const Default: StoryComponent = () => {
    const longText = 'Super long text. '.repeat(20);
    const shortText = 'Not so long text';

    return (
        <div data-testid="story" style={{width: 600}}>
            <style>{`.border {border: 2px dashed pink}`}</style>
            <Stack space={32}>
                <Stack space={16}>
                    <Title1>In this case (space: 16px), the short button shouldn't have ellipsis</Title1>
                    <Inline space={16}>
                        <ButtonPrimary fake>{longText}</ButtonPrimary>
                        <ButtonPrimary fake>{shortText}</ButtonPrimary>
                    </Inline>
                </Stack>

                <Stack space={16}>
                    <Title1>In this case (space between), the short button shouldn't have ellipsis</Title1>
                    <Inline space="between">
                        <ButtonPrimary fake>{longText}</ButtonPrimary>
                        <ButtonPrimary fake style={{marginLeft: 16}}>
                            {shortText}
                        </ButtonPrimary>
                    </Inline>
                </Stack>

                <Stack space={16}>
                    <Title1>space-between should be full width</Title1>
                    <Inline space="between">
                        <ButtonPrimary fake>{shortText}</ButtonPrimary>
                        <ButtonPrimary fake style={{marginLeft: 16}}>
                            {shortText}
                        </ButtonPrimary>
                    </Inline>
                </Stack>

                <Stack space={16}>
                    <Title1>Ellipsis in first button. Second button should wrap with a vertical gap</Title1>
                    <Inline space={16} wrap>
                        <ButtonPrimary fake>{longText} </ButtonPrimary>
                        <ButtonPrimary fake>{shortText}</ButtonPrimary>
                    </Inline>
                </Stack>

                <Stack space={16}>
                    <Title1>Inline is "inline" by default</Title1>
                    <>
                        <Inline space={16} className="border">
                            <ButtonPrimary fake>{shortText}</ButtonPrimary>
                            <ButtonPrimary fake>{shortText}</ButtonPrimary>
                        </Inline>{' '}
                        Inline text
                    </>
                </Stack>

                <Stack space={16}>
                    <Title1>Fullwidth with short items</Title1>

                    <Inline space={16} fullWidth className="border">
                        <ButtonPrimary fake>{shortText}</ButtonPrimary>
                        <ButtonPrimary fake>{shortText}</ButtonPrimary>
                    </Inline>
                </Stack>
            </Stack>
        </div>
    );
};

Default.storyName = 'Inline cases';
