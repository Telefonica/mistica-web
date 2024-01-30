import * as React from 'react';
import {TextLink, Text3, Text1, Text5, ResponsiveLayout, Box} from '..';

export default {
    title: 'Components/TextLink',
    component: TextLink,
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        action: {
            options: ['href', 'onPress'],
            control: {type: 'select'},
        },
        newTab: {
            if: {arg: 'action', eq: 'href'},
        },
        textStyle: {
            options: ['Text1', 'Text3', 'Text5'],
            control: {type: 'select'},
        },
    },
};

interface TextStyleWrapperProps {
    textStyle: 'Text1' | 'Text3' | 'Text5';
    children: React.ReactNode;
}

const TextStyleWrapper: React.FC<TextStyleWrapperProps> = ({children, textStyle}) => {
    if (textStyle === 'Text1') {
        return <Text1 regular>{children}</Text1>;
    }
    if (textStyle === 'Text3') {
        return <Text3 regular>{children}</Text3>;
    }
    return <Text5>{children}</Text5>;
};

const getTextLinkActionProps = (action: 'href' | 'onPress', newTab: boolean) => {
    return action === 'onPress'
        ? {
              onPress: () => {
                  window.alert('pressed!');
              },
          }
        : {
              href: 'https://www.google.com',
              newTab,
          };
};

type Args = {
    text: string;
    inverse: boolean;
    disabled: boolean;
    action: 'href' | 'onPress';
    textStyle: 'Text1' | 'Text3' | 'Text5';
    newTab: boolean;
};

export const Default: StoryComponent<Args> = ({text, inverse, disabled, action, newTab, textStyle}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16} dataAttributes={{testid: 'text-link'}}>
                <TextStyleWrapper textStyle={textStyle}>
                    Text link can be located in the middle of a paragraph:{' '}
                    <TextLink disabled={disabled} {...getTextLinkActionProps(action, newTab)}>
                        {text || 'Text link'}
                    </TextLink>
                    . It inherits text style, and it should wrap if necessary. You can also select and copy
                    its content.
                </TextStyleWrapper>
            </Box>
        </ResponsiveLayout>
    );
};

Default.args = {
    text: 'Text link',
    action: 'href',
    textStyle: 'Text3',
    inverse: false,
    disabled: false,
    newTab: false,
};

Default.storyName = 'TextLink';
