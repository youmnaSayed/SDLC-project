import { gql } from "apollo-angular";

export const GET_DOCUMENT= gql`
query GetDocument{
    getDocument(id: $getDocumentId) {
        id
        title
        sd
        fd
        projectInfo
        projectManager
        projectObj
        projectScopeStatement
      }
    }`
    
export const GET_ALL_DOCUMENTS = gql`
query GetAll {
    getAllUsers {
      id
      name
      age
    }
  }`;