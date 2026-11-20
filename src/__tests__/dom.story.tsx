import * as React from 'react';
import {getCssVarValue} from '../utils/dom';

export const CssValues = (): JSX.Element => {
    const element = React.useRef<HTMLDivElement>(null);
    const [result, setResult] = React.useState<unknown>();
    React.useLayoutEffect(() => {
        const localElement = element.current;
        if (!localElement) {
            throw new Error('Local CSS variable target was not mounted');
        }
        document.documentElement.style.setProperty('--color-primary', '#FABADA');
        localElement.style.setProperty('--color-primary', '#ABACAD');
        let invalidThrows = false;
        try {
            getCssVarValue('non-css-var');
        } catch {
            invalidThrows = true;
        }
        setResult({
            global: [
                '--color-primary',
                'var(--color-primary)',
                'var(--non-defined)',
                'var(--non-defined, #00FFFF)',
                'var(--non-defined, var(--color-primary))',
                'var(--non-defined, var(--non-defined, #00FFFF))',
            ].map((value) => getCssVarValue(value)),
            local: ['--color-primary', 'var(--color-primary)'].map((value) =>
                getCssVarValue(value, localElement)
            ),
            invalidThrows,
        });
    }, []);
    return (
        <>
            <div ref={element} />
            <input type="hidden" data-testid="css-values" value={JSON.stringify(result) ?? ''} />
        </>
    );
};
