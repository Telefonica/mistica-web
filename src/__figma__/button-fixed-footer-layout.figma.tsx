import React from 'react';
import ButtonFixedFooterLayout from '../button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from '../button';
import figma from '@figma/code-connect';

const buttonFixedFooterLayoutProps = {
    secondaryButton: figma.boolean('Secondary', {
        true: <ButtonSecondary onPress={() => {}}>Secondary</ButtonSecondary>,
        false: undefined,
    }),
    link: figma.boolean('Add link', {
        true: <ButtonLink onPress={() => {}}>Link</ButtonLink>,
        false: undefined,
    }),
};

// Desktop
figma.connect(
    ButtonFixedFooterLayout,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5212%3A4201',
    {
        props: buttonFixedFooterLayoutProps,
        example: (props) => (
            <ButtonFixedFooterLayout
                button={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}
                secondaryButton={props.secondaryButton}
                link={props.link}
            >
                Content
            </ButtonFixedFooterLayout>
        ),
    }
);

// Mobile
figma.connect(
    ButtonFixedFooterLayout,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=37%3A5257',
    {
        props: buttonFixedFooterLayoutProps,
        example: (props) => (
            <ButtonFixedFooterLayout
                button={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}
                secondaryButton={props.secondaryButton}
                link={props.link}
            >
                Content
            </ButtonFixedFooterLayout>
        ),
    }
);
