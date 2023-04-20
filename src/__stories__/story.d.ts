declare type StoryComponent<T = {children?: ReactNode}> = React.FC<T> & {
    storyName?: string;
    decorators?: Array<any>;
    parameters?: {[name: string]: any};
    args?: T;
    argTypes?: {[arg in keyof T]?: mixed};
};

declare module '*.jpg';
declare module '*.png';
declare module '*.mp4';
