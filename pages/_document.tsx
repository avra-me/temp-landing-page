import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import ServerStyleSheets from '@mui/styles/ServerStyleSheets';

let prefixer: any;
let cleanCSS: any;
if (process?.env?.NODE_ENV === 'production' && typeof window === 'undefined') {
  const jss = require("jss"); // Adjust here as well
  /* eslint-disable global-require */
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');
  /* eslint-enable global-require */

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
  jss.default.setup({id: {minify: true}})
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap&subset=latin"
            rel="preload" as={"style"}/>
          <link
            rel="preload" as={"style"}
            href="https://fonts.googleapis.com/css?family=Material Icons&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap&subset=latin"
            rel={"stylesheet"}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Material Icons&display=swap"
            rel={"stylesheet"}
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line
      enhanceApp: (App) => (props) => {
        const app = <App {...props} />
        return sheets.collect(app)
      },
    });

  const initialProps = await Document.getInitialProps(ctx);

  let css = sheets.toString();
  // It might be undefined, e.g. after an error.
  if (css && process.env.NODE_ENV === 'production') {
    const result1 = await prefixer.process(css, {from: undefined});
    css = result1.css;
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      <style
        id="jss-server-side"
        key="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: css}}
      />,
    ],
  };
};