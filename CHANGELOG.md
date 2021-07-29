## [9.10.1](https://github.com/Telefonica/mistica-web/compare/v9.10.0...v9.10.1) (2021-07-29)


### Bug Fixes

* **Menu:** clear animation frame on effect ([bfa3f29](https://github.com/Telefonica/mistica-web/commit/bfa3f297fc40c134e4ab9524557ebed3128db8b3))

# [9.10.0](https://github.com/Telefonica/mistica-web/compare/v9.9.0...v9.10.0) (2021-07-23)


### Features

* **Components:** expose dataAttributes. Deprecation of `data-testid` and `data-qsysid` props ([#300](https://github.com/Telefonica/mistica-web/issues/300)) ([6584164](https://github.com/Telefonica/mistica-web/commit/658416480d268f6992a9c1e401ba6dbdd97ea533))
* **MasterDetailLayout:** new component. 6+4 and 4+6 GridLayout ([#301](https://github.com/Telefonica/mistica-web/issues/301)) ([039e47e](https://github.com/Telefonica/mistica-web/commit/039e47ef1993ff75ddc2e94aeff186d463d15eb0))
* **Stack:** Support `between`, `evenly` and `around` space ([#303](https://github.com/Telefonica/mistica-web/issues/303)) ([94bd7e3](https://github.com/Telefonica/mistica-web/commit/94bd7e3d0e5d9c9b20d594cb57826eabca937229))
* **webview bridge:** Upgrade webview-bridge ([#304](https://github.com/Telefonica/mistica-web/issues/304)) ([770ff1d](https://github.com/Telefonica/mistica-web/commit/770ff1d0f1d42d2076187d44f1cfdc3ca5e4bf62))

# [9.9.0](https://github.com/Telefonica/mistica-web/compare/v9.8.0...v9.9.0) (2021-07-13)


### Bug Fixes

* **FeedbackScreen:** avoid separation between background and fixed part ([2e21a79](https://github.com/Telefonica/mistica-web/commit/2e21a795955fe32d94681eb854bf1646daad3dc2))


### Features

* **Tabs:** Animate bottom line on tab change ([b8bed33](https://github.com/Telefonica/mistica-web/commit/b8bed3373605ec4861caed029e731795b75b7866))

# [9.8.0](https://github.com/Telefonica/mistica-web/compare/v9.7.0...v9.8.0) (2021-07-06)


### Features

* **FeedbackScreen:** unstable inlineInDesktop prop ([#297](https://github.com/Telefonica/mistica-web/issues/297)) ([1dfb8e8](https://github.com/Telefonica/mistica-web/commit/1dfb8e8a3ac996acfe3418cbbbd1f7f2454fc00d))

# [9.7.0](https://github.com/Telefonica/mistica-web/compare/v9.6.0...v9.7.0) (2021-07-05)


### Bug Fixes

* **ButtonLayout:** solve different issues where button text was truncated ([61b2d33](https://github.com/Telefonica/mistica-web/commit/61b2d33272d1bad435a7f27a5686dfaf2e4c13fb))
* **FeedbackScreen:** text animation ([#294](https://github.com/Telefonica/mistica-web/issues/294)) ([1bb3264](https://github.com/Telefonica/mistica-web/commit/1bb3264ad823aab4c00e3e7bc6df51160bd9d384))
* **Popover:** asset alignment ([#296](https://github.com/Telefonica/mistica-web/issues/296)) ([5657c8b](https://github.com/Telefonica/mistica-web/commit/5657c8bb99a6e1ebc0b53c650e6614c8f2479912))
* **types:** remove implicit children prop from some components ([#291](https://github.com/Telefonica/mistica-web/issues/291)) ([fd29b06](https://github.com/Telefonica/mistica-web/commit/fd29b06adb83c53b8333bd0e547bf06548b637c7))


### Features

* **Icons:** Update mistica icons ([7186574](https://github.com/Telefonica/mistica-web/commit/718657498659f42b20dfcf2db08aed558470aa4f))

# [9.6.0](https://github.com/Telefonica/mistica-web/compare/v9.5.1...v9.6.0) (2021-06-25)


### Bug Fixes

* **ButtonFixedFooterLayout:** align footer buttons in desktop ([#286](https://github.com/Telefonica/mistica-web/issues/286)) ([d7c1445](https://github.com/Telefonica/mistica-web/commit/d7c1445e389c81ba9e614bd50533f6193b7826d8))
* **CreditCardExpirationField:** show mandatory message when empty ([#287](https://github.com/Telefonica/mistica-web/issues/287)) ([ed6fb2d](https://github.com/Telefonica/mistica-web/commit/ed6fb2dac3ad0d788da5daf5fbd62ba83c9ad598))
* **Text:** reset textDecoration when switching back to undefined ([#288](https://github.com/Telefonica/mistica-web/issues/288)) ([341188b](https://github.com/Telefonica/mistica-web/commit/341188b49630a74c7a19b0f35a4198cfa139402b))


### Features

* **Callout:** new component ([#290](https://github.com/Telefonica/mistica-web/issues/290)) ([63e464d](https://github.com/Telefonica/mistica-web/commit/63e464d8e79991f60a283cb89e31ad7b942fe276))

## [9.5.1](https://github.com/Telefonica/mistica-web/compare/v9.5.0...v9.5.1) (2021-06-16)


### Bug Fixes

* **PhoneNumberField:** propagate inputProps ([#285](https://github.com/Telefonica/mistica-web/issues/285)) ([11460ff](https://github.com/Telefonica/mistica-web/commit/11460ff642b919855f96984e5a2c32a5809be365))

# [9.5.0](https://github.com/Telefonica/mistica-web/compare/v9.4.1...v9.5.0) (2021-06-16)


### Bug Fixes

* **HeaderLayout:** remove right padding from extra ([#283](https://github.com/Telefonica/mistica-web/issues/283)) ([450686f](https://github.com/Telefonica/mistica-web/commit/450686f5d3b5a92128df7d48ed766e5d422a45a0))


### Features

* **List:** Add divider to last row ([2f85bc3](https://github.com/Telefonica/mistica-web/commit/2f85bc36648be1bb2c8e3a76c9d6f3f09859530b))
* **PhoneNumberField:** Improve formatting with prefix. Add e164 prop to get E164 formated numbers in onChangeValue event ([f7506bb](https://github.com/Telefonica/mistica-web/commit/f7506bb0696f41289e762baad7d3d1f529d8c242))
* **Rows,Cards:** change title font weight from light to regular ([8d4c520](https://github.com/Telefonica/mistica-web/commit/8d4c520651bc50d18ff9fa95f569c01f74c02dca))

## [9.4.1](https://github.com/Telefonica/mistica-web/compare/v9.4.0...v9.4.1) (2021-06-07)


### Bug Fixes

* **LICENSE:** add license and fix some urls. ([#279](https://github.com/Telefonica/mistica-web/issues/279)) ([0234204](https://github.com/Telefonica/mistica-web/commit/023420493ed10bf0ecc83020f45104c39baf0d26))

# [9.4.0](https://github.com/Telefonica/mistica-web/compare/v9.3.1...v9.4.0) (2021-06-07)


### Features

* Make @telefonica/mistica npm package public ([2b57384](https://github.com/Telefonica/mistica-web/commit/2b57384e355191ebc03a1d6125804a9c346fd8b4))
* **Dependencies:** Upgrade dependencies, support storybook args, fix issue in phone number input formatting ([9515969](https://github.com/Telefonica/mistica-web/commit/9515969c7ecf3934962794ec2e3a82a92a86ee3e))
* **Menu:** New Menu component. To be used as base component to build menu-like components ([e0d413d](https://github.com/Telefonica/mistica-web/commit/e0d413dd7f11397f8e64b67e7b324e4fd54c87d9))
* **Telefonica skin:** new skin for Telefonica brand ([#266](https://github.com/Telefonica/mistica-web/issues/266)) ([339fecd](https://github.com/Telefonica/mistica-web/commit/339fecd1f2c23dcfe8d686590083e51a02763f9b))

## [9.3.1](https://github.com/Telefonica/mistica-web/compare/v9.3.0...v9.3.1) (2021-06-03)


### Bug Fixes

* **ProgressBar:** wrong color in classic O2 ([#275](https://github.com/Telefonica/mistica-web/issues/275)) ([e5221a6](https://github.com/Telefonica/mistica-web/commit/e5221a64e633983b14923b5679a833a93c0c154c))
* **Row, BoxedRow:** prevent hover effect bug in touch devices ([#273](https://github.com/Telefonica/mistica-web/issues/273)) ([3b7b84c](https://github.com/Telefonica/mistica-web/commit/3b7b84c52e23f435fc3472a913f70ce3bb7b09a6))

# [9.3.0](https://github.com/Telefonica/mistica-web/compare/v9.2.0...v9.3.0) (2021-05-31)


### Bug Fixes

* **Accessibility:** solve all accessibility issues and make CI fails when new issues are detected ([ec52ebc](https://github.com/Telefonica/mistica-web/commit/ec52ebcd2ebc3b2c04f72a78ec834ee42f8569b4))
* **Dialog:** wait until animation ends to allow closing by clicking outside ([10aec42](https://github.com/Telefonica/mistica-web/commit/10aec428412c4a1ed9bdff02fdde27a880288b7b))
* **IbanField:** repeated characters in Android with Gboard ([#264](https://github.com/Telefonica/mistica-web/issues/264)) ([7039e5c](https://github.com/Telefonica/mistica-web/commit/7039e5cbecd94d8f84ea25e9eefc0c0ec1f0f88a))


### Features

* **BoxedRow:** add isInverse prop ([#265](https://github.com/Telefonica/mistica-web/issues/265)) ([f563fd0](https://github.com/Telefonica/mistica-web/commit/f563fd0380b34fe280b05b23a97792e76e93533c))
* **EmptyStateCard, EmptyStateScreen:** new components ([#261](https://github.com/Telefonica/mistica-web/issues/261)) ([a71c144](https://github.com/Telefonica/mistica-web/commit/a71c14463f375f87f8cebe416734d1fba2c99d88))
* **Iconst:** Update Mistica Icons ([#268](https://github.com/Telefonica/mistica-web/issues/268)) ([092aa18](https://github.com/Telefonica/mistica-web/commit/092aa187a11a54e17675e3ae5fe01e88d912f8d4))

# [9.2.0](https://github.com/Telefonica/mistica-web/compare/v9.1.0...v9.2.0) (2021-05-19)


### Bug Fixes

* **DataCard:** remove extra top padding in cards without title ([#260](https://github.com/Telefonica/mistica-web/issues/260)) ([e8ac437](https://github.com/Telefonica/mistica-web/commit/e8ac437623dddab707ac98b02160cc636cbe50c9))


### Features

* **Icons:** Update Mistica icons ([#257](https://github.com/Telefonica/mistica-web/issues/257)) ([35d811b](https://github.com/Telefonica/mistica-web/commit/35d811b36cf72e25747be249f1bc6a71e95ba606))
* **Portal:** expose portal nodes via hook ([#256](https://github.com/Telefonica/mistica-web/issues/256)) ([54f7b02](https://github.com/Telefonica/mistica-web/commit/54f7b023cf81da96bd03fe68d17c730a272bc70e))

# [9.1.0](https://github.com/Telefonica/mistica-web/compare/v9.0.0...v9.1.0) (2021-05-07)


### Bug Fixes

* **colors:** make movistar prominent dark equal to movistar dark ([#254](https://github.com/Telefonica/mistica-web/issues/254)) ([ad94996](https://github.com/Telefonica/mistica-web/commit/ad949961cea98aa2882c5f4388070a091be5973d))
* **Tag:** text color inside inverse context (like headers) ([#251](https://github.com/Telefonica/mistica-web/issues/251)) ([91dcdf1](https://github.com/Telefonica/mistica-web/commit/91dcdf1da1e6b5046b370eeb48f86f9997d89de2))
* **TextField:** Add ellipsis to long TextField labels ([#252](https://github.com/Telefonica/mistica-web/issues/252)) ([0d9a420](https://github.com/Telefonica/mistica-web/commit/0d9a420e15b3ad825796f15d524f6753b0c69058))


### Features

* **IbanField:** new input field for IBAN numbers ([#253](https://github.com/Telefonica/mistica-web/issues/253)) ([b81c57f](https://github.com/Telefonica/mistica-web/commit/b81c57fff00223317183d9c8de78f694f8452111))

# [9.0.0](https://github.com/Telefonica/mistica-web/compare/v8.7.4...v9.0.0) (2021-04-28)


### Features

* **SectionTitle:** allow to have a link ([#250](https://github.com/Telefonica/mistica-web/issues/250)) ([040ee09](https://github.com/Telefonica/mistica-web/commit/040ee090df45cbf73084e855dda500196ad8f793))


### BREAKING CHANGES

* **SectionTitle:** The `SectionTitle` paddings have been removed

## [8.7.4](https://github.com/Telefonica/mistica-web/compare/v8.7.3...v8.7.4) (2021-04-27)


### Bug Fixes

* **colors:** some wrong o2 classic colors in dark mode ([#249](https://github.com/Telefonica/mistica-web/issues/249)) ([9b96da4](https://github.com/Telefonica/mistica-web/commit/9b96da492177109dfe4f374c0e13403705526939))

## [8.7.3](https://github.com/Telefonica/mistica-web/compare/v8.7.2...v8.7.3) (2021-04-27)


### Bug Fixes

* **NestableContext:** Allow multiple NestableContext instances. Show warning instead of throwing. ([#248](https://github.com/Telefonica/mistica-web/issues/248)) ([f243ec2](https://github.com/Telefonica/mistica-web/commit/f243ec2ea9f483c612f3e6d09f6f21dd8bd43fc1))

## [8.7.2](https://github.com/Telefonica/mistica-web/compare/v8.7.1...v8.7.2) (2021-04-26)


### Bug Fixes

* **TabFocus:** warn instead of throw when already mounted ([#247](https://github.com/Telefonica/mistica-web/issues/247)) ([362ed2b](https://github.com/Telefonica/mistica-web/commit/362ed2b368428d437ab94bb34a5d877e94d1cd8d))

## [8.7.1](https://github.com/Telefonica/mistica-web/compare/v8.7.0...v8.7.1) (2021-04-26)


### Bug Fixes

* **dark mode colors:** change neutralHigh to grey2 ([#245](https://github.com/Telefonica/mistica-web/issues/245)) ([32ccb13](https://github.com/Telefonica/mistica-web/commit/32ccb13ddf99d28ac4288590195db1cd648d1da8))

# [8.7.0](https://github.com/Telefonica/mistica-web/compare/v8.6.0...v8.7.0) (2021-04-23)


### Bug Fixes

* **Radio:** Improve radio styles on dark mode ([#246](https://github.com/Telefonica/mistica-web/issues/246)) ([f1737ff](https://github.com/Telefonica/mistica-web/commit/f1737ffb0433dec8ba2213f874a3f90c82554a0d))
* **TabFocus:** Avoid nested instances in playroom ([#243](https://github.com/Telefonica/mistica-web/issues/243)) ([38aefb8](https://github.com/Telefonica/mistica-web/commit/38aefb84588d3b21b81bcb15f49320a397b7c043))


### Features

* **Checkbox, Radio:** Square checkbox for iOS and animations for checkbox and radios ([#240](https://github.com/Telefonica/mistica-web/issues/240)) ([6b3ba04](https://github.com/Telefonica/mistica-web/commit/6b3ba04d9a9aa645db9c73a60b6243967acc6f7a))
* **TabFocus:** Add TabFocus to mistica provider (disabled by default) ([45df443](https://github.com/Telefonica/mistica-web/commit/45df443e09923199760fb556c767da90ac5c6f84))

# [8.6.0](https://github.com/Telefonica/mistica-web/compare/v8.5.1...v8.6.0) (2021-04-19)


### Bug Fixes

* **Select:** fix problem in Select component styles ([c5d04c8](https://github.com/Telefonica/mistica-web/commit/c5d04c8bb866548a00d7245ade7bcffa89ad88a0))
* **TextField:** reset chrome autocomplete styles ([#238](https://github.com/Telefonica/mistica-web/issues/238)) ([a173665](https://github.com/Telefonica/mistica-web/commit/a1736654d4f323683d0a15dd0b1207ef70477d3d))


### Features

* **DataCard, MediaCard:** allow tags of any color ([#241](https://github.com/Telefonica/mistica-web/issues/241)) ([50d12a0](https://github.com/Telefonica/mistica-web/commit/50d12a02e1f1f5b5345dbdd06bf64c3a6ae35631))

## [8.5.1](https://github.com/Telefonica/mistica-web/compare/v8.5.0...v8.5.1) (2021-04-13)


### Bug Fixes

* **DialogRoot:** avoid possible re-mounts when showing a dialog ([#236](https://github.com/Telefonica/mistica-web/issues/236)) ([89f7459](https://github.com/Telefonica/mistica-web/commit/89f7459aae089440147ebe5e0ab076c21dd1a991))

# [8.5.0](https://github.com/Telefonica/mistica-web/compare/v8.4.1...v8.5.0) (2021-04-13)


### Bug Fixes

* **Checkbox:** dark mode color ([#233](https://github.com/Telefonica/mistica-web/issues/233)) ([8a38796](https://github.com/Telefonica/mistica-web/commit/8a38796bca57ce85bdc56e65495f26534cb1c1d9))
* **dark mode:** some color fixes ([#234](https://github.com/Telefonica/mistica-web/issues/234)) ([545745f](https://github.com/Telefonica/mistica-web/commit/545745fbd92f7f91c2949d92a4cd66fe01c82ef5))


### Features

* **Divider:** Add snippet to playroom ([07ffbee](https://github.com/Telefonica/mistica-web/commit/07ffbee083b941bbb5dc7f650e689cb1dda5b8e1))

## [8.4.1](https://github.com/Telefonica/mistica-web/compare/v8.4.0...v8.4.1) (2021-04-12)


### Bug Fixes

* **IconSuccessVivo:** vivinho in dark mode ([#232](https://github.com/Telefonica/mistica-web/issues/232)) ([4d53bbd](https://github.com/Telefonica/mistica-web/commit/4d53bbde6a14c635c2e334599b5387231123f185))

# [8.4.0](https://github.com/Telefonica/mistica-web/compare/v8.3.0...v8.4.0) (2021-04-12)


### Features

* **Dark mode:** Dark mode support ([#218](https://github.com/Telefonica/mistica-web/issues/218)) ([78c82bc](https://github.com/Telefonica/mistica-web/commit/78c82bc90a54f92c05051ae2f9e87d79039c7502))

# [8.3.0](https://github.com/Telefonica/mistica-web/compare/v8.2.3...v8.3.0) (2021-04-09)


### Bug Fixes

* **DoubleField:** Adjust styles for small devices ([#228](https://github.com/Telefonica/mistica-web/issues/228)) ([dac53b5](https://github.com/Telefonica/mistica-web/commit/dac53b59f0f0c5d470c10d17456449eae1299a7c))
* **List:** Remove default text truncation (this feature is still available via props). This improves a11y ([f3c3b10](https://github.com/Telefonica/mistica-web/commit/f3c3b10d0a9c34c6db72366ef8e4094bb094ead9))


### Features

* **Boxed:** New Boxed component ([#229](https://github.com/Telefonica/mistica-web/issues/229)) ([8c25c6b](https://github.com/Telefonica/mistica-web/commit/8c25c6b3c8ff1efa509c462ad298113553f7bad0))
* **Divider:** New Divider component ([25df32f](https://github.com/Telefonica/mistica-web/commit/25df32fdb7ed098acafea8453a963028e052faee))

## [8.2.3](https://github.com/Telefonica/mistica-web/compare/v8.2.2...v8.2.3) (2021-04-05)


### Bug Fixes

* **Header:** Do not truncate texts by default ([#225](https://github.com/Telefonica/mistica-web/issues/225)) ([f80a78e](https://github.com/Telefonica/mistica-web/commit/f80a78ed78c008fe810fa4f51580546f03bc0c17))
* **useElementDimensions:** improve hook to avoid reflows ([bc647e0](https://github.com/Telefonica/mistica-web/commit/bc647e0d7c53118258561506cf9421055d8f5783))

## [8.2.2](https://github.com/Telefonica/mistica-web/compare/v8.2.1...v8.2.2) (2021-03-30)


### Bug Fixes

* **LoadingBar:** Update Movistar colors and remove inverse mode ([#224](https://github.com/Telefonica/mistica-web/issues/224)) ([b098b60](https://github.com/Telefonica/mistica-web/commit/b098b6069ab1ef6bf3f318b9286362541e9c8355))

## [8.2.1](https://github.com/Telefonica/mistica-web/compare/v8.2.0...v8.2.1) (2021-03-30)


### Bug Fixes

* **color:** change textSecondaryInverse to white ([#217](https://github.com/Telefonica/mistica-web/issues/217)) ([71d31e4](https://github.com/Telefonica/mistica-web/commit/71d31e48ee2f48312173fd40d73b31ad106121e3))
* **Dialogs:** Make DialogRoot work with multiple react trees ([#216](https://github.com/Telefonica/mistica-web/issues/216)) ([eca9589](https://github.com/Telefonica/mistica-web/commit/eca95891cef2755e427e970b6ec48b8aff41f158))

# [8.2.0](https://github.com/Telefonica/mistica-web/compare/v8.1.0...v8.2.0) (2021-03-11)


### Features

* **size-stats:** remove CI check for size-stats.json ([d8c68c7](https://github.com/Telefonica/mistica-web/commit/d8c68c777a6cd489ac03b1ea5cf7d768fed46ad9))

# [8.1.0](https://github.com/Telefonica/mistica-web/compare/v8.0.0...v8.1.0) (2021-03-11)


### Features

* **Tag:** new component replacing PromoTag ([#215](https://github.com/Telefonica/mistica-web/issues/215)) ([f3fe284](https://github.com/Telefonica/mistica-web/commit/f3fe2840dcc81ae96620549e58eb81497e585760))


### Reverts

* chore(release): 8.0.0 [skip ci] ([dc80676](https://github.com/Telefonica/mistica-web/commit/dc8067623c0c3cf82b3893d4308a3e2ce2b40f97))

# [7.11.0](https://github.com/Telefonica/mistica-web/compare/v7.10.1...v7.11.0) (2021-03-10)


### Bug Fixes

* **Button:** fix accessibility of loading text ([cb3be00](https://github.com/Telefonica/mistica-web/commit/cb3be001ef81de9825d17a1cd9310c61dffc0a38))
* **NavigationBreadcrumbs:** text size fixes ([64cab0a](https://github.com/Telefonica/mistica-web/commit/64cab0a578be27b5be21a00c0b51235acaebcba3))


### Features

* **Controls:** Read `disable` state from `Form` context in Checkbox, Switch and RadioButton. ([#210](https://github.com/Telefonica/mistica-web/issues/210)) ([6f3df3c](https://github.com/Telefonica/mistica-web/commit/6f3df3c9e7a2908057294c9b5df5220abdb60c87))
* **Form:** Use scrollIntoView to scroll to field with error ([#211](https://github.com/Telefonica/mistica-web/issues/211)) ([6c25bde](https://github.com/Telefonica/mistica-web/commit/6c25bde127b668a316687bf95f829e62c204a2e6))
* **I18N:** default translations for supported locales ([#204](https://github.com/Telefonica/mistica-web/issues/204)) ([5f9f473](https://github.com/Telefonica/mistica-web/commit/5f9f4739e234fe9a493e7d3679dfbe89311e02ed))
* **ProgresBar:** new component ([#206](https://github.com/Telefonica/mistica-web/issues/206)) ([2a4af9e](https://github.com/Telefonica/mistica-web/commit/2a4af9edbc82791ce9042ac47544db67a9bde5f5))
* **PromoTag, Button:** prevent grow in desktop ([6b7d556](https://github.com/Telefonica/mistica-web/commit/6b7d5569a3e18c0760bd31f9f14fab9a5732e090))

## [7.10.1](https://github.com/Telefonica/mistica-web/compare/v7.10.0...v7.10.1) (2021-02-11)


### Bug Fixes

* **size-stats:** include correct size stats ([70d45d5](https://github.com/Telefonica/mistica-web/commit/70d45d51ff53bdaf05407fad3288030e58d3668b))

# [7.10.0](https://github.com/Telefonica/mistica-web/compare/v7.9.1...v7.10.0) (2021-02-11)


### Bug Fixes

* **Snackbar:** avoid calling bridge if snackbar re-renders ([#195](https://github.com/Telefonica/mistica-web/issues/195)) ([1a6f856](https://github.com/Telefonica/mistica-web/commit/1a6f856326b14c7bde26312e3844dd75044ae571))


### Features

* **PreviewTools:** allow forcing mobile view ([#197](https://github.com/Telefonica/mistica-web/issues/197)) ([936307d](https://github.com/Telefonica/mistica-web/commit/936307d61649f3aef61bac7c82e5f79ba704b5f9))
* **RadioGroup:** add disabled state ([#199](https://github.com/Telefonica/mistica-web/issues/199)) ([186eafd](https://github.com/Telefonica/mistica-web/commit/186eafd8eca5c2c718ca78b6df81b51a4097e759))
* **useElementDimensions,Tooltip,useElementSize:** Expose useElementDimensions hook. Deprecate Tooltip component and useElementSize hook [#196](https://github.com/Telefonica/mistica-web/issues/196) ([e7eba55](https://github.com/Telefonica/mistica-web/commit/e7eba55af9c3dfa6776cffd266b6a3c9d7b3a0e5))

## [7.9.1](https://github.com/Telefonica/mistica-web/compare/v7.8.3...v7.9.1) (2021-02-08)


### Bug Fixes

* **ButtonLink:** ellipsis ([#188](https://github.com/Telefonica/mistica-web/issues/188)) ([daf4e9c](https://github.com/Telefonica/mistica-web/commit/daf4e9c1df3c72f2552ca32c8d5051d966e74549))
* **MediaCard:** border around the whole card. `pretitle` uppercase ([05f4ff5](https://github.com/Telefonica/mistica-web/commit/05f4ff525b02bb65625abab52228b454955df77e))
* **PhoneNumberField:** caret position moves to the end while editing ([b1c24f9](https://github.com/Telefonica/mistica-web/commit/b1c24f971f13f68d75ab437a23dcb86b6dbfa33e))
* **PreviewTools:** theme overrides should affect global variables ([#190](https://github.com/Telefonica/mistica-web/issues/190)) ([bef04bd](https://github.com/Telefonica/mistica-web/commit/bef04bd5437e18dc151880e8f259dc4e98e088e3))


### Features

* **Circle:** to be used with icons inside DataCard of list rows ([#189](https://github.com/Telefonica/mistica-web/issues/189)) ([e913385](https://github.com/Telefonica/mistica-web/commit/e9133851634f69b730b22eec28064aa88133a9ee))
* **Icons:** Update mistica-icons collection ([#186](https://github.com/Telefonica/mistica-web/issues/186)) ([78f9b19](https://github.com/Telefonica/mistica-web/commit/78f9b191574fe40ed801e107326bed95d0fe7274))
* **MediaCard,DataCard:** new card components ([#185](https://github.com/Telefonica/mistica-web/issues/185)) ([67da8bb](https://github.com/Telefonica/mistica-web/commit/67da8bba3529e49f5bf5ec6d1827b9e3f5499e34))
* **Stepper:** New Stepper component ([#180](https://github.com/Telefonica/mistica-web/issues/180)) ([66cb7ba](https://github.com/Telefonica/mistica-web/commit/66cb7ba070d16f9be15667257e63dca6baad6522))

## [7.8.3](https://github.com/Telefonica/mistica-web/compare/v7.8.2...v7.8.3) (2021-01-25)


### Bug Fixes

* **FixedFooter:** set zIndex in mobile layout ([#183](https://github.com/Telefonica/mistica-web/issues/183)) ([ac96e43](https://github.com/Telefonica/mistica-web/commit/ac96e43fea31b09515fb1c2e70df315741a078fc))

## [7.8.2](https://github.com/Telefonica/mistica-web/compare/v7.8.1...v7.8.2) (2021-01-25)


### Bug Fixes

* **FixedFooter:** higher z-index to fixed footer ([#182](https://github.com/Telefonica/mistica-web/issues/182)) ([4199ef1](https://github.com/Telefonica/mistica-web/commit/4199ef1d00a35610495ea707b60df2894538b44c))

## [7.8.1](https://github.com/Telefonica/mistica-web/compare/v7.8.0...v7.8.1) (2021-01-19)


### Bug Fixes

* **Accesibility:** Various fixes after implementing accessibility improvements ([#181](https://github.com/Telefonica/mistica-web/issues/181)) ([75f492e](https://github.com/Telefonica/mistica-web/commit/75f492e945072a75c03eff0aa3c2c73a731bf442))

# [7.8.0](https://github.com/Telefonica/mistica-web/compare/v7.7.1...v7.8.0) (2021-01-13)


### Features

* **Accessibility:** font scaling for Text. Refactored Tabs, Buttons and Feedbacks to support font scaling ([#178](https://github.com/Telefonica/mistica-web/issues/178)) ([68f1752](https://github.com/Telefonica/mistica-web/commit/68f17520089055e5ec686c5b744f8f3dc8238855))

## [7.7.1](https://github.com/Telefonica/mistica-web/compare/v7.7.0...v7.7.1) (2021-01-04)


### Bug Fixes

* **List:** improve type definitions ([#177](https://github.com/Telefonica/mistica-web/issues/177)) ([f69de57](https://github.com/Telefonica/mistica-web/commit/f69de5768feb5aef1fa22955ed1df0c8ab82e439))
* **Tabs:** Tabs with icon bug with color states ([#176](https://github.com/Telefonica/mistica-web/issues/176)) ([8faa7fb](https://github.com/Telefonica/mistica-web/commit/8faa7fb995843812954f6ffc7ef12acfefa47f6a))
* **VSCode:** high CPU usage caused by typescript.tsserver.experimental.enableProjectDiagnostics ([#179](https://github.com/Telefonica/mistica-web/issues/179)) ([2b65fd0](https://github.com/Telefonica/mistica-web/commit/2b65fd0e2099b562c011dab22a245de02f90f666))

# [7.7.0](https://github.com/Telefonica/mistica-web/compare/v7.6.0...v7.7.0) (2020-12-21)


### Bug Fixes

* **Form,Select:** Focus first element with error on submit validation. Improvements and fixes in Select component. Select label is now mandatory. ([#175](https://github.com/Telefonica/mistica-web/issues/175)) ([fef5e7a](https://github.com/Telefonica/mistica-web/commit/fef5e7af3ff08d32e1da0cdad1e48b755266359f))
* **Skins:** wrong backgroundPromo color in classicO2 ([#174](https://github.com/Telefonica/mistica-web/issues/174)) ([f7f8bf4](https://github.com/Telefonica/mistica-web/commit/f7f8bf4a48354b6fbd59d97c019a01470ea1fbb0))
* **Text:** added margin reset in text component ([#173](https://github.com/Telefonica/mistica-web/issues/173)) ([2f306fc](https://github.com/Telefonica/mistica-web/commit/2f306fcc57a2b102e9862ada55f2fed61d56f8a6))


### Features

* **AuditAccessibility:** github action to audit accessibility using axe and storybook ([#172](https://github.com/Telefonica/mistica-web/issues/172)) ([4c2efcd](https://github.com/Telefonica/mistica-web/commit/4c2efcd7c8d74c11c8c98ef8cdcdbae2fda01833))
* **Playroom:** changed playroom copies to English ([#167](https://github.com/Telefonica/mistica-web/issues/167)) ([370a20e](https://github.com/Telefonica/mistica-web/commit/370a20e5952711855fc1153f095777715fcd008f))
* **Popover:** Minor improvements with short texts and long strings. ([#170](https://github.com/Telefonica/mistica-web/issues/170)) ([285dd9d](https://github.com/Telefonica/mistica-web/commit/285dd9d641e7078a7f7a72e184e3f7c17cfab51a))
* **Switch:** change size in ios variant and color in ios classicO2 ([#169](https://github.com/Telefonica/mistica-web/issues/169)) ([1e5e509](https://github.com/Telefonica/mistica-web/commit/1e5e509d69483e1a525da8da5864ed0154863913))

# [7.6.0](https://github.com/Telefonica/mistica-web/compare/v7.5.0...v7.6.0) (2020-12-03)


### Bug Fixes

* **List,Checkbox:** problem using checkbox control inside a list row ([#161](https://github.com/Telefonica/mistica-web/issues/161)) ([a43c388](https://github.com/Telefonica/mistica-web/commit/a43c388a34cc6cdf1e1e5fad2ec433ba56134862))
* **TextField:** multi line line-height ([a8bc879](https://github.com/Telefonica/mistica-web/commit/a8bc879aff931d99485c768744f3b639f01be7b1))


### Features

* **DateField,DateTimeField:** support max/min props and automatic range validation ([#162](https://github.com/Telefonica/mistica-web/issues/162)) ([50f50be](https://github.com/Telefonica/mistica-web/commit/50f50be7a53218630c1f6fda43b64d076b54beec))
* **IconError:** update feedback error icon animation ([#164](https://github.com/Telefonica/mistica-web/issues/164)) ([feef4ec](https://github.com/Telefonica/mistica-web/commit/feef4ecca26cded1669d93810e9a2ad5f3f9f893))
* **Icons:** update mistica-icons collection ([#166](https://github.com/Telefonica/mistica-web/issues/166)) ([8b5758a](https://github.com/Telefonica/mistica-web/commit/8b5758a6cf558b27ae5864ba0cc08e0d39807f33))
* **PromoTag:** add snippet to playroom ([#165](https://github.com/Telefonica/mistica-web/issues/165)) ([04410b9](https://github.com/Telefonica/mistica-web/commit/04410b9e96f0b59c5b05eebf2ea02dc523f3294b))

# [7.5.0](https://github.com/Telefonica/mistica-web/compare/v7.4.2...v7.5.0) (2020-11-26)


### Features

* **Form:** new onValidationErrors listener ([57c79c3](https://github.com/Telefonica/mistica-web/commit/57c79c3123d3d534dc0414cd961c8d407d1bb422))

## [7.4.2](https://github.com/Telefonica/mistica-web/compare/v7.4.1...v7.4.2) (2020-11-24)


### Bug Fixes

* **RadioButton, Checkbox, Inline:** Various fixes in RadioButton and Checkbox. Inline component uses `inline-flex` as default display. ([#159](https://github.com/Telefonica/mistica-web/pull/159))
* **GridLayout:** remove row gap ([#158](https://github.com/Telefonica/mistica-web/issues/158)) ([48dd29c](https://github.com/Telefonica/mistica-web/commit/48dd29c4453dbb11a16874c3f182a33e435a9d49))

## [7.4.1](https://github.com/Telefonica/mistica-web/compare/v7.4.0...v7.4.1) (2020-11-19)


### Bug Fixes

* **Checkbox:** fix Flow type definitions ([#156](https://github.com/Telefonica/mistica-web/issues/156)) ([45258f9](https://github.com/Telefonica/mistica-web/commit/45258f94106f8593447c29964439dbe8477cc0ed))

# [7.4.0](https://github.com/Telefonica/mistica-web/compare/v7.3.0...v7.4.0) (2020-11-19)


### Bug Fixes

* **Button story:** fix some styles in buttons story ([56b2774](https://github.com/Telefonica/mistica-web/commit/56b277434353045f96fcc8659bab974589840e0a))
* **PreviewTools:** some style improvements in playroom preview tools ([ebbc329](https://github.com/Telefonica/mistica-web/commit/ebbc32957f8715612f5c6946618c86054907c65f))


### Features

* **RowList:** allow use Rows with controls inside Forms ([#154](https://github.com/Telefonica/mistica-web/issues/154)) ([4ac6cf1](https://github.com/Telefonica/mistica-web/commit/4ac6cf11edb2692df59feebdb664e7b5a163cd5b))
* **TextField:** include more autocomplete options ([aceac35](https://github.com/Telefonica/mistica-web/commit/aceac356fbe41599df3b5ad9be5493f7c5824a42))

# [7.3.0](https://github.com/Telefonica/mistica-web/compare/v7.2.1...v7.3.0) (2020-11-16)


### Bug Fixes

* **Form:** allow using submit buttons in Portals ([499e76d](https://github.com/Telefonica/mistica-web/commit/499e76d2e074eda2533accba222e6661dfc1c47a))


### Features

* **Stack,Box:** allow space of 72 and 80px ([#149](https://github.com/Telefonica/mistica-web/issues/149)) ([5a9ef44](https://github.com/Telefonica/mistica-web/commit/5a9ef44ef275eae855a4693fbb5b635f79cce212))

## [7.2.1](https://github.com/Telefonica/mistica-web/compare/v7.2.0...v7.2.1) (2020-11-13)


### Bug Fixes

* **FixedFooterLayout:** use a Portal to render the fixed footer in mobile ([1aa12ae](https://github.com/Telefonica/mistica-web/commit/1aa12ae36960b16aea80c1716a4adadae3a07c06))

# [7.2.0](https://github.com/Telefonica/mistica-web/compare/v7.1.1...v7.2.0) (2020-11-12)


### Bug Fixes

* **Playroom:** update icons in tabs snippet ([7b9f2f8](https://github.com/Telefonica/mistica-web/commit/7b9f2f8ead45a27806399602024ac75afb73a62b))


### Features

* **BoxedRow:** allow to select max lines count in title, subtitle and description ([af0a6da](https://github.com/Telefonica/mistica-web/commit/af0a6dacc380b28d64a26d22935ae833a42bcc8f))
* **HighlightedCard:** Allow to use ButtonLink in HighlightedCard ([58c3822](https://github.com/Telefonica/mistica-web/commit/58c38223b51dd445531fd3a7c3eb64a4bac2d93d))
* **PreviewTools:** playroom component to allow change theme ([d2b020a](https://github.com/Telefonica/mistica-web/commit/d2b020a1c51d100eabdedd29e0237984e5ab5318))

## [7.1.1](https://github.com/Telefonica/mistica-web/compare/v7.1.0...v7.1.1) (2020-11-05)


### Bug Fixes

* **DateTimePicker:** format time in 24H ([#143](https://github.com/Telefonica/mistica-web/issues/143)) ([2413c16](https://github.com/Telefonica/mistica-web/commit/2413c161ba28ce6087a59c0f3abe297977b00aae))

# [7.1.0](https://github.com/Telefonica/mistica-web/compare/v7.0.2...v7.1.0) (2020-11-05)


### Bug Fixes

* **header-story:** translate texts to english ([48f0b22](https://github.com/Telefonica/mistica-web/commit/48f0b22104be72db2c7bee42e609d981b61bb9fa))


### Features

* **ButtonLink:** Remove min width ([0915ba9](https://github.com/Telefonica/mistica-web/commit/0915ba9b5fddf58bb6abe5e78e95c58a6b445340))
* **Dependencies:** upgrade dependencies: typescript, storybook, playroom, babel and more ([#141](https://github.com/Telefonica/mistica-web/issues/141)) ([4b8ce40](https://github.com/Telefonica/mistica-web/commit/4b8ce407845d2e66e14c67910600bb458f3a9817))

## [7.0.2](https://github.com/Telefonica/mistica-web/compare/v7.0.1...v7.0.2) (2020-10-27)


### Bug Fixes

* **HighlightedCard:** desktop paddings ([0a8b9bd](https://github.com/Telefonica/mistica-web/commit/0a8b9bde50ad0a1e0f475af2950da926fa90906c))

## [7.0.1](https://github.com/Telefonica/mistica-web/compare/v7.0.0...v7.0.1) (2020-10-22)


### Bug Fixes

* **Text:** improve truncate related styles ([27841c2](https://github.com/Telefonica/mistica-web/commit/27841c24d5b816f97f70ec9f3c56f4e0ebf1fb8a))

# [7.0.0](https://github.com/Telefonica/mistica-web/compare/v6.7.0...v7.0.0) (2020-10-21)


### Features

* **Controls:** Switch, Checkbox, Radio Buttons. Renamed FormXxxFields to XxxFields ([0119724](https://github.com/Telefonica/mistica-web/commit/011972491ee7dffa95d0b3249112764c7f7a18ae))
* **ThemeContext:** Refactor skins and colors ([278c073](https://github.com/Telefonica/mistica-web/commit/278c0733d22e6c6533d7f5cfb2049c8873c3f7f9))


### BREAKING CHANGES

* **Controls:** renamed FormXxxFields to XxxFields
* **ThemeContext:** theme context provider initialization has changed

# [6.7.0](https://github.com/Telefonica/mistica-web/compare/v6.6.0...v6.7.0) (2020-10-21)

### Features

- **Text:** Allow to pass a number of lines to `truncate` prop
  ([0aeb2dc](https://github.com/Telefonica/mistica-web/commit/0aeb2dc4f478e886cfc171154848d1a1b57117f5))

# [6.6.0](https://github.com/Telefonica/mistica-web/compare/v6.5.0...v6.6.0) (2020-10-20)

### Features

- **DateField:** Date and DateTime improvements (custom icon, improved styles and ux)
  ([#136](https://github.com/Telefonica/mistica-web/issues/136))
  ([2542185](https://github.com/Telefonica/mistica-web/commit/2542185be9e06e83c2f9a4dd2d509c35b301d564))
- **Text:** new `wordBreak` prop.
  ([3895f71](https://github.com/Telefonica/mistica-web/commit/3895f71bbd8e0f09149def7e30783cce8b682e81))

# [6.5.0](https://github.com/Telefonica/mistica-web/compare/v6.4.0...v6.5.0) (2020-10-15)

### Bug Fixes

- **CI:** update vercel action version ([#132](https://github.com/Telefonica/mistica-web/issues/132))
  ([787033f](https://github.com/Telefonica/mistica-web/commit/787033f69dd27a245f787a99c32b905f4456ea98))

### Features

- **Inline:** support 2, 4 and 12px space
  ([d7a71c6](https://github.com/Telefonica/mistica-web/commit/d7a71c6620cbfaf3df2fa5094f1630a2b08c4c77))
- **media queries:** add new isDesktopOrBigger media query
  ([aca5479](https://github.com/Telefonica/mistica-web/commit/aca5479b518963529a0959b9f7b66e7aa1f774c3))

# [6.4.0](https://github.com/Telefonica/mistica-web/compare/v6.3.0...v6.4.0) (2020-10-09)

### Bug Fixes

- **FormEmailField:** improve email validation ([#130](https://github.com/Telefonica/mistica-web/issues/130))
  ([5c8badf](https://github.com/Telefonica/mistica-web/commit/5c8badf39116f4bbac30f779203d47e3cec041af))
- **Icons:** Improve icons tree-shaking
  ([e993755](https://github.com/Telefonica/mistica-web/commit/e99375588faff7cc8ad2a7856a0d375eb7dc02b8))

### Features

- **FormTextField:** Add 'username' as valid autoComplete option
  ([#128](https://github.com/Telefonica/mistica-web/issues/128))
  ([969a8f1](https://github.com/Telefonica/mistica-web/commit/969a8f1ad8af4f008b86c318ba3a26ff6624aa5d))

# [6.3.0](https://github.com/Telefonica/mistica-web/compare/v6.2.0...v6.3.0) (2020-10-06)

### Bug Fixes

- **GridLayout:** fixed styles to avoid horizontal scroll in mobile
  ([18a2605](https://github.com/Telefonica/mistica-web/commit/18a26052c8ecf31b8df1b1d8b013428d4d87fa3c))
- **Version:** improve version import from package.json
  ([f367521](https://github.com/Telefonica/mistica-web/commit/f36752147c7e251c19039524d07f7c8ad407f70e))

### Features

- **Build:** generate library size stats on build time (see `size-stats.json`)
  ([b3e8b66](https://github.com/Telefonica/mistica-web/commit/b3e8b6618ac401be8285afa6aab329b6aace6dd9))

# [6.2.0](https://github.com/Telefonica/mistica-web/compare/v6.1.2...v6.2.0) (2020-09-21)

### Bug Fixes

- **Tabs:** Some style fixes mainly affecting tablet breakpoint layout
  ([1ac7d03](https://github.com/Telefonica/mistica-web/commit/1ac7d036fbe25584ba6077deed5a5309d0122e6d))

### Features

- **Icons:** Added all mistica-icons as React Components. See Storybook Icons section
  ([3d074c4](https://github.com/Telefonica/mistica-web/commit/3d074c473d14052434baaaa27f9341346c868985))
- **Text:** new TextX components with the allowed texts presets
  ([c0b36da](https://github.com/Telefonica/mistica-web/commit/c0b36da0193160ff93b4395c63858e887d213b12))

## [6.1.2](https://github.com/Telefonica/mistica-web/compare/v6.1.1...v6.1.2) (2020-09-16)

### Bug Fixes

- **FeedbackIconError:** broken animation
  ([4e42076](https://github.com/Telefonica/mistica-web/commit/4e42076aaa598df2372d950e86865d78ceabd77a))

## [6.1.1](https://github.com/Telefonica/mistica-web/compare/v6.1.0...v6.1.1) (2020-09-16)

### Bug Fixes

- **Release:** add typedefs to build
  ([bf3110b](https://github.com/Telefonica/mistica-web/commit/bf3110bfc5a1aee926c8fb8acf3b7e62155fd43a))

# [6.1.0](https://github.com/Telefonica/mistica-web/compare/v6.0.0...v6.1.0) (2020-09-15)

### Bug Fixes

- **FormTextField:** fix multi line FormTextField bottom padding
  ([1f5c0a8](https://github.com/Telefonica/mistica-web/commit/1f5c0a8fc4e5caae3b2b4324c2023151a8746d2a))
- **JSS:** use className id generator for client side executed code to avoid class names collision
  ([e972eaf](https://github.com/Telefonica/mistica-web/commit/e972eaf11f23b1a7c02ef1a046445f5f3395e03e))
- **Snackbar:** Fix Snackbar styles for mobile and desktop
  ([f9f8eed](https://github.com/Telefonica/mistica-web/commit/f9f8eedd6dc2ca4bb6f674302ddeba3eda584159))

### Features

- **FeedbackScreen:** New FeedbackScreen component
  ([e22f65c](https://github.com/Telefonica/mistica-web/commit/e22f65ce553716d8c985a623d7c683696935183b))
- **FormDateTimeField:** new Form Field component for DateTime values
  ([221d158](https://github.com/Telefonica/mistica-web/commit/221d1583711fd434444560378f3c40dc88a20cf4))

# [6.0.0](https://github.com/Telefonica/mistica-web/compare/v5.3.2...v6.0.0) (2020-09-08)

### Bug Fixes

- **FormTextField:** Update Focus/Blur behavior in multiline `FormTextField`
  ([b69c49b](https://github.com/Telefonica/mistica-web/commit/b69c49b1078009cafff4fb0ceec973c5cc38bef5))
- **HighlightedCard:** background image positioning
  ([#108](https://github.com/Telefonica/mistica-web/issues/108))
  ([5813cac](https://github.com/Telefonica/mistica-web/commit/5813cac3d7527c484dfe6b78d55bb2537ff7b297))
- **SSR:** Fix some components server side rendering
  ([e0b6777](https://github.com/Telefonica/mistica-web/commit/e0b677741873d0eed64052d356b1ffe4531bbbf3))

### Features

- **bun:** Remove Bun component
  ([da4ca92](https://github.com/Telefonica/mistica-web/commit/da4ca920b8e82616d651646a98b9f574a052bb10))
- Removed `withSheet`, `createSheet` and `removeJssProps`
  ([#107](https://github.com/Telefonica/mistica-web/issues/107))
  ([7cf4aeb](https://github.com/Telefonica/mistica-web/commit/7cf4aeb07e4654e4ca56aac85ea2fb82331ec6b7))

### BREAKING CHANGES

- **bun:** Remove Bun component
- `withSheet`, `createSheet` and `removeJssProps` are no longer part of mistica-web. Use `createUseStyles`
  instead

# 5.3.2 (2020-08-28)

- Update `@tef-novum/webview-bridge` dependency

# 5.3.1 (2020-08-26)

- Fix some Flow types for components with union types in Props (`Touchable`, `Button`, `ListRow`,
  `HightlightedCard`, etc)
- **Internal**: Make PRs fail in CI if flow definitions are not commited.
- **Internal**: Automatically start storybook when running acceptance tests if it hasn't already been started.

# 5.3.0 (2020-08-25)

- New `HighlightedCard` component.
- Added `@telefonica/eslint-plugin-async-await`.

# 5.2.0 (2020-08-20)

- Support multiple tracking events.
- New `FormSearchField` component
- `TextLink` and `ListRow`: disable wrong `:hover` styles in touch devices.
- Fixed several `FormSelect` bugs:
  - Bad spacing when label is empty.
  - Native caret being shown when rendered as a native component.
  - Caret being mispositioned on firefox.
- **Internal**: Kill docker container after running acceptance tests.

# 5.1.0 (2020-08-12)

- Expose `validate` and `submit` in `Form` context to be able to create forms with manual validation and
  submit. See examples in form stories
- **Internal**: GitHub action to upload failed screenshot diffs to azure and show them as PR comment

# 5.0.1 (2020-08-06)

- Fix `FormXXXField` components when used in uncontrolled mode outside a `Form` parent component.
- Fix `FormXXXField` label color when error.
- **Internal**: use `babel-loader` instead of `ts-loader` in storybook.
- Fix Switch component colors in O2 (iOS) and Movistar (Android)
- Fix Switch component when used in uncontrolled mode
- **Internal**: Changed codemod `import-type.js`, now it transforms to import type (flow) everything imported
  as a type in typescript.
- **Internal**: Code reorganization
- Fix `Touchable` styles. All variants are now equally styled (`display: block` and `width: 100%`)

# 5.0.0 (2020-07-29)

### BREAKING CHANGES

- Deprecated `TextField` component is no longer available. Use `FormXXXField` variants.
- Deprecated `type` property for `FormTextField` component is no longer available. Use corresponding
  `FormXXXField` variant.
- `Select` component is no longer available. Use `FormSelect`.
- `PhoneInput` component is no longer available. Use `FormPhoneNumberField`.
- `withMargin` property for `ButtonLayout>` component is no longer available. Refer to `Box` and `Stack`
  components to add spacings when necessary.

# 4.2.7 (2020-07-28)

- Avoid warning in controlled/uncontroleld components

# 4.2.6 (2020-07-28)

- Simplify FormFields implementation. Move common logic to a hook
- Fix a problem with `defaultValue` in fields being used outside a `<Form>` component
- Fix a problem in `Select` component where a double `optional` suffix was being added

# 4.2.5 (2020-07-27)

- Fix: missing new color in O2 Classic skin

# 4.2.4 (2020-07-27)

- Fix: Form initialValues were ignored

# 4.2.3 (2020-07-24)

- Fix: Export some missing FormFields, improve controlled/uncontrolled usage inside a `<Form>`

# 4.2.2 (2020-07-23)

- Add chart color for Vivo

# 4.2.1 (2020-07-23)

- Minor fix for `Portal`, including improved SSR

# 4.2.0 (2020-07-23)

- Update a chart color for Vivo skin
- Form fields refactor:
  - Deprecate `TextField` (will be removed in a future release)
  - Deprecate `FormTextField` with types different than `"text"` (those usages will be removed in a future
    release)
  - New semantic FormField components added:
    - `FormDateField`
    - `FormDecimalField`
    - `FormEmailField`
    - `FormIntegerField`
    - `FormPasswordField`
  - All FormField components can now be used inside a `<Form>` and standalone (connected or unconnected)
  - `name` prop is in FormFields is now mandatory

# 4.1.0 (2020-07-21)

- Removed border from `BoxedRowList` component, moved it to `BoxedRow` component
- New `Inline` layout component
- Forbid using `undefined` in jss dynamic styles

# 4.0.1 (2020-07-16)

- Fix `TextLink` line height

# 4.0.0 (2020-07-15)

- Reset some browser default styles at component level.
- SSR compatibility to support using `@telefonica/mistica` in Next.js apps.
- Added a `examples/` folder. Added some examples on how to use `@telefonica/mistica` with common
  meta-frameworks, like Create React App or Next.js
- Some fixes in `<Switch />` component to avoid some warnings in newer react versions.

### BREAKING CHANGES

- Decouple from `react-router-dom`.
  - You can now provide your custom `Link` component to mistica using the `ThemeContextProvider`. There are
    some examples in the `examples/` folder on how to use this feature with popular routers, like react-router
    and Next.js router.
  - By default, if you don't provide a custom `Link` component, `@telefonica/mistica` will render simple `<a>`
    elements.

# 3.5.0 (2020-07-13)

- Created o2-classic skin and updated colors.

# 3.4.0 (2020-07-08)

- Changed responsive layout columns for tablet.
- Changed grid layout margins and width for some viewports.
- Fixed bug on radio buttons inside lists.

# 3.3.1 (2020-07-01)

- Accessibility and tracking for `Tabs` component.

# 3.3.0 (2020-06-30)

- New `Tabs` component.

# 3.2.0 (2020-06-30)

- New colors for app tab bar.

# 3.1.1 (2020-06-29)

- Fixed changelog.

# 3.1.0 (2020-06-29)

- NegativeBox Component.

# 3.0.2 (2020-06-26)

- Minor bugfixes

# 3.0.1 (2020-06-26)

- Minor bugfixes

# 3.0.0 (2020-06-26)

- Added new skin `O2-classic`
- New radio button component
- New switch component
- List rows improvements:
  - Added support for radio buttons in list rows
  - Added support for switch in list rows
  - Added support for circular checkboxes in list rows
  - Added support for headline and subtitle in list rows
- Added `id` prop to `SectionTitle` and `Text` components, to be able to use them as accesibility labels
  (`aria-labelledby`)
- Added support for SSR. To support using `@telefonica/mistica` in frameworks like Next.

### BREAKING CHANGES

- Migrate to TS
  - Autogenerated d.ts and js.flow definitions
- Unified naming for icon components.
  - All icon component names now start with Icon

# 2.1.1 (2020-06-19)

- Fix for mistica version check.

# 2.1.0 (2020-06-19)

- Check there is only one version of mistica running in the same page
- New color constants for desktop nav bar
- Change credit card form fields spacing to 16px
- Fix control active color for Movitar prominent.

# 2.0.0 (2020-06-12)

- Header improvements:
  - Allow two buttons in header.
  - Make header title optional
  - Allow any `React.Node` as `header` prop in `HeaderLayout` to support skeletons there.
  - Change error color to pink
- Grid layout now have 12 columns in tablet breakpoint too. It had 8 before.
- Expose `Locale` and `RegionCode` types.

### BREAKING CHANGES

- `Header`: Allow extra content vertical in desktop. This is now the default behavior, to enable the old
  horizontal behavior use `sideBySideExtraOnDesktop` prop in `HeaderLayout`.

# 1.1.0 (2020-06-10)

- Fix [bug](https://github.com/Telefonica/mistica-web/pull/12) with cancel calback on Dialogs
- `locale` now have the format `'es-ES'` instead of `es_ES`. This change is retrocompatible at run time
  because we sanitize locales before using them (replace `_` with `-`). But the types aren't retrocompatible
  because we have changed the `Locale` enum

# 1.0.1 (2020-06-05)

- Include flow types

# 1.0.0 (2020-06-05)

- First release!
