import * as React from 'react';
import {
    TextLink,
    Text3,
    Text1,
    Text5,
    ResponsiveLayout,
    Box,
    Text2,
    Text4,
    Text6,
    Text7,
    Text8,
    Text9,
    Text10,
} from '..';

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
            options: [
                'Text1',
                'Text2',
                'Text3',
                'Text4',
                'Text5',
                'Text6',
                'Text7',
                'Text8',
                'Text9',
                'Text10',
            ],
            control: {type: 'select'},
        },
        underline: {
            options: ['always', 'on hover'],
            control: {type: 'select'},
        },
    },
};

interface TextStyleWrapperProps {
    textStyle:
        | 'Text1'
        | 'Text2'
        | 'Text3'
        | 'Text4'
        | 'Text5'
        | 'Text6'
        | 'Text7'
        | 'Text8'
        | 'Text9'
        | 'Text10';
    children: React.ReactNode;
}

const TextStyleWrapper = ({children, textStyle}: TextStyleWrapperProps) => {
    if (textStyle === 'Text1') {
        return <Text1 regular>{children}</Text1>;
    }
    if (textStyle === 'Text2') {
        return <Text2 regular>{children}</Text2>;
    }
    if (textStyle === 'Text3') {
        return <Text3 regular>{children}</Text3>;
    }
    if (textStyle === 'Text4') {
        return <Text4 regular>{children}</Text4>;
    }
    if (textStyle === 'Text5') {
        return <Text5>{children}</Text5>;
    }
    if (textStyle === 'Text6') {
        return <Text6>{children}</Text6>;
    }
    if (textStyle === 'Text7') {
        return <Text7>{children}</Text7>;
    }
    if (textStyle === 'Text8') {
        return <Text8>{children}</Text8>;
    }
    if (textStyle === 'Text9') {
        return <Text9>{children}</Text9>;
    }
    if (textStyle === 'Text10') {
        return <Text10>{children}</Text10>;
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
    underline: 'always' | 'on hover';
};

export const Default: StoryComponent<Args> = ({
    text,
    inverse,
    disabled,
    action,
    newTab,
    textStyle,
    underline,
}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16} dataAttributes={{testid: 'text-link'}}>
                <TextStyleWrapper textStyle={textStyle}>
                    Text link can be located in the middle of a paragraph:{' '}
                    <TextLink
                        disabled={disabled}
                        underline={underline}
                        {...getTextLinkActionProps(action, newTab)}
                    >
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
    underline: 'always',
};

Default.storyName = 'TextLink';
