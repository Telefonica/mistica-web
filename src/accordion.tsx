import * as React from 'react';
import classNames from 'classnames';
import * as styles from './accordion.css';
import Box from './box';
import {Text2, Text3} from './text';
import Stack from './stack';
import {vars} from './skins/skin-contract.css';
import IconChevron from './icons/icon-chevron';
import {BaseTouchable} from './touchable';
import Divider from './divider';
import {Boxed} from './boxed';
import {ThemeVariant} from './theme-variant-context';

interface accordionSectionProps {
    subtitle?: string;
    title?: string;
    asset?: React.ReactNode;
    width?: number;
    extra?: React.ReactNode;
    panel?: string;
    slot?: string;
    icon?: boolean;
    sections?: Array<accordionSectionProps>;
    notTouchable?: boolean;
}

interface accordionProps {
    sections?: Array<accordionSectionProps>;
    isInverse?: boolean;
    allowMultipleOpen?: boolean;
}

export const Accordion = ({sections = [], isInverse, allowMultipleOpen}: accordionProps): JSX.Element => {
    const [activeSections, setActiveSections] = React.useState<Array<boolean>>(
        Array.from({length: sections?.length || 0}, () => false)
    );

    const sectionRefs = React.useRef<Array<React.RefObject<HTMLDivElement>>>(
        sections.map(() => React.createRef())
    );

    const [height, setHeight] = React.useState<number | Array<number>>([0]);
    const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);

    const calculateHeight = React.useCallback(
        (index: number) => {
            if (activeSections[index]) {
                if (index >= 0 && index < sections.length) {
                    const sectionRef = sectionRefs.current[index]?.current;
                    if (sectionRef) {
                        return sectionRef.scrollHeight;
                    }
                }
            }
            return 0;
        },
        [activeSections, sections]
    );

    const toggleSection = (index: number) => {
        let sectionAux = [...activeSections];
        if (allowMultipleOpen) {
            sectionAux = activeSections.map((section) => (section ? false : section));
        }
        sectionAux[index] = !activeSections[index];
        setActiveSections(sectionAux);
        setIsTransitioning(true);
    };

    const centerY = (title: string | undefined, subtitle: string | undefined) => {
        const numTextLines = [title, subtitle].filter(Boolean).length;
        return numTextLines === 1;
    };

    const handleResize = React.useCallback(() => {
        const newHeights = sections.map((_, index) => calculateHeight(index));
        setHeight(newHeights);
    }, [calculateHeight, sections]);

    React.useEffect(() => {
        sections.forEach((_, index) => {
            const newHeights = calculateHeight(index);
            if (newHeights !== height) {
                setHeight(newHeights);
                window.requestAnimationFrame(() => {
                    handleResize();
                });
            }
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateHeight, height, sections, handleResize]);

    React.useEffect(() => {
        const sectionsToOpen = sections.map((section, index) => (section.notTouchable ? index : -1));

        if (sectionsToOpen.length > 0) {
            const newActiveSections = [...activeSections];
            sectionsToOpen.forEach((index) => {
                newActiveSections[index] = true;
            });
            setActiveSections(newActiveSections);
        }
    }, [sections, activeSections]);

    const renderHeader = (section: accordionSectionProps, index: number) => {
        return (
            <Box paddingY={16} className={styles.headerVariants[isInverse ? 'inverse' : 'default']}>
                {section.asset && (
                    <Box
                        paddingRight={16}
                        className={classNames({
                            [styles.center]: centerY(section.title, section.subtitle),
                        })}
                    >
                        <div className={styles.asset}>{section.asset}</div>
                    </Box>
                )}
                <div
                    className={classNames(styles.rowBody)}
                    style={{
                        justifyContent: centerY(section.title, section.subtitle) ? 'center' : 'flex-start',
                    }}
                >
                    <Stack space={2}>
                        <Text3 regular color={vars.colors.textPrimary}>
                            {section.title}
                        </Text3>
                        {section.subtitle && (
                            <Text2 regular color={vars.colors.textSecondary}>
                                {section.subtitle}
                            </Text2>
                        )}
                    </Stack>
                </div>
                {section.icon && (
                    <Box className={styles.icon}>
                        <IconChevron
                            color={
                                isInverse
                                    ? vars.colors.inverse
                                    : activeSections
                                    ? vars.colors.neutralMedium
                                    : 'default'
                            }
                            direction={activeSections[index] ? 'down' : 'up'}
                        />
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <ThemeVariant isInverse={isInverse}>
            {sections?.length &&
                sections.map((section, index) => (
                    <Box className={styles.containerBase} key={index}>
                        {section.notTouchable ? (
                            renderHeader(section, index)
                        ) : (
                            <BaseTouchable className={styles.touchable} onPress={() => toggleSection(index)}>
                                {renderHeader(section, index)}
                            </BaseTouchable>
                        )}
                        <Box paddingX={16}>
                            <Divider />
                        </Box>
                        <div
                            className={styles.contentShow}
                            ref={sectionRefs.current[index]}
                            style={{
                                maxHeight: activeSections[index]
                                    ? `${Array.isArray(height) ? height[index] : height}px`
                                    : '0',
                                transition: isTransitioning ? 'max-height 0.4s' : 'none',
                            }}
                            onTransitionEnd={() => setIsTransitioning(false)}
                        >
                            <Box>
                                <div className={styles.sectionPanel}>
                                    <Text3 as="p" regular color={vars.colors.textSecondary}>
                                        {section.panel}
                                    </Text3>
                                    {section.slot && <div className={styles.slot}>{section.extra}</div>}
                                </div>
                                <div>{section.extra}</div>
                            </Box>
                        </div>
                    </Box>
                ))}
        </ThemeVariant>
    );
};

export const BoxedAccordion = React.forwardRef<HTMLDivElement, accordionProps>(({...props}, ref) => (
    <Boxed ref={ref} dataAttributes={{'component-name': 'BoxedAccordion'}}>
        <Accordion {...props} />
    </Boxed>
));
