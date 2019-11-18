import gql from 'graphql-tag';

export const GET_WEAKNESS = gql `
    query getWeakness($user_id: Int!) {
        interpers: w_self_analysis_weakness_interper(where: {user_id: {_eq: $user_id}}) {
            id interpersonal example
        }
        problems: w_self_analysis_weakness_problem(where: {user_id: {_eq: $user_id}}) {
            id problems example
        }
    } 
`;

export const INSERT_WEAKNESS = gql `
    mutation insert_strength($user_id: Int!, $count: Int!, $problems: [w_self_analysis_weakness_problem_insert_input!]!, $inters: [w_self_analysis_weakness_interper_insert_input!]!) {        
        insert_w_self_analysis_weakness_problem(objects: $problems,
            on_conflict: {
                constraint: w_self_analysis_weakness_problem_pkey,
                update_columns: [problems, example]
            }
        ) {
            affected_rows
        }

        insert_w_self_analysis_weakness_interper(objects: $inters,
            on_conflict: {
                constraint: w_self_analysis_weakness_interpersonal_pkey,
                update_columns: [interpersonal, example]
            }
        ) {
            affected_rows
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: $count}) {
            returning {
                id
            }
        }
    }
`