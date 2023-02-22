import {capitalize} from 'lodash';

const imagePlaceholder = 'https://source.unsplash.com/800x800/?abstract';

type Snippet = {group: string; name: string; code: string};

const menuSnippet = {
    name: 'Menu',
    code: `
    <Menu
      width={400}
      renderTarget={({ ref, onPress, isMenuOpen }) => (
        <Touchable ref={ref} onPress={onPress} style={{ width: 100 }}>
          <Inline space={16}>
            <IconKebabMenuLight />
            <Text3 regular>{isMenuOpen ? "Close" : "Open"}</Text3>
          </Inline>
        </Touchable>
      )}
      renderMenu={({ ref, className, close }) => (
        <div ref={ref} className={className}>
          {[
            {
              text: "Option 1",
              value: "option1",
            },
            {
              text: "Option 2",
              value: "option2",
            },
          ].map((option) => (
            <Box paddingX={16} paddingY={8} key={option.value}>
              <Checkbox
                name={option.text}
                onChange={() => {
                  if (option.value === "option3") {
                    setTimeout(() => {
                      close();
                    }, 400);
                  }
                  setState("setValues", option.value);
                }}
                checked={getState("setValues", []).includes(option.value)}
              >
                {option.text}
              </Checkbox>
            </Box>
          ))}
        </div>
      )}
    />`,
    group: 'Menu',
};

const buttonSnippets: Array<Snippet> = [
    {name: 'ButtonPrimary', code: '<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>'},
    {name: 'ButtonSecondary', code: '<ButtonSecondary onPress={() => {}}>Action</ButtonSecondary>'},
    {name: 'ButtonDanger', code: '<ButtonDanger onPress={() => {}}>Action</ButtonDanger>'},
    {name: 'ButtonLink', code: '<ButtonLink onPress={() => {}}>Action</ButtonLink>'},
    {
        name: 'Button with icon',
        code: '<ButtonPrimary onPress={() => {}}><IconLockClosedRegular color="currentColor" />Action</ButtonPrimary>',
    },
    {
        name: 'ButtonGroup (internal use)',
        code: `
        <ButtonGroup
          primaryButton={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
          secondaryButton={<ButtonSecondary onPress={() => {}}>Secondary Action</ButtonSecondary>}
          link={<ButtonLink onPress={() => {}}>Link</ButtonLink>}/>`,
    },
    {
        name: 'ButtonLayout',
        code: `
        <ButtonLayout>
            <ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>
            <ButtonSecondary onPress={() => {}}>Action</ButtonSecondary>
        </ButtonLayout>`,
    },
    {
        name: 'ButtonFixedFooterLayout',
        code: `
        <ButtonFixedFooterLayout button={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>} secondaryButton={<ButtonSecondary onPress={() => {}}>Action</ButtonSecondary>}>
            Some content here
        </ButtonFixedFooterLayout>`,
    },
].map((snippet) => ({...snippet, group: 'Buttons'}));

const formSnippets: Array<Snippet> = [
    [
        'Select',
        `<Select name="fruits" label="Choose a fruit" options={[{value: 'orange', text: 'Orange'}, {value: 'banana', text: 'Banana'}]}/>`,
    ],
    ['TextField', '<TextField name="name" label="Name"/>'],
    ['EmailField', '<EmailField name="email" label="e-mail"/>'],
    ['PhoneNumberField', '<PhoneNumberField name="phone" label="Phone"/>'],
    ['IbanField', '<IbanField name="bankAccount" label="IBAN" />'],
    ['CreditCardFields', '<CreditCardFields/>'],
    ['DateField', '<DateField name="date" label="Date"/>'],
    ['DecimalField', '<DecimalField name="decimal" label="Decimal"/>'],
    ['IntegerField', '<IntegerField name="integer" label="Integer"/>'],
    ['PasswordField', '<PasswordField name="password" label="Password"/>'],
    [
        'CreditCardExpirationField',
        '<CreditCardExpirationField name="expiration-date" label="Expiration date"/>',
    ],
    ['CvvField', '<CvvField name="cvv" label="CVV"/>'],
    ['SearchField', '<SearchField name="search" label="Search"/>'],
    ['Switch', '<Switch name="switch"/>'],
    ['Checkbox', '<Checkbox name="checkbox">Checkbox</Checkbox>'],
    [
        'RadioGroup',
        '<RadioGroup name="juicy-fruit" aria-labelledby="label" defaultValue="banana">\n' +
            '  <Stack space={16}>\n' +
            '    <RadioButton value="banana">Banana</RadioButton>\n' +
            '    <RadioButton value="apple">Apple</RadioButton>\n' +
            '  </Stack>\n' +
            '</RadioGroup>',
    ],
    [
        'Form',
        `<Form
            onSubmit={formData =>
                alert({title: "This is your data", message: JSON.stringify(formData, null, 2)})
            }
        >
            <Box padding={16}>
                <Stack space={16}>
                    <TextField name="name" label="Name" />
                    <EmailField
                        name="email"
                        label="e-mail"
                    />
                    <ButtonLayout>
                        <ButtonPrimary submit>Send</ButtonPrimary>
                    </ButtonLayout>
                </Stack>
            </Box>
        </Form>`,
    ],
].map(([name, code]) => ({
    group: 'Forms',
    name,
    code,
}));

