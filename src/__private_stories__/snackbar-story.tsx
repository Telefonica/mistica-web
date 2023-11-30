import * as React from 'react';
import {BoxedRow, BoxedRowList, ButtonPrimary, Stack, useSnackbar} from '..';

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
                        type: 'INFORMATIVE',
                        withDismiss: true,
                        buttonText: 'Accept',
                        onClose: ({action}) => {
                            console.log(`>>> Snackbar #${id} closed with action: ${action}`);
                        },
                    });
                }}
            >
                Open a new snackbar
            </ButtonPrimary>

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
