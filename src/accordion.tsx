import * as React from 'react';
import classNames from 'classnames';
import * as styles from './accordion.css'
import Box from './box';
import { Text2, Text3 } from './text';
import Stack from './stack';
import { vars } from './skins/skin-contract.css';
import IconChevron from './icons/icon-chevron'
import { BaseTouchable } from './touchable';
import Divider from './divider';
import { Boxed } from './boxed';
import { ThemeVariant } from './theme-variant-context';

interface accordionSectionProps {
    subtitle?: string;
    title?: string;
    asset?: React.ReactNode;
    width?: number;
    isVisible?: boolean;
    extra?: React.ReactNode;
    panel?: string;
    slot?: string;
    icon?: boolean;
    sections?: Array<accordionSectionProps>;
}

interface accordionProps {
    sections?: Array<accordionSectionProps>;
    isInverse?: boolean;
    allowMultipleOpen?: boolean;
    height?: number;
}


export const Accordion = ({
    sections = [],
    isInverse,
    allowMultipleOpen,
}: accordionProps): JSX.Element => {

    const [activeSections, setActiveSections] = React.useState(Array.from({ length: sections?.length }, () => false))

    const targetRef = React.useRef<HTMLDivElement>(null);
    const targeExtratRef = React.useRef<HTMLDivElement>(null);
    
    const toggleSection = (index: number) => {
        let sectionAux = [...activeSections]
        if (allowMultipleOpen) {
            sectionAux = activeSections.map((section) => section ? false : section)
        }
        sectionAux[index] = !activeSections[index]
        setActiveSections(sectionAux)
        console.log(sectionAux)

    }

    const centerY = (title: string | undefined, subtitle: string | undefined) => {
        const numTextLines = [title, subtitle].filter(Boolean).length;
        return numTextLines === 1
    }

    const height = targetRef.current?.scrollHeight

    return (
        <ThemeVariant isInverse={isInverse}>
            {sections?.length &&
                sections.map((section, index) => (
                    <Box className={styles.containerBase} key={index}>
                        <BaseTouchable className={styles.touchable}
                            onPress={() => toggleSection(index)}>
                            <Box paddingY={16} className={styles.headerVariants[isInverse ? 'inverse' : 'default']}>
                                {section.asset && (
                                    <Box
                                        paddingRight={16}
                                        className={classNames({ [styles.center]: centerY(section.title, section.subtitle) })}
                                    >
                                        <div className={styles.asset}>{section.asset}</div>
                                    </Box>
                                )}
                                <div
                                    className={classNames(styles.rowBody)}
                                    style={{ justifyContent: centerY(section.title, section.subtitle) ? 'center' : 'flex-start' }}
                                >
                                    <Stack space={2}>
                                        <Text3
                                            regular
                                            color={vars.colors.textPrimary}
                                        >
                                            {section.title}
                                        </Text3>
                                        {section.subtitle && (
                                            <Text2
                                                regular
                                                color={vars.colors.textSecondary}
                                            >
                                                {section.subtitle}
                                            </Text2>
                                        )}
                                    </Stack>
                                </div>
                                {section.icon && <Box className={styles.icon}>
                                    <IconChevron color={isInverse ? vars.colors.inverse : activeSections ? vars.colors.neutralMedium : "default"}
                                        direction={activeSections[index] ? "down" : "up"}
                                    />
                                </Box>}
                            </Box>
                        </BaseTouchable>
                            <div className={styles.contentShow}
                                ref={targetRef}
                                style={
                                    activeSections[index] ? {maxHeight: height} : { maxHeight: 0 }
                                  }
                            >
                                <Box  >

                                    <div >
                                    <Text3 as="p" regular color={vars.colors.textSecondary}>
                                        {section.panel}
                                    </Text3>
                                    {section.slot && <div className={styles.slot} >
                                        {section.extra}
                                    </div>}
                                    <div 
                                    ref={targeExtratRef} 
                                    style={{height: 'auto'}}
                                    >
                                        {section.extra}
                                    </div>
                                    </div>
                                </Box>

                            </div>
                        <Divider />
                    </Box>
                ))}
        </ThemeVariant>
    )
};

export const BoxedAccordion = React.forwardRef<HTMLDivElement, accordionProps>(({ ...props }, ref) => (
    <Boxed
        ref={ref}
        dataAttributes={{ 'component-name': 'BoxedAccordion' }}
    >
        <Accordion {...props} />
    </Boxed>
));