const feedbackSnippets: Array<Snippet> = [
    'SuccessFeedbackScreen',
    'ErrorFeedbackScreen',
    'InfoFeedbackScreen',
    'SuccessFeedback',
].map((name) => ({
    group: 'Feedbacks',
    name,
    code: `
        <${name}
            title="Some title"
            description="Some description text"
            primaryButton={
                <ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>
            }
        />
        `,
}));

const listSnippets: Array<Snippet> = [
    ['RowList', 'Row'],
    ['BoxedRowList', 'BoxedRow'],
].map(([listName, rowName]) => ({
    group: 'Lists',
    name: listName,
    code: `
        <${listName}>
            <${rowName}
                asset={<IconShopRegular />}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={<IconShopRegular />}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={<IconShopRegular />}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={<IconShopRegular />}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
        </${listName}>
        `,
}));

const listSnippetsAvatar: Array<Snippet> = [
    ['RowList', 'Row'],
    ['BoxedRowList', 'BoxedRow'],
].map(([listName, rowName]) => ({
    group: 'Lists with Avatar',
    name: listName,
    code: `
        <${listName}>
            <${rowName}
                asset={
                    <Avatar size={40} initials="HS" />
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={
                    <Avatar size={40} initials="AL" />
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={
                  <Avatar
                    size={40}
                    initials="ML"
                    src="https://api.lorem.space/image/face?w=200&h=200"
                  />
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={
                  <Avatar size={40} initials="AR" />
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
        </${listName}>
        `,
}));

listSnippets.push({
    group: 'Lists',
    name: 'Radio list',
    code: `
    <RadioGroup defaultValue="banana">
        <RowList>
            <Row
                asset={
                    <IconShopRegular />
                }
                title="Banana"
                description="Yellow"
                radioValue="banana"
            />
            <Row
                asset={
                    <IconShopRegular />
                }
                title="Apple"
                description="Green"
                radioValue="apple"
            />
        </RowList>
    </RadioGroup>
    `,
});

const listRowSnippets: Array<Snippet> = ['Row', 'BoxedRow'].flatMap((rowName) => [
    {
        group: 'List',
        name: `${rowName} (simple)`,
        code: `
        <${rowName}
            title="Title"
            description="Description"
            onPress={() => {}}
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (image)`,
        code: `
        <${rowName}
            asset={<Image src="https://api.lorem.space/image/album?w=300&h=300" height={80} aspectRatio="1:1" />}
            title="Title"
            description="Description"
            onPress={() => {}}
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (complex)`,
        code: `
        <${rowName}
            asset={
                <IconShopRegular />
            }
            headline="Headline"
            title="Title"
            subtitle="Subtitle"
            description="Description"
            badge={9}
            onPress={() => {}}
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (switch)`,
        code: `
        <${rowName}
            asset={
                <IconShopRegular />
            }
            title="Title"
            description="Description"
            switch={{defaultValue: false}}
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (checkbox)`,
        code: `
        <${rowName}
            asset={
                <IconShopRegular />
            }
            title="Title"
            description="Description"
            checkbox={{defaultValue: false}}
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (radio)`,
        code: `
        <${rowName}
            asset={
                <IconShopRegular />
            }
            title="Orange"
            description="orange"
            radioValue="orange"
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (custom element)`,
        code: `
        <${rowName}
            asset={
                <IconShopRegular />
            }
            title="Title"
            description="Description"
            right={<Placeholder width={32} height={32} />}
        />
        `,
    },
]);

const tooltipSnippets = [
    {
        group: 'Tooltip',
        name: 'Tooltip',
        code: `
        <Tooltip
          target={<Text3>some target, this can be any component</Text3>}
          description="Settings"
        />
        `,
    },
];

const popoverSnippets = [
    {
        group: 'Popover',
        name: 'Popover informative',
        code: `
        <Popover
          target="some target, this can be any component"
          title="Informative popover"
          description="You can use this popover to give more information to the user"
        />
        `,
    },
    {
        group: 'Popover',
        name: 'Popover informative with icon',
        code: `
        <Popover
          target="some target, this can be any component"
          asset={<Circle size={40} backgroundColor={colors.brandLow}><IconShopRegular color={colors.brand} /></Circle>}
          title="Informative popover"
          description="You can use this popover to give more information to the user"
        />
        `,
    },
    {
        group: 'Popover',
        name: 'Popover custom',
        code: `
        <Popover
          target={
            <IconButton onPress={() => setState("isClosed", false)}>
              <Avatar
                size={40}
                initials="AH"
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              />
            </IconButton>
          }
          isVisible={!getState("isClosed")}
          onClose={() => setState("isClosed", true)}
          asset={
            <Avatar
              size={40}
              initials="AH"
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
          }
          title="Amanda Harvey"
          description="Product designer"
          extra={
            <Box paddingTop={16}>
              <Stack space={16}>
                <Divider />
                <Stack space={16}>
                  <Inline space={16} alignItems="center">
                    <IconApartmentBuildingRegular />
                    <Text2>Tuenti S.L</Text2>
                  </Inline>
                  <Inline space={16} alignItems="center">
                    <IconMobileDeviceRegular />
                    <Text2>+34 655 444 333</Text2>
                  </Inline>
                  <Inline space={16} alignItems="center">
                    <IconEmailRegular />
                    <Text2>amandaharvey@tuenti.com</Text2>
                  </Inline>
                </Stack>
              </Stack>
            </Box>
          }
        />
        `,
    },
];

