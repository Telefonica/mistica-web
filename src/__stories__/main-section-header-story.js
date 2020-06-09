// @flow
import * as React from 'react';
import {MainSectionHeader, MainSectionHeaderLayout, ButtonPrimary, Stack, ResponsiveLayout} from '..';
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components|Headers/MainSectionHeader',
    parameters: {
        fullScreen: true,
    },
};

export const Default = (): React.Node => {
    const [title, titleTextField] = useTextField('title', 'Soporte');
    const [desciption, descriptionTextField] = useTextField('description', '¿En qué podemos ayudarte?');
    const [buttonLabel, buttonLabelTextField] = useTextField('buttonLabel', 'Acción');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);

    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <MainSectionHeaderLayout isInverse={isInverse}>
                    <MainSectionHeader
                        title={title}
                        description={desciption}
                        button={
                            buttonLabel ? <ButtonPrimary href="asdf">{buttonLabel}</ButtonPrimary> : undefined
                        }
                    />
                </MainSectionHeaderLayout>
            </div>
            <ResponsiveLayout>
                <Stack space={16}>
                    {titleTextField}
                    {descriptionTextField}
                    {buttonLabelTextField}
                    {inverseCheckbox}
                </Stack>
            </ResponsiveLayout>
        </Stack>
    );
};
Default.story = {name: 'MainSectionHeader'};
