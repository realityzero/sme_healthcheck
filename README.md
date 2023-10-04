This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes from Author
- SME Healthcheck frontend is deployed using Vercel. It doesn't require a ```dockerfile``` to ship it.
- UI flow is tested for a happy path. There will be some bugs available.
- File upload is automatically done at [Vercel Blob storage](https://vercel.com/docs/storage/vercel-blob)
- Refer ```.env.example``` file for example env variables
- UEN is a 9-10 digit number given by Singapore Government e.g. "234323213X". Refer: [What is Unique Entity Number (UEN) in Singapore](https://sleek.com/sg/resources/what-is-uen-in-singapore/)
- Backend apis are deployed on different infrastructure and due to limitations of free tier of [Render](https://render.com/), it is recommended to open api spec/swagger first to avoid cold start issues. Usually takes 1-2 mins.
- [Backend swagger link](https://credilinq-backend.onrender.com/api)
- [Lighthouse Reports](https://github.com/realityzero/sme_healthcheck/tree/main/lighthouse_reports)

## Live Link
https://sme-healthcheck.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
