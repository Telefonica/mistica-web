import * as React from 'react';
import {ButtonPrimary, HighlightedCard} from '../../..';

const HighlightedCardTest = (): JSX.Element => (
    <HighlightedCard
        title="Resolver problema técnico"
        description="Usa nuestra herramienta para resolver tus problemas técnicos"
        onClose={() => {}}
        button={
            <ButtonPrimary href="#" small>
                ButtonPrimary
            </ButtonPrimary>
        }
    />
);

export default HighlightedCardTest;
