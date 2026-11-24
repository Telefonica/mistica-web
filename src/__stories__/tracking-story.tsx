import * as React from 'react';
import {
    Accordion,
    AccordionItem,
    Avatar,
    Box,
    Boxed,
    BoxedAccordion,
    BoxedAccordionItem,
    BoxedRow,
    ButtonPrimary,
    ButtonSecondary,
    Chip,
    CoverCard,
    DataCard,
    Image,
    Inline,
    Logo,
    MediaCard,
    Message,
    NakedCard,
    Popover,
    Row,
    ScreenReaderOnly,
    Stack,
    Switch,
    Tabs,
    Text2,
    TextLink,
    ThemeContextProvider,
    Title1,
    Title3,
    ToggleIconButton,
    Touchable,
    IconButton,
    Video,
    skinVars,
    useTheme,
} from '..';
import {AdvancedDataCard, AiCard} from '../community';
import IconStarRegular from '@telefonica/mistica-icons/icon-star-regular';
import IconStarFilled from '@telefonica/mistica-icons/icon-star-filled';
import {AVAILABLE_THEMES} from '../../.storybook/themes';

import type {EventFormat, ThemeConfig, VideoElement} from '..';
import type {TrackingEvent} from '../utils/types';

type TrackingProps = {
    trackEvent?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
};

const EXAMPLE_ARIA_LABEL = 'Abrir detalle';
const MAX_RECORDED_EVENTS = 20;
const EVENT_LOG_MAX_HEIGHT = 280;
const IMAGE_SRC = 'https://picsum.photos/640/360';
const VIDEO_SRC = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

const isTrackingEvent = (value: unknown): value is TrackingEvent => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;

    return (
        ('name' in value && typeof value.name === 'string') ||
        ('category' in value &&
            typeof value.category === 'string' &&
            'action' in value &&
            typeof value.action === 'string')
    );
};

const parseTrackingEvent = (
    text: string
): {trackingEvent?: TrackingProps['trackingEvent']; error?: string} => {
    if (!text.trim()) return {};

    try {
        const value: unknown = JSON.parse(text);
        if (isTrackingEvent(value) || (Array.isArray(value) && value.every(isTrackingEvent))) {
            return {trackingEvent: value};
        }
        return {
            trackingEvent: [],
            error: 'Usa un evento con name (GA4) o category y action (UA), o un array de esos eventos. No se enviarán eventos hasta corregirlo.',
        };
    } catch {
        return {
            trackingEvent: [],
            error: 'JSON inválido. No se enviarán eventos hasta corregirlo. Usa comillas dobles para las propiedades y los textos.',
        };
    }
};

type Args = {
    component: string;
    trackEventsByDefault: boolean;
    trackEvent?: boolean;
    eventFormat: EventFormat;
    trackingEvent: string;
};

const COMPONENT_OPTIONS = [
    'IconButton: aria-label',
    'IconButton: aria-labelledby',
    'ToggleIconButton',
    'Row: incluye chevron',
    'BoxedRow',
    'Tabs',
    'AccordionItem',
    'BoxedAccordionItem',
    'DataCard: título frente a aria-label',
    'DataCard: pretitle sin título',
    'DataCard: sin título ni pretitle',
    'DataCard: contenido segregado',
    'MediaCard',
    'CoverCard',
    'NakedCard',
    'AdvancedDataCard',
    'AiCard',
    'Chip',
    'Chip: cierre',
    'Logo',
    'Message',
    'Touchable: aria-label',
    'Touchable: texto de children',
    'Touchable: enlace',
    'ButtonPrimary',
    'TextLink',
    'Popover: cierre',
    'Switch: sin evento automático',
    'Imagen: sin evento automático',
    'Vídeo: sin evento automático',
];

