import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ButtonPrimary, FixedFooterLayout} from '../../..';

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
