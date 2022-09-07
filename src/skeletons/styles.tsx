import {createUseStyles} from '../jss';

type AnimationProps = {
    disableAnimation: boolean;
};

const transition = '1s linear';

const useAnimation = createUseStyles(() => ({
    animation: {
        animation: ({disableAnimation}: AnimationProps) =>
            disableAnimation ? '' : `$pulse ${transition} infinite`,
    },
    '@keyframes pulse': {
        '0%': {
            opacity: 1,
        },

        '50%': {
            opacity: 0.5,
        },

        '100%': {
            opacity: 1,
        },
    },
}));

export {useAnimation};
