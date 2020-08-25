// import withQuery from 'with-query';

/**
 * Accounts related calls
 */
export const version = 1;
const baseUrl = '/auth';

export const login = body => ({
    url: `${baseUrl}/signin`,
    options: {
        method: 'POST',
        body: JSON.stringify(body)
    }
});
export const signout = () => ({
    url: `${baseUrl}/signout`,
    options: {
        method: 'POST'
    }
});