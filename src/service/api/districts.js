/**
 * States related calls
 */
export const version = 1;
const baseUrl = '/districts';

export const getAll = () => ({
    url: baseUrl
});

export const getDestrict = (id) => ({
    url: `${baseUrl}/${id}`
});