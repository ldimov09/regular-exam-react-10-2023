import * as request from '../lib/request';

const baseUrl = 'http://localhost:3000/api/auth';

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
};

export const register = (formData) => request.post(`${baseUrl}/register`, formData, true);

export const logout = () => request.get(`${baseUrl}/logout`);

export const getOne = async (id) => {
    const res = await request.get(baseUrl + '/users/' + id);
    return res;
}

export const changePassword = async (id, payload) => {
    return await request.post(baseUrl + '/users/' + id + '/changepassword', payload);
}

export const updateUser = async (id, payload) => {
    return await request.post(baseUrl + '/users/' + id + '/edit', payload, true);
}