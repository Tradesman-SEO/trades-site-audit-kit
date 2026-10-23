# Trades Website Self-Check

Check the basics customers need to see, then take away a practical list of improvements.

**For trade business owners. No coding knowledge needed.**

[Open the free tool](https://tradesman-seo.github.io/trades-site-audit-kit/) · [See a fictional worked example](https://tradesman-seo.github.io/trades-site-audit-kit/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Create my action list** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

An owner-friendly action list you can work through or send to your website supplier.

## What to expect

Open your website on a phone. Answer based on what you can actually find and use. Not sure is a useful answer too.

This is a guided self-check, not an automated site audit. It cannot measure rankings, diagnose technical faults or guarantee more enquiries.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Tradesman SEO](https://tradesmanseo.co.uk/). The tool is maintained by Tradesman SEO, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Tradesman-SEO/trades-site-audit-kit/discussions/1).
