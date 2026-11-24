import type {MaybeDensityConfig, SkinBorderRadiiConfig, SkinTextPresetsConfig} from '../skins/types';

type Padding = {top: {mobile: number; desktop: number}};

const plainPadding: MaybeDensityConfig<Padding> = {top: {mobile: 12, desktop: 12}};
const densityPadding: MaybeDensityConfig<Padding> = {
    top: {mobile: {density: {cozy: 12, compact: 8}}, desktop: 12},
};

// @ts-expect-error The cozy value is mandatory
const paddingWithoutCozy: MaybeDensityConfig<Padding> = {top: {mobile: {density: {compact: 8}}, desktop: 12}};

const plainWeight: SkinTextPresetsConfig = {cardTitle: {weight: 'medium'}};
// A union is not distributed, so cozy and compact can take different members
const densityWeight: SkinTextPresetsConfig = {
    cardTitle: {weight: {density: {cozy: 'medium', compact: 'bold'}}},
};

// @ts-expect-error A density value keeps the members of the union
const unknownWeight: SkinTextPresetsConfig = {cardTitle: {weight: {density: {cozy: 'heavy'}}}};

const plainRadius: Partial<SkinBorderRadiiConfig> = {button: '4px'};
const densityRadius: Partial<SkinBorderRadiiConfig> = {button: {density: {cozy: '8px', compact: '4px'}}};

// @ts-expect-error A text preset without a weight still forbids one
const forbiddenWeight: SkinTextPresetsConfig = {cardDescriptionDefault: {weight: {density: {cozy: 'bold'}}}};

[
    plainPadding,
    densityPadding,
    paddingWithoutCozy,
    plainWeight,
    densityWeight,
    unknownWeight,
    plainRadius,
    densityRadius,
    forbiddenWeight,
];
