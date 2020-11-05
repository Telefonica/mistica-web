declare type StoryComponent<T = {}> = React.FC<T> & {
    storyName?: string;
    decorators?: Array<any>;
    parameters?: {[name: string]: any};
};
