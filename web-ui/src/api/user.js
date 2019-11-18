let userinfo = new Object();
export const setUser = (user) => {
    console.log('api setUser');
    userinfo.id = user.user.user_id;
    userinfo.email = user.user.user_email;
    userinfo.fname = user.user.user_first_name;
    userinfo.lname = user.user.user_last_name;
};

export const fetchUser = () => {
    console.log('api fetchUser');
    return userinfo;
};
