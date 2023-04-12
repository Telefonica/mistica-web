import * as React from 'react';

type Props = {
    loader: string | (() => Promise<any>);
    render: (data: any) => React.ReactElement;
    renderLoading: () => React.ReactElement;
    renderError: () => React.ReactElement;
};

export const Loader: React.FC<Props> = ({loader, render, renderLoading, renderError}) => {
    const [content, setContent] = React.useState<React.ReactElement>(<></>);

    React.useEffect(() => {
        const getContent = async () => {
            try {
                setContent(renderLoading());
                if (typeof loader === 'string') {
                    fetch(loader)
                        .then((response) => {
                            if (!response.ok) {
                                setContent(renderError());
                            } else {
                                response
                                    .json()
                                    .then((r) => {
                                        setContent(render(r));
                                    })
                                    .catch(() => setContent(renderError()));
                            }
                        })
                        .catch(() => setContent(renderError()));
                } else {
                    const data = await loader();
                    setContent(render(data));
                }
            } catch (e) {
                setContent(renderError());
            }
        };

        getContent();
    }, [loader, render, renderLoading, renderError]);

    return content;
};
