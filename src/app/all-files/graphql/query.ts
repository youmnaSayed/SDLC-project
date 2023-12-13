import { gql } from "apollo-angular";

export const GET_ANALYSIS_BY_ID = gql`
query  GetAnalysisById($getAnalysisByIdId: ID!) {
  getAnalysisById(id: $getAnalysisByIdId) {
    photos
  }
}
`;