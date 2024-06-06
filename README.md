<p align="center">
  <b>
    ⚡️ Next Static Utils ⚡️
  </b>
  <br/>
  Utilities for hosting your [next.js](https://nextjs.org) app as a static site
</p>

## Motivation

Not all websites need server side rendering, or a fancy serverless hosting provider. While I really enjoy the DX of next.js (file system based routing and layouts, code splitting, local hot reloading, etc...), I often find myself reaching for hosting solution with less underlying infrastructure overhead than serverless.

Luckily, next.js offers an option for [static site generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation), which allows you to export your site as raw html, js, etc... and host it statically on a CDN, or however you like! This is a great option, but after using next.js SSG on a handful of projects, I've consistently run into the same handful of problems with SSG:

### Common Issues With Next.js SSG

- SSG + App router does not work well with dynamic routes (unless you generate all the routes at build time)
- ^ There are a few discussions on this topic, see [here](https://github.com/vercel/next.js/discussions/64660#discussioncomment-9667981) and [here](https://github.com/vercel/next.js/discussions/55393#discussioncomment-9668219)
- With the pages router, even though dynamic routes work on the client side, visiting a dynamic link directly leads to a 404 with many static hosting providers
- Paths don't always resolve to the `.html` file when serving sites statically. For instance, when you go to `/my-page` you will get 404s instead of it properly resolving to `/my-page.html`. The solution is often bespoke for each hosting provider.
- Next.js static sites are code split by route, so they don't fit the model of "SPAs" where every route resolves to the same index.html

Next Static Utils aims to provide workarounds and utilities to address some of these issues and make hosting your next.js site statically a bit more enjoyable.

### Who its for

- If you want to host your next.js app statically, **particularly using AWS S3 and Cloudfront and the new App Router**
- If you have a separate backend and don't want high infra overhead or deep vendor lock-in for your front end hosting
- If you are **not** concerned about SEO, or powerful rich previews and open graph
- If you tend to fetch data client side after the initial page load and do **not** intend to utilize Next.js's SSR features

Private / auth gated applications, admin dashboards, simple tools, blogs & content sites with a relatively small catalog can all work.

### Other Cool / Related Projects

- [next-nginx-routes](https://github.com/geops/next-nginx-routes) helps host your next.js static site using nginx routes
- [SSG](https://ssg.dev) is great if you want to host on AWS, but with a more robust infrastructure

## How it works

TODO

## Set Up

TODO

### 