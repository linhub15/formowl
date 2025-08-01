# Formowl

Form submission software

## Quick Start

- Prerequisites: install latest LTS `node.js` and latest `pnpm`
- create your `.env` file entries. [Example](.env.example)
- push database schema `pnpm drizzle push`

```sh
pnpm install && pnpm dev
```

### Configure Google OAuth Client

[Create Google OAuth 2.0 Client](https://console.cloud.google.com/auth/clients)

```
Application type: Web application
name: localhost
Authorized JavaScript origins: http://localhost:3000
Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
```

### Configure Github OAuth Client

[Create Github OAuth App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)

```
Application Name: [dev] Form Owl
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

### Local Email testing

Using `maildev` for local SMTP server and `nodemailer` to send mail.

- run local smtp server `pnpm dev:smtp`
- set local smtp server into `.env`
- preview email templates `pnpm dev:emails`

### Local Stripe testing

```
stripe login
stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
```
