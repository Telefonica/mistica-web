import * as React from 'react';
import {createUseStyles, Checkbox, Stack} from '..';

export default {
    title: 'Components|Forms/Checkbox',
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
            <Checkbox name="first" defaultChecked={false} />
            <Checkbox
                name="second"
                defaultChecked={false}
                render={(switchElement) => (
                    <>
                        {switchElement}
                        <span className={classes.text}>You accept to sell your soul</span>
                    </>
                )}
            />
            <Checkbox
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

Default.story = {name: 'Checkbox'};
