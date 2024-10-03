import * as React from 'react';
import {TextField} from '..';
import {useRifm} from 'rifm';

export default {
    title: 'Components/Input fields/Input field with custom formatter',
};

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('');

    /**
     * format as: 000.000.000-00
     * https://en.wikipedia.org/wiki/CPF_number
     */
    const format = (value: string) => {
        const digits = value.replace(/\D/g, ''); // strip all non digit characters
        const d1 = digits.substring(0, 3);
        const d2 = digits.substring(3, 6);
        const d3 = digits.substring(6, 9);
        const d4 = digits.substring(9, 11);

        return (
            `${d1}.${d2}.${d3}-${d4}`
                // remove non digit characters from the end
                .replace(/\D*$/, '')
        );
    };

    const rifm = useRifm({
        format,
        value,
        onChange: setValue,
    });

    return (
        <TextField
            inputMode="numeric" // to show numeric keyboard on mobile
            name="cpf"
            label="CPF"
            value={rifm.value}
            onChange={rifm.onChange}
            helperText="Cadastro de Pessoas Físicas"
        />
    );
};

Default.storyName = 'Input field with custom formatter';
