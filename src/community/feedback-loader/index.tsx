import * as React from 'react';
import Lottie from 'lottie-react';
import loopWave from './loop-wave.json';
import vivinhoIn from './vivinho-in.json';
import loopVivinho from './loop-vivinho.json';
import vivinhoOut from './vivinho-out.json';
import * as styles from './index.css';
import classNames from 'classnames';
import {skinVars, Text4, OverscrollColor, ThemeVariant} from '../../index';

type OverlappingGridAnimationProps = {
    animationData: unknown;
    loop?: boolean;
    onComplete?: () => void;
    onLoopComplete?: () => void;
    on0_8sElapsed?: () => void;
    on0_5sElapsed?: () => void;
};

const OverlappingGridAnimation: React.FC<OverlappingGridAnimationProps> = ({
    animationData,
    onComplete,
    on0_8sElapsed,
    on0_5sElapsed,
    onLoopComplete,
    loop = true,
}) => {
    const timeouts = React.useRef<Array<NodeJS.Timeout>>([]);

    React.useEffect(
        () => () => {
            timeouts.current.forEach((timeout) => clearTimeout(timeout));
        },
        []
    );

    const addTimeout = (time: number, fn: () => void) => {
        timeouts.current = timeouts.current.concat(
            setTimeout(() => {
                fn();
            }, time)
        );
    };

    const addTimeouts = () => {
        if (on0_8sElapsed) {
            addTimeout(800, on0_8sElapsed);
        }
        if (on0_5sElapsed) {
            addTimeout(500, on0_5sElapsed);
        }
    };

    return (
        <Lottie
            onDOMLoaded={addTimeouts}
            animationData={animationData}
            loop={loop}
            onComplete={() => onComplete?.()}
            onLoopComplete={() => {
                onLoopComplete?.();
                addTimeouts();
            }}
        />
    );
};

type UseAnimatedWavesProps = {
    className?: string;
};

const useAnimatedWaves = ({className}: UseAnimatedWavesProps) => {
    const waveKeyRef = React.useRef(1);

    const removeOldestWave = React.useCallback((_setWaves: typeof setWaves) => {
        _setWaves((waves) => waves.slice(1));
    }, []);

    const [waves, setWaves] = React.useState([
        <OverlappingGridAnimation
            key={waveKeyRef.current}
            animationData={loopWave}
            loop={false}
            onComplete={() => removeOldestWave(setWaves)}
        />,
    ]);

    const addWave = React.useCallback(() => {
        waveKeyRef.current += 1;
        setWaves((waves) => [
            ...waves,
            <OverlappingGridAnimation
                key={waveKeyRef.current}
                animationData={loopWave}
                loop={false}
                onComplete={() => removeOldestWave(setWaves)}
            />,
        ]);
    }, [removeOldestWave]);

    return {
        waves: (
            <div className={classNames(styles.overlappingChildren, className)}>
                {waves.map((wave) => wave)}
            </div>
        ),
        addWave,
    };
};

type Props = {
    description: string;
    loaded: boolean;
    onComplete: () => void;
};

const FeedbackLoader: React.FC<Props> = ({description, loaded, onComplete}) => {
    const [vivinhoInCommpleted, setVivinhoInCommpleted] = React.useState(false);
    const [startWavesLoop, setStartWavesLoop] = React.useState(false);
    const [startDescriptionAnimation, setStartDescriptionAnimation] = React.useState(false);
    const [loopsCompleted, setLoopsCompleted] = React.useState(0);
    const [fadingOut, setFadingOut] = React.useState(false);

    const {waves, addWave} = useAnimatedWaves({className: classNames({[styles.wavesFadeOut]: fadingOut})});

    React.useEffect(() => {
        if (loaded && loopsCompleted >= 3) {
            setFadingOut(true);
        }
    }, [loaded, loopsCompleted]);

    return (
        <ThemeVariant isInverse>
            <OverscrollColor />
            <div
                className={styles.fullScreenContainer}
                style={{
                    backgroundColor: skinVars.colors.backgroundBrand,
                }}
            >
                <div className={styles.overlappingChildren}>
                    {!vivinhoInCommpleted && (
                        <OverlappingGridAnimation
                            animationData={vivinhoIn}
                            loop={false}
                            on0_8sElapsed={() => setStartWavesLoop(true)}
                            on0_5sElapsed={() => setStartDescriptionAnimation(true)}
                            onComplete={() => setVivinhoInCommpleted(true)}
                        />
                    )}
                    {startWavesLoop && waves}
                    {vivinhoInCommpleted && !fadingOut && (
                        <OverlappingGridAnimation
                            animationData={loopVivinho}
                            on0_8sElapsed={addWave}
                            onLoopComplete={() => {
                                setLoopsCompleted(loopsCompleted + 1);
                            }}
                        />
                    )}
                    {fadingOut && (
                        <OverlappingGridAnimation
                            animationData={vivinhoOut}
                            loop={false}
                            onComplete={onComplete}
                        />
                    )}
                </div>
                <div
                    className={classNames({
                        [styles.description]: true,
                        [styles.slideUpFadeIn]: startDescriptionAnimation,
                        [styles.textFadeOut]: fadingOut,
                    })}
                >
                    <Text4 weight="regular">{description}</Text4>
                </div>
            </div>
        </ThemeVariant>
    );
};

export default FeedbackLoader;
