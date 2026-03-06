// import { defineStore } from 'pinia';
// import { stringify, parse } from 'zipson';
// import apiRequest from '~/utils/apiRequest';
// import { AUTH_URL } from '~/config/apiEndpoints';

// export const useAuth = defineStore('auth', {
//   state: () => ({
//     token: '',
//     user: {},
//     loggingIn: false,
//   }),
//   persist: {
//     key: 'sancus:auth',
//     paths: ['token', 'user'],
//     serializer: {
//       deserialize: parse,
//       serialize: stringify,
//     },
//   },
//   getters: {
//     isLoggingIn: (state) => state.loggingIn,
//     isLoggedIn: (state) => !!state.token,
//     authToken: (state) => state.token,
//     userId: (state) => state.user.id || '',
//     userName: (state) => state.user.name || '',
//     userAvatar: (state) => state.user.picture || '',
//     userEmail: (state) => state.user.email || '',
//     userPermissions: (state) => state.user.zoneWithPermissions || [],
//   },
//   actions: {
//     // Mutations
//     authRequest() {
//       this.loggingIn = true;
//     },
//     authRequestSuccess(payload) {
//       this.loggingIn = false;
//       this.token = payload.data.access_token;
//       this.user = payload.data.user;
//     },
//     authRequestFailed() {
//       this.loggingIn = false;
//     },

//     // Actions
//     async logIn(code) {
//       this.authRequest();
//       try {
//         const result = await apiRequest({
//           url: AUTH_URL,
//           method: 'POST',
//           data: {
//             authorization_code: code,
//           },
//         });
//         this.authRequestSuccess(result);
//       } catch (error) {
//         this.authRequestFailed();
//         throw error;
//       }
//     },
//     logOut() {
//       this.token = '';
//       this.user = {};
//       localStorage.removeItem('sancus:auth');
//     },
//   },
// });