const TrackingPlayground = ({
    component,
    trackEventsByDefault,
    trackEvent,
    eventFormat,
    trackingEvent: trackingEventText,
}: Args): JSX.Element => {
    const parentTheme = useTheme();
    const labelId = React.useId();
    const videoRef = React.useRef<VideoElement>(null);
    const [lastAction, setLastAction] = React.useState('Todavía no se ha ejecutado ninguna acción.');
    const [events, setEvents] = React.useState<Array<TrackingEvent>>([]);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const {trackingEvent, error: trackingEventError} = parseTrackingEvent(trackingEventText);

    const logEvent = React.useCallback((event: TrackingEvent): Promise<void> => {
        setEvents((previousEvents) => [...previousEvents, event].slice(-MAX_RECORDED_EVENTS));
        return Promise.resolve();
    }, []);

    const theme = React.useMemo<ThemeConfig>(
        () => ({
            skin:
                AVAILABLE_THEMES.find(({skin}) => skin.name === parentTheme.skinName)?.skin ??
                AVAILABLE_THEMES[0].skin,
            i18n: parentTheme.i18n,
            colorScheme: parentTheme.isDarkMode ? 'dark' : 'light',
            platformOverrides: parentTheme.platformOverrides,
            texts: parentTheme.texts,
            dimensions: parentTheme.dimensions,
            Link: parentTheme.Link,
            useHrefDecorator: parentTheme.useHrefDecorator,
            analytics: {logEvent, eventFormat, trackEventsByDefault},
        }),
        [parentTheme, logEvent, eventFormat, trackEventsByDefault]
    );

    const trackingProps: TrackingProps = {
        trackEvent,
        trackingEvent,
    };
    const onPress = () => setLastAction(`Acción ejecutada: ${component}`);

    const examples: Record<string, React.ReactElement> = {
        'IconButton: aria-label': (
            <IconButton
                {...trackingProps}
                Icon={IconStarRegular}
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        'IconButton: aria-labelledby': (
            <IconButton
                {...trackingProps}
                Icon={IconStarRegular}
                aria-labelledby={labelId}
                onPress={onPress}
            />
        ),
        ToggleIconButton: (
            <ToggleIconButton
                {...trackingProps}
                checked={checked}
                onChange={(value) => {
                    setChecked(value);
                    onPress();
                }}
                uncheckedProps={{Icon: IconStarRegular, 'aria-label': `Marcar: ${EXAMPLE_ARIA_LABEL}`}}
                checkedProps={{Icon: IconStarFilled, 'aria-label': `Desmarcar: ${EXAMPLE_ARIA_LABEL}`}}
            />
        ),
        'Row: incluye chevron': (
            <Row
                {...trackingProps}
                title="Fila de ejemplo"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        BoxedRow: (
            <BoxedRow
                {...trackingProps}
                title="Fila con borde"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        Tabs: (
            <Tabs
                aria-label={EXAMPLE_ARIA_LABEL}
                selectedIndex={selectedTab}
                onChange={(value) => {
                    setSelectedTab(value);
                    onPress();
                }}
                tabs={[
                    {text: 'Resumen', ...trackingProps},
                    {text: 'Detalles', ...trackingProps},
                ]}
            />
        ),
        AccordionItem: (
            <Accordion onChange={onPress}>
                <AccordionItem
                    {...trackingProps}
                    title="Abrir acordeón"
                    aria-label={EXAMPLE_ARIA_LABEL}
                    content="Contenido del acordeón"
                />
            </Accordion>
        ),
        BoxedAccordionItem: (
            <BoxedAccordion onChange={onPress}>
                <BoxedAccordionItem
                    {...trackingProps}
                    title="Abrir acordeón con borde"
                    aria-label={EXAMPLE_ARIA_LABEL}
                    content="Contenido del acordeón"
                />
            </BoxedAccordion>
        ),
        'DataCard: título frente a aria-label': (
            <DataCard
                {...trackingProps}
                title="Título de la card"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        'DataCard: pretitle sin título': (
            <DataCard
                {...trackingProps}
                pretitle="Pretitle de la card"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        'DataCard: sin título ni pretitle': (
            <DataCard
                {...trackingProps}
                description="Copy esperado: not_apply"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        'DataCard: contenido segregado': (
            <DataCard
                {...trackingProps}
                title="Título segregado"
                aria-label={EXAMPLE_ARIA_LABEL}
                segregateTouchableContent
                onPress={onPress}
            />
        ),
        MediaCard: (
            <MediaCard
                {...trackingProps}
                imageSrc={IMAGE_SRC}
                title="Media card"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        CoverCard: (
            <CoverCard
                {...trackingProps}
                imageSrc={IMAGE_SRC}
                title="Cover card"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        NakedCard: (
            <NakedCard
                {...trackingProps}
                imageSrc={IMAGE_SRC}
                title="Naked card"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        AdvancedDataCard: (
            <AdvancedDataCard
                {...trackingProps}
                title="Advanced data card"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        AiCard: (
            <AiCard
                {...trackingProps}
                text="Descubre "
                words={['televisión', 'fibra', 'móvil']}
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
            />
        ),
        Chip: (
            <Chip {...trackingProps} onPress={onPress}>
                Filtro de ejemplo
            </Chip>
        ),
        'Chip: cierre': (
            <Chip {...trackingProps} onClose={onPress} closeButtonLabel={EXAMPLE_ARIA_LABEL}>
                Filtro cerrable
            </Chip>
        ),
        Logo: <Logo {...trackingProps} aria-label={EXAMPLE_ARIA_LABEL} onPress={onPress} />,
        Message: (
            <Message
                {...trackingProps}
                type="incoming"
                contentText="Mensaje de ejemplo"
                aria-label={EXAMPLE_ARIA_LABEL}
                onPress={onPress}
                asset={<Avatar size={40} initials="AG" />}
                assetLabel="Abrir perfil"
                onAssetPress={() => setLastAction('Acción ejecutada: avatar del mensaje')}
                actions={[
                    {
                        Icon: IconStarRegular,
                        'aria-label': 'Marcar mensaje',
                        onPress: () => setLastAction('Acción ejecutada: icono del mensaje'),
                    },
                ]}
            />
        ),
        'Touchable: aria-label': (
            <Touchable {...trackingProps} aria-label={EXAMPLE_ARIA_LABEL} onPress={onPress}>
                Pulsar Touchable
            </Touchable>
        ),
        'Touchable: texto de children': (
            <Touchable {...trackingProps} onPress={onPress}>
                Texto directo de children
            </Touchable>
        ),
        'Touchable: enlace': (
            <Touchable
                {...trackingProps}
                aria-label={EXAMPLE_ARIA_LABEL}
                href="#tracking-result"
                onNavigate={onPress}
            >
                Enlace dentro de esta página
            </Touchable>
        ),
        ButtonPrimary: (
            <ButtonPrimary {...trackingProps} aria-label={EXAMPLE_ARIA_LABEL} onPress={onPress}>
                Botón de referencia
            </ButtonPrimary>
        ),
        TextLink: (
            <TextLink {...trackingProps} aria-label={EXAMPLE_ARIA_LABEL} onPress={onPress}>
                Enlace de referencia
            </TextLink>
        ),
        'Popover: cierre': (
            <Popover
                {...trackingProps}
                open={popoverOpen}
                onClose={() => {
                    setPopoverOpen(false);
                    onPress();
                }}
                title="Popover de ejemplo"
                description="El botón de apertura no genera eventos. Prueba el cierre."
                closeButtonLabel={EXAMPLE_ARIA_LABEL}
                target={
                    <ButtonSecondary trackEvent={false} onPress={() => setPopoverOpen(true)}>
                        Abrir Popover
                    </ButtonSecondary>
                }
            />
        ),
        'Switch: sin evento automático': (
            <Switch name="sample-switch" onChange={(value) => setLastAction(`Switch cambiado: ${value}`)}>
                Cambiar switch
            </Switch>
        ),
        'Imagen: sin evento automático': (
            <Image src={IMAGE_SRC} aspectRatio="16:9" alt="Imagen sin interacción" />
        ),
        'Vídeo: sin evento automático': (
            <Stack space={16}>
                <Video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    aspectRatio="16:9"
                    autoPlay={false}
                    preload="none"
                    onPlay={() => setLastAction('Vídeo reproduciendo; no genera evento automático.')}
                    onPause={() => setLastAction('Vídeo pausado; no genera evento automático.')}
                />
                <Inline space={16} wrap>
                    <ButtonSecondary trackEvent={false} onPress={() => videoRef.current?.play()}>
                        Reproducir
                    </ButtonSecondary>
                    <ButtonSecondary trackEvent={false} onPress={() => videoRef.current?.pause()}>
                        Pausar
                    </ButtonSecondary>
                </Inline>
            </Stack>
        ),
    };

    return (
        <Box padding={16}>
            <Stack space={24}>
                <Stack space={16}>
                    <Title1 as="h1">Pruebas de tracking</Title1>
                    <Text2 regular>
                        Configura la prueba en Controls y pulsa el componente. Los eventos se guardan aquí,
                        sin enviarlos a ningún servicio de analíticas.
                    </Text2>
                    {trackingEventError && (
                        <Text2 regular color={skinVars.colors.error}>
                            {trackingEventError}
                        </Text2>
                    )}
                </Stack>
                <Boxed>
                    <Box padding={16}>
                        <ThemeContextProvider theme={theme} density={parentTheme.density}>
                            <ScreenReaderOnly>
                                <span id={labelId}>{EXAMPLE_ARIA_LABEL}</span>
                            </ScreenReaderOnly>
                            {examples[component]}
                        </ThemeContextProvider>
                    </Box>
                </Boxed>
                <Text2 regular>{lastAction}</Text2>
                <Boxed>
                    <Box padding={16}>
                        <Stack space={16}>
                            <Inline space="between" alignItems="center">
                                <Title3 as="h2">Eventos recibidos ({events.length})</Title3>
                                <ButtonSecondary small trackEvent={false} onPress={() => setEvents([])}>
                                    Limpiar
                                </ButtonSecondary>
                            </Inline>
                            <pre
                                id="tracking-result"
                                role="log"
                                aria-label="Eventos recibidos"
                                style={{
                                    color: skinVars.colors.textPrimary,
                                    margin: 0,
                                    maxHeight: EVENT_LOG_MAX_HEIGHT,
                                    overflow: 'auto',
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {JSON.stringify(events, null, 2)}
                            </pre>
                            <Text2 regular>
                                Se muestran los últimos {MAX_RECORDED_EVENTS} eventos. Cambiar de componente
                                limpia el registro; cambiar los ajustes no genera eventos.
                            </Text2>
                        </Stack>
                    </Box>
                </Boxed>
            </Stack>
        </Box>
    );
};

export default {
    title: 'Utilities/Tracking/Playground',
    parameters: {fullScreen: true, controls: {expanded: true}},
};

export const Default: StoryComponent<Args> = (args) => <TrackingPlayground key={args.component} {...args} />;
Default.storyName = 'Playground';
Default.args = {
    component: 'IconButton: aria-label',
    trackEventsByDefault: true,
    trackEvent: undefined,
    eventFormat: 'google-analytics-4',
    trackingEvent: '',
};
Default.argTypes = {
    component: {
        options: COMPONENT_OPTIONS,
        control: {type: 'select'},
        description: 'Ejemplo que se prueba. Cambiarlo limpia los eventos recibidos.',
        table: {category: 'Ejemplo'},
    },
    trackEventsByDefault: {
        control: {type: 'boolean'},
        description:
            'Valor del provider cuando trackEvent es undefined. Mística usa false por defecto; esta demo empieza en true.',
        table: {category: 'Provider', defaultValue: {summary: 'true (demo)'}},
    },
    eventFormat: {
        options: ['google-analytics-4', 'universal-analytics'],
        control: {
            type: 'select',
            labels: {
                'google-analytics-4': 'Google Analytics 4 (GA4)',
                'universal-analytics': 'Universal Analytics (UA)',
            },
        },
        description:
            'Formato del evento automático: GA4 (`name`, `component_type`, `component_copy`) o UA (`category`, `action`, `label`).',
        table: {category: 'Provider', defaultValue: {summary: 'google-analytics-4'}},
    },
    trackEvent: {
        options: [undefined, true, false],
        control: {
            type: 'select',
            labels: {
                undefined: 'undefined: heredar del provider',
                true: 'true: activar automático',
                false: 'false: desactivar automático',
            },
        },
        description:
            'undefined hereda del provider; true activa el evento automático; false lo desactiva. No afecta a los eventos personalizados.',
        table: {
            category: 'Componente',
            type: {summary: 'boolean | undefined'},
            defaultValue: {summary: 'undefined'},
        },
    },
    trackingEvent: {
        control: {type: 'text'},
        description:
            'JSON personalizado: objeto = un evento; array = varios; `[]` = ninguno. Ejemplo: `{"name":"manual_click"}`. Vacío permite el automático, según `trackEvent` y el provider. El copy depende del componente: etiqueta accesible (`aria-label` o `aria-labelledby`), título o texto visible; las cards sin título ni pretitle usan `not_apply`.',
        table: {
            category: 'Componente',
            type: {summary: 'string (JSON)'},
            defaultValue: {summary: 'Vacío (undefined)'},
        },
    },
};
