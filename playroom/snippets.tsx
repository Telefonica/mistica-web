import {capitalize} from 'lodash';

const imagePlaceholder = 'https://i.imgur.com/jeDSXBU.jpg';

type Snippet = {group: string; name: string; code: string};

const menuSnippet = {
    name: 'Menu',
    code: `
    <Menu
      width={400}
      renderTarget={({ ref, onPress, isMenuOpen }) => (
        <Touchable elementRef={ref} onPress={onPress} style={{ width: 100 }}>
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
                asset={
                    <Circle backgroundColor={colors.neutralLow} size={40}>
                        <IconShopRegular />
                    </Circle>
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={
                    <Circle backgroundColor={colors.neutralLow} size={40}>
                        <IconShopRegular />
                    </Circle>
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={
                    <Circle backgroundColor={colors.neutralLow} size={40}>
                        <IconShopRegular />
                    </Circle>
                }
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                asset={<Image src="https://i.imgur.com/HRvhZ6F.jpeg" height={80} aspectRatio="16:9" />}
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
                    <Circle backgroundColor={colors.neutralLow} size={40}>
                        <IconShopRegular />
                    </Circle>
                }
                title="Banana"
                description="Yellow"
                radioValue="banana"
            />
            <Row
                asset={
                    <Circle backgroundColor={colors.neutralLow} size={40}>
                        <IconShopRegular />
                    </Circle>
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
            asset={<Image src="https://i.imgur.com/HRvhZ6F.jpeg" height={80} aspectRatio="16:9" />}
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
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconShopRegular />
                </Circle>
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
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconShopRegular />
                </Circle>
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
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconShopRegular />
                </Circle>
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
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconShopRegular />
                </Circle>
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
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconShopRegular />
                </Circle>
            }
            title="Title"
            description="Description"
            right={<Placeholder width={32} height={32} />}
        />`,
    },
]);

const tooltipSnippets: Array<Snippet> = ['Tooltip', 'Popover'].map((name) => ({
    group: 'Tooltip',
    name,
    code: `
    <${name}
        target="some target, this can be any component"
        description="Some description to be shown inside the tooltip"
    />
    `,
}));

const headerSnippets: Array<Snippet> = [
    {
        group: 'Headers',
        name: 'Basic header layout',
        code: `
        <HeaderLayout
            header={
                <Header
                    title="The last invoice is available"
                    preamount="Some text (text)"
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
                    subtitle="Subtitle"
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
                    preamount="Some text (text)"
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
                    subtitle="Subtitle"
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
                    preamount="Cuota mensual (IVA incluido)"
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
                    subtitle="Y esto es un subtitulo"
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
                    preamount="Cuota mensual (IVA incluido)"
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
                    subtitle="Y esto es un subtitulo"
                />
            }
            extra={<Placeholder />}
        />
        `,
    },
    {
        group: 'Headers',
        name: 'Header layout (rich text)',
        code: `
        <HeaderLayout
            header={
                <Header
                    title="The last invoice is available"
                    preamount={{
                        text: "Example of line-through text",
                        decoration: "line-through"
                    }}
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
                    subtitle={{
                        text: "Subtitle with secondary color",
                        color: theme.colors.textSecondary
                    }}
                />
            }
        />
        `,
    },
    {
        group: 'Headers',
        name: 'Header layout (rich text)(white)',
        code: `
        <HeaderLayout
            isInverse={false}
            header={
                <Header
                    title="The last invoice is available"
                    preamount={{
                        text: "Example of line-through text",
                        decoration: "line-through"
                    }}
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
                    subtitle={{
                        text: "Subtitle with secondary color",
                        color: theme.colors.textSecondary
                    }}
                />
            }
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
        <Tabs selectedIndex={0}
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
            imageFit="fit"
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
            headline={<Tag type="promo">Headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            description="Description"
            extra={<Placeholder />}
            media={<Image src="https://i.imgur.com/flZfkiX.png" aspectRatio="16:9" />}
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
            headline={<Tag color={colors.promo}>headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            description="Description"
            extra={<Placeholder />}
            media={<Video src="https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw" aspectRatio="16:9" />}
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
            headline={<Tag type="promo">Headline</Tag>}
            title="Title"
            subtitle="Subtitle"
            description="Description"
            extra={<Placeholder />}
            icon={
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconShopRegular />
                </Circle>
            }
            button={
                <ButtonPrimary small onPress={() => {}}>
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
        />`,
    },
];

const titlesSnippets: Array<Snippet> = [
    {
        name: 'SectionTitle',
        code: '<SectionTitle>Some title</SectionTitle>',
    },
    {
        name: 'SectionTitle (with link)',
        code: '<SectionTitle right={<TextLink onPress={() => {}}>Link</TextLink>}>Some title</SectionTitle>',
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
                    <SectionTitle>{category.categoryName}</SectionTitle>
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
        group: '💎 Example Screens',
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
              <Circle
                backgroundImage="https://i.pravatar.cc/100?img=31"
                size={isDesktopOrBigger ? 32 : 24}
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
                    <SectionTitle>{category.categoryName}</SectionTitle>
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
                <SectionTitle>Section 1</SectionTitle>
                <NegativeBox>
                  <RowList>
                    <Row title="Title" switch={{ defaultValue: false }} />
                    <Row title="Title" onPress={() => {}} />
                  </RowList>
                </NegativeBox>
              </Stack>
              <Stack space={8}>
                <SectionTitle>Section 2</SectionTitle>
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
        group: '💎 Example Screens',
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
        <Circle
          backgroundImage="https://i.pravatar.cc/100?img=31"
          size={isDesktopOrBigger ? 32 : 24}
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
];

export default [
    ...buttonSnippets,
    ...formSnippets,
    ...feedbackSnippets,
    {group: 'Feedbacks', name: 'Snackbar', code: '<Snackbar message="Some message here" />'},
    ...tooltipSnippets,
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
    ...tagSnippets,
    {
        group: 'Media',
        name: 'Video',
        code: `<Video src="https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw" aspectRatio="16:9" />`,
    },
    {
        group: 'Media',
        name: 'Image',
        code: `<Image src="https://i.imgur.com/flZfkiX.png" aspectRatio="16:9" />`,
    },
].sort((s1, s2) => s1.group.localeCompare(s2.group)) as Array<Snippet>;
