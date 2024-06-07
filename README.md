<p align="center">
  <b style="font-size: 20px">
    ⚡️ Next Static Utils ⚡️
  </b>
  <br/>
  Utilities to host your next.js app as a static site wherever your heart desires<br/>
  Including dynamic routes and app router support
</p>

# Example

Check out the example [repo](https://github.com/zdenham/next-static-aws-example) and the live [demo site](https://defn0rdp54dhd.cloudfront.net).

## Motivation

Next.js offers an option for [static site generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation), which allows you to export your site as raw html, js, etc... and host it statically on a CDN, or however you like! This is a great option that reduces the infra overhead of your application.

**But SSG does not work with dynamic routes unless you generate all pages at build time**. There are some discussions around this issue [here](https://github.com/vercel/next.js/discussions/55393#discussioncomment-9668219) and [here](https://github.com/vercel/next.js/discussions/64660#discussioncomment-9667981), which the Vercel team will hopefully resolve soon. But even so, most static hosting providers outside of Vercel don't know how to handle the way next.js does code splitting out of the box, which can lead to unwanted 404 errors.

Next Static Utils aims to provide workarounds and utilities to address some of these issues and make hosting your next.js site statically **anywhere** you darn well please a bit more enjoyable. 

Starting with support for AWS S3 + Cloudfront, but can presumably add other providers relatively easily.

# Set Up

### Installation And CLI

```bash
pnpm install next-static-utils
...
# Generates edge function for re-routing to a fallback page for dynamic params
pnpm next-static-utils generate [cloudfront|serve]
```

### Usage

On your dynamic page:

```javascript
import { withDynamicParams } from 'next-static-utils';

// creates fallback parameter page
export const generateStaticParams = withDynamicParams();
```

To use the dynamic paramaters:

```javascript
'use client';

import { useDynamicParams } from 'next-statis-utils';

export default function Component() {
  // pulls params from the url, e.g. /users/:id
  const { id } = useDynamicParams();

  return (
    <div>
      Hello
    </div>
  )
}
```

### Recommended Next Config

```javascript
export default (phase) => {
  const nextConfig = {
    output: phase === 'phase-production-build' ? 'export' : 'standalone',
  };
  return nextConfig;
};
```

## Who its for

- If you want to host your next.js app statically, **particularly using AWS S3 and Cloudfront and still use app router**
- If you have a separate backend and don't want high infra overhead or vendor lock-in for your front end hosting
- If you are **not** concerned about SEO, or powerful rich previews and open graph
- If you tend to fetch data client side after the initial page load and do **not** intend to utilize Next.js's SSR features

Private / auth gated applications, admin dashboards, simple tools, blogs & content sites with a relatively small catalog can all work.

## How it works

For every dynamic route, next static utils generates a fallback page which is served for dynamic routes, this also satisfies next.js's requirement to generate static params when using the `output: export` option.

Instead of using `useParams` which is not supported in SSG mode, the params are provided with a new hook `useDynamicParams`

The CLI also generates a cloudfront function to properly handle re-routing at an edge function level in AWS.

## Other Cool / Related Projects

- [next-nginx-routes](https://github.com/geops/next-nginx-routes) helps host your next.js static site using nginx routes
- [SSG](https://ssg.dev) is great if you want to host on AWS, but with a more robust infrastructure

## TODO

- [ ] terraform script to deploy via cli
- [ ] S3 static hosting rewrites support
- [ ] GCloud support?
- [ ] Github pages support?