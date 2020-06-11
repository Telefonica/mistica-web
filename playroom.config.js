// @flow
/* eslint-disable filenames/match-regex */

const path = require('path');

// Dont apply babel-plugin-flow-react-proptypes to these files because make the build break:
const flowToPropTypesBlackList = [/src\/button/, /src\/form-text-field/];

const babelLoaderOptions = {
    babelrc: true,
    configFile: './.babelrc',
};

const config /* : any */ = {
    title: 'Novum design system',
    components: './playroom/components',
    outputPath: './public/playroom',
    baseUrl: '/playroom/',
    themes: './playroom/themes.js',
    snippets: './playroom/snippets.js',
    frameComponent: './playroom/frame-component.js',
    widths: [320, 768, 1024, 1366],
    exampleCode: `
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
          <FormTextField name="name" label="Name" />
          <FormEmailField name="email" label="e-mail" />
          <ButtonLayout>
            <ButtonPrimary submit>Send</ButtonPrimary>
          </ButtonLayout>
        </Stack>
      </Box>
    </Form>`,
    webpackConfig: () => ({
        module: {
            rules: [
                {
                    test: /\.(js|mjs)$/,

                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'playroom'),
                        path.resolve(__dirname, '.storybook'),
                    ],
                    oneOf: [
                        {
                            test: flowToPropTypesBlackList,
                            use: {
                                loader: 'babel-loader',
                                options: babelLoaderOptions,
                            },
                        },
                        {
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    ...babelLoaderOptions,
                                    plugins: ['babel-plugin-flow-react-proptypes'],
                                },
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
