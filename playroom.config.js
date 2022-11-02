const path = require('path');
const webpack = require('webpack');

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
    widths: [320, 360, 768, 1024, 1368],
    exampleCode,
    webpackConfig: () => ({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'playroom'),
                        path.resolve(__dirname, '.storybook'),
                    ],
                    use: [
                        {
                            loader: 'swc-loader',
                        },
                    ],
                },
                {
                    test: /(reset|roboto)\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.vanilla\.css$/i,
                    // Don't process vanilla files from Playroom as they are handled separately.
                    exclude: /node_modules\/playroom/,
                    use: [
                        'style-loader',
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                url: false,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PLAYROOM: true,
                },
            }),
        ],
    }),
};

module.exports = config;
