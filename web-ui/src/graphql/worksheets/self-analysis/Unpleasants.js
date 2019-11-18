import gql from 'graphql-tag';

export const GET_UNPLEASANTS = gql `
    query getPleasants($user_id: Int!) {
        unpleasants: w_self_analysis_unpleasant(where: {user_id: {_eq: $user_id}}) {
            id unpleasant reason
        }
        
        events: w_self_analysis_unpleasant_event(where: {user_id: {_eq: $user_id}}) {
            id events
        }
    } 
`;

export const INSERT_UNPLEASANTS = gql `
    mutation insert_unpleasants($user_id: Int!, $count: Int!, $unpleasants: [w_self_analysis_unpleasant_insert_input!]!, $event: [w_self_analysis_unpleasant_event_insert_input!]!) {
        insert_w_self_analysis_unpleasant(objects: $unpleasants, on_conflict: {constraint: w_self_analysis_unpleasant_pkey, update_columns: [unpleasant, reason]}) {
            affected_rows
        }

        insert_w_self_analysis_unpleasant_event(objects: $event, on_conflict: {constraint: w_self_analysis_unpleasant_event_pkey, update_columns: events}) {
            affected_rows
        }

        update_w_self_analysis(where: {user_id: {_eq: $user_id}}, _inc: {count: $count}) {
            affected_rows
        }
    }
`;