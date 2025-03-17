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
Authorized JavaScript origigns: http://localhost:3000
Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
```

### Local Email testing

Using `maildev` for local SMTP server and `nodemailer` to send mail.

- run local smtp server `pnpm dev:smtp`
- set local smtp server into `.env`
- preview email templates `pnpm dev:emails`
