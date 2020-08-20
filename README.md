# liten

> A URL shortener that enables easy personalization of link previews

<kbd>
  <a href="https://liten.xyz">
    try the beta
  </a>
</kbd>

## Development

### Setup

#### 1. Clone

```bash
git clone https://github.com/shwilliam/kindred-notes-web
```

#### 2. Install dependencies

```bash
npm i
```

#### 3. Set up a database

- [Create a new database](https://www.prisma.io/docs/guides/database-workflows/setting-up-a-database)
- Initialize DB with Prisma CLI (`npx prisma migrate up --experimental`)
- Copy `/prisma/.env.example` to `/prisma/.env.local` and enter your DB URL

> **Note**: Prisma supports PostgreSQL, MySQL and SQLite DBs so choose your
> favorite!

#### 4. Set up Cloudinary

TODO

#### 5. Set up Magic Link

TODO

#### 6. Set up Stripe

TODO

#### 7. Configure environment variables

- Copy `.env.example` to a new file named `.env.local`
- Replace the placeholder values in `.env.local` with your Cloudinary URL,
  Magic.link and Stripe details
