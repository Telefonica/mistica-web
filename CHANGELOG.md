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