const headerSnippets: Array<Snippet> = [
    {
        group: 'Headers',
        name: 'Basic header layout',
        code: `
        <HeaderLayout
            header={
                <Header
                    title="The last invoice is available"
                />
            }
            extra={<Placeholder />}
        />
        `,
    },
    {
        group: 'Headers',
        name: 'Basic header layout (white)',
        code: `
        <HeaderLayout
            isInverse={false}
            header={
                <Header
                    title="The last invoice is available"
                />
            }
            extra={<Placeholder />}
        />
        `,
    },
    {
        group: 'Headers',
        name: 'Header layout (with breadcrumbs)',
        code: `
        <HeaderLayout
            breadcrumbs={
                <NavigationBreadcrumbs
                    breadcrumbs={[{ title: "Cuenta", url: "/dashboard" }]}
                    title="Invoices"
                />
            }
            header={
                <Header
                    title="The last invoice is available"
                />
            }
            extra={<Placeholder />}
        />
        `,
    },
    {
        group: 'Headers',
        name: 'Header layout (with breadcrumbs)(white)',
        code: `
        <HeaderLayout
            isInverse={false}
            breadcrumbs={
                <NavigationBreadcrumbs
                    breadcrumbs={[{ title: "Cuenta", url: "/dashboard" }]}
                    title="Invoices"
                />
            }
            header={
                <Header
                    title="The last invoice is available"
                />
            }
            extra={<Placeholder />}
        />
        `,
    },
    {
        group: 'Headers',
        name: 'Main section header layout',
        code: `
        <MainSectionHeaderLayout>
            <MainSectionHeader
                title="Title"
                description="Some text here"
                button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
            />
        </MainSectionHeaderLayout>
        `,
    },
    {
        group: 'Headers',
        name: 'Main section header layout (white)',
        code: `
        <MainSectionHeaderLayout
            isInverse={false}>
            <MainSectionHeader
                title="Title"
                description="Some text here"
                button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
            />
        </MainSectionHeaderLayout>
        `,
    },
];

const tabsSnippets: Array<Snippet> = [
    {
        group: 'Tabs',
        name: 'Tabs (without icons)',
        code: `
        <Tabs
            selectedIndex={getState('tabIndex', 0)}
            onChange={setState('tabIndex')}
            tabs={[
                {text: 'Tab 1'},
                {text: 'Tab 2'},
                {text: 'Tab 2'},
            ]}
        />`,
    },
    {
        group: 'Tabs',
        name: 'Tabs (with icons)',
        code: `
        <Tabs
            selectedIndex={getState('tabIndex', 0)}
            onChange={setState('tabIndex')}
            tabs={[
                {text: 'Tab 1', icon: <IconAppointmentRegular color="currentColor" />},
                {text: 'Tab 2', icon: <IconBrainRegular color="currentColor" />},
                {text: 'Tab 3', icon: <IconBusRegular color="currentColor" />},
            ]}
        />`,
    },
];

const cardSnippets: Array<Snippet> = [
    {
        group: 'Cards',
        name: 'HighlightedCard',
        code: `
        <HighlightedCard
            title="Title"
            description="Some description here"
            imageUrl="${imagePlaceholder}"
            imageFit="fill"
            onClose={() => {}}
            button={
                <ButtonPrimary href="#" small>
                    ButtonPrimary
                </ButtonPrimary>
            }
        />`,
    },
    {
        group: 'Cards',
        name: 'MediaCard with Image',
        code: `
        <MediaCard
            media={<Image src="https://picsum.photos/1200/1200" aspectRatio="16:9"/>}
            headline={<Tag type="promo">Headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            subtitle="Subtitle"
            description="Description"
            extra={<Placeholder />}
            button={
                <ButtonPrimary small onPress={() => {}}>
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
        />`,
    },
    {
        group: 'Cards',
        name: 'MediaCard with Video',
        code: `
        <MediaCard
            media={<Video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" aspectRatio="16:9" />}
            headline={<Tag color={colors.promo}>headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            subtitle="Subtitle"
            description="Description"
            extra={<Placeholder />}
            button={
                <ButtonPrimary small onPress={() => {}}>
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
        />`,
    },
    {
        group: 'Cards',
        name: 'DataCard',
        code: `
        <DataCard
            icon={
                <Circle backgroundColor={colors.brandLow} size={40}>
                    <IconShopRegular color={colors.brand} />
                </Circle>
            }
            headline={<Tag type="promo">Headline</Tag>}
            title="Title"
            subtitle="Subtitle"
            description="Description"
            extra={<Placeholder />}
            button={
                <ButtonPrimary small onPress={() => {}}>
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
        />`,
    },
    {
        group: 'Cards',
        name: 'SnapCard',
        code: `
        <SnapCard
            icon={
              <Circle size={40} backgroundColor={colors.brandLow}>
                <IconAcademicRegular color={colors.brand} />
              </Circle>
            }
            title="Title"
            subtitle="Subtitle"
        />`,
    },
    {
        group: 'Cards',
        name: 'DisplayDataCard',
        code: `
        <DisplayDataCard
          icon={
            <Circle size={40} backgroundColor={colors.brandLow}>
              <IconInvoicePlanFileRegular color={colors.brand} />
            </Circle>
          }
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          button={
            <ButtonPrimary small href="https://google.com">
              Action
            </ButtonPrimary>
          }
          onClose={() => {}}
          actions={[
            {
              Icon: IconLightningRegular,
              onPress: () => {},
              label: "Lightning",
            },
          ]}
        />`,
    },
    {
        group: 'Cards',
        name: 'DisplayMediaCard',
        code: `
        <DisplayMediaCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          backgroundImage="https://api.lorem.space/image/watch?w=700&h=700"
          button={
            <ButtonPrimary small href="https://google.com">
              Action
            </ButtonPrimary>
          }
          onClose={() => {}}
          actions={[
            {
              Icon: IconLightningRegular,
              onPress: () => {},
              label: "Lightning",
            },
          ]}
        />`,
    },
];

