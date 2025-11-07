import * as React from 'react';
import {
    ResponsiveLayout,
    Box,
    Stack,
    Text2,
    Title3,
    Grid,
    VivoLogo,
    CoverCard,
    Tag,
    IconCreditCardVisaRegular,
    IconBarChartRegular,
    UnorderedList,
    ListItem,
    Title4,
    IconWorkflowRegular,
} from '../..';
import {vars} from '../../skins/skin-contract.css';

export default {
    title: 'Community/Welcome',
    parameters: {
        fullScreen: true,
    },
};

const Paragraph = ({children}: {children: React.ReactNode}) => (
    <Text2 as="p" regular>
        {children}
    </Text2>
);

export const Default: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={32}>
                <Stack space={64}>
                    <Stack space={24}>
                        <Title4 as="h1">Welcome to Mística Community</Title4>
                        <Stack space={16}>
                            <Paragraph>
                                Mística Community is a place to share components which are built with Mística
                                tools but are not part of the core of the design system.
                            </Paragraph>
                            <Paragraph>
                                A Mística Community Component must meet the following conditions:
                            </Paragraph>

                            <Paragraph>
                                <UnorderedList>
                                    <ListItem>
                                        Its purpose is too coupled to a specific OB or to a specific
                                        product/app to be part of Mística core. Or has the same purpose as a
                                        core component already in Mística but we need to explore a diferent
                                        approach to test if it works better. (Otherwise it should be part of
                                        Mística core)
                                    </ListItem>
                                    <ListItem>
                                        Lives in the @telefonica/mistica npm package because we have the need
                                        to share it between different projects repositories. (Otherwise it
                                        should live in the specific project repository)
                                    </ListItem>
                                </UnorderedList>
                            </Paragraph>
                            <Paragraph>
                                Mística Community Components are built with the same quality standards as
                                Mística core components. They are designed with accessibility in mind, have
                                support for dark mode, are multi skin and are tested in different devices and
                                browsers. They are available in Mística Storybook and can be used in Playroom
                                to build interactive prototypes.
                            </Paragraph>

                            <Paragraph>
                                Mística Community Components can be imported from the community folder:
                            </Paragraph>

                            <Text2 regular>
                                <div
                                    style={{
                                        backgroundColor: vars.colors.backgroundAlternative,
                                        padding: '8px 24px',
                                        borderRadius: vars.borderRadii.container,
                                        width: 'fit-content',
                                    }}
                                >
                                    <pre>{`import {SomeComponent} from '@telefonica/mistica/community'`}</pre>
                                </div>
                            </Text2>
                        </Stack>
                    </Stack>
                    <Stack space={24}>
                        <Title3 as="h2">Community Extended Libraries</Title3>

                        <Paragraph>
                            Community Extended Libraries are additional libraries that complement the Mística
                            design system. They are built by different teams within the organization to
                            address specific needs or use cases that are not covered by the core Mística
                            components. You can explore and use these libraries in your projects as needed but
                            they are not officially supported as part of Mística core.
                        </Paragraph>

                        <Grid columns={{minSize: 280}} gap={16}>
                            {[
                                {
                                    asset: <VivoLogo size={40} />,
                                    title: 'Vivo Extended',
                                    subtitle: 'Vivo Design OPS Team',
                                    description: 'designops.br@telefonica.com',
                                    href: 'https://preframeworkbrasilsa.telefonicabigdata.com/fb-core/storybooks/lib/feat/TMNT-63/index.html?path=/story/welcome--welcome',
                                },
                                {
                                    asset: <IconBarChartRegular size={40} />,
                                    title: 'Novum Extended',
                                    subtitle: 'TCX Design Team',
                                    description: 'cx-product-design@telefonica.com',
                                    href: 'https://storybook.tuenti.io/?path=/story/welcome-welcome--first-steps',
                                },
                                {
                                    asset: <IconCreditCardVisaRegular size={40} />,
                                    title: 'Global Checkout',
                                    subtitle: 'TCX Design Team',
                                    description: 'cx-product-design@telefonica.com',
                                    href: 'https://global-checkout.vercel.app/?path=/story/management-steps-bank-account-list--multiple-bank-accounts',
                                },
                                {
                                    asset: <IconWorkflowRegular size={40} />,
                                    title: 'CMS Extended',
                                    subtitle: 'TCX Design Team',
                                    description: 'cx-product-design@telefonica.com',
                                    href: 'https://cms-storybook.tooling-dev.svc.dev.tuenti.io/?path=/story/common-components-sortedmultiselect--default',
                                },
                            ].map(({asset, title, subtitle, description, href}, idx) => (
                                <CoverCard
                                    asset={asset}
                                    aspectRatio="1:1"
                                    key={idx}
                                    headline={<Tag type="info">React</Tag>}
                                    title={title}
                                    subtitle={subtitle}
                                    description={description}
                                    href={href}
                                    newTab
                                />
                            ))}
                        </Grid>
                    </Stack>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Welcome';
