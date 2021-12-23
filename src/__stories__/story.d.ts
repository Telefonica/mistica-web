declare type StoryComponent<T = {children?: ReactNode}> = React.FC<T> & {
    storyName?: string;
    decorators?: Array<any>;
    parameters?: {[name: string]: any};
    args?: T;
};