const titlesSnippets: Array<Snippet> = [
    {
        name: 'Title1',
        code: '<Title1>Some title</Title1>',
    },
    {
        name: 'Title1 (with link)',
        code: '<Title1 right={<TextLink onPress={() => {}}>Link</TextLink>}>Some title</Title1>',
    },
    {
        name: 'Title2',
        code: '<Title2>Some title</Title2>',
    },
    {
        name: 'Title2 (with link)',
        code: '<Title2 right={<TextLink onPress={() => {}}>Link</TextLink>}>Some title</Title2>',
    },
].map((snippet) => ({...snippet, group: 'Titles'}));

const tagSnippets: Array<Snippet> = ['promo', 'active', 'inactive', 'success', 'warning', 'error'].map(
    (type) => ({
        name: `Tag (${type})`,
        group: 'Tags',
        code: `<Tag type="${type}" Icon={IconStarFilled}>${capitalize(type)}</Tag>`,
    })
);

const layoutSnippets: Array<Snippet> = [
    {
        name: 'Box',
        code: '<Box padding={16}><Placeholder /></Box>',
    },
    {
        name: 'Stack',
        code: '<Stack space={16}><Placeholder /><Placeholder /><Placeholder /></Stack>',
    },
    {
        name: 'Inline',
        code: '<Inline space={16}><Placeholder /><Placeholder /><Placeholder /></Inline>',
    },
    {
        name: 'Inline space between',
        code: '<Inline space="between"><Placeholder /><Placeholder /><Placeholder /></Inline>',
    },
    {
        name: 'GridLayout',
        code: '<ResponsiveLayout><GridLayout><Placeholder /></GridLayout></ResponsiveLayout>',
    },
    {
        name: 'GridLayout 6+6',
        code: '<ResponsiveLayout><GridLayout template="6+6" left={<Placeholder />} right={<Placeholder />} /></ResponsiveLayout>',
    },
    {
        name: 'GridLayout 8+4',
        code: '<ResponsiveLayout><GridLayout template="8+4" left={<Placeholder />} right={<Placeholder />} /></ResponsiveLayout>',
    },
    {
        name: 'GridLayout 4+6',
        code: '<ResponsiveLayout><GridLayout template="4+6" left={<Placeholder />} right={<Placeholder />} /></ResponsiveLayout>',
    },
    {
        name: 'GridLayout 5+4',
        code: '<ResponsiveLayout><GridLayout template="5+4" left={<Placeholder />} right={<Placeholder />} /></ResponsiveLayout>',
    },
    {
        name: 'GridLayout 3+9',
        code: '<ResponsiveLayout><GridLayout template="3+9" left={<Placeholder />} right={<Placeholder />} /></ResponsiveLayout>',
    },
    {
        name: 'MasterDetailLayout',
        code: `
        <Box paddingY={24}>
        <MasterDetailLayout
            isOpen={!!getState("selectedItem")}
            master={
            <Stack space={32}>
                {[
                {
                    categoryName: "Personal information",
                    settings: [
                    { title: "Personal details", icon: <IconUserAccountRegular /> },
                    { title: "Security", icon: <IconLockClosedRegular /> },
                    {
                        title: "Payment methods",
                        icon: <IconCreditCardVisaRegular />,
                    },
                    ],
                },
                {
                    categoryName: "Configuration",
                    settings: [
                    { title: "Notifications", icon: <IconBellRegular /> },
                    { title: "FAQs", icon: <IconSupportAgentRegular /> },
                    { title: "About", icon: <IconInformationUserRegular /> },
                    ],
                },
                ].map((category) => (
                <Stack key={category.categoryName} space={8}>
                    <Title1>{category.categoryName}</Title1>
                    <NegativeBox>
                    <RowList>
                        {category.settings.map((setting) => (
                        <Row
                            key={setting.title}
                            title={setting.title}
                            asset={setting.icon}
                            onPress={() => {
                            setState("selectedItem", setting.title);
                            }}
                        />
                        ))}
                    </RowList>
                    </NegativeBox>
                </Stack>
                ))}
            </Stack>
            }
            detail={
            getState("selectedItem") ? (
                <Stack space={16}>
                <Text5 as="h2" medium>
                    {getState("selectedItem")}
                </Text5>
                <Text3 regular color={colors.textSecondary}>
                    You are inside {getState("selectedItem")} section
                </Text3>
                <Placeholder />
                <ButtonPrimary
                    small
                    onPress={() => {
                    setState("selectedItem", null);
                    }}
                >
                    Close
                </ButtonPrimary>
                </Stack>
            ) : (
                <Text2 regular>Select one of the sections from the sidebar</Text2>
            )
            }
        />
        </Box>`,
    },
].map((snippet) => ({...snippet, group: 'Layouts'}));

const emptyStatesGroup: Array<Snippet> = [
    {
        name: 'EmptyState',
        code: `
        <EmptyState
            largeImageUrl="https://i.imgur.com/yGFKQOy.png"
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        />`,
    },
    {
        name: 'EmptyStateCard',
        code: `
        <EmptyStateCard
            imageUrl="https://i.imgur.com/o5qympI.png"
            title="Your cart is empty"
            description="Check our marketplaces and find something for you"
            button={<ButtonPrimary small onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            buttonLink={<ButtonLink onPress={() => {}}>More info</ButtonLink>}
        />`,
    },
].map((snippet) => ({...snippet, group: 'Empty states'}));

