import * as React from 'react';

type Props = {
    load: string | (() => Promise<any>);
    render: (data: any) => React.ReactElement;
    renderLoading?: () => React.ReactElement;
    renderError?: () => React.ReactElement;
};

type LoaderState = 'loading' | 'error' | 'success';

const Loader: React.FC<Props> = ({load, render, renderLoading = () => null, renderError = () => null}) => {
    const [loaderData, setLoaderData] = React.useState(null);
    const [loaderStatus, setLoaderStatus] = React.useState<LoaderState>('loading');

    React.useEffect(() => {
        let isRenderActive = true;

        if (isRenderActive) setLoaderStatus('loading');

        if (typeof load === 'string') {
            fetch(load)
                .then((response) => {
                    if (!response.ok) {
                        if (isRenderActive) setLoaderStatus('error');
                    } else {
                        response
                            .json()
                            .then((data) => {
                                if (isRenderActive) {
                                    setLoaderData(data);
                                    setLoaderStatus('success');
                                }
                            })
                            .catch(() => {
                                if (isRenderActive) setLoaderStatus('error');
                            });
                    }
                })
                .catch(() => {
                    if (isRenderActive) setLoaderStatus('error');
                });
        } else {
            load()
                .then((data) => {
                    if (isRenderActive) {
                        setLoaderData(data);
                        setLoaderStatus('success');
                    }
                })
                .catch(() => {
                    if (isRenderActive) setLoaderStatus('error');
                });
        }

        return () => {
            isRenderActive = false;
        };
    }, [load]);

    if (loaderStatus === 'loading') return renderLoading();

    if (loaderStatus === 'error') return renderError();

    return render(loaderData);
};

export default Loader;
