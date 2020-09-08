import * as React from 'react';
import {O2_SKIN, O2_CLASSIC_SKIN, VIVO_SKIN} from '../colors';
import {
    getAnimateDrawLineProps,
    getAnimateHopInProps,
    mergeProperties,
    getAnimateSweepInProps,
} from '../utils/animation';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {useIsInverseVariant} from '../theme-variant-context';

const useStyles = createUseStyles((theme) => ({
    iconContainer: {
        stroke: (isInverse) => (isInverse ? theme.colors.background : theme.colors.buttonPrimaryBackground),
        fill: (isInverse) => (isInverse ? theme.colors.background : theme.colors.buttonPrimaryBackground),
    },
}));

const IconSuccessVivo: React.FC = () => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles(isInverse);
    const {platformOverrides} = useTheme();

    return (
        <svg width="64" height="64" viewBox="0 0 64 64" style={{marginLeft: -17}}>
            <g transform="translate(17, 10)" className={classes.iconContainer}>
                <path
                    fillRule="nonzero"
                    d="M14.8832276,0 C10.2293915,0.0191737965 6.86229932,3.79747692 6.87644677,7.70928648 C6.89025737,11.6228714 9.24614399,14.2258918 11.0573539,15.1980743 C12.084728,15.7491434 11.7559683,16.7408548 11.7559683,16.7408548 C11.7559683,16.7408548 11.5093985,17.7055808 10.4274557,17.44922 C9.3458498,17.1875332 4.10725261,15.8961425 4.10725261,15.8961425 C4.10725261,15.8961425 0.947319469,15.2651826 0.18436791,18.6252129 C-0.579931024,21.9873736 1.196584,23.2652716 2.5001701,23.5816393 C3.80375621,23.8972968 8.2116962,25.0470144 8.2116962,25.0470144 C8.2116962,25.0470144 9.52370341,25.7443725 9.57490369,27.1742406 C9.60656702,28.0203732 9.60825124,28.7209269 8.78163618,29.9800062 C7.95670533,31.2394406 2.82589821,37.6825463 2.82589821,37.6825463 C2.82589821,37.6825463 1.06218326,39.9379529 3.61781834,41.9710855 C6.17345343,44.0045731 7.61110343,43.5309094 9.12824861,41.6575584 C10.6440464,39.7845626 13.6392629,35.862456 13.6392629,35.862456 C13.6392629,35.862456 14.0525704,35.0099322 14.8956908,35.0610623 C15.7388112,35.1136127 15.985381,35.5961532 16.2710247,35.9650713 C16.5580157,36.3339893 20.7318492,41.7285725 21.0164823,42.0786718 C21.297747,42.4326769 22.0782145,43.0806802 22.9364929,43.2042447 C23.7937607,43.3263889 24.7338922,43.1396219 25.3358324,42.6712841 C25.9360883,42.2022363 26.698703,41.5641749 26.9664939,41.1388007 C27.2326007,40.7134265 27.6863295,40.1034157 27.6027922,39.0996319 C27.5182443,38.0986887 27.3144537,37.574605 26.5878813,36.7149798 C25.8613089,35.8564198 21.565538,30.4178079 20.7567756,29.3742563 C20.7567756,29.3742563 20.022119,28.4461025 20.1285616,27.1341177 C20.2353412,25.8192924 20.7874284,25.2334264 21.9495401,24.9067617 C23.1099675,24.5815173 27.6499503,23.3980679 27.6499503,23.3980679 C27.6499503,23.3980679 30.2487014,22.0733006 29.6595614,19.4472006 L29.3210332,18.1046798 C29.3210332,18.1046798 28.7551353,15.0407782 25.0208833,15.989526 C21.2835996,16.9411144 19.2079671,17.5014154 19.2079671,17.5014154 C19.2079671,17.5014154 18.0185711,17.6235596 17.8477912,16.777427 C17.6797061,15.9302293 17.9003389,15.4934928 18.4258155,15.257016 C18.9516289,15.0208942 22.2685313,13.3144263 22.6939652,8.70064277 C23.121757,4.09538091 19.5505374,0 14.9128698,0 L14.8832276,0"
                    {...getAnimateSweepInProps('0.2s', platformOverrides)}
                />
            </g>
        </svg>
    );
};

const IconSuccessO2: React.FC = () => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles(isInverse);
    const {platformOverrides} = useTheme();

    return (
        <svg width="64" height="64" viewBox="0 0 64 64">
            <g className={classes.iconContainer} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path
                    fill="none"
                    strokeMiterlimit="10"
                    d="M21.7,35.6l2.8,2.8c1.1,1.1,2.9,1.1,4.1,0l17.3-17.3"
                    {...mergeProperties(
                        getAnimateDrawLineProps('33', '0.9s', platformOverrides),
                        getAnimateHopInProps('0.9s', platformOverrides)
                    )}
                />
                <path
                    fill="none"
                    d="M49.1,57.9C44.2,61.1,38.3,63,32,63C14.9,63,1,49.1,1,32C1,14.9,14.9,1,32,1c17.1,0,31,13.9,31,31c0,7.5-2.6,14.3-7.1,19.7"
                    {...getAnimateDrawLineProps('186', '0.5s', platformOverrides)}
                />
            </g>
        </svg>
    );
};

const IconSuccessDefault: React.FC = () => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles(isInverse);
    const {platformOverrides} = useTheme();

    return (
        <svg width="64" height="64" viewBox="0 0 64 64">
            <g className={classes.iconContainer}>
                <path
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    d="M 31.9 0.9 C 52.5 0.9 62.9 11.4 62.9 31.9 C 62.9 52.5 52.5 62.9 31.9 62.9 C 11.3 62.9 0.9 52.5 0.9 31.9 C 0.9 11.3 11.3 0.9 31.9 0.9 Z"
                    transform="rotate(90 32 32)"
                    {...getAnimateDrawLineProps('202', '0.2s', platformOverrides)}
                />
                <polyline
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="19.5,35 27.2,44.8 46.5,20.3"
                    {...mergeProperties(
                        getAnimateDrawLineProps('44', '0.6s', platformOverrides),
                        getAnimateHopInProps('0.6s', platformOverrides)
                    )}
                />
            </g>
        </svg>
    );
};

const IconSuccess: React.FC = () => {
    const {skin} = useTheme();

    switch (skin) {
        case VIVO_SKIN:
            return <IconSuccessVivo />;
        case O2_CLASSIC_SKIN:
        case O2_SKIN:
            return <IconSuccessO2 />;
        default:
            return <IconSuccessDefault />;
    }
};

export default IconSuccess;
