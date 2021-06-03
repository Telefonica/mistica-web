// eslint-disable-next-line filenames/match-regex
declare type StoryComponent<T = {}> = React.FC<T> & {
    storyName?: string;
    decorators?: Array<any>;
    parameters?: {[name: string]: any};
    args?: T;
};
