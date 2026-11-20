import * as React from 'react';
import NavigationBreadcrumbs from '../navigation-breadcrumbs';

export const Navigation = (): JSX.Element => {
    const [calls, setCalls] = React.useState<Array<string>>([]);
    return (
        <>
            <NavigationBreadcrumbs
                title="Title"
                breadcrumbs={['breadcrumb 1', 'breadcrumb 2'].map((title) => ({
                    title,
                    url: '#',
                    onNavigate: () => setCalls((calls) => [...calls, title]),
                }))}
            />
            <input type="hidden" data-testid="navigation-calls" value={JSON.stringify(calls)} />
        </>
    );
};
