import './css/roboto.css';
import {addons} from '@storybook/addons';
import {createStorybookTheme} from './storybook-manager-theme';
import checkAcceptedCookies from './cookie-policy';

// https://storybook.js.org/docs/react/configure/features-and-behavior
addons.setConfig({
    panelPosition: 'right',
    theme: createStorybookTheme('Movistar'),
});

if (checkAcceptedCookies()) {
    window.STORYBOOK_GA_ID = 'G-G928X876KM';
    window.STORYBOOK_REACT_GA_OPTIONS = {};
}
