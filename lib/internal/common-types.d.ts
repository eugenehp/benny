export declare type Options = {
    delay?: number;
    initCount?: number;
    minTime?: number;
    maxTime?: number;
    minSamples?: number;
};
export declare type SaveOptions = {
    file?: string | ((summary: Summary) => string);
    folder?: string;
    version?: string | null;
    details?: boolean;
    format?: 'json' | 'csv' | 'table.html' | 'chart.html';
};
export declare type CaseResult = {
    name: string;
    ops: number;
    margin: number;
    options: Options;
    samples: number;
    promise: boolean;
    details: {
        min: number;
        max: number;
        mean: number;
        median: number;
        standardDeviation: number;
        marginOfError: number;
        relativeMarginOfError: number;
        standardErrorOfMean: number;
        sampleVariance: number;
        sampleResults: number[];
    };
    completed: boolean;
};
export declare type CaseResultWithDiff = CaseResult & {
    percentSlower: number;
};
export declare type Summary = {
    name: string;
    date: Date;
    results: CaseResultWithDiff[];
    fastest: {
        name: string;
        index: number;
    };
    slowest: {
        name: string;
        index: number;
    };
};
export declare type CSVEntry = {
    name: string;
    ops: number;
    margin: number;
    percentSlower: number;
    samples: number;
    promise: boolean;
    min: number;
    max: number;
    mean: number;
    median: number;
    standardDeviation: number;
    marginOfError: number;
    relativeMarginOfError: number;
    standardErrorOfMean: number;
    sampleVariance: number;
};
export declare type Target = {
    name: string;
    hz: number;
    stats: {
        rme: number;
        sample: number[];
        mean: number;
        deviation: number;
        moe: number;
        sem: number;
        variance: number;
    };
    delay: number;
    initCount: number;
    minTime: number;
    maxTime: number;
    minSamples: number;
    defer: boolean;
};
export declare type CSVContent = CSVEntry[];
