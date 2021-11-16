/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHam = /* GraphQL */ `
  mutation CreateHam(
    $input: CreateHamInput!
    $condition: ModelHamConditionInput
  ) {
    createHam(input: $input, condition: $condition) {
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
export const updateHam = /* GraphQL */ `
  mutation UpdateHam(
    $input: UpdateHamInput!
    $condition: ModelHamConditionInput
  ) {
    updateHam(input: $input, condition: $condition) {
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
export const deleteHam = /* GraphQL */ `
  mutation DeleteHam(
    $input: DeleteHamInput!
    $condition: ModelHamConditionInput
  ) {
    deleteHam(input: $input, condition: $condition) {
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
