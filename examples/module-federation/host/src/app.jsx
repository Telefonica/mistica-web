import * as React from 'react';
import {Box, ButtonPrimary, ResponsiveLayout, Stack, Text2, Title1, skinVars} from '@telefonica/mistica';
import IconSearchRegular from '@telefonica/mistica-icons/icon-search-regular';
import IconStarRegular from '@telefonica/mistica-icons/icon-star-regular';

/**
 * The host renders its own components, and one module of the remote.
 *
 * IconStarRegular also appears in the remote. With SHARE_ICONS=1 the page loads that icon one time,
 * and without it each application loads its own copy.
 */
const PromoCard = React.lazy(() => import('remote/PromoCard'));

const App = () => (
    <ResponsiveLayout>
        <Box paddingY={32}>
            <Stack space={24}>
                <Title1>Module Federation example</Title1>
                <Text2 regular color={skinVars.colors.textSecondary}>
                    The host and the remote share @telefonica/mistica as a singleton. Each icon comes from its
                    own module of @telefonica/mistica-icons.
                </Text2>
                <ButtonPrimary small onPress={() => {}} StartIcon={IconSearchRegular}>
                    A button of the host
                </ButtonPrimary>
                <IconStarRegular size={24} color={skinVars.colors.brand} />
                <React.Suspense fallback={<Text2 regular>Loading the remote…</Text2>}>
                    <PromoCard />
                </React.Suspense>
            </Stack>
        </Box>
    </ResponsiveLayout>
);

export default App;
