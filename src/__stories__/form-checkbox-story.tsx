import * as React from 'react';
import {createUseStyles, FormCheckbox, Stack} from '..';

export default {
    title: 'Components|Forms/FormCheckbox',
};

const useStyles = createUseStyles(() => ({
    text: {
        marginLeft: 16,
    },
}));

export const Default: StoryComponent = () => {
    const classes = useStyles();
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={16}>
            <FormCheckbox name="first" defaultChecked={false} />
            <FormCheckbox
                name="second"
                defaultChecked={false}
                render={(switchElement) => (
                    <>
                        {switchElement}
                        <span className={classes.text}>You accept to sell your soul</span>
                    </>
                )}
            />
            <FormCheckbox
                name="third"
                checked={checked}
                onChange={onChange}
                render={(switchElement) => (
                    <>
                        {switchElement}
                        <span className={classes.text}>
                            You accept to sell your soul: {checked ? 'sure!' : 'nahh'}
                        </span>
                    </>
                )}
            />
        </Stack>
    );
};

Default.story = {name: 'FormCheckbox'};
