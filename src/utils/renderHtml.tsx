import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export function renderHtml(element: JSX.Element) {
  const sheet = new ServerStyleSheet();
  const content = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      {element}
    </StyleSheetManager>,
  );

  const styleTags = sheet.getStyleTags();

  const htmlOptions: TemplateOptions = {
    description: 'We are Game Developers',
    title: 'Magitech',
  };

  return htmlTemplate(content, styleTags, htmlOptions, 'gradient-bg');
}

interface TemplateOptions {
  description?: string;
  title?: string;
}

export function htmlTemplate(content: string, styleTags: string, options: TemplateOptions = {}, bodyClass: string= '') {
  return `
  <html>
    <head>
      ${options.title ? `<title>${options.title}</title>` : ''}
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      ${options.description ? `<meta name="Description" content=${options.description}></meta>` : ''}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
      <link rel="stylesheet" href="public/main.css"/>
      ${styleTags}
    </head>
    <body class="${bodyClass}">
      ${content}
    </body>
  </html>
  `;
}
