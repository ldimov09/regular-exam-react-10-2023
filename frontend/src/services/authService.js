import * as request from '../lib/request';

const baseUrl = 'http://localhost:3000/api/auth';

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
};

export const register = (email, password, username) => request.post(`${baseUrl}/register`, {
    email,
    password,
    username,
});

export const logout = () => request.get(`${baseUrl}/logout`);