/**
 * The async boundary of the host.
 *
 * A shared module reaches the page through the share scope, and webpack fills that scope
 * asynchronously. An entry that imports @telefonica/mistica directly therefore fails with "Shared
 * module is not available for eager consumption". This dynamic import gives webpack the chance to
 * negotiate the scope first. The alternative, eager: true in the shared entries, puts the whole
 * library in the initial chunk.
 */
import('./bootstrap');
