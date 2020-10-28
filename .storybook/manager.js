import './css/roboto.css';
import {addons} from '@storybook/addons';
import {createStorybookTheme} from './storybook-manager-theme';

// https://storybook.js.org/docs/react/configure/features-and-behavior
addons.setConfig({
    panelPosition: 'right',
    theme: createStorybookTheme('Movistar'),
});
