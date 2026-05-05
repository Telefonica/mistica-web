'use client';
import * as React from 'react';
import classnames from 'classnames';
import {BaseTouchable} from '../touchable';
import {Text3} from '../text';
import {vars} from '../skins/skin-contract.css';
import IconArtificialIntelligenceFilled from '../generated/mistica-icons/icon-artificial-intelligence-filled';
import {useIsInViewport} from '../hooks';
import {isClientSide} from '../utils/environment';
import * as styles from './ai-card.css';

import type {TouchableComponentProps} from '../touchable';

interface CommonProps {
    text?: string;
    words?: ReadonlyArray<string>;
    deleteUntil?: number;
    lineBreakAtChars?: number;
}

export type AiCardProps = TouchableComponentProps<CommonProps>;

type AnimationStage = 'typing' | 'holding' | 'deleting' | 'done';

const TYPING_SPEEDS = [50, 60, 70, 80];
const DELETE_SPEED = 30;
const HOLD_DURATION = 2000;
const MAX_WORDS = 4;

const getRandomTypingSpeed = (previousSpeed?: number) => {
    const candidates = TYPING_SPEEDS.filter((speed) => speed !== previousSpeed);
    return candidates[Math.floor(Math.random() * candidates.length)];
};

const getDeleteFloor = (currentWord: string, nextWord: string, deleteUntil?: number) => {
    const sharedStartFloor = currentWord[0]?.toLowerCase() === nextWord[0]?.toLowerCase() ? 1 : 0;
    const configuredDeleteFloor = typeof deleteUntil === 'number' ? Math.max(0, Math.floor(deleteUntil)) : 0;
    return Math.max(sharedStartFloor, configuredDeleteFloor);
};

const getPrefersReducedMotion = () =>
    isClientSide() && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

type AnimationState = {index: number; text: string; stage: AnimationStage};

const INITIAL_STATE: AnimationState = {index: 0, text: '', stage: 'typing'};

const tick = (state: AnimationState, words: ReadonlyArray<string>, deleteUntil?: number): AnimationState => {
    const {index, text, stage} = state;
    const currentWord = words[index] || '';
    const nextWord = words[index + 1] || '';
    const deleteFloor = getDeleteFloor(currentWord, nextWord, deleteUntil);

    if (stage === 'typing') {
        if (text.length < currentWord.length) return {...state, text: currentWord.slice(0, text.length + 1)};
        return {...state, stage: 'holding'};
    }
    if (stage === 'holding') {
        if (index === words.length - 1) return {...state, stage: 'done'};
        return text.length > deleteFloor
            ? {...state, stage: 'deleting'}
            : {index: index + 1, text, stage: 'typing'};
    }
    if (stage === 'deleting') {
        if (text.length <= deleteFloor) return {index: index + 1, text, stage: 'typing'};
        return {...state, text: text.slice(0, -1)};
    }
    return state;
};

const useAiCardAnimation = ({
    words,
    deleteUntil,
    prefersReducedMotion,
    isInViewport,
}: {
    words: ReadonlyArray<string>;
    deleteUntil?: number;
    prefersReducedMotion: boolean;
    isInViewport: boolean;
}) => {
    const wordsKey = words.join('\0');
    const wordCount = words.length;
    const [state, setState] = React.useState<AnimationState>(INITIAL_STATE);
    const prevSpeedRef = React.useRef<number | undefined>(undefined);
    const wordsRef = React.useRef(words);
    wordsRef.current = words;

    React.useEffect(() => {
        setState(
            prefersReducedMotion && wordCount
                ? {index: wordCount - 1, text: wordsRef.current.at(-1) || '', stage: 'done'}
                : INITIAL_STATE
        );
    }, [wordsKey, prefersReducedMotion, wordCount]);

    React.useEffect(() => {
        if (state.stage === 'done' || !isInViewport || prefersReducedMotion || !wordCount) return;
        let speed: number;
        if (state.stage === 'typing') {
            speed = getRandomTypingSpeed(prevSpeedRef.current);
            prevSpeedRef.current = speed;
        } else if (state.stage === 'holding') {
            speed = HOLD_DURATION;
        } else if (typeof deleteUntil === 'number') {
            const currentWord = wordsRef.current[state.index] || '';
            const nextWord = wordsRef.current[state.index + 1] || '';
            const floor = getDeleteFloor(currentWord, nextWord, deleteUntil);
            const charsToDelete = currentWord.length - floor;
            speed =
                charsToDelete > 0
                    ? Math.round((currentWord.length * DELETE_SPEED) / charsToDelete)
                    : DELETE_SPEED;
        } else {
            speed = DELETE_SPEED;
        }
        const id = window.setTimeout(() => setState((s) => tick(s, wordsRef.current, deleteUntil)), speed);
        return () => window.clearTimeout(id);
    }, [state, isInViewport, prefersReducedMotion, wordCount, deleteUntil]);

    return {
        dynamicText: state.text,
        isDone: state.stage === 'done',
        shouldBlinkCaret: !prefersReducedMotion && !!wordCount && state.stage === 'holding',
    };
};

