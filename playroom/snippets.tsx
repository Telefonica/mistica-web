import {capitalize} from 'lodash';

const imagePlaceholder = 'https://source.unsplash.com/800x800/?abstract';

type Snippet = {group: string; name: string; code: string};

const menuSnippet = {
    name: 'Menu',
    code: `
    <Menu
      renderTarget={({ ref, onPress, isMenuOpen }) => (
        <Box padding={16}>
          <Touchable
            ref={ref}
            onPress={onPress}
            style={{ maxWidth: "fit-content" }}
          >
            <Inline space={16}>
              <IconKebabMenuLight />
              <Text3 regular>{isMenuOpen ? "Close" : "Open"}</Text3>
            </Inline>
          </Touchable>
        </Box>
      )}
      renderMenu={({ ref, className }) => (
        <div ref={ref} className={className}>
          <MenuSection>
            <MenuItem label="option 1" onPress={() => {}} />
            <MenuItem
              label="option 2"
              onPress={() => setState("option 2", !getState("option 2", false))}
              controlType="checkbox"
              checked={getState("option 2", false)}
            />
            <MenuItem label="option 3" disabled onPress={() => {}} />
          </MenuSection>

          <MenuSection>
            <MenuItem
              label="option 4"
              destructive
              Icon={IconLightningRegular}
              onPress={() => {}}
            />
          </MenuSection>

          <MenuSection>
            <MenuItem
              label="option 5"
              disabled
              Icon={IconLightningRegular}
              onPress={() => {}}
            />
            <MenuItem
              label="An option with a really long text to verify overflow"
              onPress={() => {}}
            />
          </MenuSection>
        </div>
      )}
    />`,
    group: 'Menu',
};

const accordionSnippets: Array<Snippet> = [
    {
        group: 'Accordion',
        name: 'Accordion',
        code: `
        <Accordion>
          <AccordionItem
            asset={<IconInvoicePlanFileRegular />}
            title="What is Movistar Money"
            content={
              <Text3 color={colors.textSecondary}>
                It's a loan available to anyone, whether or not you're a Movistar
                customer. It offers from €2,000 to €15,000 with a simple and fast
                application process, and you receive the money in less than 48 hours.
              </Text3>
            }
          />
          <AccordionItem
            asset={<IconLocationMapRegular />}
            title="To whom is it aimed?"
            content={
              <Text3 color={colors.textSecondary}>
                The Movistar Money loan service is aimed at anyone, whether you are a{" "}
                <TextLink href>Movistar</TextLink> customer or not.
              </Text3>
            }
          />
          <AccordionItem
            asset={<IconLockEyeClosedRegular />}
            title="Who offers Movistar Money?"
            content={
              <Text3 color={colors.textSecondary}>
                <p>
                  At Telefónica, we have our own financial institution, Telefonica
                  Consumer Finance, and agreements with other institutions to assist
                  you in obtaining your loan.
                </p>
                <br />
                <Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />
                <br />
                <p>
                  Depending on the characteristics of the information you provide us,
                  your application will be sent to one of the institutions{" "}
                  <TextLink href>with which Movistar has agreements</TextLink>.
                </p>
              </Text3>
            }
          />
          <AccordionItem
            asset={<IconIdCardRegular />}
            title="How can I hire it?"
            content={
              <Text3 color={colors.textSecondary}>
                It's a very agile process that you can access through the
                money.movistar.es website. You can find more detailed information
                about the process on our "How It Works" page.
              </Text3>
            }
          />
          <AccordionItem
            asset={<IconLifeguardFloatRegular />}
            title="What should I do if I don't receive the SMS with the contracting code?"
            content={
              <Text3 color={colors.textSecondary}>
                It may take a few minutes until you receive the SMS with the code. If
                you still haven't received the code, you can request a new one by
                clicking on "resend SMS."
              </Text3>
            }
          />
        </Accordion>
        `,
    },
    {
        group: 'Accordion',
        name: 'BoxedAccordion',
        code: `
      <BoxedAccordion>
        <BoxedAccordionItem
          asset={<IconInvoicePlanFileRegular />}
          title="What is Movistar Money"
          content={
            <Text3 color={colors.textSecondary}>
              It's a loan available to anyone, whether or not you're a Movistar
              customer. It offers from €2,000 to €15,000 with a simple and fast
              application process, and you receive the money in less than 48 hours.
            </Text3>
          }
        />
        <BoxedAccordionItem
          asset={<IconLocationMapRegular />}
          title="To whom is it aimed?"
          content={
            <Text3 color={colors.textSecondary}>
              The Movistar Money loan service is aimed at anyone, whether you are a{" "}
              <TextLink href>Movistar</TextLink> customer or not.
            </Text3>
          }
        />
        <BoxedAccordionItem
          asset={<IconLockEyeClosedRegular />}
          title="Who offers Movistar Money?"
          content={
            <Text3 color={colors.textSecondary}>
              <p>
                At Telefónica, we have our own financial institution, Telefonica
                Consumer Finance, and agreements with other institutions to assist
                you in obtaining your loan.
              </p>
              <br />
              <Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />
              <br />
              <p>
                Depending on the characteristics of the information you provide us,
                your application will be sent to one of the institutions{" "}
                <TextLink href>with which Movistar has agreements</TextLink>.
              </p>
            </Text3>
          }
        />
        <BoxedAccordionItem
          asset={<IconIdCardRegular />}
          title="How can I hire it?"
          content={
            <Text3 color={colors.textSecondary}>
              It's a very agile process that you can access through the
              money.movistar.es website. You can find more detailed information
              about the process on our "How It Works" page.
            </Text3>
          }
        />
        <BoxedAccordionItem
          asset={<IconLifeguardFloatRegular />}
          title="What should I do if I don't receive the SMS with the contracting code?"
          content={
            <Text3 color={colors.textSecondary}>
              It may take a few minutes until you receive the SMS with the code. If
              you still haven't received the code, you can request a new one by
              clicking on "resend SMS."
            </Text3>
          }
        />
      </BoxedAccordion>
      `,
    },
];

