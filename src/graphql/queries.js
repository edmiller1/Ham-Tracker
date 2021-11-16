/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHam = /* GraphQL */ `
  query GetHam($id: ID!) {
    getHam(id: $id) {
      id
      name
      phone
      invoiceNumber
      hamType
      collected
      phonedClient
      createdAt
      updatedAt
    }
  }
`;
export const listHams = /* GraphQL */ `
  query ListHams(
    $filter: ModelHamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        invoiceNumber
        hamType
        collected
        phonedClient
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
