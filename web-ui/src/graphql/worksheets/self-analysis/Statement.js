import gql from 'graphql-tag';

export const GET_STATEMENT = gql `
    query getStatement($user_id: Int!) {
        statement: w_self_analysis_statement(where: {user_id: {_eq: $user_id}}) {
            id statement
        }
    }
`;

export const INSEERT_STATEMENT = gql `
    mutation insert_statement($user_id: Int!, $count: Int!, $statement: [w_self_analysis_statement_insert_input!]!) {
        insert_w_self_analysis_statement(objects: $statement, on_conflict: {constraint: w_self_analysis_statement_pkey, update_columns: statement}) {
            affected_rows
        }

        update_w_self_analysis(where: {user_id: {_eq: $user_id}}, _inc: {count: $count}) {
            affected_rows
        }
    }  
`;