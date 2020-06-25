declare type StoryComponent<T = {}> = React.FC<T> & {
    story?: {
        name?: string;
        decorators?: Array<any>;
        parameters?: {[name: string]: any};
    };
};
