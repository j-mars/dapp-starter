import gql from 'graphql-tag';

export default gql`
  subscription {
    gravatars {
      id
      owner
      displayName
    }
  }
`;
