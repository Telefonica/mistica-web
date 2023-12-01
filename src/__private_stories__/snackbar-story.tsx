import * as React from 'react';
import {
    BoxedRow,
    BoxedRowList,
    ButtonPrimary,
    GridLayout,
    IconButton,
    IconTrashCanRegular,
    Stack,
    Title1,
    useSnackbar,
} from '..';

export default {
    title: 'Private/Snackbar',
};

export const Default: StoryComponent = () => {
    const {openSnackbar, closeSnackbar, snackbars} = useSnackbar();
    const idRef = React.useRef(0);
    const outputRef = React.useRef<HTMLDivElement>(null);

    const log = (message: string) => {
        if (outputRef.current) {
            outputRef.current.innerHTML += `${message}<br />`;
        }
    };

    const clearLog = () => {
        if (outputRef.current) {
            outputRef.current.innerHTML = '';
        }
    };

    return (
        <Stack space={16}>
            <ButtonPrimary
                onPress={() => {
                    const id = ++idRef.current;
                    log(`Opening snackbar #${id}`);
                    openSnackbar({
                        message: `Snackbar #${id}`,
                        type: id % 2 === 0 ? 'CRITICAL' : 'INFORMATIVE',
                        withDismiss: true,
                        buttonText: 'Accept',
                        onClose: ({action}) => {
                            log(`Closed snackbar #${id}: ${action}`);
                        },
                    });
                }}
            >
                Open Snackbar
            </ButtonPrimary>

            <GridLayout
                template="6+6"
                left={
                    <>
                        <Title1>Snackbar queue in context: {snackbars.length}</Title1>
                        <BoxedRowList>
                            {snackbars.map((snackbar) => (
                                <BoxedRow
                                    title={snackbar.message}
                                    description={JSON.stringify(snackbar, null, 2)}
                                    right={
                                        <ButtonPrimary
                                            onPress={() => {
                                                closeSnackbar(snackbar.id);
                                            }}
                                        >
                                            Close
                                        </ButtonPrimary>
                                    }
                                />
                            ))}
                        </BoxedRowList>
                    </>
                }
                right={
                    <>
                        <Title1
                            right={
                                <IconButton onPress={clearLog}>
                                    <IconTrashCanRegular />
                                </IconButton>
                            }
                        >
                            Actions
                        </Title1>
                        <div ref={outputRef} style={{lineHeight: 1.6}} />
                    </>
                }
            />
        </Stack>
    );
};

Default.storyName = 'Snackbar';
