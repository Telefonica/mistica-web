import * as React from 'react';
import {BlauLogo, Logo, MovistarLogo, O2Logo, TelefonicaLogo, VivoLogo} from '../logo';
import {Box, ResponsiveLayout} from '../index';

export default {
    title: 'Components/Logo',
    component: Logo,
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    type: 'isotype' | 'imagotype' | 'vertical';
    size: number;
    inverse: boolean;
    action: 'none' | 'onPress' | 'href' | 'to';
    forceBrandLogo: boolean;
    brand: 'Movistar' | 'O2' | 'Vivo' | 'Telefonica' | 'Blau';
};

const getLogoActionProps = (action: string) => {
    return action === 'onPress'
        ? {
              onPress: () => {
                  window.alert('pressed!');
              },
              'aria-label': 'pressable logo',
          }
        : action === 'href'
        ? {
              href: 'https://www.google.com',
              newTab: true,
              'aria-label': 'logo-link',
          }
        : action === 'to'
        ? {
              to: '#',
              replace: true,
              'aria-label': 'logo-link',
          }
        : {};
};

export const Default: StoryComponent<Args> = ({type, size, inverse, action, forceBrandLogo, brand}) => {
    const logoProps = {
        ...getLogoActionProps(action),
        type,
        size,
    };

    const CurrentLogo = {
        default: Logo,
        Movistar: MovistarLogo,
        Vivo: VivoLogo,
        O2: O2Logo,
        Telefonica: TelefonicaLogo,
        Blau: BlauLogo,
    }[forceBrandLogo ? brand : 'default'];

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <CurrentLogo {...logoProps} dataAttributes={{testid: 'logo'}} />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Logo';

Default.args = {
    type: 'isotype',
    action: 'none',
    size: 48,
    inverse: false,
    forceBrandLogo: false,
    brand: 'Movistar',
};

Default.argTypes = {
    brand: {
        options: ['Movistar', 'O2', 'Vivo', 'Telefonica', 'Blau'],
        control: {type: 'select'},
        if: {arg: 'forceBrandLogo'},
    },
    type: {
        options: ['isotype', 'imagotype', 'vertical'],
        control: {type: 'select'},
    },
    action: {
        options: ['none', 'onPress', 'href', 'to'],
        control: {type: 'select'},
    },
    size: {
        control: {type: 'range', min: 8, max: 480, step: 8},
    },
};
