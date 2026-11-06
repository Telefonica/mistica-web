import * as React from 'react';
import Select from '../select';

export const Selection = ({
    mode = 'uncontrolled',
}: {
    mode?: 'uncontrolled' | 'controlled' | 'default';
}): JSX.Element => {
    const [value, setValue] = React.useState('value2');
    const [calls, setCalls] = React.useState<Array<string>>([]);
    return (
        <>
            <Select
                native
                label="selectLabel"
                name="selectName"
                options={[
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2'},
                    {value: 'value3', text: 'text3'},
                ]}
                value={mode === 'controlled' ? value : undefined}
                defaultValue={mode === 'default' ? 'value2' : undefined}
                onChangeValue={(value) => {
                    setValue(value);
                    setCalls((calls) => [...calls, value]);
                }}
            />
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
        </>
    );
};
