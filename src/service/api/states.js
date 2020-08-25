/**
 * States related calls
 */
export const version = 1;
const baseUrl = '/states';

export const getAll = () => ({
    url: baseUrl
});

export const getState = (id) => ({
    url: `${baseUrl}/${id}`
});