const exampleScreens: Array<Snippet> = [
    {
        group: 'Ξ ✨ Example Screens',
        name: 'Settings',
        code: `
      <MainNavigationBar
        sections={["Start", "Account", "Explore", "Support"].map((title, idx) => ({
          title,
          onPress: () => setState("index", idx),
        }))}
        selectedIndex={getState("index", 0)}
        right={
          <NavigationBarActionGroup>
            <NavigationBarAction
              onPress={() => {}}
              aria-label="shopping cart with 2 items"
            >
              <Badge value={2}>
                <IconShoppingCartRegular color="currentColor" />
              </Badge>
            </NavigationBarAction>
            <NavigationBarAction onPress={() => {}} aria-label="Open profile">
              <Avatar
                size={isDesktopOrBigger ? 32 : 24}
                initials="ML"
                src="https://api.lorem.space/image/face?w=200&h=200"
              />
              {isDesktopOrBigger && "María López Serrano"}
            </NavigationBarAction>
          </NavigationBarActionGroup>
        }
      />

      <MainSectionHeaderLayout>
        <MainSectionHeader title="Settings" />
      </MainSectionHeaderLayout>

      <MasterDetailLayout
        isOpen={!!getState("selectedItem")}
        master={
          <div
            style={{
              borderRight: isDesktopOrBigger
                ? \`1px solid \${colors.divider}\`
                : undefined,
            }}
          >
            <Box
              paddingTop={isDesktopOrBigger ? 40 : 24}
              paddingBottom={isDesktopOrBigger ? 80 : 24}
            >
              <Stack space={isDesktopOrBigger ? 48 : 32}>
                {[
                  {
                    categoryName: "Personal information",
                    settings: [
                      {
                        title: "Personal details",
                        icon: <IconUserAccountRegular />,
                      },
                      { title: "Security", icon: <IconLockClosedRegular /> },
                      {
                        title: "Payment methods",
                        icon: <IconCreditCardVisaRegular />,
                      },
                    ],
                  },
                  {
                    categoryName: "Configuration",
                    settings: [
                      { title: "Notifications", icon: <IconBellRegular /> },
                      { title: "FAQs", icon: <IconSupportAgentRegular /> },
                      { title: "About", icon: <IconInformationUserRegular /> },
                    ],
                  },
                ].map((category) => (
                  <Stack key={category.categoryName} space={8}>
                    <Title1>{category.categoryName}</Title1>
                    <NegativeBox left right={!isDesktopOrBigger}>
                      <RowList>
                        {category.settings.map((setting) => (
                          <Row
                            key={setting.title}
                            title={setting.title}
                            asset={setting.icon}
                            onPress={() => {
                              setState("selectedItem", setting.title);
                            }}
                          />
                        ))}
                      </RowList>
                    </NegativeBox>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </div>
        }
        detail={
          <Box
            paddingTop={isDesktopOrBigger ? 40 : 24}
            paddingBottom={isDesktopOrBigger ? 80 : 24}
          >
            <Stack space={isDesktopOrBigger ? 48 : 32}>
              <Stack space={isDesktopOrBigger ? 24 : 16}>
                <Text5 as="h2">
                  {getState("selectedItem", "Personal details")}
                </Text5>
                <Text3 regular color={colors.textSecondary}>
                  You are inside {getState("selectedItem", "Personal details")}{" "}
                  section
                </Text3>
              </Stack>
              <Stack space={8}>
                <Title1>Section 1</Title1>
                <NegativeBox>
                  <RowList>
                    <Row title="Title" switch={{ defaultValue: false }} />
                    <Row title="Title" onPress={() => {}} />
                  </RowList>
                </NegativeBox>
              </Stack>
              <Stack space={8}>
                <Title1>Section 2</Title1>
                <NegativeBox>
                  <RowList>
                    <Row
                      title="Title"
                      description="Description"
                      switch={{ defaultValue: true }}
                    />
                    <Row
                      title="Title"
                      description="Description"
                      switch={{ defaultValue: false }}
                    />
                  </RowList>
                </NegativeBox>
              </Stack>
              {isTabletOrSmaller && (
                <ButtonPrimary
                  small
                  onPress={() => {
                    setState("selectedItem", null);
                  }}
                >
                  Close
                </ButtonPrimary>
              )}
            </Stack>
          </Box>
        }
      />
      `,
    },
    {
        group: 'Ξ ✨ Example Screens',
        name: 'Login',
        code: `
      <Form
        onSubmit={(formData) => {
          alert({
            title: "Form data",
            message: JSON.stringify(formData, null, 2),
          });
        }}
      >
        <ButtonFixedFooterLayout
          button={<ButtonPrimary submit>Continuar</ButtonPrimary>}
          link={<ButtonLink onPress>Not a customer yet? register now!</ButtonLink>}
        >
          <Tabs
            selectedIndex={getState("tabIndex", 0)}
            onChange={setState("tabIndex")}
            tabs={[{ text: "Password" }, { text: "Phone number" }]}
          />
          <Box paddingY={24}>
            <ResponsiveLayout>
              {getState("tabIndex", 0) === 0 && (
                <Stack space={16}>
                  <Text6>This is a title</Text6>
                  <Text3 color={colors.textSecondary}>
                    Subtitle text, write here an explanation of what the user has to
                    do.
                  </Text3>
                  <TextField name="user" label="User" />
                  <PasswordField
                    name="password"
                    label="Password"
                    helperText="Helper text"
                  />
                  <ButtonLink aligned onPress>
                    I’m having problems with my password
                  </ButtonLink>
                </Stack>
              )}
              {getState("tabIndex", 0) === 1 && (
                <Stack space={16}>
                  <Text6>This is a title</Text6>
                  <Text3 color={colors.textSecondary}>
                    Introduce your phone number below.
                  </Text3>
                  <TextField name="phone" label="Phone number" prefix="+34" />

                  <ButtonLink aligned onPress>
                    I’m having access problems
                  </ButtonLink>
                </Stack>
              )}
            </ResponsiveLayout>
          </Box>
        </ButtonFixedFooterLayout>
      </Form>`,
    },
    {
        group: 'Ξ ✨ Example Screens',
        name: 'Search filter screen',
        code: `
<ButtonFixedFooterLayout
  button={<ButtonPrimary onPress={() => {}}>Continue</ButtonPrimary>}
>
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Stack space={24}>
        <SearchField
          autoComplete="off"
          label="Search provider"
          value={getState("search", "")}
          onChangeValue={setState("search")}
        />

        <Stack space={8}>
          {!getState("search") && <Title1>Most popular providers</Title1>}
          <NegativeBox>
            <RadioGroup
              value={getState("provider")}
              onChange={setState("provider")}
            >
              <RowList>
                {[
                  "Movistar",
                  "Vodafone",
                  "Orange",
                  "Vivo",
                  "O2",
                  "Tuenti",
                  "Pepephone",
                  "MasMovil",
                ]
                  .filter(
                    (provider) =>
                      provider === getState("provider") ||
                      provider
                        .toLocaleLowerCase()
                        .startsWith(
                          getState("search", "").toLocaleLowerCase()
                        )
                  )
                  .map((provider) => (
                    <Row title={provider} radioValue={provider} />
                  ))}
              </RowList>
            </RadioGroup>
          </NegativeBox>
        </Stack>
      </Stack>
    </Box>
  </ResponsiveLayout>
</ButtonFixedFooterLayout>
`,
    },
];

