import {isOldColorsApp} from '../utils';

export default {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    GREY_0: '#313235',
    GREY_1: '#86888C',
    GREY_2: '#999999',
    GREY_3: '#DDDDDD',
    GREY_4: '#EEEEEE',
    GREY_5: '#F6F6F6',

    MOVISTAR_BLUE: isOldColorsApp ? '#019BF2' : '#019DF4',
    MOVISTAR_BLUE_DARK: isOldColorsApp ? '#008BD9' : '#008EDD',
    MOVISTAR_BLUE_LIGHT_50: isOldColorsApp ? '#80CDF8' : '#80CEF9',
    MOVISTAR_BLUE_LIGHT_60: isOldColorsApp ? '#66C3F7' : '#65C3F8',
    MOVISTAR_BLUE_LIGHT_60_P: isOldColorsApp ? '#D8EFFC' : '#D8F0FD',
    MOVISTAR_BLUE_LIGHT_30: '#B3E1FB',
    MOVISTAR_BLUE_LIGHT_30_P: isOldColorsApp ? '#E8F6FD' : '#ECF7FE',

    MOVISTAR_GREEN: '#5CB615',
    MOVISTAR_GREEN_DARK: '#499110',
    MOVISTAR_GREEN_LIGHT_50: '#ADDA8A',
    MOVISTAR_GREEN_LIGHT_30: '#CEE9B9',

    PEPPER: '#FF374A',
    PEPPER_LIGHT: '#FFC3C8',
    PEPPER_DARK: '#D73241',
    PINK: '#E63780',
    PURPLE: isOldColorsApp ? '#913FA7' : '#A13EA1',
    EGG: isOldColorsApp ? '#F18C14' : '#F28D15',
    EGG_LIGHT: isOldColorsApp ? '#F7D1B2' : '#F8D2B3',

    MOVISTAR_PRIORITY: '#0B2739',
};
