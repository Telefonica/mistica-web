import * as React from 'react';
import {useTheme} from '../hooks';
import {isAndroid} from './platform';

const isDocumentVisible = () => typeof document !== 'undefined' && document.visibilityState === 'visible';

const DocumentVisibilityContext = React.createContext<boolean>(true);

type Props = {
    hidden?: boolean;
    children: React.ReactNode;
};

export const DocumentVisibilityProvider: React.FC<Props> = ({hidden, children}) => {
    const {platformOverrides} = useTheme();
    const [visible, setVisible] = React.useState(!hidden);
    React.useEffect(() => {
        const visibilitychangeCallback = () => {
            setVisible(isDocumentVisible());
        };
        const focusCallback = () => {
            setVisible(true);
        };
        const blurCallback = () => {
            setVisible(false);
        };
        setVisible(isDocumentVisible());
        document.addEventListener('visibilitychange', visibilitychangeCallback);
        document.addEventListener('focus', focusCallback);
        document.addEventListener('blur', blurCallback);
        return () => {
            document.removeEventListener('visibilitychange', visibilitychangeCallback);
            document.removeEventListener('focus', focusCallback);
            document.removeEventListener('blur', blurCallback);
        };
    }, []);

    // Workaround for this bug: https://jira.tuenti.io/jira/browse/ACCOUNT-10938
    // In Android, after ~10 minutes of inactivity, when a background webview receives focus (back navigation from another webview),
    // visibility change event is not fired, this causes problems like the navigation bar not being updated
    const isVisibleNow = isDocumentVisible();
    if (isAndroid(platformOverrides) && isVisibleNow !== visible) {
        setVisible(isVisibleNow);
    }

    return (
        <DocumentVisibilityContext.Provider value={visible}>{children}</DocumentVisibilityContext.Provider>
    );
};

export const useDocumentVisibility = (): boolean => React.useContext(DocumentVisibilityContext);
