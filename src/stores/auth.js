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
    async login(username, password) {
      try {
        const response = await this.$axios.post("/login", { username, password });
        const authToken = response.data.token;
        if (!authToken) {
          throw new Error("Login failed");
        }

        const decoded = decodeToken(authToken);
        if (!decoded) {
          throw new Error("Failed to decode token.");
        }

        this.setUser({
          authToken: authToken,
          id: decoded.sub,
          role: decoded.auth,
          isApproved: decoded.approved,
        });

        return { success: true, message: "Login successful!" };
      } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: error.message || "Login failed. Please check your credentials." };
      }
    },
    

    setUser(userData) {
      this.user = {
        id: userData.id,
        role: userData.role,
        isApproved: userData.approved
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
              isApproved: decoded.approved
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
    isUserApproved: (state) => {
      console.log('isUserApproved check:', state.user?.isApproved);
      return state.user?.isApproved === 'true';
  },
  },
});
