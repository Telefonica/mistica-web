import * as React from 'react';

type Props = {
    load: string | (() => Promise<any>);
    render: (data: any) => React.ReactElement;
    renderLoading?: () => React.ReactElement;
    renderError?: () => React.ReactElement;
};

const Loader: React.FC<Props> = ({load, render, renderLoading, renderError}) => {
    const [loaderData, setLoaderData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
        const getContent = async () => {
            try {
                setIsLoading(true);
                setLoaderData(null);
                setHasError(false);
                if (typeof load === 'string') {
                    fetch(load)
                        .then((response) => {
                            if (!response.ok) {
                                setHasError(true);
                            } else {
                                response
                                    .json()
                                    .then((r) => {
                                        setLoaderData(r);
                                    })
                                    .catch(() => setHasError(true));
                            }
                        })
                        .catch(() => setHasError(true))
                        .finally(() => setIsLoading(false));
                } else {
                    load()
                        .then((data) => setLoaderData(data))
                        .catch(() => setHasError(true))
                        .finally(() => setIsLoading(false));
                }
            } catch (e) {
                setHasError(true);
            }
        };

        getContent();
    }, [load, render, renderLoading, renderError]);

    let content;

    if (isLoading) {
        content = renderLoading ? renderLoading() : null;
    } else if (hasError) {
        content = renderError ? renderError() : null;
    } else {
        content = loaderData ? render(loaderData) : null;
    }

    return content;
};

export default Loader;
