import gql from 'graphql-tag';

export const GET_DREAMS_MODELS = gql `
    query getDreamsAndModels($user_id: Int!) {
        dreams: w_self_analysis_dreams(where: {user_id: {_eq: $user_id}}) {
            id dreams
        }

        models: w_self_analysis_models(where: {user_id: {_eq: $user_id}}) {
            id name reason
        }
    }  
`;

export const INSERT_DREAMS_MODELS = gql `
    mutation insert_dreams_models($user_id: Int!, $count: Int!, $dreams: [w_self_analysis_dreams_insert_input!]!, $models: [w_self_analysis_models_insert_input!]!) {
        insert_w_self_analysis_dreams(objects: $dreams, on_conflict: {constraint: w_self_analysis_dreams_pkey, update_columns: dreams}) {
            affected_rows
        }

        insert_w_self_analysis_models(objects: $models, on_conflict: {constraint: w_self_analysis_models_pkey, update_columns: [name, reason]}) {
            affected_rows
        }

        update_w_self_analysis(where: {user_id: {_eq: $user_id}}, _inc: {count: $count}) {
            affected_rows
        }
    }  
`;