const path = require('path');

const exampleCode = `
<Form
  onSubmit={(formData) =>
    alert({
      title: "This is your data",
      message: JSON.stringify(formData, null, 2),
    })
  }
>
  <Box padding={16}>
    <Stack space={16}>
      <TextField name="name" label="Name" />
      <EmailField name="email" label="e-mail" />
      <ButtonLayout>
        <ButtonPrimary submit>Send</ButtonPrimary>
      </ButtonLayout>
    </Stack>
  </Box>
</Form>`;

const config = {
    title: 'Mística Design System',
    components: './playroom/components.tsx',
    outputPath: './public/playroom',
    baseUrl: '/playroom/',
    themes: './playroom/themes.tsx',
    snippets: './playroom/snippets.tsx',
    frameComponent: './playroom/frame-component.tsx',
    scope: './playroom/use-scope.tsx',
    widths: [320, 360, 768, 1024, 1366],
    exampleCode,
    webpackConfig: () => ({
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'playroom'),
                        path.resolve(__dirname, '.storybook'),
                    ],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: true,
                                configFile: './.babelrc',
                                plugins: ['babel-plugin-typescript-to-proptypes'],
                            },
                        },
                    ],
                },
                {
                    test: /(reset|roboto)\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
    }),
};

module.exports = config;
