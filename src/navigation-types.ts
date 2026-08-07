import type {ExclusifyUnion} from './utils/utility-types';

/**
 * Interactive props for navigation components.
 * Mutually exclusive: exactly one of href, to, or onPress must be provided.
 */
type InteractiveProps = ExclusifyUnion<{href: string} | {to: string} | {onPress: () => void}>;

/**
 * Optional interactive props for navigation components.
 * Mutually exclusive: at most one of href, to, or onPress can be provided.
 */
type MaybeInteractiveProps = ExclusifyUnion<{href?: string} | {to?: string} | {onPress?: () => void}>;

export type {InteractiveProps, MaybeInteractiveProps};