const navigationBarSnippets = [
    {
        group: 'NavigationBar',
        name: 'MainNavigationBar',
        code: `
<MainNavigationBar
  sections={["Start", "Account", "Explore", "Support"].map((title, idx) => ({
    title,
    onPress: () => setState("index", idx),
  }))}
  selectedIndex={getState("index", 0)}
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction
        onPress={() => {}}
        aria-label="shopping cart with 2 items"
      >
        <Badge value={2}>
          <IconShoppingCartRegular color="currentColor" />
        </Badge>
      </NavigationBarAction>
      <NavigationBarAction onPress={() => {}} aria-label="Open profile">
        <Avatar
          size={isDesktopOrBigger ? 32 : 24}
          initials="ML"
          src="https://api.lorem.space/image/face?w=200&h=200"
        />
        {isDesktopOrBigger && "María López Serrano"}
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>`,
    },
    {
        group: 'NavigationBar',
        name: 'FunnelNavigationBar',
        code: `
<FunnelNavigationBar
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction aria-label="need help?" href="/help">
        <IconQuestionRegular color="currentColor" />
        {isDesktopOrBigger && (
          <Text2 regular color={colors.textLink}>
            Need help?
          </Text2>
        )}
      </NavigationBarAction>
      <NavigationBarAction aria-label="exit" onPress={() => {}}>
        {isDesktopOrBigger && "Exit"}
        <IconCloseRegular color="currentColor" />
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>`,
    },
    {
        group: 'NavigationBar',
        name: 'NavigationBar',
        code: `
<NavigationBar
  onBack={() => {}}
  title="Settings"
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction aria-label="search" onPress={() => {}}>
        <IconSearchRegular color="currentColor" />
        {isDesktopOrBigger && "Search"}
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>`,
    },
    {
        group: 'NavigationBar',
        name: 'NavigationBarCustomRight',
        code: `
<NavigationBar
  onBack={() => {}}
  title="Settings"
  right={
    <NavigationBarActionGroup>
      <Avatar size={32} />
    </NavigationBarActionGroup>
  }
/>`,
    },
];

const carouselSnippets = [
    {
        group: 'Carousel',
        name: 'Carousel',
        code: `
<Carousel
  withBullets
  items={Array.from({ length: 6 }, (_, idx) => (
    <MediaCard
      headline={<Tag type="promo">Headline</Tag>}
      title={'Card ' + idx}
      description="Description"
      media={<Image src="https://api.lorem.space/image/watch?w=700&h=700" aspectRatio="16:9" />}
      button={
        <ButtonPrimary small onPress={() => {}}>
          Action
        </ButtonPrimary>
      }
      buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
    />
  ))}
/>`,
    },
    {
        group: 'Carousel',
        name: 'Slideshow',
        code: `
<Slideshow
  withBullets
  items={[
    <Image src="https://api.lorem.space/image/furniture?w=1500&h=1500&hash=8B7BCDC2" aspectRatio="16:9" />,
    <Image src="https://api.lorem.space/image/furniture?w=1500&h=1500&hash=500B67FB" aspectRatio="16:9" />,
  ]}
/>`,
    },
    {
        group: 'Carousel',
        name: 'CenteredCarousel',
        code: `
<CenteredCarousel
  withBullets
  items={Array.from({length: 6}, (_, idx) => (
      <div
          style={{
              border: \`1px solid \${colors.border}\`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
      >
          <div style={{flexShrink: 0}}>
              <Circle backgroundColor={colors.brand} size={160}>
                  <ThemeVariant isInverse>
                      <Text10>{idx}</Text10>
                  </ThemeVariant>
              </Circle>
          </div>
      </div>
  ))}
/>
`,
    },
];

