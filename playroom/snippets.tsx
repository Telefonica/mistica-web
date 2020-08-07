const buttonSnippets = ['ButtonPrimary', 'ButtonSecondary', 'ButtonDanger'].map((name) => ({
    group: 'Buttons',
    name,
    code: `
      <${name} onPress={() => {}}>
        Button
      </${name}>
    `,
}));

const formSnippets = [
    [
        'FormSelect',
        `<FormSelect name="fruits" label="Choose a fruit" options={[{value: 'orange', text: 'Orange'}, {value: 'banana', text: 'Banana'}]}/>`,
    ],
    ['FormTextField', '<FormTextField name="name" label="Name"/>'],
    ['FormEmailField', '<FormEmailField name="email" label="e-mail"/>'],
    ['FormPhoneNumberField', '<FormPhoneNumberField name="phone" label="Phone"/>'],
    ['FormCreditCardFields', '<FormCreditCardFields/>'],
    ['FormDateField', '<FormDateField name="date" label="Date"/>'],
    ['FormDecimalField', '<FormDecimalField name="decimal" label="Decimal"/>'],
    ['FormIntegerField', '<FormIntegerField name="integer" label="Integer"/>'],
    ['FormPasswordField', '<FormPasswordField name="password" label="Password"/>'],
    [
        'FormCreditCardExpirationField',
        '<FormCreditCardExpirationField name="expiration-date" label="Expiration date"/>',
    ],
    ['FormCvvField', '<FormCvvField name="cvv" label="CVV"/>'],
    [
        'Form',
        `
        <Form
            onSubmit={formData =>
                alert({
                title: "This is your data",
                message: JSON.stringify(formData, null, 2)
                })
            }
        >
            <Box padding={16}>
                <Stack space={16}>
                    <FormTextField name="name" label="Name" />
                    <FormEmailField
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

const feedbackScreenSnippets = ['SuccessFeedbackScreen', 'ErrorFeedbackScreen', 'InfoFeedbackScreen'].map(
    (name) => ({
        group: 'Feedback',
        name,
        code: `
        <${name}
            title="Some title"
            description="Some description text"
            primaryButton={
                <ButtonPrimary href="https://google.com">Action</ButtonPrimary>
            }
        />
        `,
    })
);

const listSnippets = [
    ['RowList', 'Row'],
    ['BoxedRowList', 'BoxedRow'],
].map(([listName, rowName]) => ({
    group: 'List',
    name: listName,
    code: `
        <${listName}>
            <${rowName}
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
            <${rowName}
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Title"
                description="Description"
                onPress={() => {}}
            />
        </${listName}>
        `,
}));

listSnippets.push({
    group: 'List',
    name: 'Radio list',
    code: `
    <RadioGroup defaultValue="banana">
        <RowList>
            <Row
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Banana"
                description="Yellow"
                radioValue="banana"
            />
            <Row
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Apple"
                description="Green"
                radioValue="apple"
            />
        </RowList>
    </RadioGroup>
    `,
});

const listRowSnippets = ['Row', 'BoxedRow'].flatMap((rowName) => [
    {
        group: 'List',
        name: `${rowName} (simple)`,
        code: `
        <${rowName}
            icon={<AvatarPlaceholder />}
            iconSize={40}
            title="Title"
            description="Description"
            href="https://google.com"
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (complex)`,
        code: `
        <${rowName}
            icon={<AvatarPlaceholder />}
            iconSize={40}
            headline="Headline"
            title="Title"
            subtitle="Subtitle"
            description="Description"
            badge={9}
            href="https://google.com"
        />`,
    },
    {
        group: 'List',
        name: `${rowName} (switch)`,
        code: `
        <${rowName}
            icon={<AvatarPlaceholder />}
            iconSize={40}
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
            icon={<AvatarPlaceholder />}
            iconSize={40}
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
            icon={<AvatarPlaceholder />}
            iconSize={40}
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
            icon={<AvatarPlaceholder />}
            iconSize={40}
            title="Title"
            description="Description"
            right={<Placeholder width={32} height={32} />}
        />`,
    },
]);

const tooltipSnippets = ['Tooltip', 'Popover'].map((name) => ({
    group: 'Tooltip',
    name,
    code: `
    <${name}
        target="some target, this can be any component"
        description="Some description to be shown inside the tooltip"
    />
    `,
}));

const headerSnippets = [
    {
        group: 'Headers',
        name: 'Basic header layout',
        code: `
        <HeaderLayout
            header={
                <Header
                    title="La última factura de diciembre ya esta disponible"
                    preamount="Cuota mensual (IVA incluido)"
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Descargar factura</ButtonPrimary>}
                    subtitle="Y esto es un subtitulo"
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
                    title="Facturas"
                />
            }
            header={
                <Header
                    title="La última factura de diciembre ya esta disponible"
                    preamount="Cuota mensual (IVA incluido)"
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Descargar factura</ButtonPrimary>}
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
                    title="La última factura de diciembre ya esta disponible"
                    preamount={{
                        text: "Ejemplo de texto tachado",
                        textDecoration: "line-through"
                    }}
                    amount="60,44 €"
                    button={<ButtonPrimary href="asdf">Descargar factura</ButtonPrimary>}
                    subtitle={{
                        text: "Ejemplo de subtitle con secondary color",
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
                title="Soporte"
                description="¿En qué podemos ayudarte?"
                button={<ButtonPrimary href="asdf">Acción</ButtonPrimary>}
            />
        </MainSectionHeaderLayout>
        `,
    },
];

const tabsSnippets = [
    {
        group: 'Tabs',
        name: 'Tabs (without icons)',
        code: `<Tabs selectedIndex={0} tabs={[{text: 'Tab 1'}, {text: 'Tab 2'}, {text: 'Tab 2'}]} />`,
    },
    {
        group: 'Tabs',
        name: 'Tabs (with icons)',
        code: `<Tabs
    selectedIndex={0}
    tabs={[
        {text: 'Tab 1', icon: <Placeholder height={24} width={24} />},
        {text: 'Tab 2', icon: <Placeholder height={24} width={24} />},
        {text: 'Tab 3', icon: <Placeholder height={24} width={24} />},
    ]}
/>`,
    },
];

type Snippet = {group: string; name: string; code: string};

export default [
    ...buttonSnippets,
    {
        group: 'Buttons',
        name: 'ButtonLayout',
        code: `
        <ButtonLayout>
            <ButtonPrimary onPress={() => {}}>Button</ButtonPrimary>
            <ButtonSecondary onPress={() => {}}>Button</ButtonSecondary>
        </ButtonLayout>`,
    },
    {
        group: 'Buttons',
        name: 'ButtonFixedFooterLayout',
        code: `
        <ButtonFixedFooterLayout button={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}>
            Some content here
        </ButtonFixedFooterLayout>`,
    },
    ...formSnippets,
    ...feedbackScreenSnippets,
    {group: 'Feedback', name: 'Snackbar', code: '<Snackbar message="Some message here" />'},
    ...tooltipSnippets,
    {
        group: 'Layout',
        name: 'Stack',
        code: '<Stack space={16}><Placeholder /><Placeholder /><Placeholder /></Stack>',
    },
    {
        group: 'Layout',
        name: 'Inline',
        code: '<Inline space={16}><Placeholder /><Placeholder /><Placeholder /></Inline>',
    },
    {group: 'Spinner', name: 'Spinner', code: '<Spinner />'},
    {group: 'LoadingBar', name: 'LoadingBar', code: '<LoadingBar visible />'},
    {group: 'Text', name: 'Text', code: '<Text>some text</Text>'},
    ...headerSnippets,
    ...listSnippets,
    ...listRowSnippets,
    ...tabsSnippets,
    {
        group: 'Cards',
        name: 'Bun',
        code: `
        <Bun title="Title" action={{href: 'whatever/url', text: 'Text link'}}>
            <Placeholder />
        </Bun>`,
    },
    {
        group: 'Cards',
        name: 'HighlightedCard',
        code: `
        <HighlightedCard
            title="Resolver problema técnico"
            paragraph="Usa nuestra herramienta para resolver tus problemas técnicos"
            image={<Placeholder height={100} />}
            action={<TextLink href="whatever/url">ButtonLink</TextLink>}
        />`,
    },
].sort((s1, s2) => s1.group.localeCompare(s2.group)) as Array<Snippet>;
