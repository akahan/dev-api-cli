const signUpRequest = () => `mutation UserSignUp($data: UserRegistrationInput!) {
  userSignUp(data: $data) {
    workspace
  }
}`;

const confirmRequest = () => `mutation UserSignUpConfirm($data: UserSignUpConfirmInput!) {
  userSignUpConfirm(data: $data) {
    auth {
      idToken
    }
    workspaces {
      workspace
    }
  }
}`;

const loginRequest = () => `mutation Login($data: UserLoginInput!) {
  userLogin(data: $data) {
    auth {
      idToken
    }
    workspaces {
      workspace
    }
  }
}`;

const getTablesRequest = onlyUsers => `query GetTables {
  tablesList(filter: { onlyUserTables: ${onlyUsers ? 'true' : 'false'} }) {
    items {
      id
      name
      isSystem
      fields {
        name
        fieldType
      }
    }
  }
}`;

const createTableRequest = () => `mutation CreateTable($data: TableCreateInput) {
  tableCreate(data: $data) {
    id
  }
}`;

const deleteTableRequest = id => `mutation DeleteTable {
  tableDelete(id: "${id}") {
    success
  }
}`;

const createFieldRequest = () => `mutation CreateField($data: TableFieldCreateInput) {
  fieldCreate(data: $data) {
    id
  }
}`;

const createEntityRequest = tableName => `mutation ${tableName}Create($data: ${tableName}CreateInput) {
  data:${tableName}Create(data: $data) {
    id
  }
}`;

const exportSchemaRequest = () => `
  query ExportSchema {
    tables: tablesList(filter: { onlyUserTables: true }) {
      items {
        ...TableFragment
      }
    }
  }

  fragment TableFragment on Table {
    id
    name
    displayName
    isSystem
    fields {
      ...TableFieldFragment
    }
  }

  fragment TableFieldFragment on TableField {
    ...CommonTableFieldFragment
    fieldTypeAttributes {
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
      ...CustomFieldTypesAttributes
    }
  }

  fragment CommonTableFieldFragment on TableField {
    id
    name
    displayName
    description
    fieldType
    fieldTypeAttributes {
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
    }
    isList
    isRequired
    isUnique
    defaultValue
    isSystem
    isMeta
    relation {
      refFieldName
      refFieldDisplayName
      relationTableName
      relationFieldName
      refTable {
        id
        name
      }
      refFieldIsList
      refFieldIsRequired
    }
  }

  fragment DateFieldTypeAttributes on DateFieldTypeAttributes {
    format
  }

  fragment TextFieldTypeAttributes on TextFieldTypeAttributes {
    format
    fieldSize
  }

  fragment NumberFieldTypeAttributes on NumberFieldTypeAttributes {
    format
    precision
    currency
    minValue
    maxValue
  }

  fragment FileFieldTypeAttributes on FileFieldTypeAttributes {
    format
    showTitle
    showUrl
    maxSize
    typeRestrictions
  }

  fragment CustomFieldTypesAttributes on CustomFieldTypeAttributes {
    format
    innerFields {
      name
      displayName
      description
      fieldType
      isList
      isRequired
      isUnique
      fieldTypeAttributes {
        ...TextFieldTypeAttributes
        ...NumberFieldTypeAttributes
        ...FileFieldTypeAttributes
        ...DateFieldTypeAttributes
        ...SwitchFieldTypeAttributes
      }
    }
  }

  fragment SwitchFieldTypeAttributes on SwitchFieldTypeAttributes {
    format
    listOptions
  }
`;

module.exports = {
  signUpRequest,
  confirmRequest,
  loginRequest,
  getTablesRequest,
  createTableRequest,
  deleteTableRequest,
  createFieldRequest,
  createEntityRequest,
  exportSchemaRequest,
};