const AiCard = ({
    text = '',
    words = [],
    deleteUntil,
    lineBreakAtChars,
    dataAttributes,
    'aria-label': ariaLabel,
    ...touchableProps
}: AiCardProps): JSX.Element => {
    const gradientId = React.useId();
    const textLineRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = getPrefersReducedMotion();
    const isInViewport = useIsInViewport(textLineRef, false);
    const isInteractive = 'onPress' in touchableProps || 'href' in touchableProps || 'to' in touchableProps;

    const safeWords = React.useMemo(
        () =>
            words
                .map((word) => word.trim())
                .filter((word) => word.length > 0)
                .slice(0, MAX_WORDS),
        [words]
    );

    const longestWord = React.useMemo(
        () => safeWords.reduce((acc, word) => (word.length > acc.length ? word : acc), safeWords[0] || ''),
        [safeWords]
    );

    const {dynamicText, isDone, shouldBlinkCaret} = useAiCardAnimation({
        words: safeWords,
        deleteUntil,
        prefersReducedMotion,
        isInViewport,
    });

    const lastWord = safeWords.at(-1) ?? '';
    const autoAriaLabel = [text, lastWord].filter(Boolean).join('') || undefined;

    const textLineStyle: React.CSSProperties =
        typeof lineBreakAtChars === 'number'
            ? {maxWidth: `min(100%, ${Math.max(1, Math.floor(lineBreakAtChars))}ch)`}
            : {};

    return (
        <BaseTouchable
            className={classnames(styles.container, {[styles.containerInteractive]: isInteractive})}
            dataAttributes={{'component-name': 'AiCard', testid: 'AiCard', ...dataAttributes}}
            {...(touchableProps as any)}
            aria-label={autoAriaLabel ?? ariaLabel}
        >
            <svg aria-hidden="true" style={{position: 'absolute', width: 0, height: 0, overflow: 'hidden'}}>
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="1"
                        y1="0"
                        x2="0"
                        y2="1"
                        gradientUnits="objectBoundingBox"
                    >
                        <stop offset="17.51%" style={{stopColor: 'var(--vivoPurple600, #AE42E4)'}} />
                        <stop offset="38.3%" style={{stopColor: 'var(--vivoPurple500, #BD4AFF)'}} />
                        <stop offset="82.5%" style={{stopColor: 'var(--vivoPink400, #EF7E9C)'}} />
                    </linearGradient>
                </defs>
            </svg>
            <span className={styles.slot} aria-hidden="true">
                <IconArtificialIntelligenceFilled color={`url(#${gradientId})`} />
            </span>
            <div ref={textLineRef} className={styles.textLine} aria-hidden="true" style={textLineStyle}>
                <Text3 regular color={vars.colors.textPrimary} as="span">
                    <span className={styles.textWrapper}>
                        <span className={styles.ghost}>
                            {text}
                            {longestWord}
                        </span>
                        <span className={styles.visibleContent}>
                            {text}
                            {dynamicText}
                            {!prefersReducedMotion && !!safeWords.length && (
                                <span
                                    className={classnames(styles.caret, {
                                        [styles.caretBlinking]: shouldBlinkCaret,
                                        [styles.caretHidden]: isDone,
                                    })}
                                >
                                    |
                                </span>
                            )}
                        </span>
                    </span>
                </Text3>
            </div>
        </BaseTouchable>
    );
};

export default AiCard;
