import * as React from 'react';
import {
    BoxedRow,
    BoxedRowList,
    ButtonPrimary,
    GridLayout,
    IconButton,
    IconTrashCanRegular,
    ResponsiveLayout,
    Stack,
    Text3,
    Title1,
    useSnackbar,
} from '..';

export default {
    title: 'Private/Snackbar',
};

export const Default: StoryComponent = () => {
    const {openSnackbar, snackbars} = useSnackbar();
    const idRef = React.useRef(0);
    const [logLines, setLogLines] = React.useState<Array<string>>([]);

    const log = (message: string) => {
        setLogLines((lines) => [...lines, message]);
    };

    const clearLog = () => {
        setLogLines([]);
    };

    return (
        <ResponsiveLayout>
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
                    template="8+4"
                    left={
                        <Stack space={16}>
                            <Title1>Snackbar queue in context: {snackbars.length}</Title1>
                            <BoxedRowList>
                                {snackbars.map((snackbar) => (
                                    <BoxedRow
                                        key={snackbar.id}
                                        title={snackbar.message}
                                        description={JSON.stringify(snackbar, null, 2)}
                                    />
                                ))}
                            </BoxedRowList>
                        </Stack>
                    }
                    right={
                        <Stack space={16}>
                            <Title1
                                right={
                                    <IconButton
                                        aria-label="Clear actions log"
                                        onPress={clearLog}
                                        Icon={IconTrashCanRegular}
                                    />
                                }
                            >
                                Actions
                            </Title1>
                            <div>
                                {logLines.map((line, index) => (
                                    <Text3 regular as="p" key={index}>
                                        {line}
                                    </Text3>
                                ))}
                            </div>
                        </Stack>
                    }
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Snackbar';
