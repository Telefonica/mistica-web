/* eslint-disable no-var, no-inner-declarations */
import type {Browser, Page} from 'playwright';

declare global {
    var browser: Browser;
    var page: Page;
    var browserUserAgent: string;
}
