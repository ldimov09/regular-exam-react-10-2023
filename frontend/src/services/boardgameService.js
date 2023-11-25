import * as request from '../lib/request';

const baseUrl = 'http://localhost:3000/api/games';


export const getAll = async () => {
    const res = await request.get(baseUrl);
    return res;
}

export const create = async (boardagme) => {
    const res = await request.post(baseUrl + '/create', boardagme);
    return res;
}

export const getOne = async (id) => {
    const res = await request.get(baseUrl + '/' + id);
    return res;
}