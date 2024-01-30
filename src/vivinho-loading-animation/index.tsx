'use client';
import Lottie from 'lottie-react';
import * as React from 'react';
import vivinhoInLottie from './in-lottie.json';
import vivinhoPulseLottie from './pulse-lottie.json';
import waveLottie from './wave-lottie.json';
import vivinhoOutLottie from './out-lottie.json';
import * as styles from './vivinho-loading-animation.css';

type Props = {
    isLoading?: boolean;
    onCloseStart?: () => void;
    onCloseEnd?: () => void;
};

const VivinhoLoadingAnimation = ({isLoading, onCloseStart, onCloseEnd}: Props): JSX.Element => {
    const [state, setState] = React.useState<'in' | 'loop' | 'out'>('in');
    const [waves, setWaves] = React.useState<Array<number>>([]);

    const addWave = () => {
        setWaves((w) => {
            if (!w.length) {
                return [0];
            }
            const lastIndex = w[w.length - 1];
            return [...w, lastIndex + 1];
        });
    };

    const removeWave = () => {
        setWaves((w) => w.slice(1));
    };

    return (
        <div className={styles.container}>
            {waves.map((waveIndex) => (
                <div className={state === 'out' ? styles.waveFadeOut : undefined} key={waveIndex}>
                    <Lottie
                        animationData={waveLottie}
                        loop={false}
                        onComplete={() => {
                            removeWave();
                        }}
                    />
                </div>
            ))}
            {state === 'in' ? (
                <Lottie
                    animationData={vivinhoInLottie}
                    loop={false}
                    onComplete={() => {
                        if (isLoading) {
                            setTimeout(() => {
                                addWave();
                            }, 800);
                            setState('loop');
                        } else {
                            onCloseStart?.();
                            setState('out');
                        }
                    }}
                />
            ) : state === 'loop' ? (
                <Lottie
                    animationData={vivinhoPulseLottie}
                    onLoopComplete={() => {
                        if (isLoading) {
                            setTimeout(() => {
                                addWave();
                            }, 800);
                        } else {
                            onCloseStart?.();
                            setState('out');
                        }
                    }}
                />
            ) : (
                <Lottie
                    animationData={vivinhoOutLottie}
                    loop={false}
                    onComplete={() => {
                        onCloseEnd?.();
                    }}
                />
            )}
        </div>
    );
};

export default VivinhoLoadingAnimation;
