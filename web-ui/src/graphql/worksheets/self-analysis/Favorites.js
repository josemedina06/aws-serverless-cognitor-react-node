import gql from 'graphql-tag';

export const GET_FAVORITES = gql `
    query getFavorites($user_id: Int!) {
        likes: w_self_analysis_likes(where: {user_id: {_eq: $user_id}}) {
            id example like
        }

        unlikes: w_self_analysis_unlikes(where: {user_id: {_eq: $user_id}}) {
            id example unlike
        }
    }
`;

export const INSERT_FAVORITES = gql `
    mutation insert_favorites($user_id: Int!, $count: Int!, $likes: [w_self_analysis_likes_insert_input!]!, $unlikes: [w_self_analysis_unlikes_insert_input!]!) {
        insert_w_self_analysis_likes(objects: $likes, on_conflict: {constraint: w_self_analysis_like_pkey, update_columns: [like, example]}) {
            affected_rows
        }

        insert_w_self_analysis_unlikes(objects: $unlikes, on_conflict: {constraint: w_self_analysis_unlike_pkey, update_columns: [unlike, example]}) {
            affected_rows
        }

        update_w_self_analysis(where: {user_id: {_eq: $user_id}}, _inc: {count: $count}) {
            affected_rows
        }
    }
  
`