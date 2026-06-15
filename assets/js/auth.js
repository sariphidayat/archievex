const API_BASE = 'https://archievex-be.fastapicloud.dev';
// const API_BASE = 'http://localhost:8000';

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user_profile';

function isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
}

function getAuthHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
                 : { 'Content-Type': 'application/json' };
}

function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
}

async function logoutUser() {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) { clearAuth(); return; }
    try {
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
    } catch (_) {}
    clearAuth();
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

function authApp() {
    return {
        isLogin: true,
        regEmail: '',
        regUsername: '',
        regPassword: '',
        loginEmail: '',
        loginPassword: '',
        loading: false,
        error: '',
        success: '',
        errors: {},

        switchToRegister() {
            this.isLogin = false;
            this.error = '';
            this.success = '';
            this.errors = {};
        },

        switchToLogin() {
            this.isLogin = true;
            this.error = '';
            this.success = '';
            this.errors = {};
        },

        async register() {
            this.loading = true;
            this.error = '';
            this.success = '';
            this.errors = {};

            try {
                const res = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.regEmail,
                        username: this.regUsername,
                        password: this.regPassword,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    if (res.status === 422) {
                        this.errors = {};
                        for (const err of data.detail || []) {
                            const field = err.loc[err.loc.length - 1];
                            this.errors[field] = err.msg;
                        }
                        this.error = 'Mohon periksa kembali input Anda.';
                    } else {
                        this.error = data.detail || 'Registrasi gagal. Silakan coba lagi.';
                    }
                    this.loading = false;
                    return;
                }

                localStorage.setItem(TOKEN_KEY, data.access_token);
                localStorage.setItem(REFRESH_KEY, data.refresh_token);
                this.success = 'Registrasi berhasil! Mengalihkan...';
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } catch (err) {
                this.error = 'Tidak dapat terhubung ke server.';
            } finally {
                this.loading = false;
            }
        },

        async login() {
            this.loading = true;
            this.error = '';
            this.success = '';
            this.errors = {};

            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.loginEmail,
                        password: this.loginPassword,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    if (res.status === 422) {
                        this.errors = {};
                        for (const err of data.detail || []) {
                            const field = err.loc[err.loc.length - 1];
                            this.errors[field] = err.msg;
                        }
                        this.error = 'Mohon periksa kembali input Anda.';
                    } else {
                        this.error = data.detail || 'Login gagal. Periksa email dan password Anda.';
                    }
                    this.loading = false;
                    return;
                }

                localStorage.setItem(TOKEN_KEY, data.access_token);
                localStorage.setItem(REFRESH_KEY, data.refresh_token);
                this.success = 'Login berhasil! Mengalihkan...';
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } catch (err) {
                this.error = 'Tidak dapat terhubung ke server.';
            } finally {
                this.loading = false;
            }
        },
    };
}
