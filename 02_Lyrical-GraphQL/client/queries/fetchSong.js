import gql from 'graphql-tag';

export default gql`
query getSong($songId: ID!) {
    song(id: $songId) {
      id
      title
      lyrics {
        id
      }
    }
  }
`