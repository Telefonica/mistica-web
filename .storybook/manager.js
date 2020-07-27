import './css/roboto.css';
import {addons} from '@storybook/addons';
import createTheme from './storybook-manager-theme';

addons.setConfig({
    panelPosition: 'right',
    theme: createTheme('Movistar'),
});
