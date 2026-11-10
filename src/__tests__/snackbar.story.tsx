import * as React from 'react';
import Snackbar from '../snackbar';
import {useSnackbar} from '../snackbar-context';

export const Basic = (props: React.ComponentProps<typeof Snackbar>): JSX.Element => <Snackbar {...props} />;
export const Hook = ({onClose}: {onClose?: (result: unknown) => void}): JSX.Element => {
    const {openSnackbar} = useSnackbar();
    return (
        <>
            <button
                onClick={() =>
                    openSnackbar({
                        message: 'Snackbar 1',
                        buttonText: 'Action',
                        duration: 'PERSISTENT',
                        onClose,
                    })
                }
            >
                Open snackbar 1
            </button>
            <button
                onClick={() =>
                    openSnackbar({
                        message: 'Snackbar 2',
                        buttonText: 'Action',
                        duration: 'PERSISTENT',
                        onClose,
                    })
                }
            >
                Open snackbar 2
            </button>
        </>
    );
};

export const Rerender = ({onClose}: {onClose: () => void}): JSX.Element => {
    const [count, setCount] = React.useState(0);
    return (
        <>
            <button onClick={() => setCount(count + 1)}>count: {count}</button>
            <Snackbar message="any-message" buttonText="any-button-text" onClose={() => onClose()} />
        </>
    );
};
