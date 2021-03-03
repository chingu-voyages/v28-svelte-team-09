## netlify-routify/fauna

The [Routify starter template](https://github.com/roxiness/routify-starter) but cleaned up for barebones Netlify & Fauna development

SPA-only. No SSR enabled as Netlify Dev doesn't work with SSR. However, SSR can be enabled in `netlify.toml` when dev is no longer required.

Basic packages added for FaunaDB.

## TODO

**Begin by** Initialize DB.

Does your app require users w/ sign up/in?

**Yes**. Upload your schema w/ users. You have two options for storing secrets:

1. Create a bootstrap role. Should have access to register & login user-defined functions.

- Generate a key via the dashboard for the bootstrap role, use it on the frontend similar to how you'd use a Stripe public key. Meant for public use

2. (Serverless functions) Use a `.env` file. Serverless function handles login, signin. User can sign themselves out.

NOTE: Make sure to create roles with necessary permissions!

p.s. There's a third way of using 3rd party auth integration. It's expensive so can only be used w/ free or medium or larger sized apps!

**No**. If your app doesn't have users you can either:

1. Create a role able to read necessary data then generate a public key able to be read from the frontend

2. (Serverless functions) Use a server key with serverless functions.

**Initialize GraphQL layer**

GraphQL client libraries offer caching for SPAs.

1. Install urql: `npm i -D @urql/svelte graphql`

Once installed, you want to initialize it, and add utilities if needed.

1. Add utilities and client config [code example](https://github.com/chingu-voyages/v26-bears-team-07/blob/main/src/utils/client.js). (note: There's also a [devtools exchange example](https://github.com/chingu-voyages/v26-bears-team-07/commit/8a8e60b6dd90d6d644680541dddf9418a4047e3b) if you need it, just expand the code for entire file.)
2. Init in `App.svelte` [code example](https://github.com/chingu-voyages/v26-bears-team-07/blob/main/src/App.svelte)

Note: In above examples, `$authStore` is used for secret. If you're using a public key you will have to check whether user is logged in before trying init client, and have fixed queries for registering and logging in with the public key only (possibly doesn't need a client especially configured for it). More details on this when I've actually tested it. Worst case scenario, init client as public if not logged in, else init client with user secret.
