import { defineStore } from 'pinia';

function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userData) {
      this.user = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      };
      this.token = userData.authToken; 
      localStorage.setItem('authToken', userData.authToken);
    },

    logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('authToken');
    },
    checkUser() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        try {
          const decoded = decodeToken(token);
          this.user = {
            id: decoded.data.id,
            role: decoded.data.role,
          };
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    },
  },
  getters: {
    isEmployee: (state) => state.user?.role === 'employee',
    isCustomer: (state) => state.user?.role === 'customer',
    userId: (state) => state.user?.id,
  },
});
