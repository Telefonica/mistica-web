import * as React from 'react';
import {Boxed} from '..';
import {ThemeVariant} from '../theme-variant-context';
import {useCheckbox} from './helpers';

export default {
    title: 'Components/Layouts/Boxed',
};

export const Default: StoryComponent = () => {
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', false);

    return (
        <>
            {inverseCheckbox}
            <ThemeVariant isInverse={isInverse}>
                <div data-testid="boxed">
                    <Boxed>
                        <div style={{backgroundColor: 'lightyellow', width: '100%', height: 150}} />
                    </Boxed>
                </div>
            </ThemeVariant>
        </>
    );
};

Default.storyName = 'Boxed';
