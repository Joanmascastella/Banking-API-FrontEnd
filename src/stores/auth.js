import { defineStore } from 'pinia';

export function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
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
        role: userData.role,
      };
      this.token = userData.authToken; 
      localStorage.setItem('auth', userData.authToken);
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('auth');
    },

    checkUser() {
      const token = localStorage.getItem('auth');
      if (token) {
        this.token = token;
        try {
          const decoded = decodeToken(token);
          if (decoded) {
            this.user = {
              id: decoded.sub, 
              role: decoded.auth, 
            };
          }
        } catch (error) {
          console.error("Error in checkUser:", error);
        }
      }
    },
  },

  getters: {
    isEmployee: (state) => state.user?.role === 'ROLE_EMPLOYEE',
    isCustomer: (state) => state.user?.role === 'ROLE_CUSTOMER',
    userId: (state) => state.user?.id,
  },
});
