import * as React from 'react';
import {ButtonPrimary, FixedFooterLayout} from '../../index';

const FixedFooterLayoutTest = (): JSX.Element => (
    <FixedFooterLayout
        footer={
            <ButtonPrimary small onPress={() => {}}>
                Action
            </ButtonPrimary>
        }
    >
        Some content
    </FixedFooterLayout>
);

export default FixedFooterLayoutTest;
