import gql from 'graphql-tag';

export const GET_WORKSHEETS = gql `
    query getWorksheet {
        worksheets: worksheet {
            id worksheet_name worksheet_url
        }
    }
`;

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

export const GET_USER = gql `
    query getUserinfo($sub: uuid!) {
        user: users(where: {user_cognito_sub: {_eq: $sub}}) {
            user_id user_email user_first_name user_last_name user_type
        }
    }
`;