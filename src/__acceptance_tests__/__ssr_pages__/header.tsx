import * as React from 'react';
import {
    HeaderLayout,
    Header,
    MainSectionHeaderLayout,
    MainSectionHeader,
    ButtonPrimary,
    Stack,
} from '../../..';

const HeaderTest = (): JSX.Element => (
    <Stack space={8}>
        <HeaderLayout
            header={
                <Header
                    title="This is a title"
                    pretitle="This is the pretitle"
                    description="This is a nice description"
                />
            }
        />
        <MainSectionHeaderLayout>
            <MainSectionHeader
                title="Soporte"
                description="¿En qué podemos ayudarte?"
                button={<ButtonPrimary href="asdf">Acción</ButtonPrimary>}
            />
        </MainSectionHeaderLayout>
    </Stack>
);

export default HeaderTest;
