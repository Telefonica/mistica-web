import * as React from 'react';
import {Image, Stack, Text3, Title1, skinVars} from '..';
import {isRunningAcceptanceTest} from '../utils/platform';

export default {
    title: 'Components/Primitives/Image',
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={16} dataAttributes={{testid: 'image-story'}}>
            <Title1>aspectRatio: 1:1</Title1>
            <Image
                src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                noBorderRadius
                aspectRatio="1:1"
                width={200}
            />
            <Title1>aspectRatio: 4:3</Title1>
            <Image
                src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                aspectRatio="4:3"
                width={200}
            />
            <Title1>aspectRatio: 7:10</Title1>
            <Image
                src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                aspectRatio="7:10"
                width={200}
            />
            <Title1>aspectRatio: 16:9</Title1>
            <Image
                src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                aspectRatio="16:9"
                width={200}
            />
            <Title1>width: 230; height: 100</Title1>
            <Image
                src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                width={230}
                height={100}
            />
            <div
                style={{
                    resize: 'both',
                    overflow: 'auto',
                    width: 320,
                    border: `1px solid ${skinVars.colors.border}`,
                    padding: 16,
                }}
            >
                <Stack space={16}>
                    <Title1>width: 50%; aspectRatio: 4:3</Title1>
                    <Image
                        src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                        width="50%"
                        aspectRatio={4 / 3}
                    />

                    {!isRunningAcceptanceTest() && (
                        // for some reason, adding this image to the screenshot test makes it unstable
                        <Stack space={16}>
                            <Title1>width: 50%; aspectRatio: 0</Title1>
                            <Image
                                src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                                width="50%"
                                aspectRatio={0}
                            />
                        </Stack>
                    )}

                    <Title1>width: 100%; aspectRatio: 4:3</Title1>
                    <Image
                        src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                        aspectRatio={4 / 3}
                    />

                    <Title1>width: 100%; aspectRatio: 0</Title1>
                    <Image
                        src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                        aspectRatio={0}
                    />
                </Stack>
            </div>
            <div
                style={{
                    resize: 'both',
                    overflow: 'auto',
                    width: 320,
                    border: `1px solid ${skinVars.colors.border}`,
                    padding: 16,
                }}
            >
                <Stack space={16}>
                    <Text3 regular>
                        Image with broken src: the broken image icon shouldn't be visible and the element gets
                        the correct size.
                    </Text3>
                    <Image src="https://example.com/broken/image" aspectRatio={16 / 9} />
                </Stack>
            </div>
        </Stack>
    );
};

Default.storyName = 'Image';
