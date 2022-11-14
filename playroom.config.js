const path = require('path');
const webpack = require('webpack');

// We deploy 3 different builds of playroom, one with all the breakpoints, one forcing mobile,
// and one forcing desktop. This is needed for Brand Factory documentation site, where we need
// to embed playroom examples to document the desktop or mobile version of a component.
// See package.json vercel-build script.
const getMediaQueriesConfig = () => {
    const impossibleSize = 999999;

    if (process.env.FORCE_MOBILE) {
        return {
            tabletMinWidth: impossibleSize,
            desktopMinWidth: impossibleSize,
            largeDesktopMinWidth: impossibleSize,
            desktopOrTabletMinHeight: impossibleSize,
        };
    }
    if (process.env.FORCE_DESKTOP) {
        return {
            tabletMinWidth: 0,
            desktopMinWidth: 0,
            largeDesktopMinWidth: impossibleSize,
            desktopOrTabletMinHeight: 0,
        };
    }
    return {
        desktopOrTabletMinHeight: 0,
    };
};

const getOutputPath = () => {
    if (process.env.FORCE_MOBILE) {
        return './public/playroom-mobile/';
    }
    if (process.env.FORCE_DESKTOP) {
        return './public/playroom-desktop/';
    }
    return './public/playroom/';
};

const getBaseUrl = () => getOutputPath().replace('./public', '');

const getWidths = () => {
    if (process.env.FORCE_MOBILE) {
        return [360];
    }
    if (process.env.FORCE_DESKTOP) {
        return [1024];
    }
    return [320, 360, 768, 1024, 1368];
};

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
    outputPath: getOutputPath(),
    baseUrl: getBaseUrl(),
    themes: './playroom/themes.tsx',
    snippets: './playroom/snippets.tsx',
    frameComponent: './playroom/frame-component.tsx',
    scope: './playroom/use-scope.tsx',
    widths: getWidths(),
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
                'process.env.MISTICA_MEDIA_QUERIES_CONFIG': JSON.stringify(
                    JSON.stringify(getMediaQueriesConfig())
                ),
            }),
        ],
    }),
};

module.exports = config;
