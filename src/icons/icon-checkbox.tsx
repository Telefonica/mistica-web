import * as React from 'react';
import {createUseStyles} from '../jss';
import {useTheme} from '../hooks';
import {getPlatform} from '../utils/platform';

const useStyles = createUseStyles(() => ({
    checkbox: {
        verticalAlign: 'middle',
        userSelect: 'none',
    },
}));

type InternalProps = {
    checked: boolean;
    markedColor: string;
};

const IconAndroid: React.FC<InternalProps> = ({checked, markedColor}) => {
    const {colors} = useTheme();
    const classes = useStyles();
    return checked ? (
        <svg className={classes.checkbox} width="18" height="18" viewBox="0 0 18 18">
            {/* This circle is a workaround, so the check marck becomes visible on inverse backgrounds */}
            <circle cx="9" cy="9" r="8" fill="white" />
            <path
                transform="translate(-3, -3)"
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-4.808 1.4-1.346 3.6 3.462L17.6 7 19 8.346 10 17z"
                fill={markedColor}
            />
        </svg>
    ) : (
        <svg className={classes.checkbox} width="18" height="18" viewBox="0 0 18 18">
            <path
                transform="translate(-3, -3)"
                d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                fill={colors.control}
            />
        </svg>
    );
};

const IconIos: React.FC<InternalProps> = ({checked, markedColor}) => {
    const {colors} = useTheme();
    const classes = useStyles();
    return checked ? (
        <svg className={classes.checkbox} width="22" height="22" viewBox="0 0 22 22">
            <g fillRule="nonzero" fill="none">
                <circle cx="11" cy="11" r="11" fill={markedColor} />
                <path
                    fill="#FFF"
                    d="M8.854 14.686a.766.766 0 001.15.005l5.387-6.086a.766.766 0 00-1.146-1.014l-4.799 5.445-1.688-1.94a.765.765 0 10-1.153 1.005l2.249 2.585z"
                />
            </g>
        </svg>
    ) : (
        <svg className={classes.checkbox} width="22" height="22" viewBox="0 0 22 22">
            <path
                transform="translate(-1 -1)"
                d="M12 1c6.075 0 11 4.924 11 11 0 6.075-4.924 11-11 11-6.075 0-11-4.924-11-11C1 5.925 5.924 1 12 1zM2 12c0 5.524 4.477 10 10 10 5.524 0 10-4.477 10-10 0-5.524-4.477-10-10-10C6.476 2 2 6.477 2 12z"
                fill={colors.control}
            />
        </svg>
    );
};

type Props = Omit<InternalProps, 'markedColor'>;

const IconCheckbox: React.FC<Props> = ({checked}) => {
    const {colors, platformOverrides} = useTheme();
    return getPlatform(platformOverrides) === 'ios' ? (
        <IconIos checked={checked} markedColor={colors.controlActivated} />
    ) : (
        <IconAndroid checked={checked} markedColor={colors.controlActivated} />
    );
};

export default IconCheckbox;