const buttonSnippets: Array<Snippet> = [
    {name: 'ButtonPrimary', code: '<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>'},
    {name: 'ButtonSecondary', code: '<ButtonSecondary onPress={() => {}}>Action</ButtonSecondary>'},
    {name: 'ButtonDanger', code: '<ButtonDanger onPress={() => {}}>Action</ButtonDanger>'},
    {name: 'ButtonLink', code: '<ButtonLink onPress={() => {}}>Action</ButtonLink>'},
    {name: 'ButtonLinkDanger', code: '<ButtonLinkDanger onPress={() => {}}>Action</ButtonLinkDanger>'},
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
    {
        name: 'IconButton',
        code: `
        <IconButton
          onPress={() => window.alert("pressed!")}
          Icon={IconLightningRegular}
          type="brand"
          backgroundType="soft"
        />`,
    },
    {
        name: 'ToggleIconButton',
        code: `
        <ToggleIconButton
          checkedProps={{
            Icon: IconPauseFilled,
            type: "danger",
            backgroundType: "soft",
            "aria-label": "checked icon button",
          }}
          uncheckedProps={{
            Icon: IconPlayFilled,
            type: "neutral",
            backgroundType: "transparent",
            "aria-label": "checked icon button",
          }}
          onChange={(checked) => console.log("checked:", checked)}
        />`,
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
    ['PinField', '<PinField name="otp" aria-label="OTP" />'],
    ['PinField (hideCode)', '<PinField hideCode name="pin" aria-label="PIN" />'],
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

const loadingScreenSnippets: Array<Snippet> = [
    {
        group: 'Loading Screens',
        name: 'LoadingScreen',
        code: `
        <LoadingScreen
            title="Some title"
            description="Some description text"
        />
        `,
    },
    {
        group: 'Loading Screens',
        name: 'BrandLoadingScreen',
        code: `
        <BrandLoadingScreen
            title="Some title"
            description="Some description text"
        />
        `,
    },
    {
        group: 'Loading Screens',
        name: 'BrandLoadingScreen with multiple texts',
        code: `
        <BrandLoadingScreen
          texts={[
            { title: "Title 1", description: "Description 1" },
            { title: "Title 2", description: "Description 2" },
            { title: "Title 3", description: "Description 3" },
          ]}
        />`,
    },
];

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
                    src="https://source.unsplash.com/600x600/?face"
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
            asset={<Image src="https://source.unsplash.com/900x900/?landscape" height={80} aspectRatio="1:1" />}
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
        name: `${rowName} (iconButton)`,
        code: `
      <${rowName}
        asset={<IconShopRegular />}
        title="Title"
        description="Description"
        iconButton={{
          "aria-label": "Borrar",
          Icon: IconTrashCanRegular,
          small: true,
          backgroundType: "transparent",
          type: "neutral",
          onPress: () => console.log("Pressed button"),
        }}
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
          target={<Text3>some target, this can be any component</Text3>}
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
          target={<Text3>some target, this can be any component</Text3>}
          asset={
            <Circle size={40} backgroundColor={colors.brandLow}>
              <IconShopRegular color={colors.brand} />
            </Circle>
          }
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
            <IconButton
              onPress={() => {
                setState("isOpen", !getState("isOpen"));
              }}
              Icon={IconLightningRegular}
              backgroundType="solid"
            />
          }
          open={getState("isOpen") ?? false}
          onClose={() => setState("isOpen", false)}
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
        name: 'Basic header layout (no inverse)',
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
        name: 'Header layout (with breadcrumbs)(no inverse)',
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
        name: 'Main section header layout (no inverse)',
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
                {text: 'Tab 3'},
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
            icon={<Avatar size={40} src="https://source.unsplash.com/600x600/?face" />}
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
            icon={<Avatar size={40} src="https://source.unsplash.com/600x600/?face" />}
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
            onPress={() => {alert({ title: "pressed" });}}
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
            {
              checkedProps: {
                  Icon: IconStarFilled,
                  label: 'checked',
              },
              uncheckedProps: {
                  Icon: IconStarRegular,
                  label: 'unchecked',
              },
              defaultChecked: false,
              onChange: () => {},
          },
          ]}
        />`,
    },
    {
        group: 'Cards',
        name: 'DisplayMediaCard with image',
        code: `
        <DisplayMediaCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          backgroundImage="https://source.unsplash.com/900x900/?landscape"
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
            {
              checkedProps: {
                  Icon: IconStarFilled,
                  label: 'checked',
              },
              uncheckedProps: {
                  Icon: IconStarRegular,
                  label: 'unchecked',
              },
              defaultChecked: false,
              onChange: () => {},
          },
          ]}
        />`,
    },
    {
        group: 'Cards',
        name: 'DisplayMediaCard with video',
        code: `
        <DisplayMediaCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          backgroundVideo="https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw"
          poster="https://source.unsplash.com/900x900/?landscape"
          button={
            <ButtonPrimary small href="https://google.com">
              Action
            </ButtonPrimary>
          }
        />`,
    },
    {
        group: 'Cards',
        name: 'PosterCard with image',
        code: `
        <PosterCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          backgroundImage="https://source.unsplash.com/900x900/?landscape"
          onClose={() => {}}
          onPress={() => {alert({ title: "pressed" });}}
          actions={[
            {
              Icon: IconLightningRegular,
              onPress: () => {},
              label: "Lightning",
            },
            {
              checkedProps: {
                  Icon: IconStarFilled,
                  label: 'checked',
              },
              uncheckedProps: {
                  Icon: IconStarRegular,
                  label: 'unchecked',
              },
              defaultChecked: false,
              onChange: () => {},
          },
          ]}
        />`,
    },
    {
        group: 'Cards',
        name: 'PosterCard with video',
        code: `
        <PosterCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          backgroundVideo="https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw"
          poster="https://source.unsplash.com/900x900/?landscape"
          onPress={() => {alert({ title: "pressed" });}}
          button={
            <ButtonPrimary small href="https://google.com">
              Action
            </ButtonPrimary>
          }
        />`,
    },
    {
        group: 'Cards',
        name: 'PosterCard inverse',
        code: `
        <PosterCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          isInverse
          onClose={() => {}}
          onPress={() => {alert({ title: "pressed" });}}
          actions={[
            {
              Icon: IconLightningRegular,
              onPress: () => {},
              label: "Lightning",
            },
            {
              checkedProps: {
                  Icon: IconStarFilled,
                  label: 'checked',
              },
              uncheckedProps: {
                  Icon: IconStarRegular,
                  label: 'unchecked',
              },
              defaultChecked: false,
              onChange: () => {},
          },
          ]}
        />`,
    },
    {
        group: 'Cards',
        name: 'PosterCard with backgroundColor',
        code: `
        <PosterCard
          headline={<Tag type="promo">Headline</Tag>}
          pretitle="Pretitle"
          title="Title"
          description="Description"
          backgroundColor={colors.promo}
          isInverse
          onClose={() => {}}
          onPress={() => {alert({ title: "pressed" });}}
          actions={[
            {
              Icon: IconLightningRegular,
              onPress: () => {},
              label: "Lightning",
            },
            {
              checkedProps: {
                  Icon: IconStarFilled,
                  label: 'checked',
              },
              uncheckedProps: {
                  Icon: IconStarRegular,
                  label: 'unchecked',
              },
              defaultChecked: false,
              onChange: () => {},
            },
          ]}
        />`,
    },

    {
        group: 'Cards',
        name: 'NakedCard with Image',
        code: `
        <NakedCard
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
        name: 'NakedCard with Video',
        code: `
        <NakedCard
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
        name: 'SmallNakedCard',
        code: `
        <SmallNakedCard
            media={<Image src="https://picsum.photos/1200/1200" aspectRatio="16:9"/>}
            title="Title"
            subtitle="Subtitle"
            description="Description"
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
        code: '<Title1 right={<ButtonLink onPress={() => {}} withChevron bleedRight bleedY>Link</ButtonLink>}>Some title</Title1>',
    },
    {
        name: 'Title2',
        code: '<Title2>Some title</Title2>',
    },
    {
        name: 'Title2 (with link)',
        code: '<Title2 right={<ButtonLink onPress={() => {}} withChevron bleedRight bleedY>Link</ButtonLink>}>Some title</Title2>',
    },
    {
        name: 'Title3',
        code: '<Title3>Some title</Title3>',
    },
    {
        name: 'Title3 (with link)',
        code: '<Title3 right={<ButtonLink onPress={() => {}} withChevron bleedRight bleedY>Link</ButtonLink>}>Some title</Title3>',
    },
].map((snippet) => ({...snippet, group: 'Titles'}));

const tagSnippets: Array<Snippet> = ['promo', 'active', 'inactive', 'success', 'warning', 'error'].map(
    (type) => ({
        name: `Tag (${type})`,
        group: 'Tags',
        code: `<Tag type="${type}" Icon={IconStarFilled}>${capitalize(type)}</Tag>`,
    })
);

const sliderSnippets: Array<Snippet> = [
    {
        group: 'Slider',
        name: 'Slider',
        code: `
        <ResponsiveLayout>
          <Slider name="slider" min={1} max={10} tooltip />
        </ResponsiveLayout>`,
    },
    {
        group: 'Slider',
        name: 'Slider with values',
        code: `
        <ResponsiveLayout>
          <Slider name="slider" values={[3, 10, 7, 1, 2, 4, 6, 8, 9, 5]} tooltip />
        </ResponsiveLayout>`,
    },
];

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
    {
        group: 'Mosaic',
        name: 'HorizontalMosaic',
        code: `
        <ResponsiveLayout>
          <HorizontalMosaic
            items={Array.from({ length: 6 }, (_, index) => (
              <Image
                src="https://picsum.photos/1200/1200"
                width="100%"
                height="100%"
                key={index}
              />
            ))}
          />
        </ResponsiveLayout>`,
    },
    {
        group: 'Mosaic',
        name: 'VerticalMosaic',
        code: `
        <VerticalMosaic
          items={Array.from({ length: 6 }, (_, index) => (
            <Image
              src="https://picsum.photos/1200/1200"
              width="100%"
              height="100%"
              key={index}
            />
          ))}
        />`,
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
                src="https://source.unsplash.com/600x600/?face"
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
                  <ButtonLink bleedLeft onPress>
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

                  <ButtonLink bleedLeft onPress>
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
          src="https://source.unsplash.com/600x600/?face"
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
      media={<Image src="https://source.unsplash.com/1600x900/?watch" aspectRatio="16:9" />}
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
    <Image src="https://source.unsplash.com/1600x900/?furniture" aspectRatio="16:9" />,
    <Image src="https://source.unsplash.com/1600x900/?furniture" aspectRatio="16:9" />,
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
        code: `<Avatar size={64} src="https://source.unsplash.com/600x600/?face" badge />`,
    },
    {
        group: 'Avatar',
        name: 'Avatar with numeric badge',
        code: `<Avatar size={64} src="https://source.unsplash.com/600x600/?face" badge={5} />`,
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
    {
        group: 'Modals',
        name: 'showSheet (info)',
        code: `
<ButtonPrimary
  aria-haspopup="dialog"
  onPress={() => {
    showSheet({
      type: "INFO",
      props: {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        items: [
          { id: "1", title: "Item 1", icon: { type: "bullet" } },
          { id: "2", title: "Item 2", icon: { type: "bullet" } },
        ],
      },
    });
  }}
>
  Open sheet
</ButtonPrimary>`,
    },
    {
        group: 'Modals',
        name: 'showSheet (actions list)',
        code: `
<ButtonPrimary
  aria-haspopup="dialog"
  onPress={() => {
    showSheet({
      type: "ACTIONS_LIST",
      props: {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        items: [
          {
            id: "1",
            title: "Action 1",
            icon: {
              url: "https://source.unsplash.com/600x600/?face",
            },
          },
          {
            id: "2",
            title: "Destructive",
            style: "destructive",
          },
        ],
      },
    });
  }}
>
  Open sheet
</ButtonPrimary>`,
    },
    {
        group: 'Modals',
        name: 'showSheet (actions)',
        code: `
<ButtonPrimary
  aria-haspopup="dialog"
  onPress={() => {
    showSheet({
      type: "ACTIONS",
      props: {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        button: {
          text: "Button",
        },
        link: {
          text: "Link",
          withChevron: true,
        },
      },
    });
  }}
>
  Open sheet
</ButtonPrimary>`,
    },
    {
        group: 'Modals',
        name: 'showSheet (radio list)',
        code: `
<ButtonPrimary
  aria-haspopup="dialog"
  onPress={() => {
    showSheet({
      type: "RADIO_LIST",
      props: {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        selectedId: "1",
        items: [
          {
            id: "1",
            title: "Item 1",
            description: "Description",
            icon: {
              url: "https://source.unsplash.com/600x600/?face",
            },
          },
          {
            id: "2",
            title: "Item 2",
            description: "Description",
            icon: {
              url: "unknownurl",
            },
          },
        ],
      },
    });
  }}
>
  Open sheet
</ButtonPrimary>`,
    },
    {
        group: 'Modals',
        name: 'Sheet',
        code: `
<ButtonPrimary
  aria-expanded={getState("isSheetOpen", false)}
  aria-haspopup="dialog"
  disabled={getState("isSheetOpen")}
  onPress={() => {
    setState("isSheetOpen", true);
  }}
>
  Open
</ButtonPrimary>

{getState("isSheetOpen") && (
  <Sheet
    onClose={() => {
      setState("isSheetOpen", false);
    }}
  >
    <ResponsiveLayout>
      <Box
        paddingBottom={{ mobile: 16, desktop: 40 }}
        paddingTop={{ mobile: 0, desktop: 40 }}
      >
        <Placeholder />
      </Box>
    </ResponsiveLayout>
  </Sheet>
)}`,
    },
    {
        group: 'Modals',
        name: 'InfoSheet',
        code: `
<ButtonPrimary
  aria-expanded={getState("isSheetOpen",false)}
  aria-haspopup="dialog"
  disabled={getState("isSheetOpen")}
  onPress={() => {
    setState("isSheetOpen", true);
  }}
>
  Open
</ButtonPrimary>

{getState("isSheetOpen") && (
  <InfoSheet
    onClose={() => {
      setState("isSheetOpen", false);
    }}
    title="Title"
    subtitle="Subtitle"
    description="Description"
    items={[
      {
        id: "1",
        title: "Item 1",
        description: "Description",
        icon: { type: "bullet" },
      },
      {
        id: "2",
        title: "Item 2",
        description: "Description",
        icon: { type: "regular", Icon: IconCocktailRegular },
      },
      {
        id: "3",
        title: "Item 3",
        description: "Description",
        icon: { type: "small", Icon: IconCheckRegular },
      },
    ]}
  />
)}`,
    },
    {
        group: 'Modals',
        name: 'RadioListSheet',
        code: `
<ButtonPrimary
  aria-expanded={getState("isSheetOpen", false)}
  aria-haspopup="dialog"
  disabled={getState("isSheetOpen")}
  onPress={() => {
    setState("isSheetOpen", true);
  }}
>
  Open
</ButtonPrimary>

{getState("isSheetOpen") && (
  <RadioListSheet
    onClose={() => {
      setState("isSheetOpen", false);
    }}
    onSelect={(selected) => console.log(selected)}
    title="Title"
    subtitle="Subtitle"
    description="Description"
    items={[
      "Apple",
      "Banana",
      "Pineapple",
      "Mango",
      "Peach",
      "Pear",
      "Strawberry",
      "Watermelon",
      "Kiwi",
      "Cherry",
      "Grape",
      "Lemon",
      "Lime",
    ].map((fruit, idx) => ({
      id: String(idx),
      title: fruit,
      description: "Description",
      asset: (
        <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
          <IconMobileDeviceRegular color={skinVars.colors.brand} />
        </Circle>
      ),
    }))}
  />
)}`,
    },
    {
        group: 'Modals',
        name: 'ActionsListSheet',
        code: `
<ButtonPrimary
  aria-expanded={getState("isSheetOpen", false)}
  aria-haspopup="dialog"
  disabled={getState("isSheetOpen")}
  onPress={() => {
    setState("isSheetOpen", true);
  }}
>
  Open
</ButtonPrimary>

{getState("isSheetOpen") && (
  <ActionsListSheet
    onClose={() => {
      setState("isSheetOpen", false);
    }}
    onSelect={(selected) => console.log(selected)}
    title="Title"
    subtitle="Subtitle"
    description="Description"
    items={[
      {
        id: "1",
        title: "Action with icon",
        icon: {
          Icon: IconLightningRegular,
        },
      },
      {
        id: "2",
        title: "Action without icon",
      },
      {
        id: "3",
        title: "Destructive action",
        style: "destructive",
        icon: {
          Icon: IconTrashCanRegular,
        },
      },
    ]}
  />
)}`,
    },
    {
        group: 'Modals',
        name: 'ActionsSheet',
        code: `
<ButtonPrimary
  aria-expanded={getState("isSheetOpen", false)}
  aria-haspopup="dialog"
  disabled={getState("isSheetOpen")}
  onPress={() => {
    setState("isSheetOpen", true);
  }}
>
  Open
</ButtonPrimary>

{getState("isSheetOpen") && (
  <ActionsSheet
    onClose={() => {
      setState("isSheetOpen", false);
    }}
    onPressButton={(selected) => console.log(selected)}
    title="Title"
    subtitle="Subtitle"
    description="Description"
    button={{ text: "Primary" }}
    secondaryButton={{ text: "Secondary" }}
    buttonLink={{ text: "Link", withChevron: true }}
  />
)}`,
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
                    src="https://source.unsplash.com/1600x900/?furniture"
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

const loaderSnippets = [
    {
        name: 'Loader with url',
        code: `
          <Loader
          load="https://randomuser.me/api/?results=20&seed=patata&nat=es"
          render={(data) => (
            <RowList>
              {data.results.map((p) => (
                <Row
                  asset={<Avatar size={40} src={p.picture.medium} />}
                  title={p.name.first}
                  description={p.email}
                />
              ))}
            </RowList>
          )}
          renderLoading={() => <Spinner />}
          renderError={() => <Snackbar message="An error occurred :(" type="CRITICAL" />}
          />
        `,
        group: 'Loader',
    },
    {
        name: 'Loader with function',
        code: `
          <Loader
            load={async () => {
                return fetch('https://randomuser.me/api/?results=20&seed=patata&nat=es').then((r) => r.json());
            }}
            render={(data) => (
                <RowList>
                    {data.results.map((p) => (
                        <Row
                            asset={<Avatar size={40} src={p.picture.medium} />}
                            title={p.name.first}
                            description={p.email}
                        />
                    ))}
                </RowList>
            )}
            renderLoading={() => <Spinner />}
            renderError={() => <Snackbar message="An error occurred :(" type="CRITICAL" />}
          />
        `,
        group: 'Loader',
    },
];

const logoSnippets = [
    {
        group: 'Logo',
        name: 'Logo imagotype',
        code: `<Logo type="imagotype" size={48} />`,
    },
    {
        group: 'Logo',
        name: 'Logo isotype',
        code: `<Logo type="isotype" size={48} />`,
    },
    {
        group: 'Logo',
        name: 'Logo vertical',
        code: `<Logo type="vertical" size={48} />`,
    },
    {
        group: 'Logo',
        name: 'Logo with to prop',
        code: `<Logo to="#" size={48} />`,
    },
    {
        group: 'Logo',
        name: 'Logo with href prop',
        code: `<Logo href="#" newTab aria-label="href logo" size={48} />`,
    },
    {
        group: 'Logo',
        name: 'Logo with onPress prop',
        code: `<Logo onPress={() => {alert({ title: "pressed" });}} aria-label="pressed logo" size={48} />`,
    },
    {
        group: 'Logo',
        name: 'Blau Logo',
        code: `<BlauLogo size={48} type="isotype" />`,
    },
    {
        group: 'Logo',
        name: 'Movistar Logo',
        code: `<MovistarLogo size={48} type="isotype" />`,
    },
    {
        group: 'Logo',
        name: 'O2 Logo',
        code: `<O2Logo size={48} type="isotype" />`,
    },
    {
        group: 'Logo',
        name: 'Telefónica Logo',
        code: `<TelefonicaLogo size={48} type="isotype" />`,
    },
    {
        group: 'Logo',
        name: 'Vigo Logo',
        code: `<VivoLogo size={48} type="isotype" />`,
    },
    {
        group: 'Logo',
        name: ' with to prop',
        code: `<Logo to="#" size={48} />`,
    },
];

const gridSnippets = [
    {
        group: 'Grid',
        name: 'Fixed columns/rows',
        code: `
<Grid columns={2} rows={3} gap={8}>
  <GridItem>
    <SnapCard
      icon={
        <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
          <IconAcademicRegular color={skinVars.colors.brand} />
        </Circle>
      }
      title="Title 1"
      subtitle="Subtitle 1"
    />
  </GridItem>
  <GridItem rowSpan={2}>
    <SnapCard
      icon={
        <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
          <IconAcademicRegular color={skinVars.colors.brand} />
        </Circle>
      }
      title="Title 2"
      subtitle="Subtitle 2"
    />
  </GridItem>
  <GridItem>
    <SnapCard
      icon={
        <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
          <IconAcademicRegular color={skinVars.colors.brand} />
        </Circle>
      }
      title="Title 3"
      subtitle="Subtitle 3"
    />
  </GridItem>
  <GridItem columnSpan={2}>
    <SnapCard
      icon={
        <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
          <IconAcademicRegular color={skinVars.colors.brand} />
        </Circle>
      }
      title="Title 4"
      subtitle="Subtitle 4"
    />
  </GridItem>
</Grid>
`,
    },
    {
        group: 'Grid',
        name: 'Auto columns',
        code: `
<Grid columns={{ minSize: 100 }} gap={8}>
  {Array.from({ length: 10 }, (_, idx) => (
    <SnapCard
      key={idx}
      icon={
        <Circle size={40} backgroundColor={colors.brandLow}>
          <IconAcademicRegular color={colors.brand} />
        </Circle>
      }
      title={\`Title \${idx}\`}
      subtitle="Subtitle"
    />
  ))}
</Grid>
`,
    },
];

const stackingGroupSnippets = [
    {
        name: 'Stacking Group',
        code: `
        <StackingGroup maxItems={5} moreItemsStyle={{type: 'circle', size: 64}}>
          <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
          <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
          <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
          <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
          <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
          <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
        </StackingGroup>
    `,
        group: 'StackingGroup',
    },
];

const advancedDataCardSnippets = [
    {
        name: 'Advanced Data Card',
        code: `
        <AdvancedDataCard
          title="title"
          titleAs="h2"
          subtitle="subtitle"
          pretitle="pretitle"
          pretitleAs="h4"
          description="description"
          extra={[
            <RowBlock title="RowBlock" description="description" />,
            <SimpleBlock
              image={
                <Image src="https://source.unsplash.com/600x600/?face" height={40} />
              }
              description="SimpleBlock"
            />,
            <InformationBlock
              title="InformationBlock"
              description="description"
              value="20"
              secondaryValue="20"
            />,
            <HighlightedValueBlock
              headline={
                <Tag type="promo" Icon={IconStarFilled}>
                  Promo
                </Tag>
              }
              mainHeading={{ text: "text", value: "20" }}
              secondHeading={{ text: "text", value: "20" }}
              title="HighlightedValueBlock"
              description="description"
            />,
            <ValueBlock title="ValueBlock" description="description" value="20" />,
            <ProgressBlock
              title="Progress Block"
              heading={{
                value: "20 GB",
                text: "text",
              }}
              progressPercent={20}
              description="description"
            />,
            <StackingGroup maxItems={5} moreItemsStyle={{ type: "circle", size: 64 }}>
              <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
              <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
              <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
              <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
              <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
              <Avatar size={64} src="https://source.unsplash.com/600x600/?face" />
            </StackingGroup>,
          ]}
          button={
            <ButtonPrimary small onPress={() => window.alert("click")}>
              Action
            </ButtonPrimary>
          }
          buttonLink={
            <ButtonLink small onPress={() => window.alert("click")}>
              Action
            </ButtonLink>
          }
          footerImage={
            <Image src="https://source.unsplash.com/600x600/?face" height={40} />
          }
          footerText="footer text"
          onClose={() => window.alert("close")}
          href="https://google.com"
        />
        `,
        group: 'AdvancedDataCard',
    },
];

const RowBlockSnippets = [
    {
        name: 'Row Block',
        code: `
          <RowBlock title="title" description="description" />
      `,
        group: 'Blocks',
    },
];

const SimpleBlockSnippets = [
    {
        name: 'Simple Block',
        code: `
        <SimpleBlock
          image={
            <Image src="https://source.unsplash.com/600x600/?face" height={40} />
          }
          description="description"
        />
      `,
        group: 'Blocks',
    },
];

const InformationBlockSnippets = [
    {
        name: 'Information Block',
        code: `
        <InformationBlock
          title="title"
          description="description"
          value="value"
          secondaryValue="secondaryValue"
        />
      `,
        group: 'Blocks',
    },
];

const HighlightedValueBlockSnippets = [
    {
        name: 'Highlighted Value Block',
        code: `
        <HighlightedValueBlock
          headline={
            <Tag type="promo" Icon={IconStarFilled}>
              Promo
            </Tag>
          }
          mainHeading={{ text: "text", value: "value" }}
          secondHeading={{ text: "text", value: "value" }}
          title="title"
          description="description"
        />
      `,
        group: 'Blocks',
    },
];

const ValueBlockSnippets = [
    {
        name: 'Value Block',
        code: `
        <ValueBlock title="title" description="description" value="value" />
      `,
        group: 'Blocks',
    },
];

const ProgressBlockSnippets = [
    {
        name: 'Progress Block',
        code: `
      <ProgressBlock
        title="title"
        heading={{
          value: "20 GB",
          text: "text",
        }}
        progressPercent={20}
        description="description"
      />
      `,
        group: 'Blocks',
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
    {
        group: 'Counter',
        name: 'Counter',
        code: `
        <Counter
          min={0}
          max={5}
          onRemove={() => window.alert("removed")}
          defaultValue={2}
        />`,
    },
    ...headerSnippets,
    ...accordionSnippets,
    ...listSnippets,
    ...listSnippetsAvatar,
    ...listRowSnippets,
    ...tabsSnippets,
    ...sliderSnippets,
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
        group: 'Progress',
        name: 'ProgressBarStepped',
        code: '<ProgressBarStepped steps={6} currentStep={3} />',
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
    {
        group: 'Media',
        name: 'Image circular',
        code: `<Image circular src="https://picsum.photos/1200/1200" />`,
    },
    ...carouselSnippets,
    ...avatarSnippets,
    ...alertSnippets,
    ...tooltipSnippets,
    ...popoverSnippets,
    ...heroSnippets,
    ...loaderSnippets,
    ...logoSnippets,
    ...gridSnippets,
    ...stackingGroupSnippets,
    ...advancedDataCardSnippets,
    ...RowBlockSnippets,
    ...SimpleBlockSnippets,
    ...InformationBlockSnippets,
    ...HighlightedValueBlockSnippets,
    ...ValueBlockSnippets,
    ...ProgressBlockSnippets,
    ...loadingScreenSnippets,
].sort((s1, s2) => s1.group.localeCompare(s2.group)) as Array<Snippet>;
