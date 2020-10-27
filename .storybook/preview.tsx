// import './css/roboto.css';
// import './css/main.css';
// import * as React from 'react';
// import {addDecorator} from '@storybook/react';
// import {
//     ThemeContextProvider,
//     Box,
//     MOVISTAR_SKIN,
//     VIVO_SKIN,
//     O2_SKIN,
//     O2_CLASSIC_SKIN,
//     ThemeConfig,
// } from '../src';
// import {AVAILABLE_THEMES, Movistar} from './themes';
// import addons from '@storybook/addons';

// const getUserAgent = () => self.navigator.userAgent || '';
// const isRunningAcceptanceTest = () => getUserAgent().includes('acceptance-test');

// const acceptanceStyles = `
// *, *:after, *:before {
//     transition-delay: 0s !important;
//     transition-duration: 0s !important;
//     animation-delay: -0.0001s !important;
//     animation-duration: 0s !important;
//     animation-play-state: paused !important;
//     caret-color: transparent !important;
//     font-variant-ligatures: none !important;
// }
// *::-webkit-scrollbar {
//     display: 'none' !important;
//     width: 0 !important;
//     height: 0 !important;
// }`;

// const LayoutDecorator = ({Story, context}: any) => {
//     const styles = isRunningAcceptanceTest() ? <style>{acceptanceStyles}</style> : null;

//     return (
//         <>
//             {styles}
//             <Box padding={context?.parameters?.fullScreen ? 0 : 16}>
//                 <Story />
//             </Box>
//         </>
//     );
// };

// const getSkin = (searchParams: URLSearchParams) => {
//     const qsSkin = searchParams.get('skin');
//     return [MOVISTAR_SKIN, O2_SKIN, O2_CLASSIC_SKIN, VIVO_SKIN].find((skin) => skin === qsSkin);
// };

// const getPlatform = (searchParams: URLSearchParams): 'ios' | 'android' | undefined => {
//     const qsPlatform = searchParams.get('platform');
//     if (qsPlatform === 'ios' || qsPlatform === 'android') {
//         return qsPlatform;
//     }
//     return;
// };

// const getTheme = (selectedSkin: string, platform?: 'ios' | 'android'): ThemeConfig => {
//     const themeConfig = AVAILABLE_THEMES.find(({skin}) => skin.name === selectedSkin) || Movistar;
//     return platform
//         ? {
//               ...themeConfig,
//               platformOverrides: {
//                   platform,
//                   insideNovumNativeApp: true,
//               },
//           }
//         : themeConfig;
// };

// const ThemeDecorator = ({Story}: any) => {
//     const searchParams = new URLSearchParams(location.search);
//     const [skin, setSkin] = React.useState(getSkin(searchParams));
//     const [platform, setPlatform] = React.useState(getPlatform(searchParams));

//     React.useEffect(() => {
//         const channel = addons.getChannel();
//         channel.on('skin-selected', setSkin);
//         channel.on('platform-selected', setPlatform);
//         channel.emit('story-mounted');

//         return () => {
//             channel.off('skin-selected', setSkin);
//             channel.off('platform-selected', setPlatform);
//         };
//     }, []);

//     return (
//         <ThemeContextProvider theme={getTheme(skin, platform)}>
//             <Story />
//         </ThemeContextProvider>
//     );
// };

// addDecorator((Story, context) => <LayoutDecorator Story={Story} context={context} />);
// addDecorator((Story) => <ThemeDecorator Story={Story} />);
