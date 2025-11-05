## [16.42.2](https://github.com/Telefonica/mistica-web/compare/v16.42.1...v16.42.2) (2025-10-21)


### Bug Fixes

* **Carousel:** useLayoutEffect warning in SSR ([#1448](https://github.com/Telefonica/mistica-web/issues/1448)) ([37feb68](https://github.com/Telefonica/mistica-web/commit/37feb6822598f4c877494eec6377e10737742232))
* **Image:** images are crop in Safari when only specifying height ([#1445](https://github.com/Telefonica/mistica-web/issues/1445)) ([376ba49](https://github.com/Telefonica/mistica-web/commit/376ba49c76e55ba76043a937d1adab1a8ae9da3b))

## [16.42.1](https://github.com/Telefonica/mistica-web/compare/v16.42.0...v16.42.1) (2025-10-15)


### Bug Fixes

* **Dialog:** limit height and show scroll for long content ([#1446](https://github.com/Telefonica/mistica-web/issues/1446)) ([41ced0f](https://github.com/Telefonica/mistica-web/commit/41ced0fdc7ac471c52e446d3582d95209f124492)), closes [#1442](https://github.com/Telefonica/mistica-web/issues/1442)

# [16.42.0](https://github.com/Telefonica/mistica-web/compare/v16.41.0...v16.42.0) (2025-10-14)


### Bug Fixes

* **CoverCard:** fix gradientOverlayColor when used with skin colors ([#1438](https://github.com/Telefonica/mistica-web/issues/1438)) ([df70ea3](https://github.com/Telefonica/mistica-web/commit/df70ea3568b5f31e1ce0db226dea388e7a23f23e))


### Features

* **Feedbacks, Stepper:** include new animated icons ([#1443](https://github.com/Telefonica/mistica-web/issues/1443)) ([becb232](https://github.com/Telefonica/mistica-web/commit/becb232948b7e59aa4794aadf36c81b47da5e97d))
* **Icons:** new default icon set for Movistar, Telefónica, Esimflag and TU ([#1444](https://github.com/Telefonica/mistica-web/issues/1444)) ([4d609d5](https://github.com/Telefonica/mistica-web/commit/4d609d5d7878ec95f880ecbda37e0daed219c852))

# [16.41.0](https://github.com/Telefonica/mistica-web/compare/v16.40.0...v16.41.0) (2025-10-07)


### Bug Fixes

* **AdvancedDataCard:** wrong voiceover behavior in touchable cards with extra  ([#1441](https://github.com/Telefonica/mistica-web/issues/1441)) ([03ef774](https://github.com/Telefonica/mistica-web/commit/03ef7742af302063495233ebe55d04d84a939cdf))


### Features

* **Lists, Accordion:** use rowListTitle weight token ([#1440](https://github.com/Telefonica/mistica-web/issues/1440)) ([e0966a5](https://github.com/Telefonica/mistica-web/commit/e0966a57b0d20bccce81953b16eb4bcf34fbb1b7))

# [16.40.0](https://github.com/Telefonica/mistica-web/compare/v16.39.0...v16.40.0) (2025-10-03)


### Features

* **Skin:** Movistar new skin ([#1434](https://github.com/Telefonica/mistica-web/issues/1434)) ([0d4ea19](https://github.com/Telefonica/mistica-web/commit/0d4ea1914a8199720c7384c9794b258c64de3b52))
* **TabFocus:** deprecate theme.enableTabFocus config ([#1437](https://github.com/Telefonica/mistica-web/issues/1437)) ([f9a49d0](https://github.com/Telefonica/mistica-web/commit/f9a49d05930fa0faf722f86976ee6a26c1a6da63))

# [16.39.0](https://github.com/Telefonica/mistica-web/compare/v16.38.0...v16.39.0) (2025-09-19)


### Bug Fixes

* **TextFields:** focus ring in text fields with prefix and/or end icon ([#1435](https://github.com/Telefonica/mistica-web/issues/1435)) ([c8719f9](https://github.com/Telefonica/mistica-web/commit/c8719f98d06a9b42a36d777c763e129c2bd92f16))


### Features

* **Button:** improve rendering over media ([#1431](https://github.com/Telefonica/mistica-web/issues/1431)) ([c4d8bb1](https://github.com/Telefonica/mistica-web/commit/c4d8bb146742dfe8d1fd21709b26d52daa7d6d40))
* **FixedFooterLayout:** allow custimizing footer role ([#1433](https://github.com/Telefonica/mistica-web/issues/1433)) ([2ed1e33](https://github.com/Telefonica/mistica-web/commit/2ed1e332a43eab7318203f99a5bb224d0e96e8bf))

# [16.38.0](https://github.com/Telefonica/mistica-web/compare/v16.37.5...v16.38.0) (2025-09-16)


### Features

* **Carousel, PageBullets, Chip, Mosaic:** add data-testid ([#1429](https://github.com/Telefonica/mistica-web/issues/1429)) ([f5669d0](https://github.com/Telefonica/mistica-web/commit/f5669d0ef56b8ecb934c68c4685fa0bd2052ade0))
* **Carousel:** improve control buttons aria-label ([#1427](https://github.com/Telefonica/mistica-web/issues/1427)) ([d5c57bb](https://github.com/Telefonica/mistica-web/commit/d5c57bb3f5b69d2e353346a1b85ded2dda6c2de1))
* **VerticalMosaic:** improve a11y. Fix reading order and set list role as default ([#1428](https://github.com/Telefonica/mistica-web/issues/1428)) ([baa439f](https://github.com/Telefonica/mistica-web/commit/baa439fca4e79cef4eb8ff2888665678d4f8a5cf))

## [16.37.5](https://github.com/Telefonica/mistica-web/compare/v16.37.4...v16.37.5) (2025-09-08)


### Bug Fixes

* **color-scheme:** initial flash when using SSR and dark mode ([#1421](https://github.com/Telefonica/mistica-web/issues/1421)) ([4d457f1](https://github.com/Telefonica/mistica-web/commit/4d457f18414c5f8509d07b18992c558e22805d81))
* **NakedCard, SmallNakedCard:** use context variant. Deprecate variant and footerVariant props ([#1430](https://github.com/Telefonica/mistica-web/issues/1430)) ([179f9d3](https://github.com/Telefonica/mistica-web/commit/179f9d392ae1b4377acb78d5040eebc62751241d))

## [16.37.4](https://github.com/Telefonica/mistica-web/compare/v16.37.3...v16.37.4) (2025-08-27)


### Bug Fixes

* **Card:** Naked border radius. Default slotAlignment for deprecated cards ([#1426](https://github.com/Telefonica/mistica-web/issues/1426)) ([0280612](https://github.com/Telefonica/mistica-web/commit/02806122c71d8301d29193fccd5240d0b6095db8))

## [16.37.3](https://github.com/Telefonica/mistica-web/compare/v16.37.2...v16.37.3) (2025-08-27)


### Bug Fixes

* **Card:** Update CoverCard description color ([#1425](https://github.com/Telefonica/mistica-web/issues/1425)) ([420757b](https://github.com/Telefonica/mistica-web/commit/420757b0ccdc91b23e68448d055547c898d7891d))

## [16.37.2](https://github.com/Telefonica/mistica-web/compare/v16.37.1...v16.37.2) (2025-08-26)


### Bug Fixes

* **Card:** expose deprecated props ([#1424](https://github.com/Telefonica/mistica-web/issues/1424)) ([ce1dd77](https://github.com/Telefonica/mistica-web/commit/ce1dd77d86cd9f7ebf56de43574bb4a74cdee5ad))

## [16.37.1](https://github.com/Telefonica/mistica-web/compare/v16.37.0...v16.37.1) (2025-08-26)


### Bug Fixes

* **Card:** fix cover card with image variant ([#1423](https://github.com/Telefonica/mistica-web/issues/1423)) ([2ef4c87](https://github.com/Telefonica/mistica-web/commit/2ef4c87bfd1ca7c4763b24776da549db55bea91f))

# [16.37.0](https://github.com/Telefonica/mistica-web/compare/v16.36.1...v16.37.0) (2025-08-25)


### Features

* **Cards:** allow transparent gradient color in cover card ([#1422](https://github.com/Telefonica/mistica-web/issues/1422)) ([c892f33](https://github.com/Telefonica/mistica-web/commit/c892f338312f34eddaa5322d19fcd46fe07b3ae4))
* **Cards:** Card ecosystem evolution ([#1400](https://github.com/Telefonica/mistica-web/issues/1400)) ([59e4d38](https://github.com/Telefonica/mistica-web/commit/59e4d389573f5a88e3532ebf6ec6856c58e4818c))
* **skin:** update design tokens ([#1418](https://github.com/Telefonica/mistica-web/issues/1418)) ([c50b3b6](https://github.com/Telefonica/mistica-web/commit/c50b3b656d83d0343b716691fdbecf71fdbe45c8))
* **UnorderedList/OrderedList/ListItem:** new components ([#1417](https://github.com/Telefonica/mistica-web/issues/1417)) ([4d52083](https://github.com/Telefonica/mistica-web/commit/4d5208316ac4e41c3c975ef7100365aa24652092))

## [16.36.1](https://github.com/Telefonica/mistica-web/compare/v16.36.0...v16.36.1) (2025-08-08)


### Bug Fixes

* **Row:** VoiceOver highlight area size when using aria-label ([#1420](https://github.com/Telefonica/mistica-web/issues/1420)) ([4650858](https://github.com/Telefonica/mistica-web/commit/4650858cfdfa4b7ed0e9e9e04e1b899cf65ef48b)), closes [#1409](https://github.com/Telefonica/mistica-web/issues/1409) [#1406](https://github.com/Telefonica/mistica-web/issues/1406)

# [16.36.0](https://github.com/Telefonica/mistica-web/compare/v16.35.0...v16.36.0) (2025-08-06)


### Features

* **icons:** Include new icons ([#1415](https://github.com/Telefonica/mistica-web/issues/1415)) ([116738b](https://github.com/Telefonica/mistica-web/commit/116738b6b467789ebe49caa4c2e921bc0ba83420))
* **package.json:** remove node version restriction ([#1419](https://github.com/Telefonica/mistica-web/issues/1419)) ([97900d5](https://github.com/Telefonica/mistica-web/commit/97900d5f9bca073bd932b56dfb74c554a8c7fe62)), closes [#1356](https://github.com/Telefonica/mistica-web/issues/1356)

# [16.35.0](https://github.com/Telefonica/mistica-web/compare/v16.34.0...v16.35.0) (2025-07-24)


### Bug Fixes

* **Grid:** improve accessibility when rendered as ul ([#1413](https://github.com/Telefonica/mistica-web/issues/1413)) ([0c7ff3f](https://github.com/Telefonica/mistica-web/commit/0c7ff3f9437e335146bd032bd145c047e38227c4))
* **Row,BoxedRow:** fix ScreenReaderOnly position for iOS VoiceOver in informative lists using aria-label ([#1409](https://github.com/Telefonica/mistica-web/issues/1409)) ([bb0f52f](https://github.com/Telefonica/mistica-web/commit/bb0f52f1ac717381c3cc48251c453f6a8e27ace4))


### Features

* **Drawer:** Allow disabled prop in buttons ([#1412](https://github.com/Telefonica/mistica-web/issues/1412)) ([f4ca7f4](https://github.com/Telefonica/mistica-web/commit/f4ca7f40a6efa95bfb1bef5943022abe1e35f528))

# [16.34.0](https://github.com/Telefonica/mistica-web/compare/v16.33.0...v16.34.0) (2025-07-16)


### Features

* **Card:** slot alignment ([#1410](https://github.com/Telefonica/mistica-web/issues/1410)) ([684e9af](https://github.com/Telefonica/mistica-web/commit/684e9afa3b2ad83b44eb9b392d837a5aa2c6a316))
* **NavigationBar:** wide mode ([#1407](https://github.com/Telefonica/mistica-web/issues/1407)) ([5e45395](https://github.com/Telefonica/mistica-web/commit/5e453953f7a5dc5c57f8669a6396f452a65a338d))

# [16.33.0](https://github.com/Telefonica/mistica-web/compare/v16.32.0...v16.33.0) (2025-07-10)


### Bug Fixes

* **Spinner:** improve aria-live a11y ([#1395](https://github.com/Telefonica/mistica-web/issues/1395)) ([04ff3b0](https://github.com/Telefonica/mistica-web/commit/04ff3b01158c1dd62a0ed70dcc06444f5991cfb6))
* **Text:** use tokens in Text ([#1401](https://github.com/Telefonica/mistica-web/issues/1401)) ([43cfdfa](https://github.com/Telefonica/mistica-web/commit/43cfdfaaf81c63aff224fc72d7342177568c6e13))


### Features

* **Media Queries:** increase large desktop breakpoint ([#1377](https://github.com/Telefonica/mistica-web/issues/1377)) ([6fcc0e5](https://github.com/Telefonica/mistica-web/commit/6fcc0e589f93e004a3694f67b06faa6cfef3b5ec))
* **mistica-css:** support for inverse cards, fixes in switch and padding components. ([#1403](https://github.com/Telefonica/mistica-web/issues/1403)) ([3d6f2bc](https://github.com/Telefonica/mistica-web/commit/3d6f2bca4e5bb726788b7502a7a76d2ab9ca1322))
* **SkipLink:** new component ([#1406](https://github.com/Telefonica/mistica-web/issues/1406)) ([2518790](https://github.com/Telefonica/mistica-web/commit/2518790e244a545dee6481b466280a7090447431))

# [16.32.0](https://github.com/Telefonica/mistica-web/compare/v16.31.0...v16.32.0) (2025-06-27)


### Bug Fixes

* **Radio:** update tabIndex logic when no radio is selected ([#1396](https://github.com/Telefonica/mistica-web/issues/1396)) ([8f70ce2](https://github.com/Telefonica/mistica-web/commit/8f70ce2f5e129f04ad1c952b54e09e982e285628))
* **SearchField:** Adjust suggestions size to field container ([#1399](https://github.com/Telefonica/mistica-web/issues/1399)) ([5207d01](https://github.com/Telefonica/mistica-web/commit/5207d01b07e4e016874ee38de7a51d0d0b337daa))
* **Select:** Show native select focus ring ([#1398](https://github.com/Telefonica/mistica-web/issues/1398)) ([c0bbf30](https://github.com/Telefonica/mistica-web/commit/c0bbf306c5ba902895457332bc1f0528a5d7b26b))


### Features

* **Carousel, CenteredCarousel, Slideshow:** design changes and a11y improvements ([#1388](https://github.com/Telefonica/mistica-web/issues/1388)) ([59e989e](https://github.com/Telefonica/mistica-web/commit/59e989e704dd4e5c84fa9aebe61018243d172071))

# [16.31.0](https://github.com/Telefonica/mistica-web/compare/v16.30.1...v16.31.0) (2025-06-18)


### Bug Fixes

* **Stepper:** improve a11y ([#1394](https://github.com/Telefonica/mistica-web/issues/1394)) ([8c3ca44](https://github.com/Telefonica/mistica-web/commit/8c3ca44e20dce16940b4f833e10e16f0e8fbb36c))


### Features

* **Modal,Sheet:** move focus to the element that triggered the modal when it closes ([#1389](https://github.com/Telefonica/mistica-web/issues/1389)) ([5ebd350](https://github.com/Telefonica/mistica-web/commit/5ebd3509f04cdf753cabb346580a61b3950f88a2))
* **Tabs:** improve a11y, and add renderPanel prop ([#1393](https://github.com/Telefonica/mistica-web/issues/1393)) ([08c5baf](https://github.com/Telefonica/mistica-web/commit/08c5bafe0b48c7febd6c08d940faeca608aafe06))
* **Touchable components:** add support for aria-description, aria-describedby, aria-labelledby and aria-current ([#1390](https://github.com/Telefonica/mistica-web/issues/1390)) ([9999788](https://github.com/Telefonica/mistica-web/commit/99997884e3d3bc981febb4f17697a06f04a3b134))

## [16.30.1](https://github.com/Telefonica/mistica-web/compare/v16.30.0...v16.30.1) (2025-06-11)


### Bug Fixes

* **Buttons:** Remove role=presentation and aria-hidden from fake buttons ([#1392](https://github.com/Telefonica/mistica-web/issues/1392)) ([f089329](https://github.com/Telefonica/mistica-web/commit/f089329804396e6f3c21155e0617fdb0ddfeb5ec))

# [16.30.0](https://github.com/Telefonica/mistica-web/compare/v16.29.0...v16.30.0) (2025-06-11)


### Bug Fixes

* **ProgressBar, ProgressBarStepped:** fix screen reader anouncement ([#1385](https://github.com/Telefonica/mistica-web/issues/1385)) ([8e41dd3](https://github.com/Telefonica/mistica-web/commit/8e41dd3730aa4de0c95369be306c88cad6858372))


### Features

* **Callout:** allow setting title aria-label ([#1386](https://github.com/Telefonica/mistica-web/issues/1386)) ([f467238](https://github.com/Telefonica/mistica-web/commit/f467238e32e364bfde2e288a1df0cac2582e17fb))
* CHECKOUT-8438. Allow fake ButtonLink ([#1391](https://github.com/Telefonica/mistica-web/issues/1391)) ([2dd60ec](https://github.com/Telefonica/mistica-web/commit/2dd60ec28c91b6d7f0fa4dd66af27ba37111b566))
* **mistica-css:** padding, stack, inline, align ([#1384](https://github.com/Telefonica/mistica-web/issues/1384)) ([1b5a32e](https://github.com/Telefonica/mistica-web/commit/1b5a32e7e6bd9bd4a4eb1f2073ae53d8e3f9a329))

# [16.29.0](https://github.com/Telefonica/mistica-web/compare/v16.28.1...v16.29.0) (2025-06-06)


### Features

* **Form, Select, MenuItem:** support dataAttributes ([#1387](https://github.com/Telefonica/mistica-web/issues/1387)) ([ebeb3a7](https://github.com/Telefonica/mistica-web/commit/ebeb3a7f9d2a860ffb69c77664b90a2e0a5aae6e))
* **mistica-css:** lists and rows ([#1379](https://github.com/Telefonica/mistica-web/issues/1379)) ([2e09c14](https://github.com/Telefonica/mistica-web/commit/2e09c141660f02d04dacb89b65044251cbe00453))
* **mistica-css:** style any a element inside mistica-text as text link   ([#1382](https://github.com/Telefonica/mistica-web/issues/1382)) ([e857c3f](https://github.com/Telefonica/mistica-web/commit/e857c3f10f6dac26501d5535ec5f146a57c8bf21))

## [16.28.1](https://github.com/Telefonica/mistica-web/compare/v16.28.0...v16.28.1) (2025-06-03)


### Bug Fixes

* **sheet:** z-index and scroll dividers in desktop ([#1381](https://github.com/Telefonica/mistica-web/issues/1381)) ([2aafa78](https://github.com/Telefonica/mistica-web/commit/2aafa78aa58cc7cf4cfd0ec150af432592fb3889))

# [16.28.0](https://github.com/Telefonica/mistica-web/compare/v16.27.0...v16.28.0) (2025-05-30)


### Features

* **movistar skin, telefonca skin:** SuccessFeedback white background in Movistar. Color changes in Telefonica ([#1380](https://github.com/Telefonica/mistica-web/issues/1380)) ([0bcdbcc](https://github.com/Telefonica/mistica-web/commit/0bcdbcca0a44ca8e23c50ca943f37f626655a55c))

# [16.27.0](https://github.com/Telefonica/mistica-web/compare/v16.26.0...v16.27.0) (2025-05-29)


### Features

* **skin:** allow customizing some components theme variant by skin ([#1375](https://github.com/Telefonica/mistica-web/issues/1375)) ([a80f5bd](https://github.com/Telefonica/mistica-web/commit/a80f5bdc0cd5981fd3c6ce7eda2eb4a38a585bcc))
* **skin:** Improve color contrast in Blau skin ([#1369](https://github.com/Telefonica/mistica-web/issues/1369)) ([e49e84d](https://github.com/Telefonica/mistica-web/commit/e49e84d0c718b50d22b6ce193754d4e424782586))

# [16.26.0](https://github.com/Telefonica/mistica-web/compare/v16.25.0...v16.26.0) (2025-05-28)


### Features

* **mistica-css:** counter ([#1372](https://github.com/Telefonica/mistica-web/issues/1372)) ([70d8beb](https://github.com/Telefonica/mistica-web/commit/70d8bebab8667b611003ab0f419cc78c507ee924))
* **mistica-css:** ErrorFeedbackScreen ([#1371](https://github.com/Telefonica/mistica-web/issues/1371)) ([99ea3cf](https://github.com/Telefonica/mistica-web/commit/99ea3cfc4ea9de60bdb90cfe808b5acbfc9e5f62))
* **mistica-css:** slider ([#1374](https://github.com/Telefonica/mistica-web/issues/1374)) ([89c6aee](https://github.com/Telefonica/mistica-web/commit/89c6aee0e534e9d884854ac0b72ada0f65e16823))
* **mistica-css:** switch ([#1364](https://github.com/Telefonica/mistica-web/issues/1364)) ([7b6df80](https://github.com/Telefonica/mistica-web/commit/7b6df8039278131c0c3f33c0f3ced7cd872eada9))
* **mistica-css:** TextField / SearchField ([#1370](https://github.com/Telefonica/mistica-web/issues/1370)) ([55781c4](https://github.com/Telefonica/mistica-web/commit/55781c472d0485992f9d1b5adad03c5fa84b22ce))
* **RowList, BoxedRowList, Stack:** O2DE-7699 RowList with aria-live and aria-atomic attributes ([#1376](https://github.com/Telefonica/mistica-web/issues/1376)) ([5070c61](https://github.com/Telefonica/mistica-web/commit/5070c6197dae571e64d3c88cf4a7dcf6f0cbc232))

# [16.25.0](https://github.com/Telefonica/mistica-web/compare/v16.24.0...v16.25.0) (2025-05-13)


### Bug Fixes

* **TextField:** make prefix hidden to screen readers ([#1362](https://github.com/Telefonica/mistica-web/issues/1362)) ([9644cd5](https://github.com/Telefonica/mistica-web/commit/9644cd58952b3a2ccc45ddad0f60c649cde065c1))


### Features

* **mistica-css:** checkbox ([#1367](https://github.com/Telefonica/mistica-web/issues/1367)) ([eb9d5b8](https://github.com/Telefonica/mistica-web/commit/eb9d5b8d6ffc9f6ab8f55f2864fc627acf549445))
* **mistica-css:** grid-layout ([#1365](https://github.com/Telefonica/mistica-web/issues/1365)) ([717b0ce](https://github.com/Telefonica/mistica-web/commit/717b0ce255714909ec7c66483623f4416bf35665))
* **Slideshow:** allow images with border radius inside ([#1363](https://github.com/Telefonica/mistica-web/issues/1363)) ([46b1138](https://github.com/Telefonica/mistica-web/commit/46b1138c6d2da9bb1dbe992459d22cf5d03d2e24))
* **TextX:** add testid ([#1361](https://github.com/Telefonica/mistica-web/issues/1361)) ([1452f71](https://github.com/Telefonica/mistica-web/commit/1452f71b05559d203e436be2b69ffefe7c71e24b))

# [16.24.0](https://github.com/Telefonica/mistica-web/compare/v16.23.0...v16.24.0) (2025-05-06)


### Features

* **Accordion, List, Select:** Chevron normalization ([#1345](https://github.com/Telefonica/mistica-web/issues/1345)) ([c24ed06](https://github.com/Telefonica/mistica-web/commit/c24ed066d8e8aa5c6658700ee30d18a040945db3))
* **InputFields & Counter:** use inputBorder token in border ([#1337](https://github.com/Telefonica/mistica-web/issues/1337)) ([c8538a2](https://github.com/Telefonica/mistica-web/commit/c8538a2ea30e2bc8d12f677178901925d7d99585))
* **TextLink:** add underline to textLink ([#1343](https://github.com/Telefonica/mistica-web/issues/1343)) ([b90ad61](https://github.com/Telefonica/mistica-web/commit/b90ad6189e60c22c01b3ec38abce2196e13f8fb8))

# [16.23.0](https://github.com/Telefonica/mistica-web/compare/v16.22.0...v16.23.0) (2025-05-06)


### Features

* **mistica-css:** breadcrumbs ([#1349](https://github.com/Telefonica/mistica-web/issues/1349)) ([eeb36b2](https://github.com/Telefonica/mistica-web/commit/eeb36b25559c651351685e7b9a71c8006e0195da))
* **mistica-css:** card asset ([#1351](https://github.com/Telefonica/mistica-web/issues/1351)) ([45c275f](https://github.com/Telefonica/mistica-web/commit/45c275fa4c67cf1af172e081369b6e363ba78ffb))
* **mistica-css:** GridLayout ([#1355](https://github.com/Telefonica/mistica-web/issues/1355)) ([da0a953](https://github.com/Telefonica/mistica-web/commit/da0a95355b6974b0b880cc6d53db0bab6287a790))
* **mistica-css:** Table implementation ([#1352](https://github.com/Telefonica/mistica-web/issues/1352)) ([d26129e](https://github.com/Telefonica/mistica-web/commit/d26129e7ac73f8eed7088adf28e2a87a3d33fd47))
* **PinField:** wrap to next line when digits don't fit in viewport ([#1359](https://github.com/Telefonica/mistica-web/issues/1359)) ([13e13ed](https://github.com/Telefonica/mistica-web/commit/13e13ed49e5a14c2fcb241c1037f3558c7d0132e))
* **TextField:** make field error aria-live ([#1348](https://github.com/Telefonica/mistica-web/issues/1348)) ([1c45c55](https://github.com/Telefonica/mistica-web/commit/1c45c552eeb361fc326f034864700491f4143326))

# [16.22.0](https://github.com/Telefonica/mistica-web/compare/v16.21.0...v16.22.0) (2025-04-29)


### Features

* **mistica-css:** Chip ([#1350](https://github.com/Telefonica/mistica-web/issues/1350)) ([ca4aa01](https://github.com/Telefonica/mistica-web/commit/ca4aa01f1a685238d3de5cd4fe443a231cc5228a))
* **sheet-root:** disable focus trap when running in an iframe ([#1353](https://github.com/Telefonica/mistica-web/issues/1353)) ([#1354](https://github.com/Telefonica/mistica-web/issues/1354)) ([19aeaf1](https://github.com/Telefonica/mistica-web/commit/19aeaf1986eb1e1ac900777e73605f3bdaf99877))

# [16.21.0](https://github.com/Telefonica/mistica-web/compare/v16.20.0...v16.21.0) (2025-04-22)


### Features

* **mistica-css:** basic Accordion implementation ([#1344](https://github.com/Telefonica/mistica-web/issues/1344)) ([4118fc2](https://github.com/Telefonica/mistica-web/commit/4118fc2428ea7b2eb9e96445fb521b2ca157e0e2))
* **mistica-css:** implement more components ([#1332](https://github.com/Telefonica/mistica-web/issues/1332)) ([652bd06](https://github.com/Telefonica/mistica-web/commit/652bd06fe728aa63051454f800adfdcab62607b0))
* **mistica-css:** TextLink ([#1346](https://github.com/Telefonica/mistica-web/issues/1346)) ([b9cc8cc](https://github.com/Telefonica/mistica-web/commit/b9cc8ccb8e376482030fd7ea8714f3a98bd6fab6))
* **Row,BoxedRow:** allow overriding touchable role ([#1347](https://github.com/Telefonica/mistica-web/issues/1347)) ([0e855be](https://github.com/Telefonica/mistica-web/commit/0e855bec0f3137c961fc08fdc9ac079f4519b95d))

# [16.20.0](https://github.com/Telefonica/mistica-web/compare/v16.19.0...v16.20.0) (2025-04-09)


### Features

* **tabs:** add selectedTabRef ([#1341](https://github.com/Telefonica/mistica-web/issues/1341)) ([8db0cf3](https://github.com/Telefonica/mistica-web/commit/8db0cf3ea9e68bd32804733f5debb1bb08557a3e))

# [16.19.0](https://github.com/Telefonica/mistica-web/compare/v16.18.2...v16.19.0) (2025-04-04)


### Features

* **Chip:** Update chip navigationActive colors ([#1330](https://github.com/Telefonica/mistica-web/issues/1330)) ([6061b67](https://github.com/Telefonica/mistica-web/commit/6061b676a991db6a0dfd02f84ba29f360a75e627))
* **Form:** allow disabling onBlur validation, make '(optional)' label optional, allow to hide search icon in SearchField ([#1340](https://github.com/Telefonica/mistica-web/issues/1340)) ([d42f4d3](https://github.com/Telefonica/mistica-web/commit/d42f4d3f2efa20e01a780cb2be733c986187b465))
* **HighlightedValueBlock:** new pretitle and strickedValue props ([#1329](https://github.com/Telefonica/mistica-web/issues/1329)) ([2283867](https://github.com/Telefonica/mistica-web/commit/2283867874caa50767543bf083858af2d3e3573a))
* **icons:** New vivo icons ([#1335](https://github.com/Telefonica/mistica-web/issues/1335)) ([ba6d2ca](https://github.com/Telefonica/mistica-web/commit/ba6d2ca8cb4dad4a399539361cd4f91c7040eb4e))

## [16.18.2](https://github.com/Telefonica/mistica-web/compare/v16.18.1...v16.18.2) (2025-03-27)


### Bug Fixes

* **FixedFooterLayout:** obscured focus ([#1334](https://github.com/Telefonica/mistica-web/issues/1334)) ([1a89176](https://github.com/Telefonica/mistica-web/commit/1a891768bfc207bd84799aecf31f9608b92e2031)), closes [/#diff-a20f24af3140080300870a68a5accb89feee523f1c59592a9e57d0f2bf4d02baR166](https://github.com///issues/diff-a20f24af3140080300870a68a5accb89feee523f1c59592a9e57d0f2bf4d02baR166)

## [16.18.1](https://github.com/Telefonica/mistica-web/compare/v16.18.0...v16.18.1) (2025-03-24)


### Bug Fixes

* **Card:** make cards fill the parent height ([#1331](https://github.com/Telefonica/mistica-web/issues/1331)) ([fe44c95](https://github.com/Telefonica/mistica-web/commit/fe44c958f4d0ab078d9d5bded8b276e4a68b5882)), closes [#1325](https://github.com/Telefonica/mistica-web/issues/1325)

# [16.18.0](https://github.com/Telefonica/mistica-web/compare/v16.17.0...v16.18.0) (2025-03-20)


### Features

* **Snackbar:** dont lazy load snackbar when using webview bridge ([#1328](https://github.com/Telefonica/mistica-web/issues/1328)) ([83f107b](https://github.com/Telefonica/mistica-web/commit/83f107b4d1dab250af70842fb1f77e22cf14c9df))

# [16.17.0](https://github.com/Telefonica/mistica-web/compare/v16.16.0...v16.17.0) (2025-03-14)


### Bug Fixes

* **Row/Cards:** browser focus ring in boxed components ([#1325](https://github.com/Telefonica/mistica-web/issues/1325)) ([33a4543](https://github.com/Telefonica/mistica-web/commit/33a454360d2613d0117cd0a76c3edb2853990c48))


### Features

* **skins:** new eSIMFlag skin ([#1323](https://github.com/Telefonica/mistica-web/issues/1323)) ([a2f2892](https://github.com/Telefonica/mistica-web/commit/a2f2892aeaa00a532a40348a287387256a1c030f))
* **Tag:** New type "info" and allow custom colors ([#1327](https://github.com/Telefonica/mistica-web/issues/1327)) ([6c71b10](https://github.com/Telefonica/mistica-web/commit/6c71b104697f8f0b9c1aa74914cfb2fe72b40c23))

# [16.16.0](https://github.com/Telefonica/mistica-web/compare/v16.15.0...v16.16.0) (2025-03-11)


### Features

* **Row:** add tabIndex prop ([#1326](https://github.com/Telefonica/mistica-web/issues/1326)) ([27988ac](https://github.com/Telefonica/mistica-web/commit/27988ac7ea99474efb67385b6e6871e84118a236))

# [16.15.0](https://github.com/Telefonica/mistica-web/compare/v16.14.0...v16.15.0) (2025-03-05)


### Features

* **Touchable:** add aria-current support ([#1324](https://github.com/Telefonica/mistica-web/issues/1324)) ([4112e46](https://github.com/Telefonica/mistica-web/commit/4112e46a2964295e6e40d8bffcce6da69476d3b3))

# [16.14.0](https://github.com/Telefonica/mistica-web/compare/v16.13.0...v16.14.0) (2025-02-25)


### Features

* **Chips:** Chip Active Navigation strong style ([#1315](https://github.com/Telefonica/mistica-web/issues/1315)) ([8d2b855](https://github.com/Telefonica/mistica-web/commit/8d2b855291c792daa6586e1e2893a714d349f84e))

# [16.13.0](https://github.com/Telefonica/mistica-web/compare/v16.12.0...v16.13.0) (2025-02-24)


### Features

* **Tag:** New tokens for Movistar promo tag ([#1321](https://github.com/Telefonica/mistica-web/issues/1321)) ([761613c](https://github.com/Telefonica/mistica-web/commit/761613c68502823607ee94df32fa53cfa69a430e))

# [16.12.0](https://github.com/Telefonica/mistica-web/compare/v16.11.2...v16.12.0) (2025-02-17)


### Features

* **Meter:** added extra prop ([#1318](https://github.com/Telefonica/mistica-web/issues/1318)) ([631591b](https://github.com/Telefonica/mistica-web/commit/631591bb304aabcc2fa02f056ef89be9e7a6c2ae))

## [16.11.2](https://github.com/Telefonica/mistica-web/compare/v16.11.1...v16.11.2) (2025-02-14)


### Bug Fixes

* **Drawer:** missing css value for transform ([#1319](https://github.com/Telefonica/mistica-web/issues/1319)) ([fd775d6](https://github.com/Telefonica/mistica-web/commit/fd775d607378e8016886bd7924802cfb9ffe9ab8))

## [16.11.1](https://github.com/Telefonica/mistica-web/compare/v16.11.0...v16.11.1) (2025-02-12)


### Bug Fixes

* **SimpleBlock:** remove wrong right padding when no rightText provided ([#1317](https://github.com/Telefonica/mistica-web/issues/1317)) ([3daabb1](https://github.com/Telefonica/mistica-web/commit/3daabb1397fa3c48b17cf91fff3131e8e1d2a4fc))

# [16.11.0](https://github.com/Telefonica/mistica-web/compare/v16.10.0...v16.11.0) (2025-02-04)


### Features

* **Timeline:** new component ([#1312](https://github.com/Telefonica/mistica-web/issues/1312)) ([03426af](https://github.com/Telefonica/mistica-web/commit/03426afa0f8414f7d28a2e57a796c44b634f4404))

# [16.10.0](https://github.com/Telefonica/mistica-web/compare/v16.9.0...v16.10.0) (2025-01-30)


### Features

* **o2-new and blau skins:** update `orange` and `control` colors ([#1314](https://github.com/Telefonica/mistica-web/issues/1314)) ([7ad9dcc](https://github.com/Telefonica/mistica-web/commit/7ad9dcc4e33dde3ff6ab6732be47a5f3319cd68b))

# [16.9.0](https://github.com/Telefonica/mistica-web/compare/v16.8.0...v16.9.0) (2025-01-28)


### Features

* add label property to simple-block ([#1308](https://github.com/Telefonica/mistica-web/issues/1308)) ([2c57982](https://github.com/Telefonica/mistica-web/commit/2c57982940a2e78c87148172f817382716b814c6))
* **Form:** Disable autofocus on error for some fields on iOS ([#1307](https://github.com/Telefonica/mistica-web/issues/1307)) ([316565d](https://github.com/Telefonica/mistica-web/commit/316565dc4eec2bc664c45fb3303afbce6112c595))
* **icons:** New artificial intelligence and my handy icons ([#1310](https://github.com/Telefonica/mistica-web/issues/1310)) ([433db7c](https://github.com/Telefonica/mistica-web/commit/433db7cb3b8493c3fba76738fa871f653e63efaa))

# [16.8.0](https://github.com/Telefonica/mistica-web/compare/v16.7.0...v16.8.0) (2025-01-09)


### Bug Fixes

* **react-datetime:** upgrade react-datetime to support React18 ([#1303](https://github.com/Telefonica/mistica-web/issues/1303)) ([9caf2c2](https://github.com/Telefonica/mistica-web/commit/9caf2c277a9f6412e98f5eb8888e8257fdb4f65c))


### Features

* **Chip:** change background color on hover/active ([#1302](https://github.com/Telefonica/mistica-web/issues/1302)) ([73e33eb](https://github.com/Telefonica/mistica-web/commit/73e33ebefafbae7522ab18af9e2c680393e6ef19))
* **Drawer:** new component ([#1306](https://github.com/Telefonica/mistica-web/issues/1306)) ([2543c67](https://github.com/Telefonica/mistica-web/commit/2543c67a29a9f3e26a84712ba8ca406c21bd101e))
* **icons:** New floppy disk icon ([#1304](https://github.com/Telefonica/mistica-web/issues/1304)) ([d9c5353](https://github.com/Telefonica/mistica-web/commit/d9c5353400f90f4521caa6daf5d3e4641bf0d6f0)), closes [/github.com/Telefonica/mistica-design/issues/1956#issuecomment-2535956321](https://github.com//github.com/Telefonica/mistica-design/issues/1956/issues/issuecomment-2535956321)

# [16.7.0](https://github.com/Telefonica/mistica-web/compare/v16.6.1...v16.7.0) (2024-12-04)


### Features

* **StackingGroup:** use Avatar's text style for moreItems text ([#1297](https://github.com/Telefonica/mistica-web/issues/1297)) ([e45e47c](https://github.com/Telefonica/mistica-web/commit/e45e47c9c1c3ae0b9351c03130de88cc494d4d3b))
* **VanillaExtract:** Use custom identifier generation ([#1299](https://github.com/Telefonica/mistica-web/issues/1299)) ([8872f87](https://github.com/Telefonica/mistica-web/commit/8872f87465d3bb994326895cfef870391a329cdd))

## [16.6.1](https://github.com/Telefonica/mistica-web/compare/v16.6.0...v16.6.1) (2024-11-26)


### Bug Fixes

* **Header, Cards, Hero:** fix spacings logic ([#1298](https://github.com/Telefonica/mistica-web/issues/1298)) ([327ac5f](https://github.com/Telefonica/mistica-web/commit/327ac5fe90b5bb3dc2a23af5bb890368439d1d77))

# [16.6.0](https://github.com/Telefonica/mistica-web/compare/v16.5.0...v16.6.0) (2024-11-26)


### Features

* **data-testid:** support for Callout, HighlightedCard, Hero, EmptyState and Headers ([#1296](https://github.com/Telefonica/mistica-web/issues/1296)) ([15b798c](https://github.com/Telefonica/mistica-web/commit/15b798c91a4ad898d95036c8dd54e4a41997f3c1))
* **Header, Cards, Hero, CoverHero:** improve a11y ([#1292](https://github.com/Telefonica/mistica-web/issues/1292)) ([cdcf2fc](https://github.com/Telefonica/mistica-web/commit/cdcf2fcafcd4df435f38927cbbc65d52c9b29590))
* **InfoSheet:** update styles and allow adding a button to the content ([#1294](https://github.com/Telefonica/mistica-web/issues/1294)) ([c4a0749](https://github.com/Telefonica/mistica-web/commit/c4a0749d816702644020112fd00d6d6b2a61ae39))
* **Meter:** New component ([#1281](https://github.com/Telefonica/mistica-web/issues/1281)) ([1a061d8](https://github.com/Telefonica/mistica-web/commit/1a061d8b645a418930ae0a8921db1900b8e084ce))
* **Sheet:** allow closing the sheet with the keyboard or a screen reader ([#1293](https://github.com/Telefonica/mistica-web/issues/1293)) ([42099fb](https://github.com/Telefonica/mistica-web/commit/42099fb17e1f5682f196ee5390ceb386616a2d59))

# [16.5.0](https://github.com/Telefonica/mistica-web/compare/v16.4.0...v16.5.0) (2024-11-18)


### Features

* **Accordion, BoxedAccordion:** allow detail and right content in header ([#1290](https://github.com/Telefonica/mistica-web/issues/1290)) ([087c486](https://github.com/Telefonica/mistica-web/commit/087c4866757733339e51ed9de54b844fecf7aed5))
* **HorizontalMosaic, VerticalMosaic:** allow passing gridMode information to each item ([#1289](https://github.com/Telefonica/mistica-web/issues/1289)) ([bb8852c](https://github.com/Telefonica/mistica-web/commit/bb8852c439cb33b2ae7c877a2ac32760ec29180c))
* **MainNavigationBar:** add menu ([#1280](https://github.com/Telefonica/mistica-web/issues/1280)) ([3973ead](https://github.com/Telefonica/mistica-web/commit/3973ead1ebef7f613b1aebd3c18306fc88999de0))
* **vivo-type:** added medium weight ([#1291](https://github.com/Telefonica/mistica-web/issues/1291)) ([8a38d2c](https://github.com/Telefonica/mistica-web/commit/8a38d2c1c16a17b931f96c75b400d7ba8c036a93))

# [16.4.0](https://github.com/Telefonica/mistica-web/compare/v16.3.1...v16.4.0) (2024-11-04)


### Bug Fixes

* **TextField:** adjust position of maxLength's screen reader label ([#1283](https://github.com/Telefonica/mistica-web/issues/1283)) ([fda424e](https://github.com/Telefonica/mistica-web/commit/fda424e2874328be37a5566e57d0d3b87518b483))
* **TextField:** avoid right helper text from wrapping, fix spacing and aria label for maxCount text when multiline is true ([#1272](https://github.com/Telefonica/mistica-web/issues/1272)) ([85fcb31](https://github.com/Telefonica/mistica-web/commit/85fcb31caf82bca1cf41bf87d60a978d06d0c611))
* **useDisableBodyScroll:** avoid affecting body's height ([#1279](https://github.com/Telefonica/mistica-web/issues/1279)) ([b68f317](https://github.com/Telefonica/mistica-web/commit/b68f317a1e0da272c227d11bfba8dc41bf448223))


### Features

* **PhoneNumberFieldLite:** Phone number field with simple formatting to reduce bundle size ([#1276](https://github.com/Telefonica/mistica-web/issues/1276)) ([a141b97](https://github.com/Telefonica/mistica-web/commit/a141b97e600efb30e37167990cb1b7ae23f16352))
* **Row:** allow aria-label in informative rows ([#1269](https://github.com/Telefonica/mistica-web/issues/1269)) ([65b5d42](https://github.com/Telefonica/mistica-web/commit/65b5d4232a19c481535d65e7aa98aa6040918e61))
* **Rows, Cards, FeedbackScreen, FormFields, Buttons:** add test ids for components and their internal elements ([#1270](https://github.com/Telefonica/mistica-web/issues/1270)) ([fc63201](https://github.com/Telefonica/mistica-web/commit/fc632019375e5b124fbf75d1a399b9ec4c05422d))
* **Spinner:** improve a11y ([#1274](https://github.com/Telefonica/mistica-web/issues/1274)) ([5267ad5](https://github.com/Telefonica/mistica-web/commit/5267ad5c1a579e3e8aa9f1587356016426f426f0))
* **Switch, RadioButton, Checkbox, ProgressBar, ProgressBarStepped, Slider:** create inverse variant ([#1277](https://github.com/Telefonica/mistica-web/issues/1277)) ([3129fb9](https://github.com/Telefonica/mistica-web/commit/3129fb9edc12a6b0be23e648053388a775fc34d7))

## [16.3.1](https://github.com/Telefonica/mistica-web/compare/v16.3.0...v16.3.1) (2024-10-21)


### Bug Fixes

* **AdvancedDataCard:** make container of extra content expand to fit container's width ([#1275](https://github.com/Telefonica/mistica-web/issues/1275)) ([486c605](https://github.com/Telefonica/mistica-web/commit/486c605934ee80413b829395eac914ed385763c1))

# [16.3.0](https://github.com/Telefonica/mistica-web/compare/v16.2.0...v16.3.0) (2024-10-16)


### Bug Fixes

* **Sheet:** lock focus inside sheet container when content is not interactive ([#1264](https://github.com/Telefonica/mistica-web/issues/1264)) ([dd0fdad](https://github.com/Telefonica/mistica-web/commit/dd0fdad6ee00d8feb71d8e51247426d274d88d62))
* **Text:** extract textProps to separate file ([#1267](https://github.com/Telefonica/mistica-web/issues/1267)) ([3894eb9](https://github.com/Telefonica/mistica-web/commit/3894eb9567236be4560c34cf86cbc8a94f77f467))


### Features

* **Box:** remove className usages ([#1266](https://github.com/Telefonica/mistica-web/issues/1266)) ([56a25e0](https://github.com/Telefonica/mistica-web/commit/56a25e0e10f9e2e47c4656caeb8dc09c7a7219ae))

# [16.2.0](https://github.com/Telefonica/mistica-web/compare/v16.1.1...v16.2.0) (2024-10-08)


### Bug Fixes

* **Tooltip, Popover:** allow styling target wrapper ([#1262](https://github.com/Telefonica/mistica-web/issues/1262)) ([38abf25](https://github.com/Telefonica/mistica-web/commit/38abf25aa26a2cc2b75774b85027bb81eecd72e3))
* **Touchable:** make content focusable when using onPress + as="a" ([#1255](https://github.com/Telefonica/mistica-web/issues/1255)) ([5e297d5](https://github.com/Telefonica/mistica-web/commit/5e297d50fbe01e7ded0df8052afc6a88a498c219))


### Features

* **Align:** create component ([#1254](https://github.com/Telefonica/mistica-web/issues/1254)) ([86fb294](https://github.com/Telefonica/mistica-web/commit/86fb294ddc1097149c171096f80193b798ca6351))
* **Logo:** allow color override ([#1263](https://github.com/Telefonica/mistica-web/issues/1263)) ([4d16939](https://github.com/Telefonica/mistica-web/commit/4d16939984945745533ff0c93a24cc5e7161b973))
* **vanilla-extract:** remove sprinkles usages from TS files ([#1257](https://github.com/Telefonica/mistica-web/issues/1257)) ([b0d6040](https://github.com/Telefonica/mistica-web/commit/b0d604030aae46002806496740d46407be90bb3e))

## [16.1.1](https://github.com/Telefonica/mistica-web/compare/v16.1.0...v16.1.1) (2024-10-03)


### Bug Fixes

* **PhoneNumberField:** Revert lazy load of libphonenumber ([#1258](https://github.com/Telefonica/mistica-web/issues/1258)) ([3d18271](https://github.com/Telefonica/mistica-web/commit/3d18271fdb5a48727fbb1653bbed3fbb72365112)), closes [Telefonica/mistica-web#1244](https://github.com/Telefonica/mistica-web/issues/1244)
* **Sheet:** avoid content from rendering on top of sticky title/buttons ([#1247](https://github.com/Telefonica/mistica-web/issues/1247)) ([21ce399](https://github.com/Telefonica/mistica-web/commit/21ce3995c7d16e4498b0f6734620cd7d267bdbf6))

# [16.1.0](https://github.com/Telefonica/mistica-web/compare/v16.0.0...v16.1.0) (2024-09-27)


### Features

* **BrandLoadingScreen:** improve lottie animations ([#1235](https://github.com/Telefonica/mistica-web/issues/1235)) ([e7dc87f](https://github.com/Telefonica/mistica-web/commit/e7dc87fe05e4f380212d0e98ec4f72ad71534a2e)), closes [/github.com/airbnb/lottie-web/issues/1184#issuecomment-411586909](https://github.com//github.com/airbnb/lottie-web/issues/1184/issues/issuecomment-411586909)
* **Form fields:** allow blocking copy/cut ([#1251](https://github.com/Telefonica/mistica-web/issues/1251)) ([8fd2838](https://github.com/Telefonica/mistica-web/commit/8fd2838db2588a15a5239e045d5e4b4d87f77d2e))
* **Form fields:** improve accesibility of errors ([#1246](https://github.com/Telefonica/mistica-web/issues/1246)) ([e35a99e](https://github.com/Telefonica/mistica-web/commit/e35a99e004cde09769f62fe7bee196c18a21850d))
* **PhoneNumberField:** Custom formatter support + lazy load libphonenumber on demand ([#1244](https://github.com/Telefonica/mistica-web/issues/1244)) ([2ee88e9](https://github.com/Telefonica/mistica-web/commit/2ee88e9643998c84ca724469948f256802a5209e))
* **PosterCard, DisplayMediaCard:** allow using srcSet for backgroundImage ([#1253](https://github.com/Telefonica/mistica-web/issues/1253)) ([3b3d85f](https://github.com/Telefonica/mistica-web/commit/3b3d85fe11e41a40a8d73f7791ac7297f7d6dc97))
* **Rating, InfoRating:** new components ([#1196](https://github.com/Telefonica/mistica-web/issues/1196)) ([02c91f6](https://github.com/Telefonica/mistica-web/commit/02c91f6a98935a1fcaa2d9a2c32085c368529018))
* **SearchField, TextField:** support inputMode prop ([#1249](https://github.com/Telefonica/mistica-web/issues/1249)) ([fe31eca](https://github.com/Telefonica/mistica-web/commit/fe31ecaa029241b46baa18f59660d6d0cd367e1b))
* **Sheet:** lazy load sheet implementations ([#1250](https://github.com/Telefonica/mistica-web/issues/1250)) ([40fecdd](https://github.com/Telefonica/mistica-web/commit/40fecdda86dd757844148604ad5faedc40a2f98f))

# [16.0.0](https://github.com/Telefonica/mistica-web/compare/v15.20.1...v16.0.0) (2024-09-13)


### Features

* **ButtonLink:** add default variant ([#1211](https://github.com/Telefonica/mistica-web/issues/1211)) ([97aa4ad](https://github.com/Telefonica/mistica-web/commit/97aa4adbb11696b0e82dff387f004243e106ce18))
* **Callout, Cards, Dialog, EmptyState, EmptyStateCard, FeedbackScreen, Tabs:** remove icon prop and use only Icon/asset ([#1206](https://github.com/Telefonica/mistica-web/issues/1206)) ([eb06fa3](https://github.com/Telefonica/mistica-web/commit/eb06fa32db2c654b17d14660fd6a66b484250616))
* **Feedback, FixedFooterLayout, Dialog, Accordion, Touchable, Header, IconButton, NavigationBar, OverscrollColor:** remove deprecated props ([#1205](https://github.com/Telefonica/mistica-web/issues/1205)) ([e1c84ec](https://github.com/Telefonica/mistica-web/commit/e1c84ec9e3b60cefffe7d036e3344a81c4d76a2d))
* **Header, MainSectionHeader:** use "default" as component's default variant ([#1207](https://github.com/Telefonica/mistica-web/issues/1207)) ([29e0ef4](https://github.com/Telefonica/mistica-web/commit/29e0ef494fc2d85689259e22134ec8be7c9839bc))
* **i18n:** refactor texts to improve bundle size ([#1228](https://github.com/Telefonica/mistica-web/issues/1228)) ([088a290](https://github.com/Telefonica/mistica-web/commit/088a29084df488e8598ef0b5ea0eabbef94a7398))
* **Icons:** add new icons and rename others ([#1197](https://github.com/Telefonica/mistica-web/issues/1197)) ([4cfffa5](https://github.com/Telefonica/mistica-web/commit/4cfffa5339a13ebade9c6c3e4e97e5b44301a680))
* **React:** require react18 and replace useAriaId with React.useId ([#1213](https://github.com/Telefonica/mistica-web/issues/1213)) ([b29f778](https://github.com/Telefonica/mistica-web/commit/b29f778a13138711b65a8e7a52cb81207fca1e7f))
* **skin:** rename some design tokens ([#1203](https://github.com/Telefonica/mistica-web/issues/1203)) ([d0a1452](https://github.com/Telefonica/mistica-web/commit/d0a1452ba2c3162e6dd527109f483b9a17ee06f8))
* **Snackbar:** update snackbar duration logic ([#1208](https://github.com/Telefonica/mistica-web/issues/1208)) ([2ef5804](https://github.com/Telefonica/mistica-web/commit/2ef5804b11908d2f3a8b5f98ceba3b391d7e3418))
* **ThemeVariant:** add media theme variant and update components in order to adapt to it ([#1236](https://github.com/Telefonica/mistica-web/issues/1236)) ([eada194](https://github.com/Telefonica/mistica-web/commit/eada194c5ec2b6e891837730834258e18b1b71c8))
* **Titles:** add new Title2, replace Title2 and Title3 with Title3 and Title4 respectively ([#1202](https://github.com/Telefonica/mistica-web/issues/1202)) ([bed8fdf](https://github.com/Telefonica/mistica-web/commit/bed8fdf8ea0947927d1a9c1ecaa08dffc887911b))


### BREAKING CHANGES

* **ThemeVariant:** `media` theme variant has been added and it may require changes in any logic that depends on variants
* **ButtonLink:** ButtonLink now behaves like other buttons by default (it won't be small unless you specify this by setting `small` prop to `true`)
* **i18n:** texts from useTheme are now empty by default. If a mistica defined text is required, it should be imported from text-tokens and must be translated using the t function from useTheme
* **Callout, Cards, Dialog, EmptyState, EmptyStateCard, FeedbackScreen, Tabs:** `icon` prop was replaced by `Icon`/`asset`
* **skin:** some mistica internal tokens are renamed
* **Snackbar:** snackbar duration prop type now allows only `"PERSISTENT"` as value. Numeric values are not valid anymore.
* **React:** react17 is no longer supported by Mistica and useAriaId hook is removed
* **Header, MainSectionHeader:** Header's variant changes from inverse to default if `variant` prop is not used
* **Feedback, FixedFooterLayout, Dialog, Accordion, Touchable, Header, IconButton, NavigationBar, OverscrollColor:** deprecated props are removed in several components
  - **Accordion**: removed `onToggle` callback from `AccordionItem`. Use `onChange` from `Accordion` instead
  - **FixedFooterLayout**: alignment of buttons in desktop is not configurable anymore (`desktopButtonAlign` prop has been removed)
  - **ButtonLayout**: `children` is not allowed. Use `primaryButton` / `secondaryButton` / `link` props
  - **Cards**: prop `ariaLabel` is removed. Use `aria-label` instead
  - **HighlightedValueBlock**: use `headings` props only (`mainHeading` / `secondHeading` / `secondaryValue` / `valueColor` have been removed)
  - **Dialog**: if you want to use `alert`/`dialog`/`confirm` functions, import them by using `useDialog` hook
  - **Feedback**: use `extra` instead of `children`
  - **Header**: `preamount`, `amount`, `button`, `secondaryButton`, `subtitle` and `isErrorAmount` are removed. Use `extra` prop for this.
  - **IconButton**: The deprecated version that allows any content or size has been removed. Use `Touchable` component if you need to style your content in a specific way
  - **NavigationBar**: use `variant` instead of `isInverse` prop
  - **OverscrollColor**: removed the `OverscrollColor` component. Use `useSetOverscrollColor` hook to configure the top/bottom overscroll colors.
* **Titles:** renamed `Title2` to `Title3` and `Title3` to `Title4`
* **Icons:** renamed some icons
  - autentication-failure → authentication-failure
  - autentication-success → authentication-success
  - adn → dna
  - hamburguer → hamburger
  - garaje → garage
  - millenials → millennials
  - not-photo-camera → no-photo-camera
  - not-conexion-file → no-conexion-file
  - smiley-happy → face-happy
  - smiley-sad → face-sad
  - like → thumb-up


## [15.20.1](https://github.com/Telefonica/mistica-web/compare/v15.20.0...v15.20.1) (2024-09-12)


### Bug Fixes

* **confirm:** make destructive mode work with webview bridge ([#1237](https://github.com/Telefonica/mistica-web/issues/1237)) ([0dc1787](https://github.com/Telefonica/mistica-web/commit/0dc1787d627fd3cf370769366719d87cdf03d3e9))

# [15.20.0](https://github.com/Telefonica/mistica-web/compare/v15.19.0...v15.20.0) (2024-09-06)


### Features

* **NavigationBreadcrumbs:** allow executing onNavigate when pressing a link ([#1233](https://github.com/Telefonica/mistica-web/issues/1233)) ([ec7ed8b](https://github.com/Telefonica/mistica-web/commit/ec7ed8b93d0b6892827263d35373896a8cf291b6))

# [15.19.0](https://github.com/Telefonica/mistica-web/compare/v15.18.0...v15.19.0) (2024-09-03)


### Bug Fixes

* **Buttons:** avoid warnings related to change in order of react hooks ([#1229](https://github.com/Telefonica/mistica-web/issues/1229)) ([2dbc411](https://github.com/Telefonica/mistica-web/commit/2dbc411616f7276d832bb5007f41a37c9c93f69e))
* **i18n:** revert text sizes improvement because it is breaking ([#1226](https://github.com/Telefonica/mistica-web/issues/1226)) ([79eb4a4](https://github.com/Telefonica/mistica-web/commit/79eb4a427ef9f8d5a91bf56c8434ca1417a77df3))
* **Logo:** fix webpackChunkName magic comments ([#1214](https://github.com/Telefonica/mistica-web/issues/1214)) ([3d1f098](https://github.com/Telefonica/mistica-web/commit/3d1f098c6cbaf179b29de666ba824f1ae63dea9e))
* **Vivinho char:** vivinho char in headings being read as a separated heading ([#1209](https://github.com/Telefonica/mistica-web/issues/1209)) ([f0f5fb0](https://github.com/Telefonica/mistica-web/commit/f0f5fb05b99fc594479a19c3037cc9dfc7446bab))


### Features

* **Buttons:** refactor code and fix spacing bug in loading buttonLink ([#1212](https://github.com/Telefonica/mistica-web/issues/1212)) ([640e429](https://github.com/Telefonica/mistica-web/commit/640e429c8ab4493c5da1f39bad5fccf90eacc373))
* **i18n:** improve texts sizes ([#1204](https://github.com/Telefonica/mistica-web/issues/1204)) ([0345e7c](https://github.com/Telefonica/mistica-web/commit/0345e7cefd06b911377278b5928409cbed23f921))
* **Logo:** Refactor logo to improve bundle size and loading times ([#1210](https://github.com/Telefonica/mistica-web/issues/1210)) ([15b77cb](https://github.com/Telefonica/mistica-web/commit/15b77cb8ab932f68fb124d66887b8d49169b0095))
* **NavigationBar, FunnelNavigationBar, MainNavigationBar:** add alternative variant ([#1200](https://github.com/Telefonica/mistica-web/issues/1200)) ([eef87ec](https://github.com/Telefonica/mistica-web/commit/eef87ecdd32053f80f349aaf1598d8e61251b6eb))

# [15.18.0](https://github.com/Telefonica/mistica-web/compare/v15.17.0...v15.18.0) (2024-08-20)


### Bug Fixes

* **FeedbackScreen:** avoid double responsive margins in buttons when they are not fixed ([#1195](https://github.com/Telefonica/mistica-web/issues/1195)) ([41c10ad](https://github.com/Telefonica/mistica-web/commit/41c10ad0a60fe3bfd7e191eca4583da37f2cf84e))
* **Inline:** wrap content if required when space equals between/around/evenly ([#1199](https://github.com/Telefonica/mistica-web/issues/1199)) ([b121227](https://github.com/Telefonica/mistica-web/commit/b121227d6de61f2dbc2e6e60a4f0b2b9ecc8a646))
* **Snackbar:** allow dataAttributes passed to openSnackbar ([#1192](https://github.com/Telefonica/mistica-web/issues/1192)) ([c5c65bd](https://github.com/Telefonica/mistica-web/commit/c5c65bdf486554e466fa325b3dbcef06eaccfecb))


### Features

* **Popover, Snackbar, Callout, Chip, Dialog, Cards:** allow customizable close button label ([#1193](https://github.com/Telefonica/mistica-web/issues/1193)) ([63de33a](https://github.com/Telefonica/mistica-web/commit/63de33a8fc9960f32c121db8e81f45e0ba32bdb6))

# [15.17.0](https://github.com/Telefonica/mistica-web/compare/v15.16.4...v15.17.0) (2024-08-01)


### Bug Fixes

* **Chip:** missing data-component-name when closable  ([#1191](https://github.com/Telefonica/mistica-web/issues/1191)) ([e4e284f](https://github.com/Telefonica/mistica-web/commit/e4e284fa806f79e2c6c348652504b3e820f4dc18))
* **Dialogs:** avoid double execution of native dialogs ([#1183](https://github.com/Telefonica/mistica-web/issues/1183)) ([68c8db7](https://github.com/Telefonica/mistica-web/commit/68c8db768f574faf51262c69759a64d225df7ee8))
* **Select:** onChange was called twice and there was an empty option in iOS ([#1185](https://github.com/Telefonica/mistica-web/issues/1185)) ([c44b25b](https://github.com/Telefonica/mistica-web/commit/c44b25b321924a6ec19eb35863028bb62de8de3d))


### Features

* **icons:** New box, High-priority and MMS icons ([#1188](https://github.com/Telefonica/mistica-web/issues/1188)) ([edff352](https://github.com/Telefonica/mistica-web/commit/edff35262c31302a2f3a0dea7332f2f010fbe171))
* **Rows:** a11y update ([#1180](https://github.com/Telefonica/mistica-web/issues/1180)) ([5f995ad](https://github.com/Telefonica/mistica-web/commit/5f995ad9201b65c577e675c0ccdbff4041563346))
* **ThemeContextProvider:** expose TextPreset size/lineHeight tokens as css vars ([#1178](https://github.com/Telefonica/mistica-web/issues/1178)) ([921eacf](https://github.com/Telefonica/mistica-web/commit/921eacfbbae4a0f8b74d534d193bd4b1696762d6))

## [15.16.4](https://github.com/Telefonica/mistica-web/compare/v15.16.3...v15.16.4) (2024-07-29)


### Bug Fixes

* **Table:** avoid rendering action buttons copy in test env ([#1187](https://github.com/Telefonica/mistica-web/issues/1187)) ([530905e](https://github.com/Telefonica/mistica-web/commit/530905e743dd09352ac4aa62c15e93c0021f9ea8))

## [15.16.3](https://github.com/Telefonica/mistica-web/compare/v15.16.2...v15.16.3) (2024-07-29)


### Bug Fixes

* **SheetRoot:** Reduce transition duration to 0ms in test envs ([#1186](https://github.com/Telefonica/mistica-web/issues/1186)) ([8d1dec3](https://github.com/Telefonica/mistica-web/commit/8d1dec329e2dc737390f9fef166583a3221fdfef))

## [15.16.2](https://github.com/Telefonica/mistica-web/compare/v15.16.1...v15.16.2) (2024-07-26)


### Bug Fixes

* **Table:** avoid rendering row actions twice in jsdom ([#1182](https://github.com/Telefonica/mistica-web/issues/1182)) ([8e364f6](https://github.com/Telefonica/mistica-web/commit/8e364f6588276b79047a1abd9b09608fbe1d0e4b))

## [15.16.1](https://github.com/Telefonica/mistica-web/compare/v15.16.0...v15.16.1) (2024-07-24)


### Bug Fixes

* **Table:** add missing keys to table cells ([#1181](https://github.com/Telefonica/mistica-web/issues/1181)) ([e32239d](https://github.com/Telefonica/mistica-web/commit/e32239d9fe133547f409d9034d66bf1fd334c99e))

# [15.16.0](https://github.com/Telefonica/mistica-web/compare/v15.15.0...v15.16.0) (2024-07-24)


### Bug Fixes

* **AdvancedDataCard:** Removed divider in extra, added 32px spacing and modified HighlightedValueBlock ([#1156](https://github.com/Telefonica/mistica-web/issues/1156)) ([af47b80](https://github.com/Telefonica/mistica-web/commit/af47b8004a9685639208a9e781384c513cce62f8))
* **FixedFooterLayout:** take into accout safe-area-inset-bottom in onChangeFooterHeight ([#1177](https://github.com/Telefonica/mistica-web/issues/1177)) ([cb4be80](https://github.com/Telefonica/mistica-web/commit/cb4be808fc3a9baf51f8903bf7e69d3d663246b6))


### Features

* **Callout:** fix elements reading order and add role prop ([#1176](https://github.com/Telefonica/mistica-web/issues/1176)) ([35edede](https://github.com/Telefonica/mistica-web/commit/35edededc12d127aca4b2f9b0595b6d96650bc3a))
* **Table:** allow setting any column as row header ([#1175](https://github.com/Telefonica/mistica-web/issues/1175)) ([938b275](https://github.com/Telefonica/mistica-web/commit/938b2759f5dcb7ba470253a5183a0a9f884899ba))

# [15.15.0](https://github.com/Telefonica/mistica-web/compare/v15.14.0...v15.15.0) (2024-07-16)


### Bug Fixes

* **overscroll color:** background color not changing when switching dark/light mode ([#1172](https://github.com/Telefonica/mistica-web/issues/1172)) ([9b74fe6](https://github.com/Telefonica/mistica-web/commit/9b74fe63178d54e56505974be56d235611da2360))


### Features

* **Cards:** add role prop for touchable cards ([#1169](https://github.com/Telefonica/mistica-web/issues/1169)) ([a2a7cbf](https://github.com/Telefonica/mistica-web/commit/a2a7cbf72158d37efe89466ff0d1dab91dbf5f15))
* **css:** export mistica tokens as public css custom properties ([#1161](https://github.com/Telefonica/mistica-web/issues/1161)) ([c5f74bc](https://github.com/Telefonica/mistica-web/commit/c5f74bc624ddd1f890537342b384b9d579fd22cc))
* **Header:** support headline (Tag) ([#1174](https://github.com/Telefonica/mistica-web/issues/1174)) ([07d8fae](https://github.com/Telefonica/mistica-web/commit/07d8fae820d810b7140f348825729d2c231f60ea))
* **Text:** support setting heading level to span and header pretitleAs ([#1170](https://github.com/Telefonica/mistica-web/issues/1170)) ([8abf43e](https://github.com/Telefonica/mistica-web/commit/8abf43e75d139049dea7857a5953e8c0f2d83045))

# [15.14.0](https://github.com/Telefonica/mistica-web/compare/v15.13.0...v15.14.0) (2024-07-11)


### Bug Fixes

* **AdvancedDataCard:** a11y of touchable area ([#1168](https://github.com/Telefonica/mistica-web/issues/1168)) ([2dc7f2d](https://github.com/Telefonica/mistica-web/commit/2dc7f2dda2d7f6298a04466caa324ad4cbf2f185))


### Features

* **browser support:** set min Safari version to 14 ([#1171](https://github.com/Telefonica/mistica-web/issues/1171)) ([e36fd73](https://github.com/Telefonica/mistica-web/commit/e36fd738efc9170be72eff1e6e5e63b16abfec22))
* **icon keywords:** exported a list of keywords associsated with every mistica icon ([#1166](https://github.com/Telefonica/mistica-web/issues/1166)) ([754a64e](https://github.com/Telefonica/mistica-web/commit/754a64e7f86d07eb5c5c74c103457bbdace76cd1))
* **Table:** allow optional header, add row actions and other fixes ([#1154](https://github.com/Telefonica/mistica-web/issues/1154)) ([38aa747](https://github.com/Telefonica/mistica-web/commit/38aa747136a249e00488d06adfe8531d1687d7e8))

# [15.13.0](https://github.com/Telefonica/mistica-web/compare/v15.12.0...v15.13.0) (2024-07-05)


### Bug Fixes

* **Image:** set aspectRatio value equal to 0 by default ([#1163](https://github.com/Telefonica/mistica-web/issues/1163)) ([a8dff39](https://github.com/Telefonica/mistica-web/commit/a8dff391b09db6e91edcc855948c7b94e0d43670))
* **ThemeContextProvider:** avoid rendering isolation extra div in server and first client render ([#1165](https://github.com/Telefonica/mistica-web/issues/1165)) ([d05098d](https://github.com/Telefonica/mistica-web/commit/d05098da03fd0567ad576636b278833c933ad444))


### Features

* **PreviewTools:** add forceTabs prop ([#1162](https://github.com/Telefonica/mistica-web/issues/1162)) ([d6413fa](https://github.com/Telefonica/mistica-web/commit/d6413faa2520a252a15abf4a30e9062421a81a96))
* **skin:** update design tokens ([#1164](https://github.com/Telefonica/mistica-web/issues/1164)) ([c8d6e60](https://github.com/Telefonica/mistica-web/commit/c8d6e6034da89fe144fc697b58d1ecc4aceebf95))

# [15.12.0](https://github.com/Telefonica/mistica-web/compare/v15.11.1...v15.12.0) (2024-07-02)


### Bug Fixes

* **Carousel:** when using renderBullets, don't hide the bullets automatically when there is only one page ([#1158](https://github.com/Telefonica/mistica-web/issues/1158)) ([ea446a6](https://github.com/Telefonica/mistica-web/commit/ea446a6d13cffa3e0bb053263ba1e1d91df18028))
* **Dialog, FixedFooterLayout, LoadingBar, NavigationBar, Overlay, Portal, Select, Sheet, Snackbar:** avoid z-index issues ([#1148](https://github.com/Telefonica/mistica-web/issues/1148)) ([0412448](https://github.com/Telefonica/mistica-web/commit/04124480911f66defd24e3e8283d4e3edd7441a5))


### Features

* **Icons:** Add O2-new icon set ([#1155](https://github.com/Telefonica/mistica-web/issues/1155)) ([af2055b](https://github.com/Telefonica/mistica-web/commit/af2055b2861c7d20ce8238ac2358438ce3202905))
* **Snackbar:** buttonAccesibilityLabel ([#1153](https://github.com/Telefonica/mistica-web/issues/1153)) ([3f5ab2c](https://github.com/Telefonica/mistica-web/commit/3f5ab2cd208c68fffd54248aead026146c58b8e4))
* **Text:** avoid ignoring line breaks ([#1157](https://github.com/Telefonica/mistica-web/issues/1157)) ([69c78aa](https://github.com/Telefonica/mistica-web/commit/69c78aa3409fc6d7b471e587d7143ba8d37709e5))

## [15.11.1](https://github.com/Telefonica/mistica-web/compare/v15.11.0...v15.11.1) (2024-06-19)


### Bug Fixes

* **Cards:** wrong headline padding in cards without subtitle/description ([#1152](https://github.com/Telefonica/mistica-web/issues/1152)) ([9aa6691](https://github.com/Telefonica/mistica-web/commit/9aa669136114ae37e7a815ad0cfca174aa6a9699))

# [15.11.0](https://github.com/Telefonica/mistica-web/compare/v15.10.0...v15.11.0) (2024-06-19)


### Bug Fixes

* **ButtonLayout:** add bleed when using only link ([#1150](https://github.com/Telefonica/mistica-web/issues/1150)) ([554f98a](https://github.com/Telefonica/mistica-web/commit/554f98a9aef5218b76a9d3703f42cc0ce527a8d8))
* **Counter:** add aria-live to value ([#1146](https://github.com/Telefonica/mistica-web/issues/1146)) ([3e2e09b](https://github.com/Telefonica/mistica-web/commit/3e2e09bb2c17ebd39b881a06ec2c5068f8fc95f3))
* **Header:** bleed not working in o2-new skin ([#1137](https://github.com/Telefonica/mistica-web/issues/1137)) ([00fb632](https://github.com/Telefonica/mistica-web/commit/00fb632a427a65c61c1cb2b39de2a8c22be96bcf))
* **MainNavigationBar:** remove logo space in mobile when no sections are given ([#1149](https://github.com/Telefonica/mistica-web/issues/1149)) ([e4c03a0](https://github.com/Telefonica/mistica-web/commit/e4c03a05e086f86061379d6c10714feff6b73e1f))
* **Select:** set text color in native version ([#1141](https://github.com/Telefonica/mistica-web/issues/1141)) ([eedf265](https://github.com/Telefonica/mistica-web/commit/eedf265cb4b1bde7b4a59c8b95a3fbd5438fb523))
* **Spinner:** use controlActivatedInverse token as default when used inside inverse variant ([#1133](https://github.com/Telefonica/mistica-web/issues/1133)) ([38a192d](https://github.com/Telefonica/mistica-web/commit/38a192df8fd865644d62dfb376abe25123e60944))


### Features

* **Cards:** improve accessibility ([#1139](https://github.com/Telefonica/mistica-web/issues/1139)) ([dde9cc5](https://github.com/Telefonica/mistica-web/commit/dde9cc5b850f4ac4e35c9119b11229628803cdd5))
* **Chip:** allow using badge in selectable chips ([#1134](https://github.com/Telefonica/mistica-web/issues/1134)) ([9ecda7c](https://github.com/Telefonica/mistica-web/commit/9ecda7c401cfab55c8e6081fbb3fc40f58416a44))
* **Circle:** custom background support ([#1136](https://github.com/Telefonica/mistica-web/issues/1136)) ([bedeaa4](https://github.com/Telefonica/mistica-web/commit/bedeaa4dd567aa8dc844ffb364629698dce3c229))
* **CoverHero:** new component ([#1144](https://github.com/Telefonica/mistica-web/issues/1144)) ([a655e6e](https://github.com/Telefonica/mistica-web/commit/a655e6e9a982cfabd5fbb47b08f231de2ab6cbd0))
* **DisplayMediaCard, PosterCard:** add extra ([#1131](https://github.com/Telefonica/mistica-web/issues/1131)) ([501cf73](https://github.com/Telefonica/mistica-web/commit/501cf739e7811ebb22b0729fe52d5c360cccf66b))
* **EmptyState:** allow using only ButtonLink as action ([#1140](https://github.com/Telefonica/mistica-web/issues/1140)) ([d73c219](https://github.com/Telefonica/mistica-web/commit/d73c21955c2c1ec98ec6af0956d27fdddba127f3))
* **HighlightedCard:** support for alt for image ([#1135](https://github.com/Telefonica/mistica-web/issues/1135)) ([c9ba728](https://github.com/Telefonica/mistica-web/commit/c9ba728cfd10fa58e7dbb9f875d145b31201a820))
* **Image:** Custom fallback icon in Vivo New ([#1145](https://github.com/Telefonica/mistica-web/issues/1145)) ([ec600fe](https://github.com/Telefonica/mistica-web/commit/ec600fe86c4e90c8d8b44b2e5528e35fe41ff87f))
* **Switch:** Improve animation ([#1142](https://github.com/Telefonica/mistica-web/issues/1142)) ([8162eed](https://github.com/Telefonica/mistica-web/commit/8162eed0e14fe6c35af1e88566272b9d894cc96d))
* **Table:** new component ([#1129](https://github.com/Telefonica/mistica-web/issues/1129)) ([328e013](https://github.com/Telefonica/mistica-web/commit/328e013b7ee060ee926fdeecd9aaf561561045be))
* **Timer:** create component ([#1130](https://github.com/Telefonica/mistica-web/issues/1130)) ([0b3253e](https://github.com/Telefonica/mistica-web/commit/0b3253eed36a8b166d164702814eda5b8258adf6))
* **Touchable:** newTab support in to links ([#1143](https://github.com/Telefonica/mistica-web/issues/1143)) ([eff07e3](https://github.com/Telefonica/mistica-web/commit/eff07e3fd42d71d68760cf0d8a46a0f9712a3385))

# [15.10.0](https://github.com/Telefonica/mistica-web/compare/v15.9.0...v15.10.0) (2024-05-30)


### Bug Fixes

* **IconButton:** add borderRadius to button's overlay ([#1127](https://github.com/Telefonica/mistica-web/issues/1127)) ([5c4a665](https://github.com/Telefonica/mistica-web/commit/5c4a665fd56350fa84fb77f9e78cc6fa21b741fb))


### Features

* **Skin:** Movistar new a11y colors ([#1126](https://github.com/Telefonica/mistica-web/issues/1126)) ([1b203f4](https://github.com/Telefonica/mistica-web/commit/1b203f48a688423fef70ce8253c6659eae1e1db6))

# [15.9.0](https://github.com/Telefonica/mistica-web/compare/v15.8.0...v15.9.0) (2024-05-22)


### Features

* **Rows:** simplify component's logic, implement withChevron prop and allow right with controls ([#1122](https://github.com/Telefonica/mistica-web/issues/1122)) ([eb987e4](https://github.com/Telefonica/mistica-web/commit/eb987e4a56f2a081fa13fa21d34af1db238bf85b))

# [15.8.0](https://github.com/Telefonica/mistica-web/compare/v15.7.0...v15.8.0) (2024-05-17)


### Bug Fixes

* **Image:** fix bad aspect ratio cases ([#1119](https://github.com/Telefonica/mistica-web/issues/1119)) ([2bc69e1](https://github.com/Telefonica/mistica-web/commit/2bc69e1b1b51a68c9b91df256a867cc9c3823923))
* **TextFields:** Use textError color for errors ([#1125](https://github.com/Telefonica/mistica-web/issues/1125)) ([e9c5abd](https://github.com/Telefonica/mistica-web/commit/e9c5abd34d938a9367431b9ec1c7d3f8a5a4d7a4))


### Features

* **Accordion:** improve accessibility ([#1113](https://github.com/Telefonica/mistica-web/issues/1113)) ([f85142c](https://github.com/Telefonica/mistica-web/commit/f85142ce65037df78e420a9fbe439665960e5c8c))

# [15.7.0](https://github.com/Telefonica/mistica-web/compare/v15.6.1...v15.7.0) (2024-05-13)


### Features

* **Rows, BoxedRow, Accordion, SnapCard, SmallNakedCard:** Color and structure hierarchy ([#1046](https://github.com/Telefonica/mistica-web/issues/1046)) ([3c7fc4f](https://github.com/Telefonica/mistica-web/commit/3c7fc4f9594d6121d30f6702e9f40878e50d333f))

## [15.6.1](https://github.com/Telefonica/mistica-web/compare/v15.6.0...v15.6.1) (2024-05-09)


### Bug Fixes

* **Chip, HighlightedCard, Row:** wrong types ([#1120](https://github.com/Telefonica/mistica-web/issues/1120)) ([47e8851](https://github.com/Telefonica/mistica-web/commit/47e885128d59ec5492bb57bddb6f4217d73ef7d7))

# [15.6.0](https://github.com/Telefonica/mistica-web/compare/v15.5.0...v15.6.0) (2024-05-09)


### Bug Fixes

* **AdvancedDataCard:** minHeight issues caused by [#1102](https://github.com/Telefonica/mistica-web/issues/1102) ([#1118](https://github.com/Telefonica/mistica-web/issues/1118)) ([5ff819f](https://github.com/Telefonica/mistica-web/commit/5ff819f12a20089b1c49dfbbf486f2a49eea75ae))
* **Image:** force async image decoding to avoid broken images in iOS ([#1111](https://github.com/Telefonica/mistica-web/issues/1111)) ([06b97f9](https://github.com/Telefonica/mistica-web/commit/06b97f94a38e640fcbf8e0726640dc4365334dfc))


### Features

* **Row,BoxedRow:** danger style ([#1101](https://github.com/Telefonica/mistica-web/issues/1101)) ([d1ab168](https://github.com/Telefonica/mistica-web/commit/d1ab168379bd76a77fb106f4dc796d7fc4abbbb9))

# [15.5.0](https://github.com/Telefonica/mistica-web/compare/v15.4.0...v15.5.0) (2024-05-07)


### Features

* **ResponsiveLayout, ResetResponsiveLayout, Hero, Slideshow:** refactor ResponsiveLayout and update components ([#1100](https://github.com/Telefonica/mistica-web/issues/1100)) ([7fc17d0](https://github.com/Telefonica/mistica-web/commit/7fc17d003f15a6cee11684901e0d718af49e3847))
* **ThemeContextProvider:** withoutStyles prop, to avoid injecting styles ([#1114](https://github.com/Telefonica/mistica-web/issues/1114)) ([da98f68](https://github.com/Telefonica/mistica-web/commit/da98f68f08844316ae3adf2ae1540a963a303bdf))

# [15.4.0](https://github.com/Telefonica/mistica-web/compare/v15.3.0...v15.4.0) (2024-05-06)


### Bug Fixes

* **AdvancedDataCard:** footer extra space ([#1102](https://github.com/Telefonica/mistica-web/issues/1102)) ([78e0e80](https://github.com/Telefonica/mistica-web/commit/78e0e805de8c6fb97c17fc82b5f4af0a0a5d5697))
* **Chip:** expand chips when inside a grid ([#1108](https://github.com/Telefonica/mistica-web/issues/1108)) ([32810ee](https://github.com/Telefonica/mistica-web/commit/32810ee9c082fe6b6157ffc83d1efc024f33ab88))
* **Dialog:** hide optional elements if not provided ([#1093](https://github.com/Telefonica/mistica-web/issues/1093)) ([1134b4a](https://github.com/Telefonica/mistica-web/commit/1134b4ad6be80fcae1f49d28800f46e5bfb94fbd))
* **Hero:** add bottom padding inside slideshow only when it has bullets ([#1106](https://github.com/Telefonica/mistica-web/issues/1106)) ([9be0e88](https://github.com/Telefonica/mistica-web/commit/9be0e88454260e1d752b59889346c867407976a9))
* **Hero:** use background instead of backgroundColor to support gradients ([#1091](https://github.com/Telefonica/mistica-web/issues/1091)) ([f4ba119](https://github.com/Telefonica/mistica-web/commit/f4ba119d14dd426df49729ccb8ef8c5df0abd332))
* **PreviewTools:** update non working animation for floating case ([#1095](https://github.com/Telefonica/mistica-web/issues/1095)) ([dfccad5](https://github.com/Telefonica/mistica-web/commit/dfccad5bc73ee19d008596b8bbf0ce653aa48c93))
* **RowBlock:** set description text alignment to the right ([#1092](https://github.com/Telefonica/mistica-web/issues/1092)) ([9494d02](https://github.com/Telefonica/mistica-web/commit/9494d0274444da9647aa76853a63f384357e943e))
* **RowList:** update logic to render last divider ([#1110](https://github.com/Telefonica/mistica-web/issues/1110)) ([8db09d7](https://github.com/Telefonica/mistica-web/commit/8db09d7e4328c3346d9b2138f7359f7d0cf841af))
* **Snackbar:** Desktop position ([#1096](https://github.com/Telefonica/mistica-web/issues/1096)) ([346f446](https://github.com/Telefonica/mistica-web/commit/346f4465ee825d2fb7f86e80efd370e3d15604bb))
* **Text:** make vivinho char replacement for screen readers work when Text have multiple children ([#1090](https://github.com/Telefonica/mistica-web/issues/1090)) ([e5c239c](https://github.com/Telefonica/mistica-web/commit/e5c239cac7fc97daf11de671d40453c21a7172dc))
* **Video:** avoid duplicated state update in Video's state machine ([#1107](https://github.com/Telefonica/mistica-web/issues/1107)) ([8ae2ea0](https://github.com/Telefonica/mistica-web/commit/8ae2ea000bba32c9b2d1cdfb4c448206cc88b462))


### Features

* **Accordion, Cards, Carousel, Feedback, Sheet, Slider:** replace Array with ReadonlyArray in props ([#1098](https://github.com/Telefonica/mistica-web/issues/1098)) ([22ee93a](https://github.com/Telefonica/mistica-web/commit/22ee93ac2952e5bcfbb758410cd52c4ab48e6f52))
* **ButtonLink:** change chevron icon in Vivo-new skin ([#1103](https://github.com/Telefonica/mistica-web/issues/1103)) ([caedc61](https://github.com/Telefonica/mistica-web/commit/caedc61fa8ffa88ee145e00f1b3d4b0c15b3c351))
* **FixedFooter:** Gradient background support ([#1073](https://github.com/Telefonica/mistica-web/issues/1073)) ([a7d4bd8](https://github.com/Telefonica/mistica-web/commit/a7d4bd8325bd76479560a834b66d993594f2a187))
* **Icons:** New routine and ethernet icons ([#1083](https://github.com/Telefonica/mistica-web/issues/1083)) ([edd7173](https://github.com/Telefonica/mistica-web/commit/edd71732f05367081e5868f745f304754bdb8a10))
* **Image:** add srcSet ([#1109](https://github.com/Telefonica/mistica-web/issues/1109)) ([fa63884](https://github.com/Telefonica/mistica-web/commit/fa63884a4aeb2b89e0f4504bae7607cfe1edeb98))
* **o2-new:** dark mode improvements ([#1105](https://github.com/Telefonica/mistica-web/issues/1105)) ([d92e404](https://github.com/Telefonica/mistica-web/commit/d92e404cfd3098c9c2f345aeefc37f80a3b69efc))
* **PosterCard:** improve accessibility ([#1087](https://github.com/Telefonica/mistica-web/issues/1087)) ([c56e177](https://github.com/Telefonica/mistica-web/commit/c56e1777c73cb9d4f337cc7e0e6d375cb8b4961c))
* **Row:** improve VoiceOver compatibility ([#1079](https://github.com/Telefonica/mistica-web/issues/1079)) ([02f43d7](https://github.com/Telefonica/mistica-web/commit/02f43d7c85f9978bd4f714c0c6a8c428e228929c))
* **Theme:** expose `colorValues` in theme ([#1104](https://github.com/Telefonica/mistica-web/issues/1104)) ([63c644e](https://github.com/Telefonica/mistica-web/commit/63c644e51b667868e7e3a2a7fb4f927158fffd02))

# [15.3.0](https://github.com/Telefonica/mistica-web/compare/v15.2.1...v15.3.0) (2024-04-22)


### Bug Fixes

* **FixedFooterLayout:** remove background applied by elevation in desktop ([#1081](https://github.com/Telefonica/mistica-web/issues/1081)) ([79804f8](https://github.com/Telefonica/mistica-web/commit/79804f8648606ed77029bfa02435dd7ffa06f9e5))
* **Image:** prevent loading skeleton from using default border radius value ([#1082](https://github.com/Telefonica/mistica-web/issues/1082)) ([68658df](https://github.com/Telefonica/mistica-web/commit/68658df54dcc4ddaa28ff32360597870eadea0ba))
* **Sheet:** fix sheets in large desktop sizes ([#1088](https://github.com/Telefonica/mistica-web/issues/1088)) ([0c49bf2](https://github.com/Telefonica/mistica-web/commit/0c49bf26de47cbfad411ed7906dcc6274805806f))
* **utils:** use `location.assign` to redirect, instead of `location.href` ([#1089](https://github.com/Telefonica/mistica-web/issues/1089)) ([428f0f6](https://github.com/Telefonica/mistica-web/commit/428f0f697126db995ccb1aea65cd1a79cdc50bd2))


### Features

* **AdvancedDataCard:** add trackingEvent when card is interactive ([#1086](https://github.com/Telefonica/mistica-web/issues/1086)) ([ff81726](https://github.com/Telefonica/mistica-web/commit/ff81726315aa8c84bfb3c4c28fdd15862116d22e))
* **Hero:** add noPaddingY and transparent background props ([#1077](https://github.com/Telefonica/mistica-web/issues/1077)) ([f80fe23](https://github.com/Telefonica/mistica-web/commit/f80fe23c0a37c92bdc7deb4e8e69d60b53099fd2))
* **Storybook:** use on-air font with movistar skin ([#1078](https://github.com/Telefonica/mistica-web/issues/1078)) ([a4d55bf](https://github.com/Telefonica/mistica-web/commit/a4d55bf624ad2e52f01556f962c289a6c10340e8))
* **vivo-type:** make screen readers read vivinho char as Vivo ([#1084](https://github.com/Telefonica/mistica-web/issues/1084)) ([fbb6611](https://github.com/Telefonica/mistica-web/commit/fbb6611ab5521648d8dbfa61ed9ba02a2aefbb6f))

## [15.2.1](https://github.com/Telefonica/mistica-web/compare/v15.2.0...v15.2.1) (2024-04-09)


### Bug Fixes

* **Row:** not having full width in some cases ([#1075](https://github.com/Telefonica/mistica-web/issues/1075)) ([434944f](https://github.com/Telefonica/mistica-web/commit/434944fc643df19d8a325d2c29ec9f0bcb10a18f))

# [15.2.0](https://github.com/Telefonica/mistica-web/compare/v15.1.0...v15.2.0) (2024-04-09)


### Features

* **DisplayMediaCard & PosterCard:** use cardContentOverlay token in overlay ([#1074](https://github.com/Telefonica/mistica-web/issues/1074)) ([a885ce2](https://github.com/Telefonica/mistica-web/commit/a885ce29e3e25c9c8b65de00e8dd9b84f5cc2a7c))
* **TextLink:** accesibility improvements ([#1072](https://github.com/Telefonica/mistica-web/issues/1072)) ([4179b3e](https://github.com/Telefonica/mistica-web/commit/4179b3ee74c19f8353327641f5cf1fca2af60735))

# [15.1.0](https://github.com/Telefonica/mistica-web/compare/v15.0.0...v15.1.0) (2024-04-08)


### Bug Fixes

* **IconButton:** prevent interactive area from affecting button layout ([#1069](https://github.com/Telefonica/mistica-web/issues/1069)) ([f377aac](https://github.com/Telefonica/mistica-web/commit/f377aac4eea1bc698ec9cfa1354ba2a37114fd15))


### Features

* **Accordion,Callout,Cards,EmptyState,Header,Hero,Row,NavigationBar:** added titleAs prop to allow configuring heading level ([#1067](https://github.com/Telefonica/mistica-web/issues/1067)) ([814c297](https://github.com/Telefonica/mistica-web/commit/814c2977d2612f65b290f89dda9a2f361cde4b71))
* **RowList, BoxedRowList, Inline:** support list a11y role ([#1068](https://github.com/Telefonica/mistica-web/issues/1068)) ([7e2fe37](https://github.com/Telefonica/mistica-web/commit/7e2fe3736d3399d990ec28d2e0107a7b7a3057c9)), closes [/github.com/Telefonica/mistica-web/blob/master/src/stack.tsx#L64](https://github.com//github.com/Telefonica/mistica-web/blob/master/src/stack.tsx/issues/L64)
* **skin:** o2 new brand ([#968](https://github.com/Telefonica/mistica-web/issues/968)) ([56e3945](https://github.com/Telefonica/mistica-web/commit/56e39454e7b144a3d6fe852162df8c52ed7a76bd))
* **Switch:** add minimum interactive area in touchable devices ([#1063](https://github.com/Telefonica/mistica-web/issues/1063)) ([fb202e7](https://github.com/Telefonica/mistica-web/commit/fb202e7669c651061d0ce473e8c22f0d31dbd8c1))
* **Touchable, Buttons:** Improve touchable and buttons accessibility ([#1070](https://github.com/Telefonica/mistica-web/issues/1070)) ([8d93c71](https://github.com/Telefonica/mistica-web/commit/8d93c71a672f1943d352f8ad7bb26b296c81b21d))

# [15.0.0](https://github.com/Telefonica/mistica-web/compare/v14.48.0...v15.0.0) (2024-04-01)


### Bug Fixes

* **Image:** reset error state when src changes ([#1062](https://github.com/Telefonica/mistica-web/issues/1062)) ([1cdb87a](https://github.com/Telefonica/mistica-web/commit/1cdb87af0da4e90150da23d7db115815bf03ce48))


### Features

* **Accordion,ButtonLink,List,Popover,Slider,Tooltip:** remove deprecated props ([#1052](https://github.com/Telefonica/mistica-web/issues/1052)) ([2e8add2](https://github.com/Telefonica/mistica-web/commit/2e8add2b9bc4e8dae10f57f0d2889ac27b817848))
* **IconButton:** update usage in CvvField and remove baseIconButton ([#1060](https://github.com/Telefonica/mistica-web/issues/1060)) ([117fc44](https://github.com/Telefonica/mistica-web/commit/117fc44eaf28333f81a1ab19c9cdb65420612d06))
* **Select:** add default value ([#1061](https://github.com/Telefonica/mistica-web/issues/1061)) ([a0d6a9b](https://github.com/Telefonica/mistica-web/commit/a0d6a9b22ea2758515e34e4c74ecbf1302f410a9))
* **skins:** remove O2 classic and Movistar legacy skins ([#1051](https://github.com/Telefonica/mistica-web/issues/1051)) ([c8be29a](https://github.com/Telefonica/mistica-web/commit/c8be29a8fbedf409e2cc5f5ceb4df18ed0046530))
* **Tag:** Use new tokens in tags ([#1054](https://github.com/Telefonica/mistica-web/issues/1054)) ([ff87327](https://github.com/Telefonica/mistica-web/commit/ff873279171e3703740f286fcb5cbaef86cebc1e))


### BREAKING CHANGES

* **skins:** remove O2 classic and Movistar legacy skins
* **Accordion,ButtonLink,List,Popover,Slider,Tooltip:** remove deprecated props in some components

# [14.48.0](https://github.com/Telefonica/mistica-web/compare/v14.47.0...v14.48.0) (2024-03-26)


### Bug Fixes

* **Form:** remove error state when input is disabled ([#1057](https://github.com/Telefonica/mistica-web/issues/1057)) ([82f1938](https://github.com/Telefonica/mistica-web/commit/82f19382563c17ba362ad4b104c36db6eade9afa))


### Features

* **ButtonLayout:** change alignment logic ([#1055](https://github.com/Telefonica/mistica-web/issues/1055)) ([3ce0fac](https://github.com/Telefonica/mistica-web/commit/3ce0fac8848874b52fc2cd169304ebee8a449a81))
* **PosterCard:** add subtitle and change description color ([#1056](https://github.com/Telefonica/mistica-web/issues/1056)) ([ec3f40c](https://github.com/Telefonica/mistica-web/commit/ec3f40c2207044b7d5e4f4436ebafe9a67ce770a))

# [14.47.0](https://github.com/Telefonica/mistica-web/compare/v14.46.0...v14.47.0) (2024-03-20)


### Bug Fixes

* **Row,BoxedRow:** main touchable area when using iconButton + onPress. Allow trackingEvent in rows with double interaction ([#1053](https://github.com/Telefonica/mistica-web/issues/1053)) ([db3347f](https://github.com/Telefonica/mistica-web/commit/db3347f3f78ce3c2dcf6aabc8ae4b15696d98c24))


### Features

* **overscroll color:** change implementation and allow setting bottom overscroll color too ([#1043](https://github.com/Telefonica/mistica-web/issues/1043)) ([468bd0c](https://github.com/Telefonica/mistica-web/commit/468bd0c17c2ee7c6254bb7a55042c210dd29b028))
* **skin:** update design tokens ([#1049](https://github.com/Telefonica/mistica-web/issues/1049)) ([4b87c32](https://github.com/Telefonica/mistica-web/commit/4b87c326788fc436e907cefa361ddd5f8a06425e))

# [14.46.0](https://github.com/Telefonica/mistica-web/compare/v14.45.0...v14.46.0) (2024-03-13)


### Bug Fixes

* **CSS:** prevent browser default behaviours when long pressing or dragging links ([#1045](https://github.com/Telefonica/mistica-web/issues/1045)) ([717343d](https://github.com/Telefonica/mistica-web/commit/717343dd27c536d7760d37c72ea2cc89a19c66bf))
* **HighlightedCard:** improve optional types of title and description, make one mandatory ([#1039](https://github.com/Telefonica/mistica-web/issues/1039)) ([a818ffa](https://github.com/Telefonica/mistica-web/commit/a818ffa4f58bdf77c9d1ce3a42ea82de12a7a214))
* **Logo:** old version of Tu logo ([#1036](https://github.com/Telefonica/mistica-web/issues/1036)) ([0dc09e2](https://github.com/Telefonica/mistica-web/commit/0dc09e2103ffbefac2ef8573edd30172488b789a))
* **Switch:** iOS background in dark mode ([#1037](https://github.com/Telefonica/mistica-web/issues/1037)) ([a77c42d](https://github.com/Telefonica/mistica-web/commit/a77c42d587dbec0512559cf82cc841a2abf24171))


### Features

* **dialogs:** Remove history hacks in dialog ([#1041](https://github.com/Telefonica/mistica-web/issues/1041)) ([2a48cb4](https://github.com/Telefonica/mistica-web/commit/2a48cb48fb923cf97ee8f88ddc990dd865c246de))
* **IconButton:** update internal usages in Mistica components ([#1044](https://github.com/Telefonica/mistica-web/issues/1044)) ([12bf970](https://github.com/Telefonica/mistica-web/commit/12bf970d1b11e58ec88a9339df9921fac2623df9))
* **Icons:** New vivo icons ([#1038](https://github.com/Telefonica/mistica-web/issues/1038)) ([d070a25](https://github.com/Telefonica/mistica-web/commit/d070a250083f630e1b566c4f1c92cd4001fba1b8))
* **Input fields:** update iconButton in all fields ([#1042](https://github.com/Telefonica/mistica-web/issues/1042)) ([062c0bd](https://github.com/Telefonica/mistica-web/commit/062c0bdc627926a08dd18faea8a3777cb40c4988))
* **Naked & Small Naked Card:** Inner padding right in card content ([#1040](https://github.com/Telefonica/mistica-web/issues/1040)) ([d97ea17](https://github.com/Telefonica/mistica-web/commit/d97ea17c095bc1315b151fbf68dd051ea9444040))
* **Rows:** add icon button as control ([#1030](https://github.com/Telefonica/mistica-web/issues/1030)) ([4d47e8f](https://github.com/Telefonica/mistica-web/commit/4d47e8f5b1f2645c1d6036822bc3198eea806422))
* **ToggleIconButton:** create component ([#1034](https://github.com/Telefonica/mistica-web/issues/1034)) ([f4b9c6e](https://github.com/Telefonica/mistica-web/commit/f4b9c6e599eabe1c8492ab1ce55c422f14875fad))
* **Video:** `stop` method. To stop video and show the poster (if available) ([#1035](https://github.com/Telefonica/mistica-web/issues/1035)) ([e21998f](https://github.com/Telefonica/mistica-web/commit/e21998f66d601dee75c9d54aa5ab3c13203d502b))

# [14.45.0](https://github.com/Telefonica/mistica-web/compare/v14.44.0...v14.45.0) (2024-02-29)


### Bug Fixes

* **SuccessFeedbackScreen:** remove unnecesary background color ([#1029](https://github.com/Telefonica/mistica-web/issues/1029)) ([557b989](https://github.com/Telefonica/mistica-web/commit/557b98965e9a382bcc590619a65117f1761d5944))


### Features

* **Badge, Tag:** add badge to Tag and fix Badge's border and fontSize scaling ([#1025](https://github.com/Telefonica/mistica-web/issues/1025)) ([a7b31a7](https://github.com/Telefonica/mistica-web/commit/a7b31a707f31c4d8baf490de84e52f867a60d860))
* **ButtonIcon:** refactor component ([#1022](https://github.com/Telefonica/mistica-web/issues/1022)) ([c8a82c6](https://github.com/Telefonica/mistica-web/commit/c8a82c6ce7f8a89a9a6ea5d9ed53b3361613d1e5))
* **HighlightedCard:** Title & Description optional ([#1033](https://github.com/Telefonica/mistica-web/issues/1033)) ([7ebbb48](https://github.com/Telefonica/mistica-web/commit/7ebbb48bc7669f6e29be0e0aa333b50cc216c453))

# [14.44.0](https://github.com/Telefonica/mistica-web/compare/v14.43.0...v14.44.0) (2024-02-20)


### Features

* **skins:** new Tu skin ([#959](https://github.com/Telefonica/mistica-web/issues/959)) ([11197a8](https://github.com/Telefonica/mistica-web/commit/11197a8fcb3810f9017449056e84b64968f5a7f9))

# [14.43.0](https://github.com/Telefonica/mistica-web/compare/v14.42.1...v14.43.0) (2024-02-20)


### Bug Fixes

* **Carousel:** Add workaround for zero width webviews. Remount when webview size changes from 0 to any other value ([#1026](https://github.com/Telefonica/mistica-web/issues/1026)) ([36ab108](https://github.com/Telefonica/mistica-web/commit/36ab108bff9b9f3504cf479cd4d0ff2e188bf4ad))
* **Select:** options have wrong styling when field is over inverse variant  ([#1024](https://github.com/Telefonica/mistica-web/issues/1024)) ([fc7849f](https://github.com/Telefonica/mistica-web/commit/fc7849f585839a2712024348a77e0a2986be7eb3))
* **SuccessFeebackScreen:** fix content background ([#1021](https://github.com/Telefonica/mistica-web/issues/1021)) ([dff56b2](https://github.com/Telefonica/mistica-web/commit/dff56b28b9e4c035c5c1e57d8781fdab64180d74))


### Features

* **Popover, Tooltip:** refactor components in order to share the same logic between them ([#1014](https://github.com/Telefonica/mistica-web/issues/1014)) ([a343fbd](https://github.com/Telefonica/mistica-web/commit/a343fbdba0383c62552361f27aa5c8b03640d654))

## [14.42.1](https://github.com/Telefonica/mistica-web/compare/v14.42.0...v14.42.1) (2024-02-08)


### Bug Fixes

* **Dialogs:** Execute back navigation before accept/cancel callbacks ([#1018](https://github.com/Telefonica/mistica-web/issues/1018)) ([a631f9a](https://github.com/Telefonica/mistica-web/commit/a631f9aa511706a903729c8c94965d89a149c773))
* **FeedbackScreen:** inverse background color and overscroll color ([#1020](https://github.com/Telefonica/mistica-web/issues/1020)) ([bee7dd6](https://github.com/Telefonica/mistica-web/commit/bee7dd62ce8c5ea99e0c717c8e19fdaca651822e))
* **Text:** word wrapping is not working when truncate's value is greater than one ([#1017](https://github.com/Telefonica/mistica-web/issues/1017)) ([d65b149](https://github.com/Telefonica/mistica-web/commit/d65b149ea14ca47dc8f95fc4110b1d7024df0a6c))

# [14.42.0](https://github.com/Telefonica/mistica-web/compare/v14.41.0...v14.42.0) (2024-02-05)


### Bug Fixes

* **Button, ButtonLink:** make icons grow with fontsize and align Link chevron to baseline ([#1011](https://github.com/Telefonica/mistica-web/issues/1011)) ([1ded678](https://github.com/Telefonica/mistica-web/commit/1ded678a3721f992484d5c20531c8b62ee8d0148))
* **Dialog:** add  deprecated prop to keep backwards compatibility ([#1005](https://github.com/Telefonica/mistica-web/issues/1005)) ([49851f7](https://github.com/Telefonica/mistica-web/commit/49851f7d3a58efd46f0ca99a26580a6fe76790c9))
* **Feedback:** CLS after hydrate SSRed feedbacks ([#1004](https://github.com/Telefonica/mistica-web/issues/1004)) ([56a366a](https://github.com/Telefonica/mistica-web/commit/56a366a86d114c4376894ef5b28a1b60d8a9d714))
* **Inline:** improve fullWidth case ([#1007](https://github.com/Telefonica/mistica-web/issues/1007)) ([2fc75f2](https://github.com/Telefonica/mistica-web/commit/2fc75f2d75b0979bed2bca8e903028a3c4aa86eb))
* **LoadingBar:** update broken animation ([#1010](https://github.com/Telefonica/mistica-web/issues/1010)) ([31764fd](https://github.com/Telefonica/mistica-web/commit/31764fdb3f976f3b8d2cd6e5bfee428f1fdf15d6))


### Features

* **Dialogs:** Improve implementation. Create `useDialog` hook. Deprecate `alert`, `confirm` and `dialog` functions ([#997](https://github.com/Telefonica/mistica-web/issues/997)) ([44afa30](https://github.com/Telefonica/mistica-web/commit/44afa3040fc1e1aab60c8eb4fc7e2c53f1e10db6))
* **Input fields:** multiple bugs fixed and improved accesibility ([#1002](https://github.com/Telefonica/mistica-web/issues/1002)) ([479b0c5](https://github.com/Telefonica/mistica-web/commit/479b0c51a14c48c537829a12cb37bd708815c13c))
* **Slideshow,Carousel:** allow controlling the carousel from external component ([#1009](https://github.com/Telefonica/mistica-web/issues/1009)) ([58a4bd3](https://github.com/Telefonica/mistica-web/commit/58a4bd3881aed40587c7c25ed03c24d65e5d2b1c))

# [14.41.0](https://github.com/Telefonica/mistica-web/compare/v14.40.0...v14.41.0) (2024-01-23)


### Features

* **skin:** update vivo-new colors improving a11y ([#995](https://github.com/Telefonica/mistica-web/issues/995)) ([c38d01e](https://github.com/Telefonica/mistica-web/commit/c38d01e3631016ef5527c09116a767667daf17bb))
* **useDisableBodyScroll:** Keep original body styles when disabling scroll. Use this hook in Sheet ([#1003](https://github.com/Telefonica/mistica-web/issues/1003)) ([3ed3faf](https://github.com/Telefonica/mistica-web/commit/3ed3faf94585cf49c7a84376d1bfb44e776b0412))

# [14.40.0](https://github.com/Telefonica/mistica-web/compare/v14.39.1...v14.40.0) (2024-01-22)


### Bug Fixes

* **AdvancedDataCard:** button margin ([#988](https://github.com/Telefonica/mistica-web/issues/988)) ([59e7b9c](https://github.com/Telefonica/mistica-web/commit/59e7b9c352ba5b9bf50f405980643d0831b2beba))
* **Carousel:** avoid vertical scroll caused by bullets ([#990](https://github.com/Telefonica/mistica-web/issues/990)) ([be0406b](https://github.com/Telefonica/mistica-web/commit/be0406b02de7e9861d07fb8de0053a5f629ac846))
* **Carousel:** remove bottom padding when withBullets=false ([#999](https://github.com/Telefonica/mistica-web/issues/999)) ([fb5b9c5](https://github.com/Telefonica/mistica-web/commit/fb5b9c5c3980d0c5a638681206df4a39b47d77a8))
* **Carousel:** SSR Layout shift issues ([#991](https://github.com/Telefonica/mistica-web/issues/991)) ([aba1f65](https://github.com/Telefonica/mistica-web/commit/aba1f657734a170ff9fd68aee48f41dfaceb9eec))
* **InputFields:** Align text to the left in date/time input fields. In iOS they are centered by default. ([#993](https://github.com/Telefonica/mistica-web/issues/993)) ([6fb4ad4](https://github.com/Telefonica/mistica-web/commit/6fb4ad48c341b120b6d5f29512657a26ea596638))
* **Playroom:** replace deprecated file-loader with asset modules in webpack config ([#996](https://github.com/Telefonica/mistica-web/issues/996)) ([d03c33a](https://github.com/Telefonica/mistica-web/commit/d03c33a67422cb9603a11ad521a15dc2706b537f))
* **Tooltip:** align arrow correctly when tooltip is close to viewport's edge ([#985](https://github.com/Telefonica/mistica-web/issues/985)) ([506d512](https://github.com/Telefonica/mistica-web/commit/506d5122d87eb0ecd2a48ec50175a238754d1099))


### Features

* **Inline:** use flex/grid gap if available ([#987](https://github.com/Telefonica/mistica-web/issues/987)) ([f7254c7](https://github.com/Telefonica/mistica-web/commit/f7254c7739080b978c7bb1ed1db33149bbdd2db5))
* **Sheet:** add safe inset area to content ([#1000](https://github.com/Telefonica/mistica-web/issues/1000)) ([0b71040](https://github.com/Telefonica/mistica-web/commit/0b710406b93443a985090c8278194ca9ff2b731e))
* **Storybook:** upgrade to version 7.6.6 ([#983](https://github.com/Telefonica/mistica-web/issues/983)) ([fd752c1](https://github.com/Telefonica/mistica-web/commit/fd752c19b5709ca680fc57a98f3b7c3add814fc0))
* **Text:** prioritize wrapping before breaking if word fits in container ([#1001](https://github.com/Telefonica/mistica-web/issues/1001)) ([5625373](https://github.com/Telefonica/mistica-web/commit/5625373a811ce441f17f28ea5faff22861ea2593))

## [14.39.1](https://github.com/Telefonica/mistica-web/compare/v14.39.0...v14.39.1) (2024-01-09)


### Bug Fixes

* **Accordion:** make component not responsive to changes in defaultValue ([#989](https://github.com/Telefonica/mistica-web/issues/989)) ([dbd83c0](https://github.com/Telefonica/mistica-web/commit/dbd83c0672304fec26b8c88980412046c8e05cd1))
* **BrandLoadingScreen:** issue with lottie animation when CSP is enabled ([#994](https://github.com/Telefonica/mistica-web/issues/994)) ([749ae76](https://github.com/Telefonica/mistica-web/commit/749ae76347622ac435e8bbb07c3a9788ebc6f976))

# [14.39.0](https://github.com/Telefonica/mistica-web/compare/v14.38.0...v14.39.0) (2023-12-29)


### Features

* **SSR:** avoid CLS when hydrating some SSRed components ([#961](https://github.com/Telefonica/mistica-web/issues/961)) ([878957a](https://github.com/Telefonica/mistica-web/commit/878957aed11b94ee8dd0840a1f24a494a0d113ed))

# [14.38.0](https://github.com/Telefonica/mistica-web/compare/v14.37.0...v14.38.0) (2023-12-27)


### Bug Fixes

* **Inline:** Workaround for iOS to avoid cutting elements like Chips inside Inline containers ([#986](https://github.com/Telefonica/mistica-web/issues/986)) ([fa88ad7](https://github.com/Telefonica/mistica-web/commit/fa88ad78b7830245dd489d3bcfb79ed550957f35))


### Features

* **LoadingScreen,BrandLoadingScreen:** new components ([#982](https://github.com/Telefonica/mistica-web/issues/982)) ([c67b57b](https://github.com/Telefonica/mistica-web/commit/c67b57be7f1aa2694b7be1caae690c156adeb1f0))

# [14.37.0](https://github.com/Telefonica/mistica-web/compare/v14.36.1...v14.37.0) (2023-12-21)


### Bug Fixes

* **Sheet, Cards:** prioritize dataAttributes component-name from parent element ([#975](https://github.com/Telefonica/mistica-web/issues/975)) ([4134bb2](https://github.com/Telefonica/mistica-web/commit/4134bb22a03aee72b5c4d5b963ebf9a08998882d))
* **TextField:** multiline text visible under label ([#984](https://github.com/Telefonica/mistica-web/issues/984)) ([238d675](https://github.com/Telefonica/mistica-web/commit/238d67548c553f59d9526c2686f96ea03a3fbfd2))


### Features

* **ButtonLinkDanger:** create component ([#970](https://github.com/Telefonica/mistica-web/issues/970)) ([992c3f5](https://github.com/Telefonica/mistica-web/commit/992c3f52496d468400422ad4e5e18f08a14d6253))
* **ThemeContextProvider:** Add support for Next14 Link component ([#981](https://github.com/Telefonica/mistica-web/issues/981)) ([a0bbeb8](https://github.com/Telefonica/mistica-web/commit/a0bbeb8ed928ffbcd95ad346e42c5ccac9bca39a))
* **VerticalMosaic, HorizontalMosaic:** create Mosaic components ([#974](https://github.com/Telefonica/mistica-web/issues/974)) ([6f2a7e0](https://github.com/Telefonica/mistica-web/commit/6f2a7e0c985d073405302231b08c67cdd84638fb))

## [14.36.1](https://github.com/Telefonica/mistica-web/compare/v14.36.0...v14.36.1) (2023-12-14)


### Bug Fixes

* **Image,Video:** remove `fallbackVar` from components code ([#978](https://github.com/Telefonica/mistica-web/issues/978)) ([1b1a151](https://github.com/Telefonica/mistica-web/commit/1b1a151c89b86a86af7ef18438d9514d41f595b3))

# [14.36.0](https://github.com/Telefonica/mistica-web/compare/v14.35.0...v14.36.0) (2023-12-13)


### Bug Fixes

* **Checkbox:** wrong clickable area ([#971](https://github.com/Telefonica/mistica-web/issues/971)) ([2dba970](https://github.com/Telefonica/mistica-web/commit/2dba970440047f011826ab8f3a856aae5a2e2a59))


### Features

* **Icons:** New icons ([#964](https://github.com/Telefonica/mistica-web/issues/964)) ([d273df2](https://github.com/Telefonica/mistica-web/commit/d273df29b3293e35303e9ce37631c444fb4f36b2))
* **Snackbar:** imperative `snackbar` function to show snackbars ([#960](https://github.com/Telefonica/mistica-web/issues/960)) ([53483bf](https://github.com/Telefonica/mistica-web/commit/53483bfe1cfae9b90c2dd5fbbbb7b0361d60057f))

# [14.35.0](https://github.com/Telefonica/mistica-web/compare/v14.34.0...v14.35.0) (2023-12-11)


### Bug Fixes

* **Overlay:** stop event propagation on click ([#973](https://github.com/Telefonica/mistica-web/issues/973)) ([bf94030](https://github.com/Telefonica/mistica-web/commit/bf94030bd1a9d79a9102f43d2d19ced905240b62))
* **Tooltip:** make component reactive to changes in tooltip content ([#963](https://github.com/Telefonica/mistica-web/issues/963)) ([f49e9c8](https://github.com/Telefonica/mistica-web/commit/f49e9c85542bfa10ba61df41eaadfd4adc73902a))


### Features

* **Image, Video:** use smallMedia token for border radius in some components ([#962](https://github.com/Telefonica/mistica-web/issues/962)) ([958f659](https://github.com/Telefonica/mistica-web/commit/958f659a26c39930621c2cea393bf5e67c6071de))
* **skin:** update design tokens ([#958](https://github.com/Telefonica/mistica-web/issues/958)) ([eff9c36](https://github.com/Telefonica/mistica-web/commit/eff9c36579bbc631b14677d488a1d5d84593199e))
* **Tooltip, Slider:** rewrite components from scratch ([#922](https://github.com/Telefonica/mistica-web/issues/922)) ([77b25e5](https://github.com/Telefonica/mistica-web/commit/77b25e539e38a7e50ee64f21a13e38f971413819))

# [14.34.0](https://github.com/Telefonica/mistica-web/compare/v14.33.0...v14.34.0) (2023-11-29)


### Features

* **Next.js:** improved RSC support ([#954](https://github.com/Telefonica/mistica-web/issues/954)) ([2ff9956](https://github.com/Telefonica/mistica-web/commit/2ff99566d66b1301f7fa8ff5a8862ca400bb9a9e))

# [14.33.0](https://github.com/Telefonica/mistica-web/compare/v14.32.1...v14.33.0) (2023-11-29)


### Bug Fixes

* **Blocks:** Set array props as read only ([#956](https://github.com/Telefonica/mistica-web/issues/956)) ([e7b4ad7](https://github.com/Telefonica/mistica-web/commit/e7b4ad7a91fe3502302a399e12418ff82dec4d86))
* **ButtonFixedFooterLayout:** footer alignment in large desktop viewport ([#946](https://github.com/Telefonica/mistica-web/issues/946)) ([633d7ab](https://github.com/Telefonica/mistica-web/commit/633d7ab0a1421258e25b0eaa8bdb16d71f3a0fe8))
* **CreditCardExpirationField:** fix wrong formatting when editing field's value ([#948](https://github.com/Telefonica/mistica-web/issues/948)) ([db99dad](https://github.com/Telefonica/mistica-web/commit/db99daddbe657441487ba2de5b39ff5be6ace184))
* **useDisableBodyScroll:** fix nested usage ([#949](https://github.com/Telefonica/mistica-web/issues/949)) ([c54c9e0](https://github.com/Telefonica/mistica-web/commit/c54c9e0c458a7dfbf36b79e99fb22aa18f8196b3))


### Features

* **Tabs:** add inverse/alternative variant, update story and add tests ([#950](https://github.com/Telefonica/mistica-web/issues/950)) ([2ade9f7](https://github.com/Telefonica/mistica-web/commit/2ade9f7ca97d47c86dd43209efa77872fa49f5ed))

## [14.32.1](https://github.com/Telefonica/mistica-web/compare/v14.32.0...v14.32.1) (2023-11-17)


### Bug Fixes

* **AdvancedDataCard:** onPress/href/to should be optional ([#947](https://github.com/Telefonica/mistica-web/issues/947)) ([af0f3e6](https://github.com/Telefonica/mistica-web/commit/af0f3e6efd510353319d7ad6a75b8d81f9ec8a61))

# [14.32.0](https://github.com/Telefonica/mistica-web/compare/v14.31.1...v14.32.0) (2023-11-16)


### Bug Fixes

* **ScreenReaderOnly:** Fix ScreenReaderOnly positioning to avoid scrolling issues ([#942](https://github.com/Telefonica/mistica-web/issues/942)) ([f6537e9](https://github.com/Telefonica/mistica-web/commit/f6537e91014a7be1c23ff81d374810c164da0b0e))


### Features

* **AdvancedDataCard:** support for href/to ([#859](https://github.com/Telefonica/mistica-web/issues/859)) ([ba5eafb](https://github.com/Telefonica/mistica-web/commit/ba5eafba576ae726544ba3ccf88101ecc4c916c2))

## [14.31.1](https://github.com/Telefonica/mistica-web/compare/v14.31.0...v14.31.1) (2023-11-16)


### Bug Fixes

* **Carousel:** avoid immediate style reflow on component mount ([#945](https://github.com/Telefonica/mistica-web/issues/945)) ([c46206e](https://github.com/Telefonica/mistica-web/commit/c46206eff42c6e76cbbe5b0ed6859967de636281))

# [14.31.0](https://github.com/Telefonica/mistica-web/compare/v14.30.0...v14.31.0) (2023-11-16)


### Bug Fixes

* **FixedFooterLayout:** consider bottom inset area for calculations ([#943](https://github.com/Telefonica/mistica-web/issues/943)) ([23c7544](https://github.com/Telefonica/mistica-web/commit/23c75444a8e2234b6685d2d51b10f68565df6819))


### Features

* **createNestableContext:** allow custom valuesReducer ([#941](https://github.com/Telefonica/mistica-web/issues/941)) ([ec5b2a1](https://github.com/Telefonica/mistica-web/commit/ec5b2a104ad8c84b96a1d5862f576b7886df96c9))
* **skin:** update design tokens ([#938](https://github.com/Telefonica/mistica-web/issues/938)) ([605c517](https://github.com/Telefonica/mistica-web/commit/605c51712e11a341d4320af44ede06c7055ab125))

# [14.30.0](https://github.com/Telefonica/mistica-web/compare/v14.29.0...v14.30.0) (2023-11-13)


### Features

* **CardActionIconButton:** element to use in card actions ([#936](https://github.com/Telefonica/mistica-web/issues/936)) ([ac1a6c4](https://github.com/Telefonica/mistica-web/commit/ac1a6c4ecfd6eeabb0a98d8cdd332ece480af382))

# [14.29.0](https://github.com/Telefonica/mistica-web/compare/v14.28.1...v14.29.0) (2023-11-13)


### Bug Fixes

* **Accordion, RowList:** remove last divider ([#929](https://github.com/Telefonica/mistica-web/issues/929)) ([e9de2b4](https://github.com/Telefonica/mistica-web/commit/e9de2b495a13076b623c18e98bdbce2c2327591c))
* **Carousel:** change regular mobilePageOffset to 24px ([#935](https://github.com/Telefonica/mistica-web/issues/935)) ([13d8864](https://github.com/Telefonica/mistica-web/commit/13d88642a446529a2ca465bf8b4d16a57b4bdb10))


### Features

* **ButtonLayout:** every button has their own size ([#933](https://github.com/Telefonica/mistica-web/issues/933)) ([007d948](https://github.com/Telefonica/mistica-web/commit/007d948f179dde327b586d1455b2d12502f203d3))
* **Counter:** create component ([#927](https://github.com/Telefonica/mistica-web/issues/927)) ([211f826](https://github.com/Telefonica/mistica-web/commit/211f82612989d9a6ea4d4f0d75fd835b42567a09))
* **Snackbar:** support persistent snackbars and dismiss button ([#924](https://github.com/Telefonica/mistica-web/issues/924)) ([dd522d5](https://github.com/Telefonica/mistica-web/commit/dd522d5bd577a774f0d152f7042159882ef71d68))

## [14.28.1](https://github.com/Telefonica/mistica-web/compare/v14.28.0...v14.28.1) (2023-10-27)


### Bug Fixes

* **icons:** remove svgo optimizations that made some icons break in iOS ([#925](https://github.com/Telefonica/mistica-web/issues/925)) ([6889290](https://github.com/Telefonica/mistica-web/commit/6889290d8ea38f33ede0d0024ae07243f6bda756))

# [14.28.0](https://github.com/Telefonica/mistica-web/compare/v14.27.0...v14.28.0) (2023-10-25)


### Features

* **PhoneNumberField:** Update formatting for Brazil ([#915](https://github.com/Telefonica/mistica-web/issues/915)) ([102466b](https://github.com/Telefonica/mistica-web/commit/102466b0f0fa443a055a859e5ba57ad44c525005))
* **ResponsiveLayout:** nested ResponsiveLayout background takes precedence ([#909](https://github.com/Telefonica/mistica-web/issues/909)) ([3c0fe11](https://github.com/Telefonica/mistica-web/commit/3c0fe113cad6d521ee2622e2b18dfcf1fdf59c3f))

# [14.27.0](https://github.com/Telefonica/mistica-web/compare/v14.26.1...v14.27.0) (2023-10-19)


### Features

* **Buttons, Touchable, Menu:** accessibility improvements ([#917](https://github.com/Telefonica/mistica-web/issues/917)) ([9580cfe](https://github.com/Telefonica/mistica-web/commit/9580cfe3ff7a8291510f3dfb21043b10cf17f895))

## [14.26.1](https://github.com/Telefonica/mistica-web/compare/v14.26.0...v14.26.1) (2023-10-19)


### Bug Fixes

* **Tabs:** text alignment ([6152970](https://github.com/Telefonica/mistica-web/commit/6152970c565a13fdd4eb1d56d1cdcc747875284b))

# [14.26.0](https://github.com/Telefonica/mistica-web/compare/v14.25.0...v14.26.0) (2023-10-18)


### Bug Fixes

* **Carousel:** cards bottom border being partially cut in iOS ([#920](https://github.com/Telefonica/mistica-web/issues/920)) ([754acc6](https://github.com/Telefonica/mistica-web/commit/754acc663866203a2fb8352e1f4a4ad5f0ab479c))
* **Video, DisplayMediaCard, PosterCard:** show fallback on empty src ([#910](https://github.com/Telefonica/mistica-web/issues/910)) ([4e366d3](https://github.com/Telefonica/mistica-web/commit/4e366d3bece91cbb16b6ca6b83e1e864d8473b38))


### Features

* **Accordion:** create Accordion and BoxedAccordion components ([#900](https://github.com/Telefonica/mistica-web/issues/900)) ([7062a43](https://github.com/Telefonica/mistica-web/commit/7062a432c09ee574c130c5f437e3c5cdba6cf0df))
* **Icons:** use icon keywords from mistica design in catalog story ([#914](https://github.com/Telefonica/mistica-web/issues/914)) ([286e385](https://github.com/Telefonica/mistica-web/commit/286e38523d62e3c79342a6b166643e78179c2deb))
* **Menu:** fix component styles and add MenuItem/MenuSection ([#892](https://github.com/Telefonica/mistica-web/issues/892)) ([d7a7e30](https://github.com/Telefonica/mistica-web/commit/d7a7e30ff9002c81a86e532b6cbe4ee009a0287c)), closes [#901](https://github.com/Telefonica/mistica-web/issues/901)
* **Mobile:** add interaction states when pressing touchable elements ([#912](https://github.com/Telefonica/mistica-web/issues/912)) ([dbd8ac0](https://github.com/Telefonica/mistica-web/commit/dbd8ac0914b7a6647fda5778613cbe533cb44c03))
* **OverscrollColor, Storybook:** overscroll alternative variant and storybook default platform detection ([#919](https://github.com/Telefonica/mistica-web/issues/919)) ([77d9b45](https://github.com/Telefonica/mistica-web/commit/77d9b459d3a9fa4548814d0fb981a8b43061efe4))
* **PinField:** new component ([#902](https://github.com/Telefonica/mistica-web/issues/902)) ([484dbc7](https://github.com/Telefonica/mistica-web/commit/484dbc7ca4dd0cec5fc3bb908c5c46cc69b35f39)), closes [#893](https://github.com/Telefonica/mistica-web/issues/893)
* **ProgressBarStepped:** create component ([#905](https://github.com/Telefonica/mistica-web/issues/905)) ([25ed4eb](https://github.com/Telefonica/mistica-web/commit/25ed4eb567e7c7cffde7fb76a72e0967741500f9))

# [14.25.0](https://github.com/Telefonica/mistica-web/compare/v14.24.1...v14.25.0) (2023-10-09)


### Features

* **skin:** update design tokens ([#893](https://github.com/Telefonica/mistica-web/issues/893)) ([736a655](https://github.com/Telefonica/mistica-web/commit/736a655fd6eff911bce9d1b99e90d80f9dd15342))
* **Slider:** new component ([#867](https://github.com/Telefonica/mistica-web/issues/867)) ([4e02a0d](https://github.com/Telefonica/mistica-web/commit/4e02a0da103ebc4f3ad5e73d5d1c006fae38ee1c))

## [14.24.1](https://github.com/Telefonica/mistica-web/compare/v14.24.0...v14.24.1) (2023-10-04)


### Bug Fixes

* **reset.css:** avoid iOS Safari to unexpectedly zoom some font sizes ([#904](https://github.com/Telefonica/mistica-web/issues/904)) ([92f7258](https://github.com/Telefonica/mistica-web/commit/92f7258f6825e379d0d43cabb39cd19970edeaaf))

# [14.24.0](https://github.com/Telefonica/mistica-web/compare/v14.23.1...v14.24.0) (2023-09-28)


### Features

* **Sheet:** multiline support for description ([#896](https://github.com/Telefonica/mistica-web/issues/896)) ([0c328bf](https://github.com/Telefonica/mistica-web/commit/0c328bf4c2c19cc4f57438416e479326988a2999))

## [14.23.1](https://github.com/Telefonica/mistica-web/compare/v14.23.0...v14.23.1) (2023-09-25)


### Bug Fixes

* **Header:** don't render title when not provided ([#898](https://github.com/Telefonica/mistica-web/issues/898)) ([b760243](https://github.com/Telefonica/mistica-web/commit/b760243d6c905befb8e5c97e80e5e59b9075e916))
* **Snackbar:** z-index conflict with FixedFooterLayout ([#897](https://github.com/Telefonica/mistica-web/issues/897)) ([0d86e02](https://github.com/Telefonica/mistica-web/commit/0d86e027ba73937b091f1c04bf1099fdb21aa72d))
* **SuccessFeedback:** Vivo-new icon size change ([#895](https://github.com/Telefonica/mistica-web/issues/895)) ([71c5297](https://github.com/Telefonica/mistica-web/commit/71c5297fcef8be8c9ec7b0c1aee8b3972a4b76df))

# [14.23.0](https://github.com/Telefonica/mistica-web/compare/v14.22.2...v14.23.0) (2023-09-22)


### Bug Fixes

* **Cards:** use polyfill for aspectRatio to prevent Safari from behaving different than other browsers ([#890](https://github.com/Telefonica/mistica-web/issues/890)) ([f81490f](https://github.com/Telefonica/mistica-web/commit/f81490f0861d5671f7364d87694a8205d0a317c8))
* **FixedFooterLayout:** prevent content from being rendered on top of the footer ([#891](https://github.com/Telefonica/mistica-web/issues/891)) ([dc861d5](https://github.com/Telefonica/mistica-web/commit/dc861d5bfa4c36e55e3db7ee80e73b6d4ba86452))


### Features

* **Carousel:** large mobilePageOffset support ([#887](https://github.com/Telefonica/mistica-web/issues/887)) ([803506a](https://github.com/Telefonica/mistica-web/commit/803506af37d3c4e3dd5315ea0baad0d04177e95e))

## [14.22.2](https://github.com/Telefonica/mistica-web/compare/v14.22.1...v14.22.2) (2023-09-18)


### Bug Fixes

* **Touchable:** add margin 0 as default to prevent Safari issues ([#885](https://github.com/Telefonica/mistica-web/issues/885)) ([9c1b470](https://github.com/Telefonica/mistica-web/commit/9c1b47073c5a543e17c351cb2863610c5ce7e31f))

## [14.22.1](https://github.com/Telefonica/mistica-web/compare/v14.22.0...v14.22.1) (2023-09-14)


### Bug Fixes

* **AdvancedDataCard:** add isolation to container ([#884](https://github.com/Telefonica/mistica-web/issues/884)) ([53a1dbe](https://github.com/Telefonica/mistica-web/commit/53a1dbe4121deabd96c1504a66d584958a42f17d))

# [14.22.0](https://github.com/Telefonica/mistica-web/compare/v14.21.0...v14.22.0) (2023-09-11)


### Bug Fixes

* **AdvancedDataCard:** fix hover on actions removing hover on card ([#876](https://github.com/Telefonica/mistica-web/issues/876)) ([742a9d2](https://github.com/Telefonica/mistica-web/commit/742a9d292513aaa956394b7db08b53f07c47b51f))
* **DateTimeField:** add default value for max ([#873](https://github.com/Telefonica/mistica-web/issues/873)) ([1bd25a7](https://github.com/Telefonica/mistica-web/commit/1bd25a7fd8569317a87a6d8638b2735b5c2174e4))
* **Form:** set mountedRef value to true on client side first render ([#863](https://github.com/Telefonica/mistica-web/issues/863)) ([68f7f99](https://github.com/Telefonica/mistica-web/commit/68f7f9912334b38deadbe8b20684de5943afd805))
* **icons:** esim and funnel icons ([#874](https://github.com/Telefonica/mistica-web/issues/874)) ([ed39d6d](https://github.com/Telefonica/mistica-web/commit/ed39d6d2d4d93382a25a38e973a2d6d6c595e227))
* **Inline:** avoid content overflow with wrap and negative space ([#872](https://github.com/Telefonica/mistica-web/issues/872)) ([5c7f89f](https://github.com/Telefonica/mistica-web/commit/5c7f89f094ffa464ca2fe92256348356a5223806))
* **OverscrollColor:** add provider to storybook and fix possibly undefined height ([#879](https://github.com/Telefonica/mistica-web/issues/879)) ([f2d7edf](https://github.com/Telefonica/mistica-web/commit/f2d7edf82c8ef19f0a0c872a96840a210964941d))
* **ProgressBlock:** fix undefined check when progressPercent is 0 ([#862](https://github.com/Telefonica/mistica-web/issues/862)) ([abce1cf](https://github.com/Telefonica/mistica-web/commit/abce1cf717c3cabe47845c59a6f10b3108bad7d6))


### Features

* **getCssVarValue:** utility function ([#877](https://github.com/Telefonica/mistica-web/issues/877)) ([1fd0d3e](https://github.com/Telefonica/mistica-web/commit/1fd0d3e2530d357eac38a5cbcda986921d03ffb8))
* **Logo:** update component, story and screenshot tests ([#875](https://github.com/Telefonica/mistica-web/issues/875)) ([556a9f0](https://github.com/Telefonica/mistica-web/commit/556a9f0fff45f76166a69abd083c5590a93fae45))
* **showSheet:** fallback to web implementation when native one fails ([#860](https://github.com/Telefonica/mistica-web/issues/860)) ([8741a28](https://github.com/Telefonica/mistica-web/commit/8741a28480b843128cddf7ccf3120d9a8487da59))
* **Text:** support textAlign right ([#878](https://github.com/Telefonica/mistica-web/issues/878)) ([9cdc6b7](https://github.com/Telefonica/mistica-web/commit/9cdc6b7c1217b9e95e77682335791488b621f8bc))

# [14.21.0](https://github.com/Telefonica/mistica-web/compare/v14.20.1...v14.21.0) (2023-08-24)


### Bug Fixes

* **Cards:** remove min width from all the cards ([#858](https://github.com/Telefonica/mistica-web/issues/858)) ([029a6ea](https://github.com/Telefonica/mistica-web/commit/029a6ea401d54429718c9d3dce0c5220322e1519))
* **Tabs:** remove extra margin in safari ([#857](https://github.com/Telefonica/mistica-web/issues/857)) ([be8c2f2](https://github.com/Telefonica/mistica-web/commit/be8c2f29d5734a4315cbd6723675d9c58ecd3938))


### Features

* **FeedbackScreens:** updates in icons, paddings and styling ([#852](https://github.com/Telefonica/mistica-web/issues/852)) ([4b231e6](https://github.com/Telefonica/mistica-web/commit/4b231e694e13506d17e7ccfd019c2d6504f50cae))
* **Sheet:** new component ([#840](https://github.com/Telefonica/mistica-web/issues/840)) ([f03ca7c](https://github.com/Telefonica/mistica-web/commit/f03ca7cbccc196504f16c6b93779d13506a2aaf9))
* **utilities:** Remove lodash dependency and replace it with custom functions ([#856](https://github.com/Telefonica/mistica-web/issues/856)) ([dcaf691](https://github.com/Telefonica/mistica-web/commit/dcaf691935c0b0331fdb8b15b28f0d6f2bb8955b))

## [14.20.1](https://github.com/Telefonica/mistica-web/compare/v14.20.0...v14.20.1) (2023-08-18)


### Bug Fixes

* **Community:** export community components with namespace ([#855](https://github.com/Telefonica/mistica-web/issues/855)) ([8326117](https://github.com/Telefonica/mistica-web/commit/832611759d0ed6c763884597de8f5f20380e4abf))

# [14.20.0](https://github.com/Telefonica/mistica-web/compare/v14.19.0...v14.20.0) (2023-08-11)


### Bug Fixes

* **AdvancedDataCard:** avoid content overflow with top actions ([#839](https://github.com/Telefonica/mistica-web/issues/839)) ([a1eae2d](https://github.com/Telefonica/mistica-web/commit/a1eae2db01d490249084ec8a2d2210cc0230eccb))
* **AdvancedDataCard:** Fix Touchable layout, extras positioning, closable DOM position... ([#833](https://github.com/Telefonica/mistica-web/issues/833)) ([21dea84](https://github.com/Telefonica/mistica-web/commit/21dea840aceb4cb19cf580daabe2ddc4ec912f3f))
* **AdvancedDataCard:** touchable area didn't cover the whole card in some cases ([#847](https://github.com/Telefonica/mistica-web/issues/847)) ([31ec606](https://github.com/Telefonica/mistica-web/commit/31ec606ed89d46dd34f3fdd64ed47aebe6b70e96))
* **ButtonLink:** add aligned prop back until next major release ([#846](https://github.com/Telefonica/mistica-web/issues/846)) ([3de841c](https://github.com/Telefonica/mistica-web/commit/3de841c03a8644e57ff598d8589916d90a230168))
* **Tabs:** style fixes and align with design spec ([#832](https://github.com/Telefonica/mistica-web/issues/832)) ([37de417](https://github.com/Telefonica/mistica-web/commit/37de417d98c2790d3dec9a3346194633f2e4581a))


### Features

* **ButtonLink:** scale chevron according to font size ([#849](https://github.com/Telefonica/mistica-web/issues/849)) ([b69b651](https://github.com/Telefonica/mistica-web/commit/b69b6517ee25407893725474aa5e2f11b44a4739))
* **Icons:** new Subtract icons ([#845](https://github.com/Telefonica/mistica-web/issues/845)) ([5f0a5f0](https://github.com/Telefonica/mistica-web/commit/5f0a5f0b5f908de2f8629c8b9934224791815f75))
* **NakedCard:** add support for top icon ([#836](https://github.com/Telefonica/mistica-web/issues/836)) ([f438079](https://github.com/Telefonica/mistica-web/commit/f438079fdefe5bb91f3df19ef44956f3368d77b6))
* **PosterCard:** allow backgroundColor/variant ([#841](https://github.com/Telefonica/mistica-web/issues/841)) ([f8e1f37](https://github.com/Telefonica/mistica-web/commit/f8e1f3727d5df1cfb8a0eb75d03e8f84d86cd536))
* **Row,BoxedRow:** add pressed style to list rows ([#838](https://github.com/Telefonica/mistica-web/issues/838)) ([8437198](https://github.com/Telefonica/mistica-web/commit/8437198047f467647cf70054793647f677858e40))
* **skin:** update design tokens ([#851](https://github.com/Telefonica/mistica-web/issues/851)) ([544f812](https://github.com/Telefonica/mistica-web/commit/544f812aac558d2a13374b4c1143611da26b3332))
* **SnapCard, DataCard, DisplayDataCard:** add aspect ratio support ([#848](https://github.com/Telefonica/mistica-web/issues/848)) ([b3e1639](https://github.com/Telefonica/mistica-web/commit/b3e1639a41f0f1656ca7498bf019ff179e439247))
* **Title:** add tokens for Title2 and create Title3 ([#835](https://github.com/Telefonica/mistica-web/issues/835)) ([e218ba1](https://github.com/Telefonica/mistica-web/commit/e218ba17106838912e63be0641979067d0893312))

# [14.19.0](https://github.com/Telefonica/mistica-web/compare/v14.18.2...v14.19.0) (2023-07-28)


### Bug Fixes

* **ButtonLink, Title:** update alignments ([#829](https://github.com/Telefonica/mistica-web/issues/829)) ([87bd3e3](https://github.com/Telefonica/mistica-web/commit/87bd3e35de3a1e69b43a3c48b73761555b67e483))
* **Cards:** CardAction type ([#831](https://github.com/Telefonica/mistica-web/issues/831)) ([6631788](https://github.com/Telefonica/mistica-web/commit/6631788588cddbe247f8ae70308ba1d5c0492dc5))


### Features

* **MediaCard:** add top icon support ([#824](https://github.com/Telefonica/mistica-web/issues/824)) ([e9a79a3](https://github.com/Telefonica/mistica-web/commit/e9a79a3fc389106906b647fe1b6f90482ffa5e1d))

## [14.18.2](https://github.com/Telefonica/mistica-web/compare/v14.18.1...v14.18.2) (2023-07-24)


### Bug Fixes

* **community:** issue with community build preventing import of community components ([#828](https://github.com/Telefonica/mistica-web/issues/828)) ([fd59552](https://github.com/Telefonica/mistica-web/commit/fd595524052147926b61228c017a631bf014a23d))
* **Select:** long value overflow ([#827](https://github.com/Telefonica/mistica-web/issues/827)) ([ec0e43c](https://github.com/Telefonica/mistica-web/commit/ec0e43cd401436376315b75a18db4f22b835c836))

## [14.18.1](https://github.com/Telefonica/mistica-web/compare/v14.18.0...v14.18.1) (2023-07-21)


### Bug Fixes

* **Row:** improve onPress/to/href types ([#825](https://github.com/Telefonica/mistica-web/issues/825)) ([2214c1f](https://github.com/Telefonica/mistica-web/commit/2214c1f7ebe57a47bf8eba2fe645df94e3220dbb))

# [14.18.0](https://github.com/Telefonica/mistica-web/compare/v14.17.1...v14.18.0) (2023-07-20)


### Bug Fixes

* **DisplayMediaCard, PosterCard:** add label to video control ([#823](https://github.com/Telefonica/mistica-web/issues/823)) ([dc765ef](https://github.com/Telefonica/mistica-web/commit/dc765efd8906850eed971e894cbc1a0e0ea4c704))
* **row:** add missing dataAttributes ([#815](https://github.com/Telefonica/mistica-web/issues/815)) ([47e7cab](https://github.com/Telefonica/mistica-web/commit/47e7cab4b3d5fecbd7d9b0633cc343e855356982))


### Features

* **AdvancedDataCard:** new community component ([#780](https://github.com/Telefonica/mistica-web/issues/780)) ([2803b9c](https://github.com/Telefonica/mistica-web/commit/2803b9c5f7286cedaba762d6387d6f291b6fbe5e))
* **Blocks:** new Mistica Community Components ([#770](https://github.com/Telefonica/mistica-web/issues/770)) ([8fc368a](https://github.com/Telefonica/mistica-web/commit/8fc368a66e3df0f24aa3ba5c5e5fe3ddb1c3801f))
* **Header:** small version, allow removing vertical padding ([#822](https://github.com/Telefonica/mistica-web/issues/822)) ([448387e](https://github.com/Telefonica/mistica-web/commit/448387e4d7b5203983a5b11ac31156de3ef6d05f))
* **Nakedcard:** new component ([#819](https://github.com/Telefonica/mistica-web/issues/819)) ([688bb8e](https://github.com/Telefonica/mistica-web/commit/688bb8e7dce5f0bc2011aacc0b6aeabf99e261b9))

## [14.17.1](https://github.com/Telefonica/mistica-web/compare/v14.17.0...v14.17.1) (2023-07-07)


### Bug Fixes

* **Row:** remove 40 percent maxWidth when there is no detail ([#814](https://github.com/Telefonica/mistica-web/issues/814)) ([cf09796](https://github.com/Telefonica/mistica-web/commit/cf0979624cfc8061022ecd72eab2692b0a443e47))

# [14.17.0](https://github.com/Telefonica/mistica-web/compare/v14.16.1...v14.17.0) (2023-07-06)


### Bug Fixes

* **DisplayCard:** change description text color ([#810](https://github.com/Telefonica/mistica-web/issues/810)) ([9186f74](https://github.com/Telefonica/mistica-web/commit/9186f74356943e4d77bb1c6e0a4ec2968af480de))
* **Row:** fix missing hover in lists with href ([#812](https://github.com/Telefonica/mistica-web/issues/812)) ([240f95a](https://github.com/Telefonica/mistica-web/commit/240f95a859ff275afc4b9569e8b56ad46c5e472f))
* **Spinner:** remove extra space at the bottom of spinner ([#809](https://github.com/Telefonica/mistica-web/issues/809)) ([c4795b6](https://github.com/Telefonica/mistica-web/commit/c4795b68b25d63959343569f2092bfaf7adcc529))


### Features

* **Button:** add ButtonLink chevron and icon left/right in all the buttons ([#803](https://github.com/Telefonica/mistica-web/issues/803)) ([b0a0edb](https://github.com/Telefonica/mistica-web/commit/b0a0edbd004425e364fb572fdbc28f1dd337fcde))
* **Row:** add right text to rows ([#804](https://github.com/Telefonica/mistica-web/issues/804)) ([32aa2c7](https://github.com/Telefonica/mistica-web/commit/32aa2c7806b660f3ff02c79843c618bdd0fa6f08))
* **skin:** update design tokens ([#808](https://github.com/Telefonica/mistica-web/issues/808)) ([a18535e](https://github.com/Telefonica/mistica-web/commit/a18535e9fff4dbef79b45638a17c6383ced2b454))

## [14.16.1](https://github.com/Telefonica/mistica-web/compare/v14.16.0...v14.16.1) (2023-06-30)


### Bug Fixes

* **DataCard:** avoid content from overflowing card padding ([#806](https://github.com/Telefonica/mistica-web/issues/806)) ([9b70869](https://github.com/Telefonica/mistica-web/commit/9b70869179b36b9e3953442920f9821b84651c45))

# [14.16.0](https://github.com/Telefonica/mistica-web/compare/v14.15.0...v14.16.0) (2023-06-30)


### Bug Fixes

* **DateTimePicker:** fix locale imports in date-time-picker ([#793](https://github.com/Telefonica/mistica-web/issues/793)) ([8b69325](https://github.com/Telefonica/mistica-web/commit/8b693252ad8db78fe9593ac2a07af4df6d330de8))
* **LinkComponent:** improve component detection for forwardRefs ([#800](https://github.com/Telefonica/mistica-web/issues/800)) ([7ba36c6](https://github.com/Telefonica/mistica-web/commit/7ba36c636240323b472e5c73f42af81a8183b076))
* **Select:** fix select options positioning ([#802](https://github.com/Telefonica/mistica-web/issues/802)) ([acc1909](https://github.com/Telefonica/mistica-web/commit/acc19099fd15178bdb9c0416601327278f3d52ca))
* **Select:** Fix select options positioning inside non static parents ([#796](https://github.com/Telefonica/mistica-web/issues/796)) ([0cf6455](https://github.com/Telefonica/mistica-web/commit/0cf6455360d0f3a79e21c12101d7728c7e858716))
* **Switch, RadioButton, Checkbox:** stop propagation on click ([#798](https://github.com/Telefonica/mistica-web/issues/798)) ([08b986e](https://github.com/Telefonica/mistica-web/commit/08b986ed855d98e09470d582006b438267c9d680))
* **TextField, Select:** improve styles ([#777](https://github.com/Telefonica/mistica-web/issues/777)) ([c186728](https://github.com/Telefonica/mistica-web/commit/c18672810db17a996c5e4723012f3d8b6529fb01))
* **Video:** improve perfomance and stability ([#801](https://github.com/Telefonica/mistica-web/issues/801)) ([d992180](https://github.com/Telefonica/mistica-web/commit/d992180779b885aa420998860ed389b44f5db547))


### Features

* **Tabs:** change label size in vivo new ([#794](https://github.com/Telefonica/mistica-web/issues/794)) ([82945ea](https://github.com/Telefonica/mistica-web/commit/82945ea9d28233e1cbf643bf4eecd697f2da6da7))
* **ThemeContextProvider:** built in Link components for Next and React Router ([#795](https://github.com/Telefonica/mistica-web/issues/795)) ([b20b0a5](https://github.com/Telefonica/mistica-web/commit/b20b0a53d2ce0930c8aebbf74ac6721d0f62d86d))

# [14.15.0](https://github.com/Telefonica/mistica-web/compare/v14.14.0...v14.15.0) (2023-06-19)


### Bug Fixes

* **Cards:** aspect ratio support for old browsers ([#787](https://github.com/Telefonica/mistica-web/issues/787)) ([2686e6a](https://github.com/Telefonica/mistica-web/commit/2686e6af5e4b3f2f9afc5d931483f8ec781904cd))
* **FixedFooterLayout:** fix warnings in SSR ([#788](https://github.com/Telefonica/mistica-web/issues/788)) ([25dece8](https://github.com/Telefonica/mistica-web/commit/25dece853375420a9c02eb52aa7b9182c871190f))


### Features

* **Chip:** bigger size in mobile. Added support for badge ([#751](https://github.com/Telefonica/mistica-web/issues/751)) ([ec8c18e](https://github.com/Telefonica/mistica-web/commit/ec8c18e4cbfcecf5c00edc2ed7ffb42967bcd750))
* **vivo new skin:** adjust font weight in some components for Vivo Type font ([#786](https://github.com/Telefonica/mistica-web/issues/786)) ([04b955a](https://github.com/Telefonica/mistica-web/commit/04b955a8446d5f2a3c2d2262a9238e5cdfe3c458))

# [14.14.0](https://github.com/Telefonica/mistica-web/compare/v14.13.0...v14.14.0) (2023-06-15)


### Bug Fixes

* **Chip, RadioButton:** prevent default browser highlight on press ([#778](https://github.com/Telefonica/mistica-web/issues/778)) ([ed3633a](https://github.com/Telefonica/mistica-web/commit/ed3633a4c7c768617091eb5511ac922f27972a3c))
* **FixedFooterLayout:** avoid blinking during page transitions ([#782](https://github.com/Telefonica/mistica-web/issues/782)) ([7aa852b](https://github.com/Telefonica/mistica-web/commit/7aa852bbcd9ed2bab4450eed337d86a824e9088b))
* **FixedFooterLayout:** remove next js errors when using SSR ([#783](https://github.com/Telefonica/mistica-web/issues/783)) ([db9adbd](https://github.com/Telefonica/mistica-web/commit/db9adbd80bca8fd9b25dfb8bd2e76a94439ddb73))


### Features

* **Cards:** add interactivity to cards ([#763](https://github.com/Telefonica/mistica-web/issues/763)) ([724da5f](https://github.com/Telefonica/mistica-web/commit/724da5f7f7456338aa578b7078bca2d635d5c5fb))
* **Icons:** vivo-new variants for some mistica icons ([#779](https://github.com/Telefonica/mistica-web/issues/779)) ([e51294b](https://github.com/Telefonica/mistica-web/commit/e51294b7c52efc033250da9f7ebcead2c121160a))
* **skin:** added new text design tokens ([#785](https://github.com/Telefonica/mistica-web/issues/785)) ([b7e36f7](https://github.com/Telefonica/mistica-web/commit/b7e36f792a05230150d3de8a44ec8d3cd878f6fa))

# [14.13.0](https://github.com/Telefonica/mistica-web/compare/v14.12.0...v14.13.0) (2023-06-08)


### Features

* **skin:** revert cardTitle weight change in Vivo, O2 and Blau ([#781](https://github.com/Telefonica/mistica-web/issues/781)) ([abcec7e](https://github.com/Telefonica/mistica-web/commit/abcec7e9e7165624f57ac4e9f0b40863b5c6b349))

# [14.12.0](https://github.com/Telefonica/mistica-web/compare/v14.11.0...v14.12.0) (2023-06-07)


### Bug Fixes

* **Chip:** cursor pointer in active chips ([#768](https://github.com/Telefonica/mistica-web/issues/768)) ([8631c27](https://github.com/Telefonica/mistica-web/commit/8631c2724379ba2fcd7e84269de6b2863480f6eb))


### Features

* **ButtonLink:** spinner support ([#769](https://github.com/Telefonica/mistica-web/issues/769)) ([9e26a8e](https://github.com/Telefonica/mistica-web/commit/9e26a8e2992fbbfb4e5803d500cb9f55ee879713))
* **skins:** new vivo skin ([#775](https://github.com/Telefonica/mistica-web/issues/775)) ([edb5668](https://github.com/Telefonica/mistica-web/commit/edb5668b68d0d1055a296c36cf50991a843a6727))

# [14.11.0](https://github.com/Telefonica/mistica-web/compare/v14.10.0...v14.11.0) (2023-06-05)


### Bug Fixes

* **Controls:** show cursor pointer in most interactive elements ([#646](https://github.com/Telefonica/mistica-web/issues/646)) ([4efe325](https://github.com/Telefonica/mistica-web/commit/4efe32576f96a891c4bc17f36dfbb441a4c60ffd))
* **DateField:** input type for onBlur/onFocus prop ([#767](https://github.com/Telefonica/mistica-web/issues/767)) ([69354e9](https://github.com/Telefonica/mistica-web/commit/69354e934d72891793b3266b67dd68c8b5bb352f)), closes [/github.com/Telefonica/webapp/pull/3039#discussion_r1185951534](https://github.com//github.com/Telefonica/webapp/pull/3039/issues/discussion_r1185951534)


### Features

* **Grid:** new component ([#762](https://github.com/Telefonica/mistica-web/issues/762)) ([bb966f5](https://github.com/Telefonica/mistica-web/commit/bb966f55791478e2464a94600fc368abeba917f1))
* **skin:** update design tokens ([#737](https://github.com/Telefonica/mistica-web/issues/737)) ([ead261c](https://github.com/Telefonica/mistica-web/commit/ead261c1fed55b8612ac8bb433f0eee3b4b3f750))
* **skin:** update design tokens ([#766](https://github.com/Telefonica/mistica-web/issues/766)) ([ed60e62](https://github.com/Telefonica/mistica-web/commit/ed60e623437f0a0c14814e5cf391a299c735ec10))
* **skin:** update design tokens ([#774](https://github.com/Telefonica/mistica-web/issues/774)) ([78e6781](https://github.com/Telefonica/mistica-web/commit/78e67810866f5db3d1c6d1ba248f44b3ccb3b80b))
* **StackingGroup:** new component ([#743](https://github.com/Telefonica/mistica-web/issues/743)) ([c4ddec3](https://github.com/Telefonica/mistica-web/commit/c4ddec34aa71820ba484e5ec3b2c39e4f3841e09))

# [14.10.0](https://github.com/Telefonica/mistica-web/compare/v14.9.0...v14.10.0) (2023-05-23)


### Features

* **Chip:** Add ability to click Chips ([#621](https://github.com/Telefonica/mistica-web/issues/621)) ([#759](https://github.com/Telefonica/mistica-web/issues/759)) ([e2b28a7](https://github.com/Telefonica/mistica-web/commit/e2b28a7846bcc8ac85642fe7a8e5136a9fc64dea))

# [14.9.0](https://github.com/Telefonica/mistica-web/compare/v14.8.0...v14.9.0) (2023-05-19)


### Bug Fixes

* **Chevron:** fix align issue in chevron icon ([#756](https://github.com/Telefonica/mistica-web/issues/756)) ([e4a3913](https://github.com/Telefonica/mistica-web/commit/e4a391327c908fa4fb594c4d75ee20a87a4290ad))
* **Form:** export formValues type in form ([#758](https://github.com/Telefonica/mistica-web/issues/758)) ([d5e5157](https://github.com/Telefonica/mistica-web/commit/d5e515731f1bb1f328388765734218d503487735))
* **Row, BoxedRow:** check for undefined value in props is incorrect ([#753](https://github.com/Telefonica/mistica-web/issues/753)) ([2e5af28](https://github.com/Telefonica/mistica-web/commit/2e5af28eaf69ac73ed5c0ae094eb4a72e83aa2dd))
* **Tabs:** remove disabled in active tab ([#755](https://github.com/Telefonica/mistica-web/issues/755)) ([d15b02b](https://github.com/Telefonica/mistica-web/commit/d15b02bc9231c091ff2e07ecfc445e062ff92707))


### Features

* **Circle:** add border prop ([#761](https://github.com/Telefonica/mistica-web/issues/761)) ([431ff37](https://github.com/Telefonica/mistica-web/commit/431ff37fe174510db3ab512872295eacce5b7dbb))
* **HorizontalScroll:** new component ([#745](https://github.com/Telefonica/mistica-web/issues/745)) ([61e4f3d](https://github.com/Telefonica/mistica-web/commit/61e4f3d9df5bc07abff5499268e8eba9eab5f7c8))

# [14.8.0](https://github.com/Telefonica/mistica-web/compare/v14.7.1...v14.8.0) (2023-05-11)


### Bug Fixes

* **FixedFooterLayout:** issues when rendering inside iframe ([#735](https://github.com/Telefonica/mistica-web/issues/735)) ([ebce0c2](https://github.com/Telefonica/mistica-web/commit/ebce0c2559641061882fe0a0fb332cf0290c949d))
* **IconButton:** styles ([#747](https://github.com/Telefonica/mistica-web/issues/747)) ([0ee48fe](https://github.com/Telefonica/mistica-web/commit/0ee48fe7d9ad0550c26af7b3bf8ffe6344d390d7))
* **Video:** logic for video container ([#748](https://github.com/Telefonica/mistica-web/issues/748)) ([212d137](https://github.com/Telefonica/mistica-web/commit/212d1372cf1e73de9f3bc39554482ef45719d6d5))


### Features

* **DisplayMediaCard, PosterCard:** support for background video ([#724](https://github.com/Telefonica/mistica-web/issues/724)) ([9959613](https://github.com/Telefonica/mistica-web/commit/9959613bdfa9e158091755f12d3001206018d77c))
* **Spinner:** update iOS style ([#750](https://github.com/Telefonica/mistica-web/issues/750)) ([053dc09](https://github.com/Telefonica/mistica-web/commit/053dc093c06f7e32a83be3e775975ba2f8163fa7))

## [14.7.1](https://github.com/Telefonica/mistica-web/compare/v14.7.0...v14.7.1) (2023-05-08)


### Bug Fixes

* **Chip:** improve border color in dark mode ([#744](https://github.com/Telefonica/mistica-web/issues/744)) ([7c6020e](https://github.com/Telefonica/mistica-web/commit/7c6020ebdfa0784edd4e3817a8d0bf2e52125f2e))
* **TextField:** label not shrinking when the field was autofilled by browser autocomplete ([#728](https://github.com/Telefonica/mistica-web/issues/728)) ([97dff64](https://github.com/Telefonica/mistica-web/commit/97dff641829c0a51778e4ef2338d4306a1d16d01))

# [14.7.0](https://github.com/Telefonica/mistica-web/compare/v14.6.0...v14.7.0) (2023-04-27)


### Features

* **Button:** show loading state when onPress returns a promise until it resolves ([#726](https://github.com/Telefonica/mistica-web/issues/726)) ([262e17b](https://github.com/Telefonica/mistica-web/commit/262e17b596acb8d1da76fd3d36356018402a385f))
* **Logo, MovistarLogo, VivoLogo, O2Logo, TelefonicaLogo, BlauLogo:** new components ([#721](https://github.com/Telefonica/mistica-web/issues/721)) ([ff04a85](https://github.com/Telefonica/mistica-web/commit/ff04a85aebe846ed8bc4b63ffbf4bc643389502f))
* **skin:** make border radius configurable by skin ([#723](https://github.com/Telefonica/mistica-web/issues/723)) ([07cb30d](https://github.com/Telefonica/mistica-web/commit/07cb30dd3166eacb899dea3a4158efe13977baf9))
* **ThemeVariant:** support alternative theme variant ([#722](https://github.com/Telefonica/mistica-web/issues/722)) ([76128f0](https://github.com/Telefonica/mistica-web/commit/76128f0421062323bc39319389161f0e7c8dd2cc))

# [14.6.0](https://github.com/Telefonica/mistica-web/compare/v14.5.0...v14.6.0) (2023-04-18)


### Features

* **Avatar:** optional border ([#705](https://github.com/Telefonica/mistica-web/issues/705)) ([1d4bee1](https://github.com/Telefonica/mistica-web/commit/1d4bee13cef31b92b27ad2dcf92a2e4e10833bd3))
* **Card:** add hypenation to all cards ([#719](https://github.com/Telefonica/mistica-web/issues/719)) ([15f5909](https://github.com/Telefonica/mistica-web/commit/15f59092a307cc47ae39b4da0dae82ff27b05af6))

# [14.5.0](https://github.com/Telefonica/mistica-web/compare/v14.4.1...v14.5.0) (2023-04-17)


### Bug Fixes

* **Button:** change minWidth ([#709](https://github.com/Telefonica/mistica-web/issues/709)) ([423f630](https://github.com/Telefonica/mistica-web/commit/423f6303e20a7c86073d0eec108b4ca43c27dd03))
* **Carousel:** initial flash rendering as tablet while screenSize provider is not initialized ([#720](https://github.com/Telefonica/mistica-web/issues/720)) ([3d6f7b0](https://github.com/Telefonica/mistica-web/commit/3d6f7b04bddead1ac48e1d0c7ea21500408bcafb))
* **Carousel:** only call onPageChange when a true page change has heppen ([#708](https://github.com/Telefonica/mistica-web/issues/708)) ([bff2d46](https://github.com/Telefonica/mistica-web/commit/bff2d4647c1a527cdfcc4ee2b024beb359c279b1))


### Features

* **PosterCard:** new component ([#699](https://github.com/Telefonica/mistica-web/issues/699)) ([aa96120](https://github.com/Telefonica/mistica-web/commit/aa961209aae1510650b651b4e4439adbac3a70af))
* **ProgressBar:** allow reverse animation ([#704](https://github.com/Telefonica/mistica-web/issues/704)) ([f938a9c](https://github.com/Telefonica/mistica-web/commit/f938a9ce6337d8ca520c4b92b46ae26c193346b2))
* **ResponsiveLayout:** nested ResponsiveLayouts won't add extra margins ([#716](https://github.com/Telefonica/mistica-web/issues/716)) ([cd5afae](https://github.com/Telefonica/mistica-web/commit/cd5afaec2572c4f1caef995310371fc138f05d17))
* **Row, BoxedRow:** support radio button + onPress (two tappeable areas) ([#707](https://github.com/Telefonica/mistica-web/issues/707)) ([4bc6109](https://github.com/Telefonica/mistica-web/commit/4bc610990ed82138d83d0f5b19fe7ab1b0a738f2)), closes [/github.com/Telefonica/mistica-web/pull/317#discussion_r691271670](https://github.com//github.com/Telefonica/mistica-web/pull/317/issues/discussion_r691271670)

## [14.4.1](https://github.com/Telefonica/mistica-web/compare/v14.4.0...v14.4.1) (2023-03-30)


### Bug Fixes

* **DataCard:** style fixes for extra ([#703](https://github.com/Telefonica/mistica-web/issues/703)) ([9b86407](https://github.com/Telefonica/mistica-web/commit/9b86407a5967f70572d4d251411c9741eb8c55d2))

# [14.4.0](https://github.com/Telefonica/mistica-web/compare/v14.3.0...v14.4.0) (2023-03-28)


### Bug Fixes

* **Hero:** tablet layout ([#697](https://github.com/Telefonica/mistica-web/issues/697)) ([25c19db](https://github.com/Telefonica/mistica-web/commit/25c19db4b7fa232b01c10517072453a8c19f7cd9))
* **MediaCard:** border radius in safari ([#688](https://github.com/Telefonica/mistica-web/issues/688)) ([93ea34e](https://github.com/Telefonica/mistica-web/commit/93ea34ee5998117f137bf7097caf663675c0e898))


### Features

* **EmptyStateCard, HighlightedCard:** update title weight ([#689](https://github.com/Telefonica/mistica-web/issues/689)) ([794c3cc](https://github.com/Telefonica/mistica-web/commit/794c3cce9e83a5f7216edb711a245ae21a41c62d))
* **Inline:** allow wrap and negative space ([#700](https://github.com/Telefonica/mistica-web/issues/700)) ([f6fbc6c](https://github.com/Telefonica/mistica-web/commit/f6fbc6c032296c480f48039f0239c5ebf9ae5fcb))
* **MediaCard, DataCard:** support for top actions ([#692](https://github.com/Telefonica/mistica-web/issues/692)) ([45c0277](https://github.com/Telefonica/mistica-web/commit/45c0277452daac45dfcedc8ca06e210e94571ce8))

# [14.3.0](https://github.com/Telefonica/mistica-web/compare/v14.2.0...v14.3.0) (2023-03-15)


### Bug Fixes

* **HighlightedCard:** image positioning issue when backgroundUrl is changed ([#691](https://github.com/Telefonica/mistica-web/issues/691)) ([44c1a40](https://github.com/Telefonica/mistica-web/commit/44c1a40032d3ec032227ed37dcc95c92bab6a5a9))


### Features

* **HeaderLayout:** added bleed prop ([#685](https://github.com/Telefonica/mistica-web/issues/685)) ([bc060d6](https://github.com/Telefonica/mistica-web/commit/bc060d62ae8be1cd063e38429f50a6b2512f4d24))

# [14.2.0](https://github.com/Telefonica/mistica-web/compare/v14.1.0...v14.2.0) (2023-03-08)


### Bug Fixes

* **Movistar skin:** dark mode fixes [#1080](https://github.com/Telefonica/mistica-web/issues/1080) ([#686](https://github.com/Telefonica/mistica-web/issues/686)) ([d538f35](https://github.com/Telefonica/mistica-web/commit/d538f35ce6be8c8819ffedf575c4fcc695bf3080))
* **Select:** issue in SSR ([#683](https://github.com/Telefonica/mistica-web/issues/683)) ([6100440](https://github.com/Telefonica/mistica-web/commit/6100440e5e490a166ace84e398e0087f7e1c08ef))
* **Stepper:**  SSR issues ([#684](https://github.com/Telefonica/mistica-web/issues/684)) ([21414a6](https://github.com/Telefonica/mistica-web/commit/21414a68d8dab23abacabd14565f712cd004fecd))


### Features

* **Icons:** new Meatball icon ([#687](https://github.com/Telefonica/mistica-web/issues/687)) ([7faacab](https://github.com/Telefonica/mistica-web/commit/7faacabb0d8ec993339a373e60d4153dc386533e))

# [14.1.0](https://github.com/Telefonica/mistica-web/compare/v14.0.0...v14.1.0) (2023-02-28)


### Features

* **MainNavigationBar:** don't show burger if there aren't 2 or more sections ([#681](https://github.com/Telefonica/mistica-web/issues/681)) ([7ca1070](https://github.com/Telefonica/mistica-web/commit/7ca1070c9b101604939b75481beffe847c0c55e1))

# [14.0.0](https://github.com/Telefonica/mistica-web/compare/v13.6.1...v14.0.0) (2023-02-28)


### Bug Fixes

* **Video:** remove 12:5 from list of recommended `aspectRatio`s ([#679](https://github.com/Telefonica/mistica-web/issues/679)) ([3346032](https://github.com/Telefonica/mistica-web/commit/3346032c20fedd8623513f8ecc983d32266c5a3f))


### Features

* **Movistar skin:** color changes for Digital Hub project ([fd57bfd](https://github.com/Telefonica/mistica-web/commit/fd57bfd8108f8a62066e010f5ae6bb4763c306a2))


### BREAKING CHANGES

* **Movistar skin:** The Movistar skin has enough color changes (mainly in dark mode) to consider this a breaking change. We still ship a "classic" version of the Movistar skin with the old colors with `getMovistarClassicSkin` that should be considered as deprecated and will be removed in future Mistica versions.

## [13.6.1](https://github.com/Telefonica/mistica-web/compare/v13.6.0...v13.6.1) (2023-02-27)


### Bug Fixes

* **TextField:** maxLenght in controlled component ([#680](https://github.com/Telefonica/mistica-web/issues/680)) ([3f351fb](https://github.com/Telefonica/mistica-web/commit/3f351fbb9ffc01968627c00e3a8047cb78818adc))

# [13.6.0](https://github.com/Telefonica/mistica-web/compare/v13.5.0...v13.6.0) (2023-02-27)


### Bug Fixes

* **Menu:** use portal to render the dropdown to fix issue when rendering inside "position relative" containers ([#677](https://github.com/Telefonica/mistica-web/issues/677)) ([b1bb86c](https://github.com/Telefonica/mistica-web/commit/b1bb86c5d264c509a5675ed28e420e7abe8c2b35))


### Features

* **DisplayDataCard, DisplayMediaCard:** new components ([#671](https://github.com/Telefonica/mistica-web/issues/671)) ([61ed3e7](https://github.com/Telefonica/mistica-web/commit/61ed3e7ae3a236456e85a42c69d7d6e2c304870c))

# [13.5.0](https://github.com/Telefonica/mistica-web/compare/v13.4.0...v13.5.0) (2023-02-23)


### Features

* **colors:** new backgroundBrandSecondary ([#676](https://github.com/Telefonica/mistica-web/issues/676)) ([4f12baf](https://github.com/Telefonica/mistica-web/commit/4f12baf85265cfe6f3433876fe06cac852830733))

# [13.4.0](https://github.com/Telefonica/mistica-web/compare/v13.3.0...v13.4.0) (2023-02-23)


### Features

* **HeaderLayout:** make header prop optional for the cases where a native app renders that part ([#675](https://github.com/Telefonica/mistica-web/issues/675)) ([14791ea](https://github.com/Telefonica/mistica-web/commit/14791ea8e1d7893f674b9a6228eaa5394ad5d3b0))

# [13.3.0](https://github.com/Telefonica/mistica-web/compare/v13.2.3...v13.3.0) (2023-02-22)


### Features

* **Hero:** new component ([#665](https://github.com/Telefonica/mistica-web/issues/665)) ([fbb7430](https://github.com/Telefonica/mistica-web/commit/fbb7430ea75faf7936f511e2bb5ba498030dbcad))
* **SearchField:** forward ref support ([#673](https://github.com/Telefonica/mistica-web/issues/673)) ([2a62882](https://github.com/Telefonica/mistica-web/commit/2a62882cf28ea228d43eb13ff268cda7f3408f9d))

## [13.2.3](https://github.com/Telefonica/mistica-web/compare/v13.2.2...v13.2.3) (2023-02-21)


### Bug Fixes

* **TextLink:** underline style in inverse ([#674](https://github.com/Telefonica/mistica-web/issues/674)) ([0238aa0](https://github.com/Telefonica/mistica-web/commit/0238aa087a0d85118c2836a070d65b64ab86eac7))

## [13.2.2](https://github.com/Telefonica/mistica-web/compare/v13.2.1...v13.2.2) (2023-02-21)


### Bug Fixes

* **TextLink:** underline style in inverse ([#672](https://github.com/Telefonica/mistica-web/issues/672)) ([1b6bdb0](https://github.com/Telefonica/mistica-web/commit/1b6bdb00fa5898dd3c441ffce7e625f8d5ef34ff))

## [13.2.1](https://github.com/Telefonica/mistica-web/compare/v13.2.0...v13.2.1) (2023-02-20)


### Bug Fixes

* **TextLink:** underline style in inverse ([#670](https://github.com/Telefonica/mistica-web/issues/670)) ([ede593f](https://github.com/Telefonica/mistica-web/commit/ede593f69f90789ba3d35e42cf8834f2afe89824))

# [13.2.0](https://github.com/Telefonica/mistica-web/compare/v13.1.3...v13.2.0) (2023-02-17)


### Bug Fixes

* **colors:** change orchid70 color in telefonica skin ([#655](https://github.com/Telefonica/mistica-web/issues/655)) ([8727cd7](https://github.com/Telefonica/mistica-web/commit/8727cd711b0fd1394a3f8c7885035d156a9823f9))
* **Image:** SSR issue ([#664](https://github.com/Telefonica/mistica-web/issues/664)) ([f150606](https://github.com/Telefonica/mistica-web/commit/f15060634e50718920e434a97aa81077d98e5add))
* **Image:** with aspect ratio in old browsers ([230cfb6](https://github.com/Telefonica/mistica-web/commit/230cfb6d11a7b5e3823f0e5b3ec09402c3bf3c0e))
* **Select:** not showing all elements in some cases ([#659](https://github.com/Telefonica/mistica-web/issues/659)) ([2152e2b](https://github.com/Telefonica/mistica-web/commit/2152e2be76cb9e5beba444af1c29009e0456de8c))
* **Tag:** inverse colors ([#661](https://github.com/Telefonica/mistica-web/issues/661)) ([2b8aedf](https://github.com/Telefonica/mistica-web/commit/2b8aedf1760b2605e99745a8a892a349ef8b3023))


### Features

* **Header:** added description prop, deprecate some props, change extra to take full width in desktop ([#663](https://github.com/Telefonica/mistica-web/issues/663)) ([987f5fc](https://github.com/Telefonica/mistica-web/commit/987f5fcff9a44505447b636a439ba3445aae4bf3))
* **Skeleton:** noBorderRadius prop ([#662](https://github.com/Telefonica/mistica-web/issues/662)) ([4ba42ba](https://github.com/Telefonica/mistica-web/commit/4ba42bac0b95208cc0807fd053c3cb5e88ae3c80))
* **Text:** size changes in Text5, Text9 & Text10 ([#653](https://github.com/Telefonica/mistica-web/issues/653)) ([cc06f6a](https://github.com/Telefonica/mistica-web/commit/cc06f6acc57419946ba3572503e4d66c9ebfd049))

## [13.1.3](https://github.com/Telefonica/mistica-web/compare/v13.1.2...v13.1.3) (2023-02-06)


### Bug Fixes

* **useId:** support React 17 ([#654](https://github.com/Telefonica/mistica-web/issues/654)) ([cef5e53](https://github.com/Telefonica/mistica-web/commit/cef5e535e6ffa537ba1861ca2c5915e36f93506a))

## [13.1.2](https://github.com/Telefonica/mistica-web/compare/v13.1.1...v13.1.2) (2023-02-03)


### Bug Fixes

* **Callout:** SSR hydration issue ([#652](https://github.com/Telefonica/mistica-web/issues/652)) ([9c3365d](https://github.com/Telefonica/mistica-web/commit/9c3365ddec3c6719bc0a40119cb6aa7d69cdd4a3))

## [13.1.1](https://github.com/Telefonica/mistica-web/compare/v13.1.0...v13.1.1) (2023-02-01)


### Bug Fixes

* **DataCard:** set children width to 100% ([#648](https://github.com/Telefonica/mistica-web/issues/648)) ([6ccbd6b](https://github.com/Telefonica/mistica-web/commit/6ccbd6b49ba8282f7b1e5dd2167434cc5914c44c))
* **Tabs:** selected tab animation in React 18 ([df97fa7](https://github.com/Telefonica/mistica-web/commit/df97fa71f60fa47ab4b98f38eb65716bd792933f))

# [13.1.0](https://github.com/Telefonica/mistica-web/compare/v13.0.2...v13.1.0) (2023-01-30)


### Bug Fixes

* **menu:** ssr hydration missmatch ([#638](https://github.com/Telefonica/mistica-web/issues/638)) ([8853d25](https://github.com/Telefonica/mistica-web/commit/8853d25aaa66b37736a8a205291d170e545f9231))


### Features

* **browserlist:** update supported browsers ([#630](https://github.com/Telefonica/mistica-web/issues/630)) ([763550b](https://github.com/Telefonica/mistica-web/commit/763550b284654c1787732f307ec5effdc200f771))
* **browserslist:** drop support edge no chromium ([#636](https://github.com/Telefonica/mistica-web/issues/636)) ([ec25b57](https://github.com/Telefonica/mistica-web/commit/ec25b5786457de7949d96b25be3646c94ee4c7bb))
* **ButtonSecondary:** improve hover state ([#643](https://github.com/Telefonica/mistica-web/issues/643)) ([8961658](https://github.com/Telefonica/mistica-web/commit/896165804607aa153505a9662ffc8000e49b164d))
* **flow:** remove flow types generation ([#637](https://github.com/Telefonica/mistica-web/issues/637)) ([20ae57c](https://github.com/Telefonica/mistica-web/commit/20ae57c56e7f2f26859aa63ba241ac27bf00e0e4))
* **icons:** new single-parent-family icon and fix pause-regular ([#644](https://github.com/Telefonica/mistica-web/issues/644)) ([86800ae](https://github.com/Telefonica/mistica-web/commit/86800aecf6abaf515272f1b12fbf206b9f407539))
* **React:** support for react 18 ([#641](https://github.com/Telefonica/mistica-web/issues/641)) ([8b7c44a](https://github.com/Telefonica/mistica-web/commit/8b7c44a2ad8ba9b4c0565a0eddabc42c046113b7))

## [13.0.2](https://github.com/Telefonica/mistica-web/compare/v13.0.1...v13.0.2) (2023-01-03)


### Bug Fixes

* **Skeletons:** fix skeleton sizes ([#631](https://github.com/Telefonica/mistica-web/issues/631)) ([fce23ed](https://github.com/Telefonica/mistica-web/commit/fce23ed584746d349cd566c6dabd856a72242796))

## [13.0.1](https://github.com/Telefonica/mistica-web/compare/v13.0.0...v13.0.1) (2022-12-29)


### Bug Fixes

* **jss:** removed unused jss dependency ([#628](https://github.com/Telefonica/mistica-web/issues/628)) ([82dbcb5](https://github.com/Telefonica/mistica-web/commit/82dbcb5a2bc1c1bab337100c86a1753af396ca3f))
* **theme-colors-codemod:** mistica import name ([#627](https://github.com/Telefonica/mistica-web/issues/627)) ([da1e8af](https://github.com/Telefonica/mistica-web/commit/da1e8afc782d8b69bb6e55bdbd2c5cc530df48f9))

# [13.0.0](https://github.com/Telefonica/mistica-web/compare/v12.13.0...v13.0.0) (2022-12-28)

### [Migration guide from 12.x to 13.x](doc/migration-guide.md#migration-guide-from-mistica-12x-to-mistica-13x)

### Features

* **Carousel:** remove mobilePageOffset prop ([#620](https://github.com/Telefonica/mistica-web/issues/620)) ([52a2cce](https://github.com/Telefonica/mistica-web/commit/52a2cce2450e2dcc082d5ea36e487147ec0ed746))
* **colors:** borderLight and borderDark renamed to borderLow and borderHight ([#624](https://github.com/Telefonica/mistica-web/issues/624)) ([34399dc](https://github.com/Telefonica/mistica-web/commit/34399dca85630c0136ab92aebc02d3a5cebedcda))
* **colors:** remove colors from Theme. Use skinVars instead ([#612](https://github.com/Telefonica/mistica-web/issues/612)) ([ebc07d8](https://github.com/Telefonica/mistica-web/commit/ebc07d8d55c18f7126e16466383a7056d8285022))
* **css:** don't inline mistica css in js ([#614](https://github.com/Telefonica/mistica-web/issues/614)) ([84f210c](https://github.com/Telefonica/mistica-web/commit/84f210c47264a85e00becc62c5b47c2835ded4bf))
* **DataCard, MediaCard, SnapCard:** remove extra top padding ([#621](https://github.com/Telefonica/mistica-web/issues/621)) ([44d0b0e](https://github.com/Telefonica/mistica-web/commit/44d0b0e1b2ed544f711e021284ea12c08ef84c7b))
* **icons:** new 2g/3g icons and updated some others ([#618](https://github.com/Telefonica/mistica-web/issues/618)) ([66fab57](https://github.com/Telefonica/mistica-web/commit/66fab5745eb34a77e8670de2a54a67aed8aac83d))
* **styles:** remove jss from mistica ([#615](https://github.com/Telefonica/mistica-web/issues/615)) ([ffe577b](https://github.com/Telefonica/mistica-web/commit/ffe577be47d298714f7fd858d71414bb1b5ed7f8))
* **TextLink:** remove small prop ([#616](https://github.com/Telefonica/mistica-web/issues/616)) ([2196f96](https://github.com/Telefonica/mistica-web/commit/2196f96794b5e94473e527c82f9720f8df590c3d))
* **ThemeConfig:** remove mediaQueries config ([#613](https://github.com/Telefonica/mistica-web/issues/613)) ([b6128f8](https://github.com/Telefonica/mistica-web/commit/b6128f81cd721278f9013d3a5de94246e962c3b6))


### BREAKING CHANGES

* **colors:** removed Theme.colors (see codemod)
* **colors:** colorScheme is now 'auto' by default
* **ThemeConfig:** removed ThemeConfig.mediaQueries and Theme.mq
* **css:** mistica no longer inlines css in js, you must import the css/mistica.css in your app
* **DataCard, MediaCard, SnapCard:** removed extra top padding in DataCard, MediaCard and SnapCard
* **icons:** Removed chevron-top-regular (use chevron-up-regular instead). Updated play and pause icons to remove circle. Added new play-circle and pause-circle icons to replace the old ones.
* **TextLink:** removed TextLink small prop
* **styles:** removed createUseStyles and other jss related apis
* **Carousel:** remove Carousel mobilePageOffset prop
* **colors:** borderLight and borderDark colors renamed

# [12.13.0](https://github.com/Telefonica/mistica-web/compare/v12.12.0...v12.13.0) (2022-12-23)


### Bug Fixes

* **Typo:** typo in attribute name ([#625](https://github.com/Telefonica/mistica-web/issues/625)) ([8c2d712](https://github.com/Telefonica/mistica-web/commit/8c2d7128a6c9b56fbd3108b3b6d062a2d2044faa))


### Features

* **Carousel:** extend items per page for tablet and desktop container types ([#610](https://github.com/Telefonica/mistica-web/issues/610)) ([e4c569f](https://github.com/Telefonica/mistica-web/commit/e4c569feb248969008425e731a7c63bc70e87423))
* **Skeletons:** Improve skeleton container size ([#619](https://github.com/Telefonica/mistica-web/issues/619)) ([d5d628d](https://github.com/Telefonica/mistica-web/commit/d5d628dba3ced805e0ac7d03eb2a56b73175f703))

# [12.12.0](https://github.com/Telefonica/mistica-web/compare/v12.11.1...v12.12.0) (2022-12-19)


### Bug Fixes

* **Touchable:** use BaseTouchable in some components ([#601](https://github.com/Telefonica/mistica-web/issues/601)) ([3cd8f44](https://github.com/Telefonica/mistica-web/commit/3cd8f44e7a52888040b5b1c732b9bcc732db1c27))
* **vanilla-extract:** remove backgroundColor from sprinkles ([#599](https://github.com/Telefonica/mistica-web/issues/599)) ([7981028](https://github.com/Telefonica/mistica-web/commit/7981028296e82900cf23bb20d308aa3751f17e66))


### Features

* **Carousel:** deprecate mobilePageOffset prop ([#609](https://github.com/Telefonica/mistica-web/issues/609)) ([6bca5bf](https://github.com/Telefonica/mistica-web/commit/6bca5bf6b30adbccd54fbeae8d3a3fc24982b3fb))
* **colors:** added codemod to migrate from theme.colors to skinVars.colors ([#608](https://github.com/Telefonica/mistica-web/issues/608)) ([2caece1](https://github.com/Telefonica/mistica-web/commit/2caece140f3cdd6a0231efcdc76ab8d2c56f802d))
* **DataAttributes:** expose component name as data attribute ([#622](https://github.com/Telefonica/mistica-web/issues/622)) ([6fd7049](https://github.com/Telefonica/mistica-web/commit/6fd70493826a6ea19aca9139e34f3d1901a84797))
* **HighlightedCard:** use forwardRef ([#607](https://github.com/Telefonica/mistica-web/issues/607)) ([0bc6227](https://github.com/Telefonica/mistica-web/commit/0bc622743c873c6880ab46b3b6718e81a70ff617))
* **ResponsiveLayout:** allow background color ([#600](https://github.com/Telefonica/mistica-web/issues/600)) ([069e4d1](https://github.com/Telefonica/mistica-web/commit/069e4d13b24fbe8af60b51fa8abfb8f1dd903132))
* **vanilla-extract:** migrate FixedFooterLayout and other internal components ([#606](https://github.com/Telefonica/mistica-web/issues/606)) ([2d8d082](https://github.com/Telefonica/mistica-web/commit/2d8d082ed357f84f6432443650b03be7246fa70b))
* **vanilla-extract:** migrate HelperText ([#611](https://github.com/Telefonica/mistica-web/issues/611)) ([a4fb684](https://github.com/Telefonica/mistica-web/commit/a4fb68458ca43c91684d328ff58010ab4c1a9091))
* **vanilla-extract:** Migrate MaybeDismisseable, Menu, NavigationBar, Breadcrumbs, PasswordInput, Popover, RadioButton, Select, Switch ([#598](https://github.com/Telefonica/mistica-web/issues/598)) ([0c61e5d](https://github.com/Telefonica/mistica-web/commit/0c61e5d200db0f25a36b601581322e73669995d2))
* **vanilla-extract:** Migrate TextField Components, TextFieldBase ([#603](https://github.com/Telefonica/mistica-web/issues/603)) ([b2d7df8](https://github.com/Telefonica/mistica-web/commit/b2d7df81bb8cd6a966dafaf83914dddda2d4d8ee))

## [12.11.1](https://github.com/Telefonica/mistica-web/compare/v12.11.0...v12.11.1) (2022-11-25)


### Bug Fixes

* **ButtonLayout:** unstability in screenshot tests ([#604](https://github.com/Telefonica/mistica-web/issues/604)) ([34e196d](https://github.com/Telefonica/mistica-web/commit/34e196d7c18de11fabe7eb0e6409711f08519a7c))

# [12.11.0](https://github.com/Telefonica/mistica-web/compare/v12.10.0...v12.11.0) (2022-11-24)


### Bug Fixes

* **styles:** some fixes in components migrated to VE ([#602](https://github.com/Telefonica/mistica-web/issues/602)) ([f907063](https://github.com/Telefonica/mistica-web/commit/f9070635b7b9a022fd781f7ccb5191dceb7d97f4))


### Features

* **vanilla-extract:** migrate carousel ([#589](https://github.com/Telefonica/mistica-web/issues/589)) ([c4a02fa](https://github.com/Telefonica/mistica-web/commit/c4a02fac08fe80a0ecbfea115c6e21e9ee6c0cae))
* **vanilla-extract:** Migrate FadeIn, Feedbacks, Form, HighlightedCard, LoadingBar ([#592](https://github.com/Telefonica/mistica-web/issues/592)) ([f2c069f](https://github.com/Telefonica/mistica-web/commit/f2c069f976a554df2ed399e71d712e2533de9098))
* **vanilla-extract:** migrate icons to use colors from skin vars ([#591](https://github.com/Telefonica/mistica-web/issues/591)) ([b6acdb7](https://github.com/Telefonica/mistica-web/commit/b6acdb74ef469a261da908c4fa905d4839885d2d))
* **vanilla-extract:** migrate list and rows ([#595](https://github.com/Telefonica/mistica-web/issues/595)) ([9bd94eb](https://github.com/Telefonica/mistica-web/commit/9bd94ebb5de855a2d34c38d50654f84d7aba2f66))
* **vanilla-extract:** Migrate ProgressBar, Skeletons, Spinner, Stepper, Tooltip, NegativeBox ([#594](https://github.com/Telefonica/mistica-web/issues/594)) ([b22662b](https://github.com/Telefonica/mistica-web/commit/b22662beb98be73ee5af991c173a9583a8290019))
* **vanilla-extract:** Migrate ScreenReaderOnly ([#596](https://github.com/Telefonica/mistica-web/issues/596)) ([bceed72](https://github.com/Telefonica/mistica-web/commit/bceed72ecb23b4a99d8068fbde1ea749d324e2c8))
* **vanilla-extract:** Migrate Tabs ([#597](https://github.com/Telefonica/mistica-web/issues/597)) ([4d1e4a6](https://github.com/Telefonica/mistica-web/commit/4d1e4a6ef3ea0dc32317ea9b7b7aedc79a28613e))
* **vanilla-extract:** Migrate TextLink ([#593](https://github.com/Telefonica/mistica-web/issues/593)) ([11a2e9f](https://github.com/Telefonica/mistica-web/commit/11a2e9f03d046da7539b0dcf37a93dc98841b09d))

# [12.10.0](https://github.com/Telefonica/mistica-web/compare/v12.9.1...v12.10.0) (2022-11-22)


### Bug Fixes

* **FixedFooterLayout:** mediaquery to not be fixed when viewport isn't tall enough ([#588](https://github.com/Telefonica/mistica-web/issues/588)) ([cf183ec](https://github.com/Telefonica/mistica-web/commit/cf183eca04b13147a6f9fc527234117283363606))
* **Inputs:** Review readonly input props ([#577](https://github.com/Telefonica/mistica-web/issues/577)) ([c2349bd](https://github.com/Telefonica/mistica-web/commit/c2349bdb991a8b8417f14a84030c409c2959f2df))
* **RadioButton:** controlled by parent ([#586](https://github.com/Telefonica/mistica-web/issues/586)) ([38b1f47](https://github.com/Telefonica/mistica-web/commit/38b1f478b6dbb7ad1839c88c953747ab12f16eab))
* **Row:** types for runtime conditional values ([#570](https://github.com/Telefonica/mistica-web/issues/570)) ([566d1bb](https://github.com/Telefonica/mistica-web/commit/566d1bbc98c5429bcc0ac29bc813a84aaa5daf36))


### Features

* **FormFields:** restore readonly type ([#584](https://github.com/Telefonica/mistica-web/issues/584)) ([94549f1](https://github.com/Telefonica/mistica-web/commit/94549f1153e88d393e3b3ce671a7798bb4ee357b))
* **vanilla-extract:** Dialog, Divider, DoubleField, EmptyState, EmptyStateCard ([#590](https://github.com/Telefonica/mistica-web/issues/590)) ([73f62d6](https://github.com/Telefonica/mistica-web/commit/73f62d676ab3a658407070f46767d9b01579c47f))
* **vanilla-extract:** migrate ButtonGroup, ButtonLayout, Button, Touchable, Image and Video ([#581](https://github.com/Telefonica/mistica-web/issues/581)) ([2e699ff](https://github.com/Telefonica/mistica-web/commit/2e699fff504047b164020198e13b131f8eef546d))
* **vanilla-extract:** migrate Callouts, Cards, Checkbox, Chip, Circle, CreditCard, CVV and DateTimePicker ([#587](https://github.com/Telefonica/mistica-web/issues/587)) ([3aadcdb](https://github.com/Telefonica/mistica-web/commit/3aadcdbe0aecfebdd25105c73569b251f42427c6))
* **vanilla-extract:** migrate ResponsiveLayout and GridLayout ([#580](https://github.com/Telefonica/mistica-web/issues/580)) ([e97f801](https://github.com/Telefonica/mistica-web/commit/e97f801435207ef688d6202717a00b2687867c2f))
* **VE:** migrate to Vanilla Extract: box, stack, inline, touchable and text ([#575](https://github.com/Telefonica/mistica-web/issues/575)) ([9c3cd72](https://github.com/Telefonica/mistica-web/commit/9c3cd72b4abb09d3bdf2f40c5a898d69cc1e1e40))

## [12.9.1](https://github.com/Telefonica/mistica-web/compare/v12.9.0...v12.9.1) (2022-11-10)


### Bug Fixes

* **build:** use browserslist as compilation target ([#578](https://github.com/Telefonica/mistica-web/issues/578)) ([c81fe5d](https://github.com/Telefonica/mistica-web/commit/c81fe5d9de29ded2a54f7657717abf8620bebada))

# [12.9.0](https://github.com/Telefonica/mistica-web/compare/v12.8.0...v12.9.0) (2022-11-10)


### Bug Fixes

* **Cards:** close button ([#576](https://github.com/Telefonica/mistica-web/issues/576)) ([4c27059](https://github.com/Telefonica/mistica-web/commit/4c27059fbe702c47d4e85813e659ac577896f954))
* **playroom:** PreviewTools tabs in desktop ([#574](https://github.com/Telefonica/mistica-web/issues/574)) ([76f39cc](https://github.com/Telefonica/mistica-web/commit/76f39cce00bbaf15ee7b7ac44004f6c92e6dcbe6))


### Features

* **Vanilla Extract:** as a future replacement of jss ([#561](https://github.com/Telefonica/mistica-web/issues/561)) ([8e54a95](https://github.com/Telefonica/mistica-web/commit/8e54a95ed2b9f24499ab7dcca196ed4c3953d6fe))

# [12.8.0](https://github.com/Telefonica/mistica-web/compare/v12.7.0...v12.8.0) (2022-11-07)


### Features

* **Carousel:** initialActiveItem prop ([#560](https://github.com/Telefonica/mistica-web/issues/560)) ([262f833](https://github.com/Telefonica/mistica-web/commit/262f833d8a1f49e3837fdb69ff22f9543f9a7e71))
* **RowList:** noLastDivider prop ([#535](https://github.com/Telefonica/mistica-web/issues/535)) ([5a0999f](https://github.com/Telefonica/mistica-web/commit/5a0999f2f3ea6afde2616f9a2a96c4247859130b))

# [12.7.0](https://github.com/Telefonica/mistica-web/compare/v12.6.0...v12.7.0) (2022-11-03)


### Bug Fixes

* **colors O2:** buttonLinkBackgroundSelected ([#543](https://github.com/Telefonica/mistica-web/issues/543)) ([80ae976](https://github.com/Telefonica/mistica-web/commit/80ae9761f48d265f70a835b9ed49e0e95df60b86))
* **FixedFooter:** fixed footer layout as fixed only when enough height available ([#557](https://github.com/Telefonica/mistica-web/issues/557)) ([1f8d0da](https://github.com/Telefonica/mistica-web/commit/1f8d0da69cad3ddad2bc2facbcfe86597a1b7f82))
* **TextField:** improve styles for readOnly state ([#528](https://github.com/Telefonica/mistica-web/issues/528)) ([624e55e](https://github.com/Telefonica/mistica-web/commit/624e55e4477a23e78e67a5039ec6455f6b261a21))


### Features

* **icons:** new tokens icon and fixes for buy-data, eco, and justice ([#559](https://github.com/Telefonica/mistica-web/issues/559)) ([e957475](https://github.com/Telefonica/mistica-web/commit/e95747566cda33e4ee87a8427ceb6ab729b91353))
* **Image:** add loading/error experience ([#562](https://github.com/Telefonica/mistica-web/issues/562)) ([08b0a73](https://github.com/Telefonica/mistica-web/commit/08b0a7388dcc3604fbf7af6823d6614df9ff0c88))

# [12.6.0](https://github.com/Telefonica/mistica-web/compare/v12.5.0...v12.6.0) (2022-10-24)


### Bug Fixes

* **NavigationBar:** Add nabvarHeight to playroom ([#558](https://github.com/Telefonica/mistica-web/issues/558)) ([dc6ea00](https://github.com/Telefonica/mistica-web/commit/dc6ea00adf1a17a5169010a2b5ba2d2de67d6158))
* **PhoneNumberField:** Safari workaround for prefix alignment ([#555](https://github.com/Telefonica/mistica-web/issues/555)) ([db28ec4](https://github.com/Telefonica/mistica-web/commit/db28ec443f3a91fd6f890e17e102df7be9a5449b))
* **TextLink:** always use inline anchors for TextLink ([#553](https://github.com/Telefonica/mistica-web/issues/553)) ([1d3cc49](https://github.com/Telefonica/mistica-web/commit/1d3cc496be0a05f2b9b230bb1621e6750a43b4c3))
* **Tooltip:** increase tooltip z-index ([#544](https://github.com/Telefonica/mistica-web/issues/544)) ([39ee208](https://github.com/Telefonica/mistica-web/commit/39ee2085522835ee8f09f4f5fde5582549dcc24c))


### Features

* **Dialog:** design improvements ([#554](https://github.com/Telefonica/mistica-web/issues/554)) ([ca98c50](https://github.com/Telefonica/mistica-web/commit/ca98c50a0b0b33b9a7484d0f1cb95d09900fd0ba))
* **NavigationBar:** Move navigation bar height to context ([#548](https://github.com/Telefonica/mistica-web/issues/548)) ([bb3e2c1](https://github.com/Telefonica/mistica-web/commit/bb3e2c1a46881dc63813768db475ca14d2465062))
* **Tooltip:** open on hover in desktop ([#550](https://github.com/Telefonica/mistica-web/issues/550)) ([c9f8c88](https://github.com/Telefonica/mistica-web/commit/c9f8c8827e32150b093e76bea72cbfc513230504))

# [12.5.0](https://github.com/Telefonica/mistica-web/compare/v12.4.0...v12.5.0) (2022-10-11)


### Features

* **Button:** use forwardRef ([#551](https://github.com/Telefonica/mistica-web/issues/551)) ([ce3449d](https://github.com/Telefonica/mistica-web/commit/ce3449d9120dfe9c329e8d755c5bb549cc12b894))

# [12.4.0](https://github.com/Telefonica/mistica-web/compare/v12.3.0...v12.4.0) (2022-09-30)


### Features

* **Text:** make word break by default ([#545](https://github.com/Telefonica/mistica-web/issues/545)) ([845a87d](https://github.com/Telefonica/mistica-web/commit/845a87dc8fa56c13683d03c2c852449a76e8df1e))

# [12.3.0](https://github.com/Telefonica/mistica-web/compare/v12.2.0...v12.3.0) (2022-09-29)


### Bug Fixes

* **NavigationBreadcrumbs:** Improve Breadcrumbs UI and accessibility. Small fix in snackbar. ([#542](https://github.com/Telefonica/mistica-web/issues/542)) ([817985a](https://github.com/Telefonica/mistica-web/commit/817985a26bca3d82bfa648b87da9ed36eb54a274))


### Features

* **Carousel:** improve styles inside GridLayout columns ([#547](https://github.com/Telefonica/mistica-web/issues/547)) ([dbdd288](https://github.com/Telefonica/mistica-web/commit/dbdd288903419ba62ab7342660d8f5b3a35df49a))

# [12.2.0](https://github.com/Telefonica/mistica-web/compare/v12.1.0...v12.2.0) (2022-09-21)


### Bug Fixes

* **NavigationBarLogo:** alignment and Blau's size ([#527](https://github.com/Telefonica/mistica-web/issues/527)) ([180d943](https://github.com/Telefonica/mistica-web/commit/180d9437262ec22ac2aa27e97e88c1a3f3f677da))
* **OverscrollColorProvider:** avoid re-mounts ([#539](https://github.com/Telefonica/mistica-web/issues/539)) ([5f4c1ce](https://github.com/Telefonica/mistica-web/commit/5f4c1ce72c2fb9082692d5ff6914b3137bf8debc))
* **skin:** change backgroundSkeleton to grey2 ([#524](https://github.com/Telefonica/mistica-web/issues/524)) ([3734548](https://github.com/Telefonica/mistica-web/commit/3734548404cded20295407fe7a90d8907f3a7ebb))
* **Skin:** improve control constant in dark mode in Blau & Telefónica ([#526](https://github.com/Telefonica/mistica-web/issues/526)) ([3d747bb](https://github.com/Telefonica/mistica-web/commit/3d747bbb8321a35c76e28773de6f414b1c3898d1))


### Features

* **Button:** support for pre/post icons ([#530](https://github.com/Telefonica/mistica-web/issues/530)) ([17c2b96](https://github.com/Telefonica/mistica-web/commit/17c2b9647fa03c004ff1ba506090894657d6b6b3))
* **dataAttributes:** add dataAttributes prop to several components ([#534](https://github.com/Telefonica/mistica-web/issues/534)) ([90471f6](https://github.com/Telefonica/mistica-web/commit/90471f66d6c1d2f52ec34becf80fa001148949d2))
* **dialog:** allow extra content in web ([#536](https://github.com/Telefonica/mistica-web/issues/536)) ([3568ea8](https://github.com/Telefonica/mistica-web/commit/3568ea83115caf4a94b80aa6fbe000ead69f12e1))
* **GridLayout:** add support for vertical space ([#533](https://github.com/Telefonica/mistica-web/issues/533)) ([f2ffe75](https://github.com/Telefonica/mistica-web/commit/f2ffe75d6966dd1a06dc05181651c9a56ccd0b50))
* **icons:** new O2 icons and fixes ([#538](https://github.com/Telefonica/mistica-web/issues/538)) ([ab7985b](https://github.com/Telefonica/mistica-web/commit/ab7985ba3ef91336b50f257128739ee56ca33ff3))
* **Skeletons:** new components ([7671168](https://github.com/Telefonica/mistica-web/commit/767116875b4254b9932107ece4a75db3805f319c))

# [12.1.0](https://github.com/Telefonica/mistica-web/compare/v12.0.0...v12.1.0) (2022-08-31)


### Bug Fixes

* **Blau skin:** backgroundSkeletonInverse color ([#513](https://github.com/Telefonica/mistica-web/issues/513)) ([d076a29](https://github.com/Telefonica/mistica-web/commit/d076a296006292f721b129113b90dba335064275))
* **ButtonLink:** Fix paddings ([#518](https://github.com/Telefonica/mistica-web/issues/518)) ([25dbc1a](https://github.com/Telefonica/mistica-web/commit/25dbc1a14565cce203fb9784dfce3fe61da15e0a))
* **Cards:** Media & Data card content structure unification ([#519](https://github.com/Telefonica/mistica-web/issues/519)) ([439cc54](https://github.com/Telefonica/mistica-web/commit/439cc54c069544311d652dfc1cc07c3fc84642b1))
* **Checkbox:** fix junk pixel in checkbox ([#521](https://github.com/Telefonica/mistica-web/issues/521)) ([16a5e08](https://github.com/Telefonica/mistica-web/commit/16a5e08d390fee6351a11745de0d362bf121e76f))
* **Snapcard:** `extra` now fits the whole width bug ([#514](https://github.com/Telefonica/mistica-web/issues/514)) ([9e06869](https://github.com/Telefonica/mistica-web/commit/9e06869db9a082b4074116352fed44dcd5dc19d6))
* **Spinner:** fix flicker pixel in spinner ([#522](https://github.com/Telefonica/mistica-web/issues/522)) ([74d07e0](https://github.com/Telefonica/mistica-web/commit/74d07e01cc7b41dbd6710c1ab2863f084be9893f))


### Features

* **Carousel:** allow passing styles to item container ([#525](https://github.com/Telefonica/mistica-web/issues/525)) ([998556f](https://github.com/Telefonica/mistica-web/commit/998556f760cfd7d9e6ca19182d1c116dd55e5414))
* **IconPhotoCamera:** changed telefonica icon ([#515](https://github.com/Telefonica/mistica-web/issues/515)) ([13f0b95](https://github.com/Telefonica/mistica-web/commit/13f0b95f7c4db58e757c256d8867d1ae10ad0f88))
* **Popover:** refactor and extra prop ([#516](https://github.com/Telefonica/mistica-web/issues/516)) ([d49ccb3](https://github.com/Telefonica/mistica-web/commit/d49ccb36ec14017056c8bdbfc2008c43969b1890))
* **TextLink:** improve inverse variant ([#520](https://github.com/Telefonica/mistica-web/issues/520)) ([9b5af26](https://github.com/Telefonica/mistica-web/commit/9b5af266917ec4132d735ef876f1f17416e91f3e))

# [12.0.0](https://github.com/Telefonica/mistica-web/compare/v11.12.2...v12.0.0) (2022-08-04)


### Bug Fixes

* **RadioButton:** flow types ([#510](https://github.com/Telefonica/mistica-web/issues/510)) ([5b751ec](https://github.com/Telefonica/mistica-web/commit/5b751ecaeb65536693f7ed5b8f7f2bfb6a038e0c))


### Features

* **Dialog:** remove min height ([#506](https://github.com/Telefonica/mistica-web/issues/506)) ([5df0158](https://github.com/Telefonica/mistica-web/commit/5df015868633190e238dd1a23b8a9d7ff5bfc524))
* **General:** multiple style changes in components and color changes in Movistar skin ([#497](https://github.com/Telefonica/mistica-web/issues/497)) ([08ada4e](https://github.com/Telefonica/mistica-web/commit/08ada4e6e3036a1141ad2bbb062b2fe4c02b582c))
* **GridLayoutNew:** new 3+9 template ([#512](https://github.com/Telefonica/mistica-web/issues/512)) ([dfc81ec](https://github.com/Telefonica/mistica-web/commit/dfc81ec81d6826f540a7b50d8732c80df835af0e))
* **ResponsiveLayout:** dataAttributes support ([#508](https://github.com/Telefonica/mistica-web/issues/508)) ([398f462](https://github.com/Telefonica/mistica-web/commit/398f462a7ea75fa6128e5a80e0a884842880c156))
* **Row:** make radio button rows accessible ([#507](https://github.com/Telefonica/mistica-web/issues/507)) ([3c15ff7](https://github.com/Telefonica/mistica-web/commit/3c15ff7df6d0deb1059bdb44d9b7e99efc31c46e))
* **Text8:** update sizes for desktop ([#505](https://github.com/Telefonica/mistica-web/issues/505)) ([c328b8e](https://github.com/Telefonica/mistica-web/commit/c328b8eac552024cddabcd477cbbcd9686ee8eac))


### BREAKING CHANGES

* **General:** Removed SectionTitle.
Renamed and removed multiple icons

## [11.12.2](https://github.com/Telefonica/mistica-web/compare/v11.12.1...v11.12.2) (2022-07-04)


### Bug Fixes

* **Text:** Update text breaking rules ([#500](https://github.com/Telefonica/mistica-web/issues/500)) ([50f6d17](https://github.com/Telefonica/mistica-web/commit/50f6d1737b31d14180a9cfa1535b71488f3458a6))

## [11.12.1](https://github.com/Telefonica/mistica-web/compare/v11.12.0...v11.12.1) (2022-06-24)


### Bug Fixes

* **Video:** Element size problem when playing in Safari ([bacdae1](https://github.com/Telefonica/mistica-web/commit/bacdae172a9e0399a4d738de0e92c74bdb0fa295))

# [11.12.0](https://github.com/Telefonica/mistica-web/compare/v11.11.1...v11.12.0) (2022-06-23)


### Bug Fixes

* **Video:** problem with aspectRatio 0 in Safari ([#498](https://github.com/Telefonica/mistica-web/issues/498)) ([24452eb](https://github.com/Telefonica/mistica-web/commit/24452eb50a4d7335853b4c0f76747f7c229ce62c))


### Features

* **Skin:** allow to customize font weight of some text presets ([#495](https://github.com/Telefonica/mistica-web/issues/495)) ([cf5968c](https://github.com/Telefonica/mistica-web/commit/cf5968cca99eca56533fac4df5dec6f3ca95042a))

## [11.11.1](https://github.com/Telefonica/mistica-web/compare/v11.11.0...v11.11.1) (2022-06-22)


### Bug Fixes

* **MediaQuery:** Improve media query for touchable-only devices ([#496](https://github.com/Telefonica/mistica-web/issues/496)) ([927a103](https://github.com/Telefonica/mistica-web/commit/927a1032ec4f14d615acae0103a1985155180726))

# [11.11.0](https://github.com/Telefonica/mistica-web/compare/v11.10.2...v11.11.0) (2022-06-20)


### Bug Fixes

* **Video:** avoid flickering when playing video in Safari ([#491](https://github.com/Telefonica/mistica-web/issues/491)) ([c17ba31](https://github.com/Telefonica/mistica-web/commit/c17ba312f466b224ffddec07a7c0d58c3bdd5c24))


### Features

* **DataCard,MediaCard,SnapCard:** allow limiting text lines ([#494](https://github.com/Telefonica/mistica-web/issues/494)) ([d3a201b](https://github.com/Telefonica/mistica-web/commit/d3a201b9a83432f34bd84fc5953eb18e2c87bd17))
* **DataCard,MediaCard:** allow dismissable cards ([#492](https://github.com/Telefonica/mistica-web/issues/492)) ([a027fbb](https://github.com/Telefonica/mistica-web/commit/a027fbb566249936bbd79f203e6b080d7b79b39e))
* **SnapCard:** new component ([#487](https://github.com/Telefonica/mistica-web/issues/487)) ([401a16b](https://github.com/Telefonica/mistica-web/commit/401a16ba3377094dcd7d7b70aae3016c41b77aa9))

## [11.10.2](https://github.com/Telefonica/mistica-web/compare/v11.10.1...v11.10.2) (2022-06-14)


### Bug Fixes

* **Select:** menu item horizontal padding ([#490](https://github.com/Telefonica/mistica-web/issues/490)) ([eb48eae](https://github.com/Telefonica/mistica-web/commit/eb48eae942d77e75e727512722e191bf5e3f8e0a))
* **Text:** inherit word-break style from parent when the wordBreak prop is not set ([#493](https://github.com/Telefonica/mistica-web/issues/493)) ([38638f3](https://github.com/Telefonica/mistica-web/commit/38638f341a976aecb201f19a35fd9f96589c9e01))

## [11.10.1](https://github.com/Telefonica/mistica-web/compare/v11.10.0...v11.10.1) (2022-06-09)


### Bug Fixes

* **Text:** wordBreak in old safari versions ([#489](https://github.com/Telefonica/mistica-web/issues/489)) ([c1372b5](https://github.com/Telefonica/mistica-web/commit/c1372b5b2d9d25557a0f30597362626b54533251))

# [11.10.0](https://github.com/Telefonica/mistica-web/compare/v11.9.0...v11.10.0) (2022-06-06)


### Features

* **Analytics:** TrackingConfig context provider ([#486](https://github.com/Telefonica/mistica-web/issues/486)) ([afcf8d3](https://github.com/Telefonica/mistica-web/commit/afcf8d353c35d6b84352c07261fc1d1ef0fdff96))

# [11.9.0](https://github.com/Telefonica/mistica-web/compare/v11.8.0...v11.9.0) (2022-05-26)


### Bug Fixes

* **Text:** word break in Safari ([#484](https://github.com/Telefonica/mistica-web/issues/484)) ([807255d](https://github.com/Telefonica/mistica-web/commit/807255d4682763c4131a0d836e158de1dbd9c25f))


### Features

* **Avatar:** new component ([#482](https://github.com/Telefonica/mistica-web/issues/482)) ([c0beee5](https://github.com/Telefonica/mistica-web/commit/c0beee519e6d2206c8198efbc9461a49970258b8))

# [11.8.0](https://github.com/Telefonica/mistica-web/compare/v11.7.0...v11.8.0) (2022-05-18)


### Features

* **Image:** expose onError and onLoad. Avoid broken icon  ([#478](https://github.com/Telefonica/mistica-web/issues/478)) ([2002741](https://github.com/Telefonica/mistica-web/commit/20027410e70e14fcd25a7227ae7cd1394190f937))
* **PasswordField:** use mistica icon for show/hide password ([#475](https://github.com/Telefonica/mistica-web/issues/475)) ([491072f](https://github.com/Telefonica/mistica-web/commit/491072f316a9b98bf32b68bafe2c26c394210c23))
* **Title1,Title2:** new components ([#477](https://github.com/Telefonica/mistica-web/issues/477)) ([9684e4f](https://github.com/Telefonica/mistica-web/commit/9684e4f954c640dabb6292f0df158209e1548d0c))
* **trackingEvent:** add support for new GA4 event format ([#480](https://github.com/Telefonica/mistica-web/issues/480)) ([8e3851a](https://github.com/Telefonica/mistica-web/commit/8e3851a93d87a77375d93e326fe08178a419cd29))

# [11.7.0](https://github.com/Telefonica/mistica-web/compare/v11.6.0...v11.7.0) (2022-04-28)


### Features

* **Image,Video:** use original proportion when setting `aspetRatio={0}` ([#474](https://github.com/Telefonica/mistica-web/issues/474)) ([f3aef36](https://github.com/Telefonica/mistica-web/commit/f3aef363695cc12b7ea0267d70950080e5332a7c))

# [11.6.0](https://github.com/Telefonica/mistica-web/compare/v11.5.1...v11.6.0) (2022-04-27)


### Features

* **ButtonLink:** allow disabled state ([#467](https://github.com/Telefonica/mistica-web/issues/467)) ([aac0b60](https://github.com/Telefonica/mistica-web/commit/aac0b6018eae714fa3c327da925c335fa36de0d8))
* **ResponsiveLayout:** add horizontal safe area for notch or similar ([#473](https://github.com/Telefonica/mistica-web/issues/473)) ([a8fd958](https://github.com/Telefonica/mistica-web/commit/a8fd958e3a903d97e581da8d508ca8bbf43c4250))

## [11.5.1](https://github.com/Telefonica/mistica-web/compare/v11.5.0...v11.5.1) (2022-04-26)


### Bug Fixes

* **Carousel:** Set min-width to workaround issue when rendered on a hidden webview ([#469](https://github.com/Telefonica/mistica-web/issues/469)) ([040e732](https://github.com/Telefonica/mistica-web/commit/040e7323b7cd745948b10131a99db2a30654c2c0))
* **FeedbackScreen:** background color ([#470](https://github.com/Telefonica/mistica-web/issues/470)) ([a5d962f](https://github.com/Telefonica/mistica-web/commit/a5d962ff644da5fc258f158d6a8679ab75491d0f))

# [11.5.0](https://github.com/Telefonica/mistica-web/compare/v11.4.1...v11.5.0) (2022-04-26)


### Bug Fixes

* **Chip:** disable user select in interactive Chips ([#466](https://github.com/Telefonica/mistica-web/issues/466)) ([576697f](https://github.com/Telefonica/mistica-web/commit/576697fe5816969652773d112000f9644cf650fa))


### Features

* **icons:** added new icons to O2 ([#459](https://github.com/Telefonica/mistica-web/issues/459)) ([0da3f71](https://github.com/Telefonica/mistica-web/commit/0da3f71b0daad79d17fd74412533731f0ff1023d))
* **icons:** new o2 credit-card-visa icon ([#468](https://github.com/Telefonica/mistica-web/issues/468)) ([207e17f](https://github.com/Telefonica/mistica-web/commit/207e17f0bb78aa53f25cc11d404b5c1fe0885f7e))
* **NestableContext:** export type ([#472](https://github.com/Telefonica/mistica-web/issues/472)) ([fabe902](https://github.com/Telefonica/mistica-web/commit/fabe902779df62bf88015e093235ebddb8dfd91c))

## [11.4.1](https://github.com/Telefonica/mistica-web/compare/v11.4.0...v11.4.1) (2022-04-11)


### Bug Fixes

* **Row:** fix gap between right and chevron ([#465](https://github.com/Telefonica/mistica-web/issues/465)) ([fe39d81](https://github.com/Telefonica/mistica-web/commit/fe39d815f9ab85b18e1280fc4346569406cd4433))

# [11.4.0](https://github.com/Telefonica/mistica-web/compare/v11.3.0...v11.4.0) (2022-04-08)


### Bug Fixes

* **dark mode:** dark constants in classic O2 ([#455](https://github.com/Telefonica/mistica-web/issues/455)) ([d44d233](https://github.com/Telefonica/mistica-web/commit/d44d2332ecb5a91de1195391de6f69019d391774))
* **types:** make skin in ThemeConfig readonly ([#463](https://github.com/Telefonica/mistica-web/issues/463)) ([f0f72a7](https://github.com/Telefonica/mistica-web/commit/f0f72a73a0372273d4e49d9e688629ae4351c875))


### Features

* **FixedFooterLayout:** improve dark mode appearance ([#456](https://github.com/Telefonica/mistica-web/issues/456)) ([b21896c](https://github.com/Telefonica/mistica-web/commit/b21896cc651615429142cf5d966e3bbf4dbf526e))
* **Rows:** auto center right node when needed and allow custom render function ([fe07a88](https://github.com/Telefonica/mistica-web/commit/fe07a8862d7f7e6c4c7d9276204e90820ae6e69a))

# [11.3.0](https://github.com/Telefonica/mistica-web/compare/v11.2.1...v11.3.0) (2022-04-05)


### Bug Fixes

* **flow types:** components with forward ref ([#457](https://github.com/Telefonica/mistica-web/issues/457)) ([db9cf82](https://github.com/Telefonica/mistica-web/commit/db9cf825a839c849c17bea84ac2c80a914177cb1))
* **Row:** remove cursor pointer on non interactive rows ([#458](https://github.com/Telefonica/mistica-web/issues/458)) ([f629dd2](https://github.com/Telefonica/mistica-web/commit/f629dd2ab3eeacef9ebe654d445ad88aa346cc29))
* **Video, Image:** aspect ratio fix for old browsers ([#451](https://github.com/Telefonica/mistica-web/issues/451)) ([4e9ea65](https://github.com/Telefonica/mistica-web/commit/4e9ea65786c90bc49bbb85b6acdd0ff9bf398bbd))


### Features

* **ThemeContextProvider:** allow custom skins ([#460](https://github.com/Telefonica/mistica-web/issues/460)) ([738bb5c](https://github.com/Telefonica/mistica-web/commit/738bb5c0ca44c3557bcdddcabdf53a7a0449df4c))

## [11.2.1](https://github.com/Telefonica/mistica-web/compare/v11.2.0...v11.2.1) (2022-03-24)


### Bug Fixes

* **icons:** device chip missing hole ([#453](https://github.com/Telefonica/mistica-web/issues/453)) ([cb4107d](https://github.com/Telefonica/mistica-web/commit/cb4107db46d1dafd1ea5feb6ff5629bb350643ff))

# [11.2.0](https://github.com/Telefonica/mistica-web/compare/v11.1.0...v11.2.0) (2022-03-24)


### Bug Fixes

* **icons:** fix some broken icons ([#452](https://github.com/Telefonica/mistica-web/issues/452)) ([226760c](https://github.com/Telefonica/mistica-web/commit/226760c7c5f8d1d5e93913ba9be33904aaa54362))


### Features

* **Carousel:** improve the single page case ([#450](https://github.com/Telefonica/mistica-web/issues/450)) ([67c08bd](https://github.com/Telefonica/mistica-web/commit/67c08bdf7f70472879fae7290a976998a12a6f63))

# [11.1.0](https://github.com/Telefonica/mistica-web/compare/v11.0.0...v11.1.0) (2022-03-22)


### Bug Fixes

* **icons:** removed unneeded evenodd prop ([#446](https://github.com/Telefonica/mistica-web/issues/446)) ([7761aef](https://github.com/Telefonica/mistica-web/commit/7761aefcf0dce1cddf55042e82d02e5ebcde53d6))


### Features

* **webview-bridge:** bump version ([#447](https://github.com/Telefonica/mistica-web/issues/447)) ([3f5dc1f](https://github.com/Telefonica/mistica-web/commit/3f5dc1f596ebc0f2a96564440ed906f17e0803a5))

# [11.0.0](https://github.com/Telefonica/mistica-web/compare/v10.29.0...v11.0.0) (2022-03-18)


### Bug Fixes

* **Carousel:** set default gap in desktop to 16 ([#442](https://github.com/Telefonica/mistica-web/issues/442)) ([91d233a](https://github.com/Telefonica/mistica-web/commit/91d233af0a27521f31a3ac1d450bd8a11bf39889))
* **FixedFooterLayout:** improve dark mode footer ([#438](https://github.com/Telefonica/mistica-web/issues/438)) ([194b265](https://github.com/Telefonica/mistica-web/commit/194b265656a844c71cea3fe4e9f432d3df44e98c))
* **Row:** checkbox onChange always returning true ([#428](https://github.com/Telefonica/mistica-web/issues/428)) ([6e58166](https://github.com/Telefonica/mistica-web/commit/6e5816630edc587572d22dea9789957b8dbd7a89))


### chore

* **deprecate:** remove deprecated stuff ([#443](https://github.com/Telefonica/mistica-web/issues/443)) ([6d14fb9](https://github.com/Telefonica/mistica-web/commit/6d14fb9681c3ece5969f5ba7d43381d5ef37c11f))


### Features

* **Chip:** work like checkbox or radio button ([#441](https://github.com/Telefonica/mistica-web/issues/441)) ([fb34bd9](https://github.com/Telefonica/mistica-web/commit/fb34bd953c88bae9bd50de299ce382ef6d99efcd))
* **icons:** update catalog ([#445](https://github.com/Telefonica/mistica-web/issues/445)) ([0a045cb](https://github.com/Telefonica/mistica-web/commit/0a045cb67c0b923eb151a595719b58b4f43785b7))
* **Image:** allow string width, number aspectRatio ([328e568](https://github.com/Telefonica/mistica-web/commit/328e568638684d82927621b00f7da06575a46a61))


### BREAKING CHANGES

* **deprecate:** removed deprecated components and props
* **icons:** rename some icons, and remove some others
* **Chip:** changed params of `render` prop in `Switch`, `Checkbox` and `RadioButton`

# [10.29.0](https://github.com/Telefonica/mistica-web/compare/v10.28.1...v10.29.0) (2022-03-15)


### Features

* **Touchable:** Added loadOnTop prop ([#440](https://github.com/Telefonica/mistica-web/issues/440)) ([884940f](https://github.com/Telefonica/mistica-web/commit/884940fc1b924fef8f398af1c71313068c0e7ad7))

## [10.28.1](https://github.com/Telefonica/mistica-web/compare/v10.28.0...v10.28.1) (2022-03-09)


### Bug Fixes

* **Carousel:** undefined is not an object error in iOS 14 ([#439](https://github.com/Telefonica/mistica-web/issues/439)) ([ef1cf63](https://github.com/Telefonica/mistica-web/commit/ef1cf63a1e7b9009cab28a0bb23b3dd6540defbb))
* **FixedFooterLayout:** shadow style ([#437](https://github.com/Telefonica/mistica-web/issues/437)) ([d9d9641](https://github.com/Telefonica/mistica-web/commit/d9d9641b101484f8e1d3e5bf9476821cdef517e3))
* **Popover:** arrow border radius ([#435](https://github.com/Telefonica/mistica-web/issues/435)) ([42eb25e](https://github.com/Telefonica/mistica-web/commit/42eb25ea9e071a38a3b44c1934aef949cfc7c9a5))
* **Popover:** text styles ([#436](https://github.com/Telefonica/mistica-web/issues/436)) ([4c156cb](https://github.com/Telefonica/mistica-web/commit/4c156cbebae937175a66cf3afb5abfca8051cfd0))
* **select:** issue with cropped text ([#426](https://github.com/Telefonica/mistica-web/issues/426)) ([2c6e027](https://github.com/Telefonica/mistica-web/commit/2c6e027f643b3458359e6866bc6d9a10afb1e5b4))
* **Slideshow:** scroll snap stop on android ([#434](https://github.com/Telefonica/mistica-web/issues/434)) ([4ccb6a6](https://github.com/Telefonica/mistica-web/commit/4ccb6a6822a936ae185470bf8bf01bb4224a6626))

# [10.28.0](https://github.com/Telefonica/mistica-web/compare/v10.27.0...v10.28.0) (2022-03-01)


### Bug Fixes

* **popover:** Fix size in iOS when rendered offscreen ([#431](https://github.com/Telefonica/mistica-web/issues/431)) ([9cb3a29](https://github.com/Telefonica/mistica-web/commit/9cb3a290ea2b6c434c715bb7c18bca9678c5a006))


### Features

* **Carousel:** autoplay only move when carousel is visible ([#430](https://github.com/Telefonica/mistica-web/issues/430)) ([fa74b04](https://github.com/Telefonica/mistica-web/commit/fa74b04e1d6171809ea8a5c1522cb0622b9dfc01))

# [10.27.0](https://github.com/Telefonica/mistica-web/compare/v10.26.0...v10.27.0) (2022-02-25)


### Bug Fixes

* **playroom:** dark mode in Blau & Telefonica ios ([#423](https://github.com/Telefonica/mistica-web/issues/423)) ([a630625](https://github.com/Telefonica/mistica-web/commit/a630625379cdb486abd916ad05c0d3fd4974e5cd))
* **skins:** remove deprecated constants ([#418](https://github.com/Telefonica/mistica-web/issues/418)) ([822960f](https://github.com/Telefonica/mistica-web/commit/822960f2ecf629b4e5de0ac3224e2026332c0f14))
* **Telefonica skin:** change badge color ([#424](https://github.com/Telefonica/mistica-web/issues/424)) ([0976c24](https://github.com/Telefonica/mistica-web/commit/0976c246f295d4be61426d33ff93b65c9bae0598))


### Features

* **Button:** default tracking events ([#425](https://github.com/Telefonica/mistica-web/issues/425)) ([5fc2576](https://github.com/Telefonica/mistica-web/commit/5fc25768f71cd8a0318b47266511694e6024e49e))
* **Image, Text, Video, Tag:** add dataAttributes prop ([#429](https://github.com/Telefonica/mistica-web/issues/429)) ([730a0db](https://github.com/Telefonica/mistica-web/commit/730a0dbb80abe9a47260b21e29fe1cbf2c9cc206))

# [10.26.0](https://github.com/Telefonica/mistica-web/compare/v10.25.0...v10.26.0) (2022-02-23)


### Features

* **Callout:** Changed element distribution so link has more space ([#414](https://github.com/Telefonica/mistica-web/issues/414)) ([bf3c1cf](https://github.com/Telefonica/mistica-web/commit/bf3c1cfc30db7f5df498743b414599635582910e))

# [10.25.0](https://github.com/Telefonica/mistica-web/compare/v10.24.2...v10.25.0) (2022-02-23)


### Features

* **webview-bridge:** upgrade webview-bridge dependency ([#420](https://github.com/Telefonica/mistica-web/issues/420)) ([0b01b6e](https://github.com/Telefonica/mistica-web/commit/0b01b6ed67bb0bcb10927ffb44812095abacc233))

## [10.24.2](https://github.com/Telefonica/mistica-web/compare/v10.24.1...v10.24.2) (2022-02-22)


### Bug Fixes

* **Popover:** bug with close event propagation ([#421](https://github.com/Telefonica/mistica-web/issues/421)) ([0b439b6](https://github.com/Telefonica/mistica-web/commit/0b439b6cdb9ea6404d0ec2c6b50b61d99937cbc6))

## [10.24.1](https://github.com/Telefonica/mistica-web/compare/v10.24.0...v10.24.1) (2022-02-16)


### Bug Fixes

* **ThemeContextProvider:** Support SSR + Strict Mode ([#419](https://github.com/Telefonica/mistica-web/issues/419)) ([05b701d](https://github.com/Telefonica/mistica-web/commit/05b701d868d3b49a280c32365244771bd9c94416))

# [10.24.0](https://github.com/Telefonica/mistica-web/compare/v10.23.0...v10.24.0) (2022-02-15)


### Bug Fixes

* **Card:** spacing between headline and title ([#405](https://github.com/Telefonica/mistica-web/issues/405)) ([2baeb82](https://github.com/Telefonica/mistica-web/commit/2baeb829468ff0fb5181c1b475a6464123eace45))
* **Dialog:** remove unstable_disableHistoryUpdateInDialogs ([#415](https://github.com/Telefonica/mistica-web/issues/415)) ([bc8da4b](https://github.com/Telefonica/mistica-web/commit/bc8da4bda217134a9c02ab7538268ecc5b2f6b51))
* **FormFields:** helper text spacing ([#411](https://github.com/Telefonica/mistica-web/issues/411)) ([97111a7](https://github.com/Telefonica/mistica-web/commit/97111a7654aeb5cb1d246065523cedecba721071))
* **Playroom:** bug with modals when using PreviewTools ([#416](https://github.com/Telefonica/mistica-web/issues/416)) ([1ccf9b1](https://github.com/Telefonica/mistica-web/commit/1ccf9b116d90cc1e8db0e9572222eb2d3b6c7e69))
* **skins:** cleanup disabled colors in Telefonica skin ([#406](https://github.com/Telefonica/mistica-web/issues/406)) ([8cde8e5](https://github.com/Telefonica/mistica-web/commit/8cde8e5a696bd33b43b14c221211b890da8b36d5))
* **Tag,Chip:** fix vertical alignment ([2309a24](https://github.com/Telefonica/mistica-web/commit/2309a2452461fb05004f8ae1114a0e32811a4037))


### Features

* **Carousel:** new components ([#403](https://github.com/Telefonica/mistica-web/issues/403)) ([613b19c](https://github.com/Telefonica/mistica-web/commit/613b19cd9abbc2a7012fd30087eb2f1d834bcf42))
* **Feedback:** change icons for O2 ([#402](https://github.com/Telefonica/mistica-web/issues/402)) ([e6b84ae](https://github.com/Telefonica/mistica-web/commit/e6b84ae3c1eb3531bb9ca260e28a1e21767a2177))
* **types:** better Flow types for ReactElement ([#413](https://github.com/Telefonica/mistica-web/issues/413)) ([3db84c0](https://github.com/Telefonica/mistica-web/commit/3db84c080c7d3786c707d9366b2d7e643752fa70))
* **Video, Image:** support 4:3 aspect ratio ([#417](https://github.com/Telefonica/mistica-web/issues/417)) ([81ff230](https://github.com/Telefonica/mistica-web/commit/81ff230f0e9f81422af34c499b35e4307f2412fc))

# [10.23.0](https://github.com/Telefonica/mistica-web/compare/v10.22.3...v10.23.0) (2022-02-10)


### Features

* **Dialog:** allow disable history update in dialogs ([#412](https://github.com/Telefonica/mistica-web/issues/412)) ([178bc55](https://github.com/Telefonica/mistica-web/commit/178bc55abc19f0d9117d0a51bbcb5a8a2353f68e))

## [10.22.3](https://github.com/Telefonica/mistica-web/compare/v10.22.2...v10.22.3) (2022-02-08)


### Bug Fixes

* **Form:** handle undefined rawValue ([#410](https://github.com/Telefonica/mistica-web/issues/410)) ([6363328](https://github.com/Telefonica/mistica-web/commit/63633288d1a9a1781b9bf350c4923af101a72312))

## [10.22.2](https://github.com/Telefonica/mistica-web/compare/v10.22.1...v10.22.2) (2022-02-07)


### Bug Fixes

* **Select:** set rawValue on init ([#409](https://github.com/Telefonica/mistica-web/issues/409)) ([d72cbd1](https://github.com/Telefonica/mistica-web/commit/d72cbd179e930712ef54c5e483e08c922a857059))

## [10.22.1](https://github.com/Telefonica/mistica-web/compare/v10.22.0...v10.22.1) (2022-02-03)


### Bug Fixes

* **Form fields:** use rawValue to check if a form field is empty ([#408](https://github.com/Telefonica/mistica-web/issues/408)) ([50a5d37](https://github.com/Telefonica/mistica-web/commit/50a5d37179903ed69f1aa33ac6b7e5d6b1f10a6f))

# [10.22.0](https://github.com/Telefonica/mistica-web/compare/v10.21.0...v10.22.0) (2022-02-02)


### Features

* **Chip:** new component ([#395](https://github.com/Telefonica/mistica-web/issues/395)) ([37f1be2](https://github.com/Telefonica/mistica-web/commit/37f1be2322ad3913b3084fb6a14539629a9a81b4))

# [10.21.0](https://github.com/Telefonica/mistica-web/compare/v10.20.0...v10.21.0) (2022-01-27)


### Bug Fixes

* **ButtonLayout:** missed button press in button layout when gaining focus ([#396](https://github.com/Telefonica/mistica-web/issues/396)) ([9f3bba5](https://github.com/Telefonica/mistica-web/commit/9f3bba57affeac7b89c7dc831d00ce4ef33cdb5f))
* **ButtonLayout:** unstable in acceptance tests ([#404](https://github.com/Telefonica/mistica-web/issues/404)) ([11d4772](https://github.com/Telefonica/mistica-web/commit/11d4772c49d5f35bfcfa4ead6826782eccde5a18))


### Features

* **Touchable:** WEB-435 add hrefDecorator to theme ([#401](https://github.com/Telefonica/mistica-web/issues/401)) ([21a45ee](https://github.com/Telefonica/mistica-web/commit/21a45ee84259af4ccca2a5adf2a7242b442d2874))

# [10.20.0](https://github.com/Telefonica/mistica-web/compare/v10.19.0...v10.20.0) (2022-01-24)


### Features

* **Tags:** Tag component evolution ([#372](https://github.com/Telefonica/mistica-web/issues/372)) ([0db48b1](https://github.com/Telefonica/mistica-web/commit/0db48b15525b67c574b90c8c450b35ef155ca199))

# [10.19.0](https://github.com/Telefonica/mistica-web/compare/v10.18.0...v10.19.0) (2022-01-24)


### Features

* **Feedback:** Update animated success icon for O2 ([#397](https://github.com/Telefonica/mistica-web/issues/397)) ([c0952cd](https://github.com/Telefonica/mistica-web/commit/c0952cdf10779f097359754b8f8d1addccb05713))
* **Image:** Added forward ref to Image component. ([#399](https://github.com/Telefonica/mistica-web/issues/399)) ([c78008f](https://github.com/Telefonica/mistica-web/commit/c78008f33d0a7979ead1760b01169a3e5bc65c1e))
* **SectionTitle:** Changed right prop to React.Node ([#398](https://github.com/Telefonica/mistica-web/issues/398)) ([d94b986](https://github.com/Telefonica/mistica-web/commit/d94b98636a834291af46f3b51223de97aaf79e41))

# [10.18.0](https://github.com/Telefonica/mistica-web/compare/v10.17.0...v10.18.0) (2022-01-21)


### Features

* **Video:** Video component and Video support in Media Cards ([#391](https://github.com/Telefonica/mistica-web/issues/391)) ([a830a9b](https://github.com/Telefonica/mistica-web/commit/a830a9b2f364d9f17245aba02cfbbfee678a064b))

# [10.17.0](https://github.com/Telefonica/mistica-web/compare/v10.16.0...v10.17.0) (2022-01-18)


### Bug Fixes

* **Menu:** Menu component improvements ([#392](https://github.com/Telefonica/mistica-web/issues/392)) ([d8f1098](https://github.com/Telefonica/mistica-web/commit/d8f10988c7273da71645768c22d3a106dae0f15e))


### Features

* **Feedback:** show info/error icons in vivo ([c60e3a3](https://github.com/Telefonica/mistica-web/commit/c60e3a391174f0f6ff6e40c5bd795f2f950b5d69))
* **TextFieldBase:** expose internal TextFieldBase component for advanced usage ([e917a99](https://github.com/Telefonica/mistica-web/commit/e917a99379d5f7fedddb0d5727cffd88af5a1d0f))

# [10.16.0](https://github.com/Telefonica/mistica-web/compare/v10.15.0...v10.16.0) (2022-01-17)


### Features

* **Form:** improvements to be able to build custom fields ([cf5de03](https://github.com/Telefonica/mistica-web/commit/cf5de0398c441d943ee417123293450595aa95f5))

# [10.15.0](https://github.com/Telefonica/mistica-web/compare/v10.14.2...v10.15.0) (2022-01-12)


### Features

* **Form fields:** review disabled state ([#386](https://github.com/Telefonica/mistica-web/issues/386)) ([615f90d](https://github.com/Telefonica/mistica-web/commit/615f90de59ec647121f1c8c2cb6c342ace5df396))

## [10.14.2](https://github.com/Telefonica/mistica-web/compare/v10.14.1...v10.14.2) (2022-01-03)


### Bug Fixes

* **release:** commit updated package-version.tsx file on release ([#389](https://github.com/Telefonica/mistica-web/issues/389)) ([61e384a](https://github.com/Telefonica/mistica-web/commit/61e384a0cd93f32bae691c15b209b5e6f3e42485))

## [10.14.1](https://github.com/Telefonica/mistica-web/compare/v10.14.0...v10.14.1) (2022-01-03)


### Bug Fixes

* **Dialog:** overlay fadeout animation ([#388](https://github.com/Telefonica/mistica-web/issues/388)) ([fc9b80b](https://github.com/Telefonica/mistica-web/commit/fc9b80b5b9670b6cdaa7ee81a7a1ae457c396662))
* **Dialog:** race condition closing it before open transition end ([#387](https://github.com/Telefonica/mistica-web/issues/387)) ([cfef0f3](https://github.com/Telefonica/mistica-web/commit/cfef0f3a30e21909537bd07b98d359c1fbc3cd3b))

# [10.14.0](https://github.com/Telefonica/mistica-web/compare/v10.13.0...v10.14.0) (2021-12-22)


### Features

* **Checkbox, RadioButton:** Baseline alignment by default ([6c1fe3e](https://github.com/Telefonica/mistica-web/commit/6c1fe3ef62d96889ce7f94f22f08782f729070ca))
* **DecimalField:** Add maxDecimals prop to limit the number of decimal places ([#380](https://github.com/Telefonica/mistica-web/issues/380)) ([82196ec](https://github.com/Telefonica/mistica-web/commit/82196ecdba2b9a10140ae70c3c881baff43f8d39))
* **ErrorFeedbackScreen:** new errorReference prop ([#375](https://github.com/Telefonica/mistica-web/issues/375)) ([60b8193](https://github.com/Telefonica/mistica-web/commit/60b8193c92b9c076e570792197f8c60eabd7d412))
* **ForwardRef:** Support forward ref in: Row, BoxedRow, MediaCard, Boxed, Box, ButtonLink ([#377](https://github.com/Telefonica/mistica-web/issues/377)) ([48d3017](https://github.com/Telefonica/mistica-web/commit/48d30174cb8f43dbeb0185ca7ca294e41acee9a8))
* **Icons:** Update Mistica Icons ([#379](https://github.com/Telefonica/mistica-web/issues/379)) ([9165907](https://github.com/Telefonica/mistica-web/commit/91659078b736edb6938fa309e9a40968e6b7b1c9))

# [10.13.0](https://github.com/Telefonica/mistica-web/compare/v10.12.0...v10.13.0) (2021-12-02)


### Bug Fixes

* **Dialog:** text size ([#371](https://github.com/Telefonica/mistica-web/issues/371)) ([4b3a2a7](https://github.com/Telefonica/mistica-web/commit/4b3a2a70ed2aa46c8d91420182e146c6b3b3b2c4))


### Features

* **Icons:** Update mistica icons ([#374](https://github.com/Telefonica/mistica-web/issues/374)) ([136bb96](https://github.com/Telefonica/mistica-web/commit/136bb96a11835ce16c69b93e67eb1f92e9c0d8d4))

# [10.12.0](https://github.com/Telefonica/mistica-web/compare/v10.11.0...v10.12.0) (2021-11-24)


### Features

* **DataCard:** make title and description optional ([#373](https://github.com/Telefonica/mistica-web/issues/373)) ([e44a064](https://github.com/Telefonica/mistica-web/commit/e44a06460a1c27ed06279890c7df0d692300e38e))

# [10.11.0](https://github.com/Telefonica/mistica-web/compare/v10.10.0...v10.11.0) (2021-11-24)


### Bug Fixes

* **IconClose, IconArrowDown:** use mistica icons instead ([#367](https://github.com/Telefonica/mistica-web/issues/367)) ([1c324fa](https://github.com/Telefonica/mistica-web/commit/1c324fa97a937fb8da56539ee1230896f7f094ff))


### Features

* **Icons:** Skin support for icons ([#369](https://github.com/Telefonica/mistica-web/issues/369)) ([8d82c53](https://github.com/Telefonica/mistica-web/commit/8d82c53981b38ac53e5c11e775d38fa9824e2a5a))

# [10.10.0](https://github.com/Telefonica/mistica-web/compare/v10.9.2...v10.10.0) (2021-11-15)


### Bug Fixes

* **HighlightedCard:** Propagate width to card wrappers ([#368](https://github.com/Telefonica/mistica-web/issues/368)) ([81f3b2a](https://github.com/Telefonica/mistica-web/commit/81f3b2a9e2ed5b61df8295a104047186adc45307))


### Features

* **form fields:** use text presets ([#359](https://github.com/Telefonica/mistica-web/issues/359)) ([7fc1d0a](https://github.com/Telefonica/mistica-web/commit/7fc1d0a8b72788f982e80aab31a633fbc7e9244f))

## [10.9.2](https://github.com/Telefonica/mistica-web/compare/v10.9.1...v10.9.2) (2021-11-05)


### Bug Fixes

* **Switch:** Revert event cancel in switch change ([#366](https://github.com/Telefonica/mistica-web/issues/366)) ([fd38fa0](https://github.com/Telefonica/mistica-web/commit/fd38fa0bcd94a27bd27b9ce7154db2ff6e9e7802))

## [10.9.1](https://github.com/Telefonica/mistica-web/compare/v10.9.0...v10.9.1) (2021-11-05)


### Bug Fixes

* **HighlightedCard:** Allow to stretch inside flex container ([#360](https://github.com/Telefonica/mistica-web/issues/360)) ([43e56d1](https://github.com/Telefonica/mistica-web/commit/43e56d125a9cdc012baceeb060ca00d9395f580d))
* **Switch:** stop event propagation on change ([#365](https://github.com/Telefonica/mistica-web/issues/365)) ([22d7254](https://github.com/Telefonica/mistica-web/commit/22d7254a0771c03f99488f197f9cd47d0d2e5370))

# [10.9.0](https://github.com/Telefonica/mistica-web/compare/v10.8.1...v10.9.0) (2021-10-21)


### Features

* **MonthField:** new form field to select months ([#356](https://github.com/Telefonica/mistica-web/issues/356)) ([1a949a5](https://github.com/Telefonica/mistica-web/commit/1a949a5fa4d2f9e7a0141afd7c920741faf36c49))

## [10.8.1](https://github.com/Telefonica/mistica-web/compare/v10.8.0...v10.8.1) (2021-10-19)


### Bug Fixes

* **blau:** some color bad naming ([#358](https://github.com/Telefonica/mistica-web/issues/358)) ([64a3a87](https://github.com/Telefonica/mistica-web/commit/64a3a87a23cdbb16ca60c0639976c5fe84275905))

# [10.8.0](https://github.com/Telefonica/mistica-web/compare/v10.7.0...v10.8.0) (2021-10-18)


### Features

* **ButtonGroup:** new component (private) ([#351](https://github.com/Telefonica/mistica-web/issues/351)) ([fe00dd7](https://github.com/Telefonica/mistica-web/commit/fe00dd7372e6bec8222bf7456b28fb523d40d2c9))

# [10.7.0](https://github.com/Telefonica/mistica-web/compare/v10.6.0...v10.7.0) (2021-10-18)


### Bug Fixes

* **colors:** fix some dark colors ([#354](https://github.com/Telefonica/mistica-web/issues/354)) ([7ecb12b](https://github.com/Telefonica/mistica-web/commit/7ecb12b502a4a634d4cd0686f205e448db3a7b7f))


### Features

* **ProgressBar:** allow custom color ([#353](https://github.com/Telefonica/mistica-web/issues/353)) ([1f7be87](https://github.com/Telefonica/mistica-web/commit/1f7be87b4c9297fa273f69b612333224f05750aa))

# [10.6.0](https://github.com/Telefonica/mistica-web/compare/v10.5.1...v10.6.0) (2021-10-14)


### Features

* **Blau:** new skin ([#311](https://github.com/Telefonica/mistica-web/issues/311)) ([235017b](https://github.com/Telefonica/mistica-web/commit/235017bb80fd87956ce84257c2042862d53b6f85))

## [10.5.1](https://github.com/Telefonica/mistica-web/compare/v10.5.0...v10.5.1) (2021-10-05)


### Bug Fixes

* **Feedback:** clean layout effect ([#349](https://github.com/Telefonica/mistica-web/issues/349)) ([8549082](https://github.com/Telefonica/mistica-web/commit/8549082d9c617fbeff78f1d81ed0e7b29f3d1ae7))
* **Feedback:** styling issues ([#350](https://github.com/Telefonica/mistica-web/issues/350)) ([1979ebc](https://github.com/Telefonica/mistica-web/commit/1979ebc130cca9d65e3133a3e9cad5c0c1032e5c))

# [10.5.0](https://github.com/Telefonica/mistica-web/compare/v10.4.0...v10.5.0) (2021-10-04)


### Bug Fixes

* **EmptyStateCard:** do not log error if button is not configured ([#347](https://github.com/Telefonica/mistica-web/issues/347)) ([76127e7](https://github.com/Telefonica/mistica-web/commit/76127e701a016667bb80198bc1d0230ef27984ae))
* **SuccessfeedbackScreen:** wrong background in mobile with unstable_inlineInDesktop ([a15d8aa](https://github.com/Telefonica/mistica-web/commit/a15d8aac59a7ee6393a600d905a5d7c07101f78a))


### Features

* **FeedbackScreen:** update desktop mode ([#343](https://github.com/Telefonica/mistica-web/issues/343)) ([cc246d2](https://github.com/Telefonica/mistica-web/commit/cc246d2c7d67659240161924a692f8e5cc602f4e))
* **FixedFooterLayout:** stop using Portal for the fixed part ([560914c](https://github.com/Telefonica/mistica-web/commit/560914c9106a4e5f8bf4dd1975fdd5870e955eda))
* **SuccessFeedback:** new component ([#345](https://github.com/Telefonica/mistica-web/issues/345)) ([00c51cb](https://github.com/Telefonica/mistica-web/commit/00c51cb72a662685db3c85cfad6e50ab33061feb))

# [10.4.0](https://github.com/Telefonica/mistica-web/compare/v10.3.1...v10.4.0) (2021-09-30)


### Features

* **MediaCard:** make description optional ([#346](https://github.com/Telefonica/mistica-web/issues/346)) ([ce5a653](https://github.com/Telefonica/mistica-web/commit/ce5a653c099e830e7cb60fb1b8ce8db62d8ffa3a))

## [10.3.1](https://github.com/Telefonica/mistica-web/compare/v10.3.0...v10.3.1) (2021-09-23)


### Bug Fixes

* **NavigationBar:** remove wrong border transition in desktop ([b58d46c](https://github.com/Telefonica/mistica-web/commit/b58d46ccf14c5cebbfe95b5c62d7644525fddb86))

# [10.3.0](https://github.com/Telefonica/mistica-web/compare/v10.2.0...v10.3.0) (2021-09-23)


### Features

* **Form fields:** change style of disabled fields ([#340](https://github.com/Telefonica/mistica-web/issues/340)) ([bdced15](https://github.com/Telefonica/mistica-web/commit/bdced15cc48fe3baf417f72fc6d453f91d172a62))
* **NavigationBar:** make border optional ([#342](https://github.com/Telefonica/mistica-web/issues/342)) ([2b63b96](https://github.com/Telefonica/mistica-web/commit/2b63b962b87600f972485eea268721e074047533))

# [10.2.0](https://github.com/Telefonica/mistica-web/compare/v10.1.0...v10.2.0) (2021-09-21)


### Bug Fixes

* **form fields:** change disabled color ([#334](https://github.com/Telefonica/mistica-web/issues/334)) ([fdb9f89](https://github.com/Telefonica/mistica-web/commit/fdb9f890677d4fb5e5d6d1a6980efe6287e4d533))
* **PasswordField:** keep caret position when switching visibility ([#339](https://github.com/Telefonica/mistica-web/issues/339)) ([6d4b67b](https://github.com/Telefonica/mistica-web/commit/6d4b67b3bbfa935936fb456fa97d760af4522b0c))
* **snippets:** wrong icon prop in Callout ([#337](https://github.com/Telefonica/mistica-web/issues/337)) ([a974a12](https://github.com/Telefonica/mistica-web/commit/a974a128107f7ce46ab9379ebe7155da160f0efc))


### Features

* **mq.suportsHover:** include mq for devices that support hover ([#341](https://github.com/Telefonica/mistica-web/issues/341)) ([b6b6389](https://github.com/Telefonica/mistica-web/commit/b6b638965b2253bd813ff42af4ef596949c59120))

# [10.1.0](https://github.com/Telefonica/mistica-web/compare/v10.0.1...v10.1.0) (2021-09-15)


### Bug Fixes

* **NavigationBarActionGroup:** add missing children prop type ([#333](https://github.com/Telefonica/mistica-web/issues/333)) ([a6d1a79](https://github.com/Telefonica/mistica-web/commit/a6d1a79f7a6e9146aaa9fb83634ae8d69f2b50c4))
* **Select, TextField:** fix label text overflow ([#335](https://github.com/Telefonica/mistica-web/issues/335)) ([2e647b4](https://github.com/Telefonica/mistica-web/commit/2e647b4301f1ace758656c40f9793150bcf19c2e))
* **types:** review wrong usages of TS React.ReactElement ([#332](https://github.com/Telefonica/mistica-web/issues/332)) ([9ea483f](https://github.com/Telefonica/mistica-web/commit/9ea483f26b0d070fc5237949dba4f2acd68185ff))


### Features

* **NavigationBar:** allow custom paddingX when not fixed ([#336](https://github.com/Telefonica/mistica-web/issues/336)) ([b09c6dc](https://github.com/Telefonica/mistica-web/commit/b09c6dc03a8e71c2eb16684c399cc16b55c61513))

## [10.0.1](https://github.com/Telefonica/mistica-web/compare/v10.0.0...v10.0.1) (2021-09-07)


### Bug Fixes

* **TextLink:** add missing dataAttributes to Props type ([#331](https://github.com/Telefonica/mistica-web/issues/331)) ([666cbeb](https://github.com/Telefonica/mistica-web/commit/666cbeb694ceb01a9611c55d6372401c4585be37))

# [10.0.0](https://github.com/Telefonica/mistica-web/compare/v9.17.0...v10.0.0) (2021-09-07)


### Bug Fixes

* **snippets:** change some deprecated icons ([70286a0](https://github.com/Telefonica/mistica-web/commit/70286a0459bf947b7881f6b12267379595d6dfa1))


### Features

* **deprecate:** remove deprecated props and icons ([#326](https://github.com/Telefonica/mistica-web/issues/326)) ([b06894e](https://github.com/Telefonica/mistica-web/commit/b06894ef241de7324e4cc9958c01c23dcdf03a52))
* **EmptyState:** new component ([f367dfd](https://github.com/Telefonica/mistica-web/commit/f367dfdbe46acb8339ba9c097cd37ab6d76cb423))
* **FocusTrap:** allow focus trap to work cross Portals ([#327](https://github.com/Telefonica/mistica-web/issues/327)) ([d07e409](https://github.com/Telefonica/mistica-web/commit/d07e4097dde542b49d8889b2400f28cc88f9455a))
* **GridLayout:** add 5+4 and remove 6+4 template ([#328](https://github.com/Telefonica/mistica-web/issues/328)) ([ab3f0b0](https://github.com/Telefonica/mistica-web/commit/ab3f0b051260745f55acbb66b25e97d5eea692c6))
* **icons:** allow icons size prop to be a string ('100%' for example) ([444d4a9](https://github.com/Telefonica/mistica-web/commit/444d4a91a88dd8d8defded0c356d6106f69daf5d))
* **NavigationBar:** new navigation bar components ([6ccbcac](https://github.com/Telefonica/mistica-web/commit/6ccbcac64d7992741aa4676d2cd7839879aac8bb))
* **Playroom:** add forceDesktop prop to PreviewTools ([#330](https://github.com/Telefonica/mistica-web/issues/330)) ([e70db3e](https://github.com/Telefonica/mistica-web/commit/e70db3ec3266b39032b9505cdf5cca07412536f8))


### BREAKING CHANGES

* **EmptyState:** remove EmptyStateScreen component
* **GridLayout:** removed 6+4 template from GridLayout
* **deprecate:** Removed data-xxx props. Removed IconButton label prop (use aria-label instead). Removed deprecated icons. Removed some other deprecated stuff
* **FocusTrap:** removed clickOutsideDeactivates feature from FocusTrap

# [9.17.0](https://github.com/Telefonica/mistica-web/compare/v9.16.1...v9.17.0) (2021-09-03)


### Bug Fixes

* **media queries:** change large desktop breakpoint from 1366 to 1368 ([f3bf2d4](https://github.com/Telefonica/mistica-web/commit/f3bf2d47aede1cbb2304fc42d51a1d95dc578dd0))


### Features

* **Menu:** new direction prop ([4890839](https://github.com/Telefonica/mistica-web/commit/489083923486c9a05d9a42d18d89156aa8d1a6b5))

## [9.16.1](https://github.com/Telefonica/mistica-web/compare/v9.16.0...v9.16.1) (2021-08-26)


### Bug Fixes

* **Rows:** add flex container for asset ([#321](https://github.com/Telefonica/mistica-web/issues/321)) ([ee57715](https://github.com/Telefonica/mistica-web/commit/ee57715770dd152f6b8a62286d5356e52d7d9e00))

# [9.16.0](https://github.com/Telefonica/mistica-web/compare/v9.15.0...v9.16.0) (2021-08-24)


### Features

* **Rows:** images with aspect ratio in rows ([#320](https://github.com/Telefonica/mistica-web/issues/320)) ([86be151](https://github.com/Telefonica/mistica-web/commit/86be1512d513f363a52f3e08872d075e43e2765f))

# [9.15.0](https://github.com/Telefonica/mistica-web/compare/v9.14.1...v9.15.0) (2021-08-23)


### Features

* **Rows:** dataAttributes support ([#319](https://github.com/Telefonica/mistica-web/issues/319)) ([abd6284](https://github.com/Telefonica/mistica-web/commit/abd628483c49654460a67779aaa502922dc40626))

## [9.14.1](https://github.com/Telefonica/mistica-web/compare/v9.14.0...v9.14.1) (2021-08-20)


### Bug Fixes

* **Rows:** Improve accessibility ([#318](https://github.com/Telefonica/mistica-web/issues/318)) ([24bdea5](https://github.com/Telefonica/mistica-web/commit/24bdea55d492f9cc7353d1e01a95ed5663a30938))

# [9.14.0](https://github.com/Telefonica/mistica-web/compare/v9.13.0...v9.14.0) (2021-08-19)


### Features

* **Rows:** Allow double interactions: onPress + switch/checkbox ([095008d](https://github.com/Telefonica/mistica-web/commit/095008d0cb838100b21684c0c6ff4bff5b414b10))
* **Rows:** Allow extra content in rows ([ecc3b50](https://github.com/Telefonica/mistica-web/commit/ecc3b50f134205bf11328978412fbe82a63a4347))

# [9.13.0](https://github.com/Telefonica/mistica-web/compare/v9.12.0...v9.13.0) (2021-08-13)


### Features

* **Breakpoints:** use mobile styles in tablet breakpoint ([#312](https://github.com/Telefonica/mistica-web/issues/312)) ([919fc12](https://github.com/Telefonica/mistica-web/commit/919fc12b15a1d6eb496011b5d7f03424ee4c18ad))

# [9.12.0](https://github.com/Telefonica/mistica-web/compare/v9.11.0...v9.12.0) (2021-08-12)


### Bug Fixes

* **Dialog:** backdrop over fixed footer ([#309](https://github.com/Telefonica/mistica-web/issues/309)) ([156134c](https://github.com/Telefonica/mistica-web/commit/156134c4ba2dc287d7f96c7b22a76889e8e015bd))


### Features

* **a11y:** Accessibility improvements in several components ([#305](https://github.com/Telefonica/mistica-web/issues/305)) ([0d10787](https://github.com/Telefonica/mistica-web/commit/0d1078769f01ebd4ddabe387b691342f37f90b88))

# [9.11.0](https://github.com/Telefonica/mistica-web/compare/v9.10.1...v9.11.0) (2021-08-02)


### Features

* **FormFields:** use rifm to format CreditCard and Decimal fields ([dd2f8ff](https://github.com/Telefonica/mistica-web/commit/dd2f8ffec50e1e1cb80cc05700398a564ea02964))
* **Menu:** Expose function to close menu ([#308](https://github.com/Telefonica/mistica-web/issues/308)) ([2a70326](https://github.com/Telefonica/mistica-web/commit/2a7032612e25e86999c74041e1cb27465bbb5445))

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
