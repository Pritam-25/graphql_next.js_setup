import { graphql } from '@/gql';

export const SIGNUP_MUTATION = graphql(`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      id
      name
      email
      role
    }
  }
`);

export const LOGIN_MUTATION = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
    }
  }
`);
