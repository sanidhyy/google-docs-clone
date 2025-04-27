<a name="readme-top"></a>

# Full-stack Realtime Google Docs Clone using Next.js 15 and Convex

![Full-stack Realtime Google Docs Clone using Next.js 15 and Convex](/.github/images/img_main.png 'Full-stack Realtime Google Docs Clone using Next.js 15 and Convex')

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy 'Ask Me Anything!')
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/google-docs-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/google-docs-clone/blob/main/LICENSE 'GitHub license')
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/google-docs-clone/commits/main 'Maintenance')
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/google-docs-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/google-docs-clone/branches 'GitHub branches')
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/google-docs-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/google-docs-clone/commits 'Github commits')
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/google-docs-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/google-docs-clone/issues 'GitHub issues')
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/google-docs-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/google-docs-clone/pulls 'GitHub pull requests')
[![Vercel status](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://clone-gdocs.vercel.app 'Vercel status')

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

```bash
google-docs-clone/
  |- convex/
    |-- _generated/
    |-- .env.example
    |-- .env.local
    |-- auth.config.ts
    |-- documents.ts
    |-- environment.d.ts
    |-- schema.ts
  |- public/
    |-- blank-document.svg
    |-- business-letter.svg
    |-- cover-letter.svg
    |-- letter.svg
    |-- logo.svg
    |-- project-proposal.svg
    |-- resume.svg
    |-- software-proposal.svg
  |- src/
    |-- app/
        |--- (home)/
        |--- api/
        |--- documents/
        |--- apple-icon.png
        |--- error.tsx
        |--- favicon.ico
        |--- globals.css
        |--- icon1.png
        |--- icon2.png
        |--- layout.tsx
        |--- not-found.tsx
    |-- components/
        |--- ui/
        |--- convex-client-provider.tsx
        |--- fullscreen-loader.tsx
        |--- remove-dialog.tsx
        |--- rename-dialog.tsx
    |-- config/
        |--- editor.ts
        |--- index.ts
    |-- constants/
        |--- index.ts
    |-- extensions/
        |--- font-size.ts
        |--- line-height.ts
    |-- hooks/
        |--- use-debounce.ts
        |--- use-search-param.tsx
    |-- lib/
        |--- utils.ts
    |-- store
        |--- use-editor-store.ts
    |-- middleware.ts
  |- .env.example
  |- .env.local
  |- .eslintrc.json
  |- .gitignore
  |- .prettierrc.json
  |- .prettierrc.mjs
  |- bun.lockb
  |- components.json
  |- environment.d.ts
  |- liveblocks.config.ts
  |- next.config.ts
  |- package.json
  |- postcss.config.mjs
  |- README.md
  |- tailwind.config.ts
  |- tsconfig.json
```

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env.local` file in **root** and **convex** directory.
4. Contents of `.env.local`:

```env
# disabled clerk and next.js telemetry
NEXT_TELEMETRY_DISABLED=1
CLERK_TELEMETRY_DISABLED=1

# app base url
NEXT_PUBLIC_APP_BASE_URL="http://localhost:3000"

# convex deployment & url
CONVEX_DEPLOYMENT="dev:<deployment-id>" # team: <team-id>, project: <project-id>
NEXT_PUBLIC_CONVEX_URL="https://<deployment-id>.convex.cloud"

# clerk auth keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
CLERK_SECRET_KEY="sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# liveblocks keys
NEXT_PUBLIC_LIVEBLOCKS_API_KEY="pk_dev_-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
LIVEBLOCKS_SECRET_KEY="sk_dev_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

```

5. Contents of `convex/.env.local`:

```env
# clerk issuer url (go to your clerk dashboard > JWT Templates > New template > Convex > Save and copy your Issuer URL)
CLERK_ISSUER_URL=https://example-id.clerk.accounts.dev

```

### 6. App Base URL

Set the `NEXT_PUBLIC_APP_BASE_URL` to `http://localhost:3000` where your app will be running locally or in production.

### 7. Convex Deployment

- Visit the Convex website: [https://convex.dev](https://convex.dev)
- Log in to your Convex account or sign up if you don't have one.
- Once logged in, navigate to the "Deployments" section.
- Create a new deployment or select an existing one.
- Replace `<deployment-name>`, `<team-name>`, and `<project-name>` in the `.env.local` file with your Convex deployment details.
- In the Convex dashboard, find the public URL associated with your deployment.
- Replace `<your-convex-url>` in the `.env.local` file with your Convex public URL.

### 8. Clerk Authentication Keys

- Visit the Clerk dashboard: [https://clerk.dev](https://clerk.dev)
- Log in to your Clerk account or sign up if you don't have one.
- Go to the "Projects" section and select your project.
- Navigate to the "API Keys" tab.
- Copy the "Publishable Key" and replace `<your-clerk-publishable-key>` in the `.env.local` file with the copied key.
- Copy the "Secret Key" and replace `<your-clerk-secret-key>` in the `.env.local` file with the copied key.
- Go to your Clerk dashboard > JWT Templates > New template > Convex.
- In the **Claims section** add `"organization_id": "{{org.id}}"` along with the existing json values.
- Click on save and copy the **Issuer url**.
- Replace `<your-clerk-issuer-url>` with the url that you copied.
- Also, go to Convex dashboard > Settings > Environment Variables > Add `CLERK_ISSUER_URL` variable with value that you copied.

### 9. Liveblocks API Keys

- Visit the Liveblocks website > dashboard.
- Navigate to API settings or keys section.
- Generate or locate your API key and secret.
- Set `NEXT_PUBLIC_LIVEBLOCKS_API_KEY` and `LIVEBLOCKS_SECRET_KEY` in the `.env` file according to the obtained information.

10. Install Project Dependencies using `npm install --legacy-peer-deps` or `yarn install --legacy-peer-deps` or `bun install --legacy-peer-deps`.

11. Now app is fully configured 👍 and you can start using this app using either one of `npm run dev` or `yarn dev` or `bun dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

## :camera: Screenshots

![Modern UI/UX](/.github/images/img1.png 'Modern UI/UX')

![Realtime Tiptap Editor](/.github/images/img2.png 'TiptapRealtime Tiptap Editor')

![Mentions, Replies and Reactions](/.github/images/img3.png 'Mentions, Replies and Reactions')

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react 'React JS')](https://react.dev/ 'React JS') [![Next JS](https://skillicons.dev/icons?i=next 'Next JS')](https://nextjs.org/ 'Next JS') [![Typescript](https://skillicons.dev/icons?i=ts 'Typescript')](https://www.typescriptlang.org/ 'Typescript') [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind 'Tailwind CSS')](https://tailwindcss.com/ 'Tailwind CSS') [![Vercel](https://skillicons.dev/icons?i=vercel 'Vercel')](https://vercel.app/ 'Vercel')

## :wrench: Stats

[![Stats for Docs](/.github/images/stats.svg 'Stats for Docs')](https://pagespeed.web.dev/analysis?url=https://clone-gdocs.vercel.app 'Stats for Docs')

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in Docs.

- Thanks to CodeWithAntonio: https://codewithantonio.com/
- [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs): ^6.9.14
- [@liveblocks/client](https://www.npmjs.com/package/@liveblocks/client): ^2.16.0
- [@liveblocks/node](https://www.npmjs.com/package/@liveblocks/node): ^2.16.0
- [@liveblocks/react](https://www.npmjs.com/package/@liveblocks/react): ^2.16.0
- [@liveblocks/react-tiptap](https://www.npmjs.com/package/@liveblocks/react-tiptap): ^2.16.0
- [@liveblocks/react-ui](https://www.npmjs.com/package/@liveblocks/react-ui): ^2.16.0
- [@radix-ui/react-alert-dialog](https://www.npmjs.com/package/@radix-ui/react-alert-dialog): ^1.1.4
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.1.4
- [@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu): ^2.1.2
- [@radix-ui/react-menubar](https://www.npmjs.com/package/@radix-ui/react-menubar): ^1.1.4
- [@radix-ui/react-separator](https://www.npmjs.com/package/@radix-ui/react-separator): ^1.1.0
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.1.1
- [@tiptap/extension-color](https://www.npmjs.com/package/@tiptap/extension-color): ^2.10.3
- [@tiptap/extension-font-family](https://www.npmjs.com/package/@tiptap/extension-font-family): ^2.10.3
- [@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight): ^2.10.3
- [@tiptap/extension-image](https://www.npmjs.com/package/@tiptap/extension-image): ^2.10.3
- [@tiptap/extension-link](https://www.npmjs.com/package/@tiptap/extension-link): ^2.11.2
- [@tiptap/extension-table](https://www.npmjs.com/package/@tiptap/extension-table): ^2.10.3
- [@tiptap/extension-table-cell](https://www.npmjs.com/package/@tiptap/extension-table-cell): ^2.10.3
- [@tiptap/extension-table-header](https://www.npmjs.com/package/@tiptap/extension-table-header): ^2.10.3
- [@tiptap/extension-table-row](https://www.npmjs.com/package/@tiptap/extension-table-row): ^2.10.3
- [@tiptap/extension-task-item](https://www.npmjs.com/package/@tiptap/extension-task-item): ^2.10.3
- [@tiptap/extension-task-list](https://www.npmjs.com/package/@tiptap/extension-task-list): ^2.10.3
- [@tiptap/extension-text-align](https://www.npmjs.com/package/@tiptap/extension-text-align): ^2.11.2
- [@tiptap/extension-text-style](https://www.npmjs.com/package/@tiptap/extension-text-style): ^2.10.3
- [@tiptap/extension-underline](https://www.npmjs.com/package/@tiptap/extension-underline): ^2.10.3
- [@tiptap/pm](https://www.npmjs.com/package/@tiptap/pm): ^2.10.3
- [@tiptap/react](https://www.npmjs.com/package/@tiptap/react): ^2.11.2
- [@tiptap/starter-kit](https://www.npmjs.com/package/@tiptap/starter-kit): ^2.11.2
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.1
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.1
- [convex](https://www.npmjs.com/package/convex): ^1.18.2
- [date-fns](https://www.npmjs.com/package/date-fns): ^4.1.0
- [embla-carousel-react](https://www.npmjs.com/package/embla-carousel-react): ^8.5.2
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^0.464.0
- [next](https://www.npmjs.com/package/next): 15.0.3
- [next-themes](https://www.npmjs.com/package/next-themes): ^0.4.4
- [nuqs](https://www.npmjs.com/package/nuqs): ^2.3.1
- [react](https://www.npmjs.com/package/react): 19.0.0-rc-66855b96-20241106
- [react-color](https://www.npmjs.com/package/react-color): ^2.19.3
- [react-dom](https://www.npmjs.com/package/react-dom): 19.0.0-rc-66855b96-20241106
- [react-icons](https://www.npmjs.com/package/react-icons): ^5.4.0
- [sonner](https://www.npmjs.com/package/sonner): ^1.7.2
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^2.5.5
- [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate): ^1.0.7
- [tiptap-extension-resize-image](https://www.npmjs.com/package/tiptap-extension-resize-image): ^1.2.1
- [zustand](https://www.npmjs.com/package/zustand): ^5.0.1
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser): ^7.25.9
- [@trivago/prettier-plugin-sort-imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports): ^4.3.0
- [@types/node](https://www.npmjs.com/package/@types/node): ^20
- [@types/react](https://www.npmjs.com/package/@types/react): ^18
- [@types/react-color](https://www.npmjs.com/package/@types/react-color): ^3.0.12
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^18
- [eslint](https://www.npmjs.com/package/eslint): ^8
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 15.0.3
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): ^9.1.0
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier): ^5.2.1
- [postcss](https://www.npmjs.com/package/postcss): ^8
- [prettier](https://www.npmjs.com/package/prettier): ^3.4.1
- [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss): ^0.6.9
- [sort-classes](https://www.npmjs.com/package/prettier-plugin-tailwindcss): npm:prettier-plugin-tailwindcss
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^3.4.1
- [tidy-imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports): npm:@trivago/prettier-plugin-sort-imports
- [typescript](https://www.npmjs.com/package/typescript): ^5

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy 'Buy me a Coffee')

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy 'Follow Me')
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fgoogle-docs-clone 'Tweet about this project')
[![Subscribe to my YouTube Channel](https://img.shields.io/youtube/channel/subscribers/UCNAz_hUVBG2ZUN8TVm0bmYw)](https://www.youtube.com/@OPGAMER./?sub_confirmation=1 'Subscribe to my YouTube Channel')

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/google-docs-clone&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/google-docs-clone&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/google-docs-clone&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/google-docs-clone&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
