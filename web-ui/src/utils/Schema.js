import gql from 'graphql-tag';

export const GET_MODULES = gql `
    query getModules($user_id: Int!) {
        w_dashboard(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_self_analysis(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_core_value_exploration(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_life_version_formulation(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_career_major_exploration(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_college_search(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_implementation(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
        
        w_essays(where: { user_id: { _eq: $user_id }}) {
            id module_name date total count
        }
    }
`;

export const GET_WEAKNESSES = gql `
    query getWeakness($user_id: Int!) {
        interper: w_self_analysis_weakness_interper(where: {user_id: {_eq: $user_id}}) {
            id
            interpersonal
            example
        }
        problem: w_self_analysis_weakness_problem(where: {user_id: {_eq: $user_id}}) {
            id
            problems
            example
        }
    } 
`;

export const GET_USER = gql `
    query getUserinfo($sub: uuid!) {
        user: users(where: {user_cognito_sub: {_eq: $sub}}) {
            user_id
            user_email
            user_type
            user_phone
        }
    }
`;

export const ADD_STATEMENT = gql `
    mutation insert_statement($user_id: Int!, $statement: String!) {
        insert_w_self_analysis_statement(
            objects: [
                {
                    user_id: $user_id,
                    statement: $statement
                }
            ]
        ) {
            returning {
                id
            }
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;

export const ADD_DREAMS_MODELS = gql `
    mutation insert_dream_model($user_id: Int!, $dream: String!, $models: [w_self_analysis_models_insert_input!]!) {
        insert_w_self_analysis_dreams(
            objects: [
                {
                    user_id: $user_id,
                    dreams: $dream
                }
            ]
        ) {
            returning {
                id
            }
        }

        insert_w_self_analysis_models(objects: $models) {
            returning {
                id
            }
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;

export const ADD_PLEASANTS = gql `
    mutation insert_pleasants($user_id: Int!, $pleasant_event: String!, $pleasants: [w_self_analysis_pleasant_insert_input!]!) {
        insert_w_self_analysis_pleasant_event(
            objects: [
                {
                    user_id: $user_id,
                    events: $pleasant_event
                }
            ]
        ) {
            returning {
                id
            }
        }

        insert_w_self_analysis_pleasant(objects: $pleasants) {
            returning {
                id
            }
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;

export const ADD_UNPLEASANTS = gql `
    mutation insert_unpleasants($user_id: Int!, $unpleasant_event: String! $unpleasants: [w_self_analysis_unpleasant_insert_input!]!) {
        insert_w_self_analysis_unpleasant_event(
            objects: [
                {
                    user_id: $user_id,
                    events: $unpleasant_event
                }
            ]
        ) {
            returning {
                id
            }
        }

        insert_w_self_analysis_unpleasant(objects: $unpleasants) {
            returning {
                id
            }
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;

export const ADD_FAVORITES = gql `
    mutation insert_favorites($user_id: Int!, $likes: [w_self_analysis_likes_insert_input!]!, $unlikes: [w_self_analysis_unlikes_insert_input!]!) {
        insert_w_self_analysis_likes(objects: $likes) {
            returning {
                id
            }
        }

        insert_w_self_analysis_unlikes(objects: $unlikes) {
            returning {
                id
            }
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;

export const ADD_WEAKNESS = gql `
    mutation insert_weakness($user_id: Int!, $interpers: [w_self_analysis_weakness_interper_insert_input!]!, $problems: [w_self_analysis_weakness_problem_insert_input!]!) {
        insert_w_self_analysis_weakness_interper(objects: $interpers) {
            returning {
                id
            }
        }

        insert_w_self_analysis_weakness_problem(objects: $problems) {
            returning {
                id
            }
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;

export const ADD_STRENGTH = gql `
    mutation insert_strength($user_id: Int!, $strengths: [w_self_analysis_strength_insert_input!]!, $inters: [w_self_analysis_weakness_interper_insert_input!]!, $problems: [w_self_analysis_weakness_problem_insert_input!]!) {
        insert_w_self_analysis_strength(objects: $strengths) {
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
        
        insert_w_self_analysis_weakness_problem(objects: $problems,
            on_conflict: {
              constraint: w_self_analysis_weakness_problem_pkey,
              update_columns: [problems, example]
            }
        ) {
          affected_rows
        }

        update_w_self_analysis(
            where: {user_id: {_eq: $user_id}}, _inc: {count: 1}) {
            returning {
                id
            }
        }
    }
`;