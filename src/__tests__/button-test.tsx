import * as React from 'react';
import {ButtonDanger, ButtonLink, ButtonPrimary, ButtonSecondary} from '../button';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import IconPhotoCameraRegular from '../generated/mistica-icons/icon-photo-camera-regular';

import type {TouchableElement} from '../touchable';

test('button is accesible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}} loadingText="Hello2">
                Hello
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'Hello'})).toBeInTheDocument();
});

test('"to" uses a Link Component', () => {
    const Link = () => '(Link Component)' as any;

    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <ButtonPrimary to="/test">test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <style>
            :root {--colors-appBarBackground__1vqcj1i0:#FFFFFF;--colors-background__1vqcj1i1:#FFFFFF;--colors-backgroundContainer__1vqcj1i2:#FFFFFF;--colors-backgroundBrand__1vqcj1i3:#019DF4;--colors-backgroundOverlay__1vqcj1i4:rgba(49,50,53, 0.6);--colors-backgroundSkeleton__1vqcj1i5:#EEEEEE;--colors-backgroundSkeletonInverse__1vqcj1i6:#008EDD;--colors-navigationBarBackground__1vqcj1i9:#019DF4;--colors-backgroundAlternative__1vqcj1i7:#F6F6F6;--colors-backgroundFeedbackBottom__1vqcj1i8:#019DF4;--colors-skeletonWave__1vqcj1ia:#EEEEEE;--colors-borderLight__1vqcj1ic:#F6F6F6;--colors-border__1vqcj1ib:#DDDDDD;--colors-borderDark__1vqcj1id:#86888C;--colors-borderSelected__1vqcj1ie:#019DF4;--colors-buttonDangerBackground__1vqcj1if:#FF374A;--colors-buttonDangerBackgroundSelected__1vqcj1ig:#D73241;--colors-buttonDangerBackgroundHover__1vqcj1ih:#D73241;--colors-buttonLinkBackgroundSelected__1vqcj1ii:#E6F5FD;--colors-buttonLinkBackgroundSelectedInverse__1vqcj1ij:rgba(255,255,255, 0.2);--colors-buttonPrimaryBackground__1vqcj1ik:#019DF4;--colors-buttonPrimaryBackgroundInverse__1vqcj1il:#FFFFFF;--colors-buttonPrimaryBackgroundSelected__1vqcj1im:#008EDD;--colors-buttonPrimaryBackgroundHover__1vqcj1io:#008EDD;--colors-buttonPrimaryBackgroundSelectedInverse__1vqcj1in:#80CEF9;--colors-buttonSecondaryBackground__1vqcj1ip:#019DF4;--colors-buttonSecondaryBackgroundSelected__1vqcj1iq:#008EDD;--colors-buttonSecondaryBorderInverse__1vqcj1ir:#FFFFFF;--colors-buttonSecondaryBorderSelectedInverse__1vqcj1is:#80CEF9;--colors-textButtonPrimary__1vqcj1i1m:#FFFFFF;--colors-textButtonPrimaryInverse__1vqcj1i1n:#019DF4;--colors-textButtonPrimaryInverseSelected__1vqcj1i1o:#019DF4;--colors-textButtonSecondary__1vqcj1i1p:#019DF4;--colors-textButtonSecondarySelected__1vqcj1i1q:#008EDD;--colors-textButtonSecondaryInverse__1vqcj1i1r:#FFFFFF;--colors-textButtonSecondaryInverseSelected__1vqcj1i1s:#FFFFFF;--colors-textLink__1vqcj1i1t:#019DF4;--colors-textLinkInverse__1vqcj1i1u:#FFFFFF;--colors-textLinkDanger__1vqcj1i1v:#FF374A;--colors-textLinkSnackbar__1vqcj1i1w:#80CEF9;--colors-control__1vqcj1it:#DDDDDD;--colors-controlActivated__1vqcj1iu:#019DF4;--colors-controlError__1vqcj1iv:#FF374A;--colors-loadingBar__1vqcj1iw:#80CEF9;--colors-loadingBarBackground__1vqcj1ix:#008EDD;--colors-toggleAndroidInactive__1vqcj1iy:#EEEEEE;--colors-toggleAndroidBackgroundActive__1vqcj1iz:#B3E1FB;--colors-iosControlKnob__1vqcj1i10:#FFFFFF;--colors-divider__1vqcj1i11:#EEEEEE;--colors-dividerInverse__1vqcj1i12:#008EDD;--colors-navigationBarDivider__1vqcj1i13:#019DF4;--colors-badge__1vqcj1i14:#D73241;--colors-feedbackErrorBackground__1vqcj1i15:#FF374A;--colors-feedbackInfoBackground__1vqcj1i16:#313235;--colors-brand__1vqcj1i17:#019DF4;--colors-brandHigh__1vqcj1i18:#008EDD;--colors-inverse__1vqcj1i19:#FFFFFF;--colors-neutralHigh__1vqcj1i1a:#313235;--colors-neutralMedium__1vqcj1i1c:#86888C;--colors-neutralLow__1vqcj1i1b:#F6F6F6;--colors-promo__1vqcj1i1d:#A13EA1;--colors-highlight__1vqcj1i1f:#E63780;--colors-textPrimary__1vqcj1i1i:#313235;--colors-textPrimaryInverse__1vqcj1i1j:#FFFFFF;--colors-textSecondary__1vqcj1i1k:#86888C;--colors-textSecondaryInverse__1vqcj1i1l:#FFFFFF;--colors-error__1vqcj1i1e:#FF374A;--colors-success__1vqcj1i1g:#5CB615;--colors-warning__1vqcj1i1h:#F28D15;--colors-textNavigationBarPrimary__1vqcj1i1x:#FFFFFF;--colors-textNavigationBarSecondary__1vqcj1i1y:#B3E1FB;--colors-textNavigationSearchBarHint__1vqcj1i1z:#B3E1FB;--colors-textNavigationSearchBarText__1vqcj1i20:#FFFFFF;--colors-textAppBar__1vqcj1i21:#999999;--colors-textAppBarSelected__1vqcj1i22:#019DF4;--colors-successLow__1vqcj1i23:#EFF8E8;--colors-warningLow__1vqcj1i24:#FEF4E8;--colors-errorLow__1vqcj1i25:#FFEBED;--colors-promoLow__1vqcj1i26:#F6ECF6;--colors-brandLow__1vqcj1i27:#E6F5FD;--colors-successHigh__1vqcj1i28:#407F0F;--colors-warningHigh__1vqcj1i29:#6D3F09;--colors-errorHigh__1vqcj1i2a:#B22634;--colors-promoHigh__1vqcj1i2b:#712B71}
          </style>
          (Link Component)
        </DocumentFragment>
    `);
});

test('<a> is rendered when using "to" prop', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary to="/test">test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <style>
            :root {--colors-appBarBackground__1vqcj1i0:#FFFFFF;--colors-background__1vqcj1i1:#FFFFFF;--colors-backgroundContainer__1vqcj1i2:#FFFFFF;--colors-backgroundBrand__1vqcj1i3:#019DF4;--colors-backgroundOverlay__1vqcj1i4:rgba(49,50,53, 0.6);--colors-backgroundSkeleton__1vqcj1i5:#EEEEEE;--colors-backgroundSkeletonInverse__1vqcj1i6:#008EDD;--colors-navigationBarBackground__1vqcj1i9:#019DF4;--colors-backgroundAlternative__1vqcj1i7:#F6F6F6;--colors-backgroundFeedbackBottom__1vqcj1i8:#019DF4;--colors-skeletonWave__1vqcj1ia:#EEEEEE;--colors-borderLight__1vqcj1ic:#F6F6F6;--colors-border__1vqcj1ib:#DDDDDD;--colors-borderDark__1vqcj1id:#86888C;--colors-borderSelected__1vqcj1ie:#019DF4;--colors-buttonDangerBackground__1vqcj1if:#FF374A;--colors-buttonDangerBackgroundSelected__1vqcj1ig:#D73241;--colors-buttonDangerBackgroundHover__1vqcj1ih:#D73241;--colors-buttonLinkBackgroundSelected__1vqcj1ii:#E6F5FD;--colors-buttonLinkBackgroundSelectedInverse__1vqcj1ij:rgba(255,255,255, 0.2);--colors-buttonPrimaryBackground__1vqcj1ik:#019DF4;--colors-buttonPrimaryBackgroundInverse__1vqcj1il:#FFFFFF;--colors-buttonPrimaryBackgroundSelected__1vqcj1im:#008EDD;--colors-buttonPrimaryBackgroundHover__1vqcj1io:#008EDD;--colors-buttonPrimaryBackgroundSelectedInverse__1vqcj1in:#80CEF9;--colors-buttonSecondaryBackground__1vqcj1ip:#019DF4;--colors-buttonSecondaryBackgroundSelected__1vqcj1iq:#008EDD;--colors-buttonSecondaryBorderInverse__1vqcj1ir:#FFFFFF;--colors-buttonSecondaryBorderSelectedInverse__1vqcj1is:#80CEF9;--colors-textButtonPrimary__1vqcj1i1m:#FFFFFF;--colors-textButtonPrimaryInverse__1vqcj1i1n:#019DF4;--colors-textButtonPrimaryInverseSelected__1vqcj1i1o:#019DF4;--colors-textButtonSecondary__1vqcj1i1p:#019DF4;--colors-textButtonSecondarySelected__1vqcj1i1q:#008EDD;--colors-textButtonSecondaryInverse__1vqcj1i1r:#FFFFFF;--colors-textButtonSecondaryInverseSelected__1vqcj1i1s:#FFFFFF;--colors-textLink__1vqcj1i1t:#019DF4;--colors-textLinkInverse__1vqcj1i1u:#FFFFFF;--colors-textLinkDanger__1vqcj1i1v:#FF374A;--colors-textLinkSnackbar__1vqcj1i1w:#80CEF9;--colors-control__1vqcj1it:#DDDDDD;--colors-controlActivated__1vqcj1iu:#019DF4;--colors-controlError__1vqcj1iv:#FF374A;--colors-loadingBar__1vqcj1iw:#80CEF9;--colors-loadingBarBackground__1vqcj1ix:#008EDD;--colors-toggleAndroidInactive__1vqcj1iy:#EEEEEE;--colors-toggleAndroidBackgroundActive__1vqcj1iz:#B3E1FB;--colors-iosControlKnob__1vqcj1i10:#FFFFFF;--colors-divider__1vqcj1i11:#EEEEEE;--colors-dividerInverse__1vqcj1i12:#008EDD;--colors-navigationBarDivider__1vqcj1i13:#019DF4;--colors-badge__1vqcj1i14:#D73241;--colors-feedbackErrorBackground__1vqcj1i15:#FF374A;--colors-feedbackInfoBackground__1vqcj1i16:#313235;--colors-brand__1vqcj1i17:#019DF4;--colors-brandHigh__1vqcj1i18:#008EDD;--colors-inverse__1vqcj1i19:#FFFFFF;--colors-neutralHigh__1vqcj1i1a:#313235;--colors-neutralMedium__1vqcj1i1c:#86888C;--colors-neutralLow__1vqcj1i1b:#F6F6F6;--colors-promo__1vqcj1i1d:#A13EA1;--colors-highlight__1vqcj1i1f:#E63780;--colors-textPrimary__1vqcj1i1i:#313235;--colors-textPrimaryInverse__1vqcj1i1j:#FFFFFF;--colors-textSecondary__1vqcj1i1k:#86888C;--colors-textSecondaryInverse__1vqcj1i1l:#FFFFFF;--colors-error__1vqcj1i1e:#FF374A;--colors-success__1vqcj1i1g:#5CB615;--colors-warning__1vqcj1i1h:#F28D15;--colors-textNavigationBarPrimary__1vqcj1i1x:#FFFFFF;--colors-textNavigationBarSecondary__1vqcj1i1y:#B3E1FB;--colors-textNavigationSearchBarHint__1vqcj1i1z:#B3E1FB;--colors-textNavigationSearchBarText__1vqcj1i20:#FFFFFF;--colors-textAppBar__1vqcj1i21:#999999;--colors-textAppBarSelected__1vqcj1i22:#019DF4;--colors-successLow__1vqcj1i23:#EFF8E8;--colors-warningLow__1vqcj1i24:#FEF4E8;--colors-errorLow__1vqcj1i25:#FFEBED;--colors-promoLow__1vqcj1i26:#F6ECF6;--colors-brandLow__1vqcj1i27:#E6F5FD;--colors-successHigh__1vqcj1i28:#407F0F;--colors-warningHigh__1vqcj1i29:#6D3F09;--colors-errorHigh__1vqcj1i2a:#B22634;--colors-promoHigh__1vqcj1i2b:#712B71}
          </style>
          <a
            class="touchable button light"
            href="/test"
            role="button"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d3"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.250rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.250rem; height: 1.250rem;"
              />
            </div>
          </a>
        </DocumentFragment>
    `);
});