const avatarSnippets = [
    {
        group: 'Avatar',
        name: 'Avatar with badge',
        code: `<Avatar size={64} src="https://api.lorem.space/image/face?w=200&h=200" badge />`,
    },
    {
        group: 'Avatar',
        name: 'Avatar with numeric badge',
        code: `<Avatar size={64} src="https://api.lorem.space/image/face?w=200&h=200" badge={5} />`,
    },
    {
        group: 'Avatar',
        name: 'Avatar with initials',
        code: `<Avatar size={64} initials="PL" />`,
    },
    {
        group: 'Avatar',
        name: 'Avatar with icon',
        code: `<Avatar size={64} />`,
    },
    {
        group: 'Avatar',
        name: 'Avatar with custom icon',
        code: `<Avatar size={64} Icon={IconFireRegular} />`,
    },
];

const alertSnippets = [
    {
        group: 'Modals',
        name: 'Alert one button',
        code: `
<ButtonPrimary
    onPress={() =>
        alert({
            title: 'Profile updated',
            message: 'Your changes have been successfully saved',
            acceptText: 'Ok',
        })
    }
>
    Open one button
</ButtonPrimary>`,
    },
    {
        group: 'Modals',
        name: 'Confirm two buttons',
        code: `
<ButtonPrimary
    onPress={() =>
        confirm({
            message:
                'Are you sure you want to delete "rainy_day.jpg"? You cant undo this action.',
            title: 'Delete media?',
        })
    }
>
    Open two buttons
</ButtonPrimary>
`,
    },
    {
        group: 'Modals',
        name: 'Confirm two buttons destructive',
        code: `
<ButtonPrimary
    onPress={() =>
        confirm({
            title: 'Delete Account',
            message:
                'Deleting your account will remove all of your information from our database. This cannot be undone.',
            destructive: true,
            acceptText: 'Delete account',
        })
    }
>
    Open two buttons destructive
</ButtonPrimary>
      `,
    },
    {
        group: 'Modals',
        name: 'Dialog',
        code: `
<ButtonPrimary
    onPress={() =>
        dialog({
            title: 'Title',
            message: 'Message',
            acceptText: 'Accept terms and conditions',
            extra: <Text1 regular>This is the extra zone</Text1>,
            forceWeb: true,
            showCancel: true,
            link: <ButtonLink href="https://google.com">Link</ButtonLink>,
            icon: <IconInformationUserLight color={colors.brand} />,
        })
    }
>
    Open dialog
</ButtonPrimary>
    `,
    },
];

const skeletonSnippets = [
    {
        group: 'Skeletons',
        name: 'Skeleton Line',
        code: `
               <SkeletonLine
                    ariaLabel="loading"
                    disableAnimation={false}
                />
        `,
    },
    {
        group: 'Skeletons',
        name: 'Skeleton Circle',
        code: `
               <SkeletonCircle
                    size={40}
                    ariaLabel="loading"
                    disableAnimation={false}
               />
        `,
    },
    {
        group: 'Skeletons',
        name: 'Skeleton Text',
        code: `
               <SkeletonText
                    ariaLabel="loading"
                    disableAnimation={false}
               />
        `,
    },
    {
        group: 'Skeletons',
        name: 'Skeleton Row',
        code: `
            <SkeletonRow
                ariaLabel="loading"
                disableAnimation={false}
            />
        `,
    },
    {
        group: 'Skeletons',
        name: 'Skeleton Rectangle',
        code: `
            <SkeletonRectangle
                ariaLabel="loading"
                height={100}
                width={200}
                disableAnimation={false}
            />
        `,
    },
];

const heroSnippets = [
    {
        group: 'Hero',
        name: 'White background',
        code: `
          <Hero
            background="default"
            media={
              <Image
                src="https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                aspectRatio="1:1"
              />
            }
            headline={<Tag type="active">Novedad</Tag>}
            pretitle="Brand Conecta Max"
            title="Vuela con la Fibra 1Gb"
            description="Para teletrabajar, ver series y películas y además, tener varios dispositivos conectados."
            button={<ButtonPrimary fake>Lo quiero</ButtonPrimary>}
            dataAttributes={{ testid: "hero" }}
            desktopMediaPosition="right"
          />
      `,
    },
    {
        group: 'Hero',
        name: 'Color background',
        code: `
          <Hero
            background="brand"
            media={
              <Image
                src="https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                aspectRatio="16:9"
              />
            }
            headline={<Tag type="active">Novedad</Tag>}
            pretitle="Brand Conecta Max"
            title="Vuela con la Fibra 1Gb"
            description="Para teletrabajar, ver series y películas y además, tener varios dispositivos conectados."
            button={<ButtonPrimary fake>Lo quiero</ButtonPrimary>}
            dataAttributes={{ testid: "hero" }}
            desktopMediaPosition="left"
          />
      `,
    },
    {
        group: 'Hero',
        name: 'Full height',
        code: `
          <Hero
            background="default"
            height="100vh"
            media={
              <Image
                src="https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                aspectRatio="1:1"
                height={isDesktopOrBigger ? undefined : "100%"}
              />
            }
            headline={<Tag type="active">Novedad</Tag>}
            pretitle="Brand Conecta Max"
            title="Vuela con la Fibra 1Gb"
            description="Para teletrabajar, ver series y películas y además, tener varios dispositivos conectados."
            button={<ButtonPrimary fake>Lo quiero</ButtonPrimary>}
            dataAttributes={{ testid: "hero" }}
            desktopMediaPosition="left"
          />
      `,
    },
    {
        group: 'Hero',
        name: 'Slideshow',
        code: `
         <Slideshow
            withBullets
            inverseBullets={false}
            items={Array.from({ length: 3 }, (_, idx) => (
              <Hero
                background="default"
                media={
                  <Image
                    src="https://api.lorem.space/image/furniture?w=1500&h=1500&hash=8B7BCDC2"
                    aspectRatio="16:9"
                  />
                }
                headline={<Tag type="active">Headline</Tag>}
                pretitle="Pretitle"
                title={["Title", "Title2"][idx]}
                description="This is a long description with a long text to see how this works"
                extra={<Placeholder />}
                button={<ButtonPrimary fake>Action</ButtonPrimary>}
                buttonLink={<ButtonLink href="#">Link</ButtonLink>}
                dataAttributes={{ testid: "hero" }}
                desktopMediaPosition="right"
              />
            ))}
          />

      `,
    },
];

