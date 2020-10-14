import * as React from 'react';
import {Switch, Stack, createUseStyles} from '..';

export default {
    title: 'Components|Forms/Switch',
};

const useStyles = createUseStyles(() => ({
    text: {
        marginRight: 16,
    },
}));

export const Default: StoryComponent = () => {
    const classes = useStyles();
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={16}>
            <Switch name="first" defaultChecked={false} />
            <Switch
                name="second"
                defaultChecked={false}
                render={(switchElement) => (
                    <>
                        <span className={classes.text}>WiFi</span>
                        {switchElement}
                    </>
                )}
            />
            <Switch
                name="third"
                checked={checked}
                onChange={onChange}
                render={(switchElement) => (
                    <>
                        <span className={classes.text}>{checked ? 'on' : 'off'}</span>
                        {switchElement}
                    </>
                )}
            />
        </Stack>
    );
};

Default.story = {name: 'Switch'};