test('buttons can track events', async () => {
    const logEventSpy = jest.fn();
    const trackingEvent = {
        category: 'someCategory',
        action: 'someAction',
        label: 'someLabel',
    };

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <ButtonPrimary trackingEvent={trackingEvent} href="#test">
                button with href
            </ButtonPrimary>
            <ButtonPrimary trackingEvent={trackingEvent} to="#test">
                button with to
            </ButtonPrimary>
            <ButtonPrimary trackingEvent={trackingEvent} onPress={() => {}}>
                button with onPress
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    const hrefButton = await screen.findByRole('button', {name: 'button with href'});
    const toButton = await screen.findByRole('button', {name: 'button with to'});
    const onPressButton = await screen.findByRole('button', {name: 'button with onPress'});

    userEvent.click(hrefButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    userEvent.click(toButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    userEvent.click(onPressButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(3);
});

test('buttons track default events', async () => {
    const logEventSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <ButtonPrimary href="#test">no track</ButtonPrimary>
            <ButtonPrimary trackEvent href="#test">
                primary
            </ButtonPrimary>
            <ButtonSecondary trackEvent to="#test">
                secondary
            </ButtonSecondary>
            <ButtonDanger trackEvent onPress={() => {}}>
                danger
            </ButtonDanger>
            <ButtonPrimary trackEvent onPress={() => {}}>
                <IconPhotoCameraRegular color="currentColor" />
                Take a photo
            </ButtonPrimary>
            <ButtonLink href="#">no track link</ButtonLink>
            <ButtonLink trackEvent href="#">
                link
            </ButtonLink>
        </ThemeContextProvider>
    );

    const noTrackButton = await screen.findByRole('button', {name: 'no track'});
    const primaryButton = await screen.findByRole('button', {name: 'primary'});
    const secondaryButton = await screen.findByRole('button', {name: 'secondary'});
    const dangerButton = await screen.findByRole('button', {name: 'danger'});
    const buttonWithIcon = await screen.findByRole('button', {name: 'Take a photo'});
    const noTrackLink = await screen.findByRole('link', {name: 'no track link'});
    const link = await screen.findByRole('link', {name: 'link'});

    userEvent.click(noTrackButton);
    userEvent.click(noTrackLink);
    expect(logEventSpy).not.toHaveBeenCalled();

    userEvent.click(primaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'primary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    userEvent.click(secondaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'secondary_button_tapped',
        label: 'secondary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    userEvent.click(dangerButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'danger_button_tapped',
        label: 'danger',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(3);

    userEvent.click(buttonWithIcon);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'Take a photo',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(4);

    userEvent.click(link);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'link_tapped',
        label: 'link',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(5);
});

test('Button ref', () => {
    const TestComponent = () => {
        const refOnPress = React.useRef<TouchableElement>(null);
        const refHref = React.useRef<TouchableElement>(null);
        const refTo = React.useRef<TouchableElement>(null);

        React.useEffect(() => {
            expect(refOnPress.current?.tagName).toBe('BUTTON');
            expect(refOnPress.current?.textContent).toBe('onPress');

            expect(refHref.current?.tagName).toBe('A');
            expect(refHref.current?.textContent).toBe('href');

            expect(refTo.current?.tagName).toBe('A');
            expect(refTo.current?.textContent).toBe('to');
        });

        return (
            <ThemeContextProvider theme={makeTheme()}>
                <ButtonPrimary ref={refOnPress} onPress={() => {}}>
                    onPress
                </ButtonPrimary>

                <ButtonSecondary ref={refHref} href="/">
                    href
                </ButtonSecondary>

                <ButtonDanger ref={refTo} to="/">
                    to
                </ButtonDanger>
            </ThemeContextProvider>
        );
    };

    render(<TestComponent />);
});