export default [
    ...buttonSnippets,
    ...formSnippets,
    ...feedbackSnippets,
    ...skeletonSnippets,
    {group: 'Feedbacks', name: 'Snackbar', code: '<Snackbar message="Some message here" />'},
    ...layoutSnippets,
    {
        group: 'Layout',
        name: 'FixedFooterLayout',
        code: '<FixedFooterLayout footer={<Box padding={16}><Placeholder /></Box>}>Some content here</FixedFooterLayout>',
    },
    {group: 'Spinner', name: 'Spinner', code: '<Spinner />'},
    {group: 'Divider', name: 'Divider', code: '<Divider />'},
    {group: 'LoadingBar', name: 'LoadingBar', code: '<LoadingBar visible />'},
    {group: 'Badge', name: 'Badge numeric', code: '<Badge value="5" />'},
    {group: 'Badge', name: 'Badge non numeric', code: '<Badge />'},
    {group: 'Badge', name: 'Icon with badge', code: '<Badge value="5"><IconSettingsRegular /></Badge>'},
    {group: 'Text', name: 'Text', code: '<Text>some text</Text>'},
    ...headerSnippets,
    ...listSnippets,
    ...listSnippetsAvatar,
    ...listRowSnippets,
    ...tabsSnippets,
    ...cardSnippets,
    ...exampleScreens,
    {
        group: 'Progress',
        name: 'Stepper',
        code: '<Stepper currentIndex={2} steps={["Basic Details", "Company Details", "Subscription Plan"]} />',
    },
    {
        group: 'Progress',
        name: 'ProgressBar',
        code: '<ProgressBar progressPercent={35} />',
    },
    {
        group: 'NavigationBreadcrumbs',
        name: 'NavigationBreadcrumbs',
        code: '<NavigationBreadcrumbs title="Facturas" breadcrumbs={[{title: "Cuenta", url: "/consumptions"}]} />',
    },
    ...titlesSnippets,
    ...emptyStatesGroup,
    {
        group: 'Callout',
        name: 'Callout',
        code: `
            <Callout
                icon={<IconBoxRegular />}
                onClose={() => {}}
                title="Some title"
                description="This is a description for the callout"
                button={
                <ButtonPrimary small onPress={() => {}}>
                    Action
                </ButtonPrimary>
                }
                buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
            />`,
    },
    ...navigationBarSnippets,
    menuSnippet,
    {group: 'Chip', name: 'Chip', code: '<Chip>Chip</Chip>'},
    {group: 'Chip', name: 'Chip closeable', code: '<Chip onClose={() => {}}>Chip</Chip>'},
    {
        group: 'Chip',
        name: 'Chip icon',
        code: '<Chip onClose={() => {}} Icon={IconLightningFilled}>Chip</Chip>',
    },
    {
        group: 'Chip',
        name: 'Chip checkbox',
        code: `
        <Checkbox
          name="chip-checkbox"
          render={({labelId, checked}) => (
            <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                Chip
            </Chip>
          )}
        />`,
    },
    {
        group: 'Chip',
        name: 'Chip radio group',
        code: `
        <RadioGroup name="chip-group" defaultValue="1">
          <Inline space={8}>
            <RadioButton
              value="1"
              render={({ checked, labelId }) => (
                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                  Chip 1
                </Chip>
              )}
            />
            <RadioButton
              value="2"
              render={({ checked, labelId }) => (
                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                  Chip 2
                </Chip>
              )}
            />
            <RadioButton
              value="3"
              render={({ checked, labelId }) => (
                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                  Chip 3
                </Chip>
              )}
            />
          </Inline>
        </RadioGroup>`,
    },
    ...tagSnippets,
    {
        group: 'Media',
        name: 'Video',
        code: `<Video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" aspectRatio="16:9" />`,
    },
    {
        group: 'Media',
        name: 'Image',
        code: `<Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />`,
    },
    ...carouselSnippets,
    ...avatarSnippets,
    ...alertSnippets,
    ...tooltipSnippets,
    ...popoverSnippets,
    ...heroSnippets,
].sort((s1, s2) => s1.group.localeCompare(s2.group)) as Array<Snippet>;
