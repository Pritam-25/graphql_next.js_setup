# GraphQL Client (Next.js + TypeScript + Apollo)

A simple GraphQL frontend setup with Next.js App Router, TypeScript, Apollo Client, and GraphQL Code Generator.
The project is designed to work with the GraphQL Express backend setup and provides ready-to-use auth flows (Signup/Login).

---

## Features

- Next.js App Router with TypeScript
- Apollo Client integration for GraphQL operations
- GraphQL Code Generator for fully typed queries/mutations
- Auth pages (Signup/Login) with React Hook Form + Zod validation
- Reusable UI components with Tailwind CSS
- Environment-based GraphQL API configuration

---

## Tech Stack

- Next.js
- TypeScript
- React
- Apollo Client
- GraphQL
- GraphQL Code Generator
- Tailwind CSS
- React Hook Form
- Zod

---

## Project Structure

```text
client
├─ app
│   ├─ layout.tsx
│   ├─ page.tsx
│   └─ (auth)
│       ├─ _components
│       │   ├─ login-form.tsx
│       │   └─ signup-form.tsx
│       ├─ login
│       │   └─ page.tsx
│       └─ signup
│           └─ page.tsx
│
├─ components
│   ├─ ApolloWrapper.tsx
│   ├─ passwordInput.tsx
│   └─ ui                   # schadcn ui components
│
├─ graphql
│   └─ user
│       └─ mutation.ts
│
├─ gql
│   ├─ fragment-masking.ts
│   ├─ gql.ts
│   ├─ graphql.ts           # auto-generated GraphQL code
│   └─ index 
│               
│
├─ lib
│   └─ ApolloClient.ts
│
├─ schemas
│   └─ user.schema.ts
│
└─ codegen.ts
```

---

## Installation

Clone the repository:

```bash
git clone git@github.com:Pritam-25/graphql_next.js_setup.git
```

Install dependencies:

```bash
pnpm install
```

---

## Environment Variables

Create a `.env.local` file in the root of `graphql_next.js_setup`.

Example:

```bash
NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:4000/graphql
```

Notes:

- If not provided, the app falls back to `http://localhost:4000/graphql`.
- Make sure your backend server is running and CORS/cookies are configured for the client origin.

---

## GraphQL Codegen Setup

This project uses GraphQL Code Generator with schema introspection from:

```text
http://localhost:4000/graphql
```

Generate typed GraphQL artifacts:

```bash
pnpm codegen
```

Recommended flow:

1. Start backend GraphQL server first.
2. Run `pnpm codegen` in this client project.
3. Start the Next.js app.

---

## Running the Client

Start the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

Auth routes:

- `http://localhost:3000/login`
- `http://localhost:3000/signup`

---

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm format
pnpm format:check
pnpm codegen
```

---

## Example Mutations

1. Signup Mutation

```graphql
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    id
    name
    email
    role
  }
}
```

2. Login Mutation

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    id
    email
  }
}
```

---

## Backend Compatibility

This client is intended to work with your GraphQL Express server setup.

Before starting the client, ensure:

- Backend server is running on `http://localhost:4000/graphql` (or update `NEXT_PUBLIC_GRAPHQL_API_URL`).
- Database migrations are applied on the backend.
- Backend auth/cookie middleware is enabled for cross-origin requests.

---

## License

This project is for learning purposes.
