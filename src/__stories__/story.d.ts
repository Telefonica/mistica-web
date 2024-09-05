declare type StoryComponent<T = {children?: ReactNode}> = {(props: T): JSX.Element} & {
    storyName?: string;
    decorators?: Array<any>;
    parameters?: {[name: string]: any};
    args?: T;
    argTypes?: {[arg in keyof T]?: mixed};
};

declare module '*.jpg';
declare module '*.png';
declare module '*.mp4';
