import { gql } from "apollo-angular";



/////////////////////initiation////////////////////////

export const CREATE_INITIATION_DOC = gql`
  mutation CreateInitiationDoc($document: initiationInput) {
    createInitiationDoc(document: $document) {
      id
      title
      sd
      fd
      projectObj
      projectManager
      projectInfo
      projectScopeStatement
    }
  }
`;

export const UPDATE_INITIATION_DOC = gql`
mutation UpdateInitiationDoc($updateInitiationDocId: ID!, $document: initiationInput) {
 updateInitiationDoc(id: $updateInitiationDocId, document: $document) {
   id
   title
   sd
   fd
   projectObj
   projectManager
   projectInfo
   projectScopeStatement
 }
}
`;






export const DELETE_INITIATION_DOC = gql`
  mutation DeleteInitiationDoc($id: ID!) {
    deleteInitiationDoc(id: $id)
  }
`;



////////////////////Analysis//////////////////////////////


export const CREATE_ANALYSIS_DOC = gql`
mutation CreateAnalysisDoc($analysis: AnalysisInput) {
  createAnalysisDoc(analysis: $analysis) {
    id
    intro
    purpose
    Audience
    description
    systemFeaturesandReq
    usecase
  }
}
`;


export const UPDATE_ANALYSIS_DOC = gql`
  mutation UpdateAnalysisDoc($updateAnalysisDocId: ID!, $document: AnalysisInput) {
    updateAnalysisDoc(id: $updateAnalysisDocId, analysis: $document) {
      id
      intro
      purpose
      Audience
      description
      systemFeaturesandReq
    }
  }
`;





export const DELETE_ANALYSIS_DOC = gql`
mutation DeleteAnalysisDoc($id: ID!) {
  deleteAnalysisDoc(id: $id)
}
`;

export const UPLOAD_FILE = gql`
mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    
    url
  }
}
`;
//////DESIGNN/////////
export const CREATE_DESIGN_DOC=gql`
mutation CreateDesignDoc($designPhase: DesignInput,$file: Upload!) {
  createDesignDoc(designPhase: $designPhase) {
    id
    name
    usecase
  }
}`;

export const UPLOAD_FILE_DES=gql`
mutation UploadFileDes($file: Upload!) {
  uploadFileDes(file: $file) {
    url
  }
}`;
