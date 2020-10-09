import * as React from 'react';
import {useTheme} from '../hooks';
import {getPlatform} from '../utils/platform';

type InternalProps = {
    checked: boolean;
    markedColor: string;
};

const IconAndroid: React.FC<InternalProps> = ({checked, markedColor}) =>
    checked ? (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
                <g fill={markedColor} fillRule="nonzero">
                    <g>
                        <g>
                            <path
                                d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM7 14L2 9.192l1.4-1.346L7 11.308 14.6 4 16 5.346 7 14z"
                                transform="translate(-269 -837) translate(269 837) translate(3 3)"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    ) : (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
                <g fill="#DDD" fillRule="nonzero">
                    <g>
                        <g>
                            <path
                                d="M16 2v14H2V2h14zm0-2H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
                                transform="translate(-314 -837) translate(314 837) translate(3 3)"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );

const IconIos: React.FC<InternalProps> = ({checked, markedColor}) =>
    checked ? (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
                <g fillRule="nonzero">
                    <g>
                        <g transform="translate(-269 -889) translate(269 889) translate(1 1)">
                            <circle cx="11" cy="11" r="11" fill={markedColor} />
                            <path
                                fill="#FFF"
                                d="M8.854 14.686c.303.348.843.35 1.15.005l5.387-6.086c.28-.316.25-.8-.066-1.08s-.8-.25-1.08.066l-4.799 5.445-1.688-1.94c-.277-.318-.76-.352-1.079-.074-.318.277-.352.76-.074 1.079l2.249 2.585z"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    ) : (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
                <g fill="#DDD" fillRule="nonzero">
                    <g>
                        <g>
                            <path
                                d="M11 0c6.075 0 11 4.924 11 11 0 6.075-4.924 11-11 11-6.075 0-11-4.924-11-11C0 4.925 4.924 0 11 0zM1 11c0 5.524 4.477 10 10 10 5.524 0 10-4.477 10-10 0-5.524-4.477-10-10-10C5.476 1 1 5.477 1 11z"
                                transform="translate(-314 -889) translate(314 889) translate(1 1)"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );

type Props = Omit<InternalProps, 'markedColor'>;

const IconCheckbox: React.FC<Props> = ({checked}) => {
    const {colors, platformOverrides} = useTheme();
    return getPlatform(platformOverrides) === 'ios' ? (
        <IconIos checked={checked} markedColor={colors.controlActive} />
    ) : (
        <IconAndroid checked={checked} markedColor={colors.controlActive} />
    );
};

export default IconCheckbox;
