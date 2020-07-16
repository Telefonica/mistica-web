/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Document from 'next/document';
import {ServerSideStyles} from '@telefonica/mistica';

export default class MisticaDocument extends Document {
    static async getInitialProps(ctx) {
        const serverSideStyles = new ServerSideStyles();
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => serverSideStyles.render(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {serverSideStyles.renderStyles()}
                </>
            ),
        };
    }
}
