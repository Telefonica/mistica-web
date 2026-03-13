# Components

Component reference for Mística React. Components are grouped by category in `components/`.

## [Accordions](components/accordions.md)

- [Accordion](components/accordions.md#accordion) — Accordion groups multiple AccordionItem components stacked vertically, helping present expandable content as a coherent set.
- [AccordionItem](components/accordions.md#accordionitem) — AccordionItem is the interactive unit inside an Accordion: it renders a tappable header that toggles an accessible, animated content panel.
- [BoxedAccordion](components/accordions.md#boxedaccordion) — BoxedAccordion groups multiple BoxedAccordionItem components in a stacked expandable set; the visible box treatment is applied by each item.
- [BoxedAccordionItem](components/accordions.md#boxedaccordionitem) — BoxedAccordionItem is the interactive unit of a BoxedAccordion: it behaves like AccordionItem and applies the visible boxed styling at item level.

## [Buttons](components/buttons.md)

- [ButtonPrimary](components/buttons.md#buttonprimary) — ButtonPrimary represents the main action users should take in a given view or step.
- [ButtonSecondary](components/buttons.md#buttonsecondary) — ButtonSecondary represents a complementary action with less visual priority than the primary action.
- [ButtonDanger](components/buttons.md#buttondanger) — ButtonDanger is reserved for high-risk, destructive actions that require clear visual warning.
- [ButtonLink](components/buttons.md#buttonlink) — ButtonLink provides low-emphasis actions and lightweight navigation in button form.
- [ButtonLinkDanger](components/buttons.md#buttonlinkdanger) — ButtonLinkDanger is a low-emphasis destructive action used when risk exists but should not dominate the interface.
- [IconButton](components/buttons.md#iconbutton) — IconButton exposes a compact icon-only action with accessible labeling, visual variants, and optional loading feedback for async interactions.
- [ToggleIconButton](components/buttons.md#toggleiconbutton) — ToggleIconButton switches between checked and unchecked icon states using the same compact visual language as IconButton.
- [ButtonGroup](components/buttons.md#buttongroup) — ButtonGroup organizes primary, secondary, and optional link actions into a coherent action block with responsive alignment.

## [Cards](components/cards.md)

- [DataCard](components/cards.md#datacard) — DataCard presents structured informational content with optional media, hierarchy, actions, and supporting slots in a reusable card surface.
- [MediaCard](components/cards.md#mediacard) — MediaCard combines media and content in one card surface, balancing visual storytelling with clear text hierarchy and actions.
- [CoverCard](components/cards.md#covercard) — CoverCard is a media-first card pattern that combines image or video backgrounds with layered content, actions, and optional footer content.
- [NakedCard](components/cards.md#nakedcard) — NakedCard is a transparent card surface that inherits the surrounding theme context while keeping card content structure and actions.
- [HighlightedCard](components/cards.md#highlightedcard) — HighlightedCard is a legacy highlighted media-card pattern; use the equivalent MediaCard layout in new designs.
- [PosterCard](components/cards.md#postercard) — PosterCard is a legacy media-first card kept for backward compatibility; use CoverCard for new designs.
- [SnapCard](components/cards.md#snapcard) — Deprecated alias of `DataCard` in snap size for compact, actionable data cards.
- [SmallNakedCard](components/cards.md#smallnakedcard) — Deprecated alias of `NakedCard` in snap size, for compact transparent cards that inherit the surrounding theme variant.
- [DisplayDataCard](components/cards.md#displaydatacard) — DisplayDataCard is the display-sized data card pattern for high-prominence information blocks; prefer the equivalent DataCard size variant in new designs.
- [DisplayMediaCard](components/cards.md#displaymediacard) — DisplayMediaCard is the large-format media card variant for prominent visual modules; prefer equivalent sizing through modern media-card patterns in new designs.
- [EmptyStateCard](components/cards.md#emptystatecard) — EmptyStateCard communicates absence of content in a boxed surface with supportive messaging and optional recovery actions.
- [CardActionIconButton](components/cards.md#cardactioniconbutton)
- [CardActionSpinner](components/cards.md#cardactionspinner)

## [Carousels](components/carousels.md)

- [Carousel](components/carousels.md#carousel) — Carousel presents related content in horizontal pages with optional bullets, arrows, and autoplay controls.
- [CenteredCarousel](components/carousels.md#centeredcarousel) — CenteredCarousel emphasizes one item at a time on mobile while preserving multi-item browsing on larger screens.
- [Slideshow](components/carousels.md#slideshow) — Use slideshow for full-width, page-by-page sequences of visual content with optional bullets, controls, and autoplay.
- [PageBullets](components/carousels.md#pagebullets) — PageBullets indicates carousel pagination state, helping users understand position and progress across pages.
- [CarouselAutoplayControl](components/carousels.md#carouselautoplaycontrol) — CarouselAutoplayControl toggles carousel autoplay state, including pause/play and restart behavior when the last page is reached.
- [CarouselContextConsumer](components/carousels.md#carouselcontextconsumer) — CarouselContextConsumer reads shared carousel actions and state to render custom controls aligned with active carousel behavior.
- [CarouselContextProvider](components/carousels.md#carouselcontextprovider) — CarouselContextProvider shares carousel navigation and state props so custom controls stay synchronized with carousel behavior.
- [CarouselPageControls](components/carousels.md#carouselpagecontrols) — CarouselPageControls provides previous/next arrow navigation for carousels, with contextual enable/disable behavior and page-aware labeling.
- [useCarouselContext](components/carousels.md#usecarouselcontext) — useCarouselContext provides reusable behavior to keep component logic consistent across the product.

## [Mosaic](components/mosaic.md)

- [HorizontalMosaic](components/mosaic.md#horizontalmosaic) — HorizontalMosaic groups content into swipeable mosaic pages with alternating layouts to keep discovery flows visually dynamic.
- [VerticalMosaic](components/mosaic.md#verticalmosaic) — VerticalMosaic arranges content in static mosaic blocks with list semantics, combining vertical and square slots for scannable editorial layouts.

## [Data Visualizations](components/data-visualizations.md)

- [Meter](components/data-visualizations.md#meter) — Meter visualizes values within a bounded range using segmented linear, angular, or circular shapes, with optional extra content for context.
- [Rating](components/data-visualizations.md#rating) — Rating captures user feedback through an interactive icon scale, supporting quantitative and qualitative evaluation patterns.
- [InfoRating](components/data-visualizations.md#inforating) — InfoRating displays read-only scores with rating icons, including accessible value narration for assistive technologies.

## [Progress Indicators](components/progress-indicators.md)

- [ProgressBar](components/progress-indicators.md#progressbar) — ProgressBar provides continuous linear feedback for task completion progress as a percentage.
- [ProgressBarStepped](components/progress-indicators.md#progressbarstepped) — ProgressBarStepped shows progress across discrete milestones, highlighting completed and current steps in multi-step flows.

## [Empty States](components/empty-states.md)

- [EmptyState](components/empty-states.md#emptystate)

## [Feedback](components/feedback.md)

- [FeedbackScreen](components/feedback.md#feedbackscreen) — FeedbackScreen is the base full-screen feedback pattern for communicating important status moments with message hierarchy and optional actions.
- [ErrorFeedbackScreen](components/feedback.md#errorfeedbackscreen) — ErrorFeedbackScreen presents a dedicated full-screen error state with clear explanation and recovery actions when in-flow error handling is not enough.
- [InfoFeedbackScreen](components/feedback.md#infofeedbackscreen) — InfoFeedbackScreen presents neutral, informative full-screen feedback with optional actions to help users decide the next step.
- [SuccessFeedbackScreen](components/feedback.md#successfeedbackscreen) — SuccessFeedbackScreen communicates completion of an important action with positive visual reinforcement and optional follow-up actions.
- [SuccessFeedback](components/feedback.md#successfeedback) — Use success feedback for inline or section-level confirmation after a completed action, with optional supporting text, actions, and image.

## [Snackbar](components/snackbar.md)

- [Snackbar](components/snackbar.md#snackbar) — Use snackbar for brief, non-blocking feedback about a recent action, with optional action and dismiss controls.
- [useSnackbar](components/snackbar.md#usesnackbar) — useSnackbar provides reusable behavior to keep component logic consistent across the product.

## [Callout](components/callout.md)

- [Callout](components/callout.md#callout)

## [Tooltip](components/tooltip.md)

- [Tooltip](components/tooltip.md#tooltip)

## [Popover](components/popover.md)

- [Popover](components/popover.md#popover)

## [Forms](components/forms.md)

- [Form](components/forms.md#form)
- [useForm](components/forms.md#useform) — useForm provides reusable behavior to keep component logic consistent across the product.
- [useFieldProps](components/forms.md#usefieldprops) — useFieldProps provides reusable behavior to keep component logic consistent across the product.

## [Checkbox](components/checkbox.md)

- [Checkbox](components/checkbox.md#checkbox)

## [Radio Button](components/radio-button.md)

- [RadioButton](components/radio-button.md#radiobutton) — RadioButton represents a single mutually exclusive option within a RadioGroup, enabling clear one-choice selection.
- [RadioGroup](components/radio-button.md#radiogroup) — RadioGroup manages a set of mutually exclusive options, including selection state and keyboard navigation across radio items.

## [Select](components/select.md)

- [Select](components/select.md#select)

## [Switch](components/switch.md)

- [Switch](components/switch.md#switch)

## [Slider](components/slider.md)

- [Slider](components/slider.md#slider)

## [Counter](components/counter.md)

- [Counter](components/counter.md#counter)

## [Headers](components/headers.md)

- [Header](components/headers.md#header) — Header organizes section-level textual hierarchy with optional headline, pretitle, title, and description in a readable, accessible structure.
- [HeaderLayout](components/headers.md#headerlayout) — HeaderLayout provides the responsive shell for page headers, combining breadcrumbs, header content, and optional extra areas in one coherent top section.
- [MainSectionHeader](components/headers.md#mainsectionheader) — MainSectionHeader introduces major sections with high-prominence title, optional supporting description, and optional primary action.
- [MainSectionHeaderLayout](components/headers.md#mainsectionheaderlayout) — MainSectionHeaderLayout wraps MainSectionHeader in a responsive, brand-aware top-area layout with consistent spacing and width control.

## [Hero](components/hero.md)

- [Hero](components/hero.md#hero) — A hero is a promotional section at the top of the page with clear call-to-action focus; use CoverHero instead when you need media as the background.
- [CoverHero](components/hero.md#coverhero) — CoverHero is a high-impact hero section that combines strong heading hierarchy, optional media background, and grouped call-to-action buttons; choose it instead of Hero when media needs to be the section background.

## [Hooks](components/hooks.md)

- [useDocumentVisibility](components/hooks.md#usedocumentvisibility) — useDocumentVisibility provides reusable behavior to keep component logic consistent across the product.
- [useElementDimensions](components/hooks.md#useelementdimensions) — useElementDimensions provides reusable behavior to keep component logic consistent across the product.
- [useIsInViewport](components/hooks.md#useisinviewport) — useIsInViewport provides reusable behavior to keep component logic consistent across the product.
- [useIsInverseVariant](components/hooks.md#useisinversevariant) — useIsInverseVariant provides reusable behavior to keep component logic consistent across the product.
- [useIsInverseOrMediaVariant](components/hooks.md#useisinverseormediavariant) — useIsInverseOrMediaVariant provides reusable behavior to keep component logic consistent across the product.
- [useModalState](components/hooks.md#usemodalstate) — useModalState provides reusable behavior to keep component logic consistent across the product.
- [useScreenSize](components/hooks.md#usescreensize) — useScreenSize provides reusable behavior to keep component logic consistent across the product.
- [useTheme](components/hooks.md#usetheme) — useTheme provides reusable behavior to keep component logic consistent across the product.
- [useThemeVariant](components/hooks.md#usethemevariant) — useThemeVariant provides reusable behavior to keep component logic consistent across the product.
- [useWindowHeight](components/hooks.md#usewindowheight) — useWindowHeight provides reusable behavior to keep component logic consistent across the product.
- [useWindowSize](components/hooks.md#usewindowsize) — useWindowSize provides reusable behavior to keep component logic consistent across the product.
- [useWindowWidth](components/hooks.md#usewindowwidth) — useWindowWidth provides reusable behavior to keep component logic consistent across the product.

## [Input Fields](components/input-fields.md)

- [TextField](components/input-fields.md#textfield) — Use text field as the default Mística input for free-text entry, with built-in form integration, validation support, and optional suggestions.
- [TextFieldBase](components/input-fields.md#textfieldbase) — Foundation primitive used to build Mística text-input fields, including labeling, helper/error feedback, and shared interaction states.
- [EmailField](components/input-fields.md#emailfield) — EmailField captures email addresses with email-optimized input behavior and built-in format validation.
- [PasswordField](components/input-fields.md#passwordfield) — PasswordField captures sensitive credentials with masked input, accessible show/hide control, and form validation support.
- [SearchField](components/input-fields.md#searchfield) — SearchField captures query input for discovery flows with optional search icon, clear action, and autosuggest integration.
- [IntegerField](components/input-fields.md#integerfield) — IntegerField captures whole-number input with digit-only sanitization and numeric keypad support on mobile devices.
- [DecimalField](components/input-fields.md#decimalfield) — DecimalField captures numeric values with fractional precision, adapting decimal separator behavior to the user locale.
- [PhoneNumberField](components/input-fields.md#phonenumberfield) — PhoneNumberField captures phone numbers with robust as-you-type international formatting and optional E.164 normalization.
- [PhoneNumberFieldLite](components/input-fields.md#phonenumberfieldlite) — PhoneNumberFieldLite captures phone numbers with a lightweight formatter for a limited country set and common numbering patterns.
- [IbanField](components/input-fields.md#ibanfield) — IbanField captures IBAN account identifiers with automatic formatting, uppercase normalization, and built-in IBAN validity checks.
- [PinField](components/input-fields.md#pinfield) — PinField captures short verification codes in segmented digit inputs, with optional masked display and SMS one-time-code autofill support.
- [Autocomplete](components/input-fields.md#autocomplete) — Autocomplete helps users choose a valid value from suggested options while typing, with fast keyboard and touch interaction.
- [DateField](components/input-fields.md#datefield) — DateField captures calendar dates with platform-appropriate picker behavior and optional range constraints.
- [DateTimeField](components/input-fields.md#datetimefield) — DateTimeField captures a combined date and time value with platform-appropriate picker behavior and range validation.
- [TimeField](components/input-fields.md#timefield) — information that the user needs to enter in the field.
- [MonthField](components/input-fields.md#monthfield) — MonthField captures month-and-year values with calendar affordance, range validation, and adaptive native/fallback picker behavior.
- [CreditCardFields](components/input-fields.md#creditcardfields) — CreditCardFields groups card number, expiration date, and CVV into a single, optimized payment input block.
- [CreditCardNumberField](components/input-fields.md#creditcardnumberfield) — CreditCardNumberField captures payment card numbers with guided spacing, card-type recognition, and validity-aware progression.
- [CreditCardExpirationField](components/input-fields.md#creditcardexpirationfield) — CreditCardExpirationField captures card expiry in a guided `MM/YY` format with built-in validity checks.
- [CvvField](components/input-fields.md#cvvfield) — CvvField captures the card security code with numeric input, card-aware guidance, and strict length validation.
- [DoubleField](components/input-fields.md#doublefield) — DoubleField arranges two related form inputs side by side to reduce vertical space and keep paired data entry coherent.
- [formatPhoneLite](components/input-fields.md#formatphonelite) — formatPhoneLite allows users to enter and validate form information in a consistent and accessible way.
- [FileUpload](components/input-fields.md#fileupload) — FileUpload handles file selection through click-to-browse and optional drag-and-drop, with built-in file list display, error feedback, and support for single or multiple file uploads.
- [FileItem](components/input-fields.md#fileitem) — FileItem displays a single selected file inside a FileUpload, showing file name, type-aware icon, formatted size, and a remove button.

## [Layout](components/layout.md)

- [ResponsiveLayout](components/layout.md#responsivelayout) — ResponsiveLayout provides a responsive page container that keeps content within adaptive bounds or expands to full width when needed.
- [Grid](components/layout.md#grid) — Grid is a responsive layout primitive for arranging content in rows and columns with controlled spacing and alignment.
- [GridItem](components/layout.md#griditem) — GridItem defines how each element occupies and aligns within a Grid, including span, start position, and ordering.
- [GridLayout](components/layout.md#gridlayout) — GridLayout provides predefined responsive column templates to compose balanced page sections with predictable proportions.
- [Stack](components/layout.md#stack) — Use stack to arrange content vertically with a predefined spacing scale, including responsive spacing and distribution modes.
- [Inline](components/layout.md#inline) — Inline arranges elements in a horizontal row with controlled spacing, optional wrapping, and responsive gap behavior across breakpoints.
- [Box](components/layout.md#box) — Box is a low-level spacing primitive used to apply consistent, responsive padding around content.
- [NegativeBox](components/layout.md#negativebox) — NegativeBox offsets horizontal container gutters by applying negative side margins, allowing content to bleed to one or both edges.
- [Boxed](components/layout.md#boxed) — Boxed is a themed surface container used to group content inside a bounded, variant-aware block.
- [Align](components/layout.md#align) — Align is a layout primitive that positions children on the horizontal and vertical axes using x/y alignment props, with optional width and height constraints.
- [FixedFooterLayout](components/layout.md#fixedfooterlayout) — FixedFooterLayout keeps footer content anchored to the bottom when space allows, while preserving readable scrollable content above it.
- [ButtonFixedFooterLayout](components/layout.md#buttonfixedfooterlayout) — ButtonFixedFooterLayout keeps primary actions anchored in a fixed footer while content scrolls independently.
- [ButtonLayout](components/layout.md#buttonlayout) — ButtonLayout arranges primary, secondary, and optional link actions into a structured block with explicit alignment variants.
- [FixedToTop](components/layout.md#fixedtotop) — FixedToTop coordinates stacked fixed-top elements by sharing cumulative top offset, avoiding overlap between layered sticky regions.
- [MasterDetailLayout](components/layout.md#masterdetaillayout) — MasterDetailLayout adapts list-detail experiences across breakpoints, switching from single-pane on smaller screens to split-pane on larger screens.
- [HorizontalScroll](components/layout.md#horizontalscroll) — HorizontalScroll creates a horizontal overflow area so content can be explored by sideways scrolling when items do not fit in the available width.
- [Divider](components/layout.md#divider) — Divider is a subtle visual separator used to split related content areas while preserving rhythm and scanability.

## [Lists](components/lists.md)

- [Row](components/lists.md#row) — Row is a flexible list item pattern for navigation, selection, and status display with optional leading asset and trailing actions.
- [RowList](components/lists.md#rowlist) — RowList groups multiple Row items into a single accessible list with consistent spacing and separators.
- [BoxedRow](components/lists.md#boxedrow) — BoxedRow applies the Row interaction model inside a boxed container for stronger visual separation and emphasis.
- [BoxedRowList](components/lists.md#boxedrowlist) — BoxedRowList stacks multiple BoxedRow items with consistent spacing to create separated, card-like list groups.
- [OrderedList](components/lists.md#orderedlist) — OrderedList presents items in an explicit sequence, helping users follow ordered steps, ranked priorities, or procedural flows.
- [UnorderedList](components/lists.md#unorderedlist) — UnorderedList groups related items where sequence is not meaningful, preserving semantic list structure for accessibility and scanning.
- [ListItem](components/lists.md#listitem) — ListItem is the content unit used inside ordered and unordered lists, supporting default markers, custom icons, or markerless variants.

## [Loading](components/loading.md)

- [LoadingScreen](components/loading.md#loadingscreen) — LoadingScreen communicates blocking progress states with a centered loading indicator and short contextual messaging.
- [BrandLoadingScreen](components/loading.md#brandloadingscreen) — BrandLoadingScreen adds brand-led loading motion and styling to full-screen waiting states while preserving clear progress messaging.
- [LoadingBar](components/loading.md#loadingbar) — LoadingBar shows a global, indeterminate progress indicator for ongoing background activity while the current screen remains usable.
- [Spinner](components/loading.md#spinner) — spinner. You can see how to apply spinner in buttons here.

## [Modals](components/modals.md)

- [Sheet](components/modals.md#sheet) — Sheet presents temporary, focus-trapped bottom-sheet content for contextual decisions, actions, and lightweight task flows.
- [SheetBody](components/modals.md#sheetbody) — SheetBody structures sheet content with sticky title/actions regions, optional descriptive text, and scroll-aware dividers.
- [SheetRoot](components/modals.md#sheetroot) — SheetRoot is the global host that mounts and resolves sheet experiences triggered through showSheet.
- [showSheet](components/modals.md#showsheet) — showSheet opens a typed sheet flow imperatively and returns a promise with user outcome or dismissal result.
- [NativeSheetImplementation](components/modals.md#nativesheetimplementation) — NativeSheetImplementation is a Mística component used to build consistent and accessible product interfaces.
- [ActionsSheet](components/modals.md#actionssheet) — ActionsSheet presents a short decision block in a bottom sheet using a primary action, optional secondary action, and optional text link.
- [ActionsListSheet](components/modals.md#actionslistsheet) — ActionsListSheet presents a bottom sheet with a clear list of selectable actions, optionally enriched with icons and destructive emphasis.
- [InfoSheet](components/modals.md#infosheet) — InfoSheet presents explanatory content in a modal sheet with a titled context, optional supporting copy, and a structured list of informational items.
- [RadioListSheet](components/modals.md#radiolistsheet) — RadioListSheet presents single-choice options inside a bottom sheet using radio-list rows, optimized for responsive selection flows.
- [Drawer](components/modals.md#drawer) — The drawer component is only meant for web implementations. When designing for native we recommend to use a modal view.
- [useDialog](components/modals.md#usedialog) — useDialog provides reusable behavior to keep component logic consistent across the product.

## [Menu](components/menu.md)

- [Menu](components/menu.md#menu) — Menu displays contextual actions from a trigger, with adaptive positioning, keyboard navigation, and dismiss behavior through overlay interaction.
- [MenuItem](components/menu.md#menuitem) — MenuItem represents an actionable row inside a menu, with optional icon, destructive emphasis, disabled state, or checkbox control behavior.
- [MenuSection](components/menu.md#menusection) — MenuSection groups related menu items and automatically renders a divider between sections for clearer scanability.

## [Navigation](components/navigation-bars.md)

- [MainNavigationBar](components/navigation-bars.md#mainnavigationbar) — MainNavigationBar provides primary product navigation with section switching, responsive desktop menus, and mobile burger-menu behavior.
- [NavigationBar](components/navigation-bars.md#navigationbar) — NavigationBar is the standard top app bar for page-level navigation, supporting back navigation, title, and contextual right-side actions.
- [NavigationBarAction](components/navigation-bars.md#navigationbaraction) — NavigationBarAction is an interactive header control used for concise contextual actions in navigation bars.
- [NavigationBarActionGroup](components/navigation-bars.md#navigationbaractiongroup) — NavigationBarActionGroup arranges multiple navigation-bar actions into a compact, coherent right-side action cluster.
- [FunnelNavigationBar](components/navigation-bars.md#funnelnavigationbar) — FunnelNavigationBar is a simplified top bar for focused transactional flows, keeping only essential branding and contextual actions.
- [NavigationBreadcrumbs](components/navigation-bars.md#navigationbreadcrumbs) — Breadcrumbs are a navigational element to help users to understand where they are in a website as well as content structure and hierarchy.
- [Tabs](components/navigation-bars.md#tabs) — Use tabs to switch between related sections within the same context, with one active tab at a time.
- [Stepper](components/navigation-bars.md#stepper) — Use stepper to show progress through a linear multi-step flow, highlighting completed and current steps.
- [SkipLink](components/navigation-bars.md#skiplink) — A skip link allows keyboard and screen reader users to bypass repeated blocks of content and jump directly to other content of the page.
- [SkipLinkNav](components/navigation-bars.md#skiplinknav) — SkipLinkNav groups multiple skip links inside a labeled navigation landmark for accessible quick-jump navigation.

## [Avatar](components/avatar.md)

- [Avatar](components/avatar.md#avatar)

## [Badge](components/badge.md)

- [Badge](components/badge.md#badge)

## [Tag](components/tag.md)

- [Tag](components/tag.md#tag)

## [Chip](components/chip.md)

- [Chip](components/chip.md#chip)

## [StackingGroup](components/stacking-group.md)

- [StackingGroup](components/stacking-group.md#stackinggroup)

## [Primitives](components/primitives.md)

- [Image](components/primitives.md#image) — Image displays responsive media with controlled aspect ratio, loading skeleton, and graceful error fallback to keep layouts stable while assets load or fail.
- [Video](components/primitives.md#video) — Use video for embedded media playback with responsive sizing, poster/error fallbacks, and controllable autoplay/loading behavior.
- [VideoElement](components/primitives.md#videoelement) — VideoElement is a Mística component used to build consistent and accessible product interfaces.
- [Circle](components/primitives.md#circle) — Circle is a circular container used to frame visual content or compact UI elements with optional background and border styling.
- [Touchable](components/primitives.md#touchable) — Touchable is a Mística component used to build consistent and accessible product interfaces.
- [TouchableElement](components/primitives.md#touchableelement) — TouchableElement is a Mística component used to build consistent and accessible product interfaces.
- [Placeholder](components/primitives.md#placeholder) — Placeholder renders a neutral framed block for temporary visual stand-ins when real media or content is not yet available.
- [FadeIn](components/primitives.md#fadein) — Emotional branded animations enhance the brand identity by visually connecting with users. They help convey emotions and reinforce the brand’s values, creating.
- [ScreenReaderOnly](components/primitives.md#screenreaderonly) — ScreenReaderOnly exposes content to assistive technologies while keeping it visually hidden in the interface.

## [Skeletons](components/skeletons.md)

- [SkeletonCircle](components/skeletons.md#skeletoncircle) — It is a more atomic type of skeleton to create compositions that do not fit with the rest of the skeleton types.
- [SkeletonLine](components/skeletons.md#skeletonline) — SkeletonLine displays a single loading placeholder bar for short linear content blocks.
- [SkeletonRectangle](components/skeletons.md#skeletonrectangle) — SkeletonRectangle provides a block-shaped loading placeholder for media and container surfaces of varying sizes.
- [SkeletonRow](components/skeletons.md#skeletonrow) — Skeleton row can be used to represent components like lists (also in its boxed variant).
- [SkeletonText](components/skeletons.md#skeletontext) — Skeleton text should be used where text elements like headings, paragraphs, or labels will be rendered.

## [Text](components/text.md)

- [Text](components/text.md#text) — Foundational typography primitive for custom text rendering when preset components (`Text1`–`Text10`) do not cover the need.
- [Text1](components/text.md#text1) — Small preset text level for compact supporting information and dense UI metadata.
- [Text2](components/text.md#text2) — Low-emphasis preset text level for secondary copy that remains more readable than compact metadata styles.
- [Text3](components/text.md#text3) — Baseline preset text level for standard body copy in most product interfaces.
- [Text4](components/text.md#text4) — Emphasized text preset for short content blocks that need more presence than standard body text.
- [Text5](components/text.md#text5) — High-emphasis text preset for section-leading copy and compact subheading use cases.
- [Text6](components/text.md#text6) — Heading-oriented preset for strong section titles and key interface messages.
- [Text7](components/text.md#text7) — Prominent heading preset for high-priority titles that need stronger visual impact than section headings.
- [Text8](components/text.md#text8) — Display-oriented preset for large headings in standout surfaces such as hero or campaign blocks.
- [Text9](components/text.md#text9) — Large display text preset for very prominent titles and high-impact messaging moments.
- [Text10](components/text.md#text10) — Top display typography level for the most prominent titles in exceptional, high-visibility contexts.
- [Title1](components/text.md#title1) — Compact overline-style section title for low-emphasis grouping labels, typically uppercase and secondary in tone.
- [Title2](components/text.md#title2) — Standard section heading level for dividing related content blocks with clear but balanced prominence.
- [Title3](components/text.md#title3) — High-emphasis section heading for prominent content groupings such as commercial or featured blocks.
- [Title4](components/text.md#title4) — Top title level for primary page or view headings when maximum hierarchy prominence is needed.
- [TextLink](components/text.md#textlink) — Use text link (or hyperlink) to create inline linkable text.
- [TextTimer](components/text.md#texttimer) — Use text timer for inline countdowns embedded in sentences or short blocks of copy.
- [Timer](components/text.md#timer) — Use timer for prominent countdown displays with segmented time units, optionally boxed for stronger visual emphasis.

## [Timeline](components/timeline.md)

- [Timeline](components/timeline.md#timeline) — The Timeline component is used to represent events in a chronological timeline. It can be used to visually and organizedly display processes,.
- [TimelineItem](components/timeline.md#timelineitem) — TimelineItem is a Mística component used to build consistent and accessible product interfaces.
- [Table](components/timeline.md#table) — Use table for structured row-and-column data, with responsive behavior for mobile scrolling or collapsed row cards.

## [Logo](components/logo.md)

- [Logo](components/logo.md#logo) — Logo renders the active brand mark from the current skin, supporting approved logo compositions and responsive sizing.
- [BlauLogo](components/logo.md#blaulogo) — BlauLogo renders the Blau brand mark with approved visual treatment and responsive sizing behavior.
- [EsimflagLogo](components/logo.md#esimflaglogo) — EsimflagLogo renders the Esimflag brand mark with approved visual treatment and responsive sizing behavior.
- [MovistarLogo](components/logo.md#movistarlogo) — MovistarLogo renders the Movistar brand mark with approved visual treatment and responsive sizing behavior.
- [MovistarNewLogo](components/logo.md#movistarnewlogo) — MovistarNewLogo renders the Movistar New brand mark with approved visual treatment and responsive sizing behavior.
- [O2Logo](components/logo.md#o2logo) — O2Logo renders the O2 brand mark with approved visual treatment and responsive sizing behavior.
- [O2NewLogo](components/logo.md#o2newlogo) — O2NewLogo renders the O2 New brand mark with approved visual treatment and responsive sizing behavior.
- [TelefonicaLogo](components/logo.md#telefonicalogo) — TelefonicaLogo renders the Telefónica brand mark with approved visual treatment and responsive sizing behavior.
- [TuLogo](components/logo.md#tulogo) — TuLogo renders the Tu brand mark with approved visual treatment and responsive sizing behavior.
- [VivoLogo](components/logo.md#vivologo) — VivoLogo renders the Vivo brand mark with approved visual treatment and responsive sizing behavior.

## [Utilities](components/utilities.md)

- [ThemeConfig](components/utilities.md#themeconfig) — ThemeConfig provides reusable behavior to keep component logic consistent across the product.
- [ThemeContext](components/utilities.md#themecontext) — ThemeContext provides reusable behavior to keep component logic consistent across the product.
- [ThemeContextProvider](components/utilities.md#themecontextprovider) — ThemeContextProvider provides reusable behavior to keep component logic consistent across the product.
- [ThemeVariant](components/utilities.md#themevariant) — Theme variant/context: Adjustments at the component level based on configuration.
- [TrackingConfig](components/utilities.md#trackingconfig) — TrackingConfig provides reusable behavior to keep component logic consistent across the product.
- [useTrackingConfig](components/utilities.md#usetrackingconfig) — useTrackingConfig provides reusable behavior to keep component logic consistent across the product.
- [OverscrollColorProvider](components/utilities.md#overscrollcolorprovider) — OverscrollColorProvider provides reusable behavior to keep component logic consistent across the product.
- [useSetOverscrollColor](components/utilities.md#usesetoverscrollcolor) — useSetOverscrollColor provides reusable behavior to keep component logic consistent across the product.
- [TopDistanceContext](components/utilities.md#topdistancecontext) — TopDistanceContext provides reusable behavior to keep component logic consistent across the product.
- [Overlay](components/utilities.md#overlay) — Overlay provides a full-viewport interaction layer behind temporary surfaces, enabling outside-click dismissal and optional body scroll lock.
- [FocusTrap](components/utilities.md#focustrap) — FocusTrap is a Mística component used to build consistent and accessible product interfaces.
- [Portal](components/utilities.md#portal) — Portal is a Mística component used to build consistent and accessible product interfaces.
- [applyAlpha](components/utilities.md#applyalpha) — applyAlpha is a Mística component used to build consistent and accessible product interfaces.
- [createNestableContext](components/utilities.md#createnestablecontext) — createNestableContext provides reusable behavior to keep component logic consistent across the product.
- [NestableContext](components/utilities.md#nestablecontext) — NestableContext provides reusable behavior to keep component logic consistent across the product.

## [Community](components/community.md)

- [AdvancedDataCard](components/community.md#advanceddatacard) — AdvancedDataCard is an extended data card that combines structured content (title hierarchy, description) with composable extra blocks, optional footer actions, and touchable behavior in a single card surface.
- [HighlightedValueBlock](components/community.md#highlightedvalueblock) — HighlightedValueBlock displays prominent numeric or text values with optional headline, pretitle, strikethrough pricing, and supporting descriptions. Designed to be used as an extra block inside AdvancedDataCard.
- [InformationBlock](components/community.md#informationblock) — InformationBlock presents a title and description alongside a right-aligned value with optional secondary strikethrough value. Designed to be used as an extra block inside AdvancedDataCard.
- [ProgressBlock](components/community.md#progressblock) — ProgressBlock combines a title, progress bar, heading value, and optional description in a single block. Designed to be used as an extra block inside AdvancedDataCard.
- [RowBlock](components/community.md#rowblock) — RowBlock displays a title with either a right-aligned description or a stacking group in a horizontal row layout. Designed to be used as an extra block inside AdvancedDataCard.
- [SimpleBlock](components/community.md#simpleblock) — SimpleBlock displays an image alongside a description with an optional right-aligned text. Designed to be used as an extra block inside AdvancedDataCard.
- [ValueBlock](components/community.md#valueblock) — ValueBlock displays a title with a large prominent value and optional description lines. Designed to be used as an extra block inside AdvancedDataCard.

## [Status Icons](components/status-icons.md)

- [IconChevron](components/status-icons.md#iconchevron)
- [IconError](components/status-icons.md#iconerror)
- [IconInfo](components/status-icons.md#iconinfo)
- [IconSuccess](components/status-icons.md#iconsuccess)
- [IconSuccessVivo](components/status-icons.md#iconsuccessvivo)
- [IconSuccessVivoNew](components/status-icons.md#iconsuccessvivonew)
