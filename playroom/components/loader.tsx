import * as React from 'react';

type Props = {
    load: string | (() => Promise<any>);
    render: (data: any) => React.ReactElement;
    renderLoading?: () => React.ReactElement | null;
    renderError?: () => React.ReactElement | null;
};

type LoaderState = 'loading' | 'error' | 'success';

const Loader = ({
    load,
    render,
    renderLoading = () => null,
    renderError = () => null,
}: Props): JSX.Element | null => {
    const [loaderData, setLoaderData] = React.useState(null);
    const [loaderStatus, setLoaderStatus] = React.useState<LoaderState>('loading');

    React.useEffect(() => {
        let isRenderActive = true;
        setLoaderStatus('loading');

        const loadFn =
            typeof load === 'function'
                ? load
                : () =>
                      fetch(load).then((response) => {
                          if (!response.ok) throw new Error('fetch failed');
                          return response.json();
                      });

        loadFn()
            .then((data) => {
                if (isRenderActive) {
                    setLoaderData(data);
                    setLoaderStatus('success');
                }
            })
            .catch(() => {
                if (isRenderActive) setLoaderStatus('error');
            });

        return () => {
            isRenderActive = false;
        };
    }, [load]);

    if (loaderStatus === 'loading') return renderLoading();

    if (loaderStatus === 'error') return renderError();

    return render(loaderData);
};

export default Loader;
