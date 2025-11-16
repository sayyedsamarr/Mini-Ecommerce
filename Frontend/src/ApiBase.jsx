//Calling Backend APi
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
console.log("API_BASE = ", API_BASE);

//Safe JSON & error handling
async function handleResponse(res) {
    const content = res.headers.get('content-type') || "";
    if (!res.ok) {
        if (content.includes('application/json')) {
            const json = await res.json();
            throw json
        }
        else {
            const text = await res.text();
            throw text
        }
    }
    if (content.includes('application/json')) return res.json();
    return res.text();
}

export async function api(path, opts = {}) {
    const res = await fetch(API_BASE + path, opts)
    return handleResponse(res);
}

//Get JWT from localStorage
export function getAuthToken() {
    return window.localStorage.getItem('admin-token');
}

export function setAuthToken(token) {
    if (!token) {
        window.localStorage.removeItem('admin-token');
        return;
    }
    window.localStorage.setItem('admin-token', token);
}


//Add Authorization: Bearer <token> automatically
export function authFetch(path, opts = {}) {
    const token = getAuthToken();
    const headers = opts.headers ? { ...opts.headers } : {}
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
        return api(path, { ...opts, headers })
    }
}