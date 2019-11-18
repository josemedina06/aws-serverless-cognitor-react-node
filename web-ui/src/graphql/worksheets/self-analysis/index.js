import gql from 'graphql-tag';

export const GET_ANALYSIS_CARDS = gql `
    query getWorksheet($userid: Int!) {
        analysis: w_self_analysis_cards {
            id card_name card_url
        }
        w_analysis: w_self_analysis(where: {user_id: {_eq: $userid}}) {
            date
        }
    }
`;