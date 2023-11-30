import * as React from 'react';
import {BoxedRow, BoxedRowList, ButtonPrimary, Stack, Title1, useSnackbar} from '..';

export default {
    title: 'Private/Snackbar',
};

let id = 0;

export const Default: StoryComponent = () => {
    const {openSnackbar, closeSnackbar, snackbars} = useSnackbar();
    return (
        <Stack space={16}>
            <ButtonPrimary
                onPress={() => {
                    id++;
                    openSnackbar({
                        message: `Snackbar #${id}`,
                        type: id % 2 === 0 ? 'INFORMATIVE' : 'CRITICAL',
                        withDismiss: true,
                        buttonText: 'Accept',
                        onClose: ({action}) => {
                            console.log(`>>> Snackbar #${id} closed with action: ${action}`);
                        },
                    });
                }}
            >
                Open Snackbar
            </ButtonPrimary>

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
        </Stack>
    );
};

Default.storyName = 'Snackbar';
