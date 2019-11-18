import gql from 'graphql-tag';

export const GET_PLEASANTS = gql `
    query getPleasants($user_id: Int!) {
        pleasants: w_self_analysis_pleasant(where: {user_id: {_eq: $user_id}}) {
            id pleasant reason
        }
        
        events: w_self_analysis_pleasant_event(where: {user_id: {_eq: $user_id}}) {
            id events
        }
    }  
`;

export const INSERT_PLEASANTS = gql `
    mutation insert_pleasants($user_id: Int!, $count: Int!, $pleasants: [w_self_analysis_pleasant_insert_input!]!, $event: [w_self_analysis_pleasant_event_insert_input!]!) {
        insert_w_self_analysis_pleasant(objects: $pleasants, on_conflict: {constraint: w_self_analysis_pleasant_pkey, update_columns: [pleasant, reason]}) {
            affected_rows
        }

        insert_w_self_analysis_pleasant_event(objects: $event, on_conflict: {constraint: w_self_analysis_pleasant_event_pkey, update_columns: events}) {
            affected_rows
        }

        update_w_self_analysis(where: {user_id: {_eq: $user_id}}, _inc: {count: $count}) {
            affected_rows
        }
    }
  
`;