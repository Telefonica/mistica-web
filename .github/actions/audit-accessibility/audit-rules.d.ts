export declare const PATH_AXE_REPORTS: string;
export declare const getAuditCases: () => Array<{story: string; skin: string}>;
export declare const getAxeReportPath: (story: string, skin: string) => string;
export declare const getDisabledRules: (story: string, skin: string) => Array<string>;
export declare const parseAxeReportPath: (reportPath: string) => {story: string; skin: string};
