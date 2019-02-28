import { LOGIN } from './types';
import { REGISTER } from './types';

export const login = user => dispatch => {
    var users = JSON.parse(localStorage.getItem("users"))
    var userToSend
    var found = false
    if(users)
        users.forEach(u => {
            if (u.email === user.email && u.password ===     user.password){
                found = true
                userToSend = u
            }      
        });
    if(found)
        dispatch({
            type: LOGIN,
            payload: userToSend
        })
    else
        alert("Invalid email or password")
};

export const register = user => dispatch => {
    var users = []
    if(localStorage.getItem("users"))
        users = JSON.parse(localStorage.getItem("users"))
    
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    dispatch({
        type: REGISTER,
        payload: user
    })
};