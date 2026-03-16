import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware"
import { login, logout, me, register } from '../services/authServices'

export const useAuth = create(

     persist((set) => ({
          user: null,
          error: null,
          token: null,
          loading: false,
          isAuthenticated: false,
          isHydrated: false,

          setToken: (newToken) => set({ token: newToken}),

          setHydrated: () => set({ isHydrated: true }),

          registerAction: async(formData) => {

               set({ loading: true, error: null });

               try {
                    const res = await register(formData)

                    const { access_token, user } = res.data; 

                    set({ 
                         user, 
                         token: access_token, 
                         isAuthenticated: true, 
                         loading: false 
                    });

                    return true;
               } catch (error) {
                    console.log(error)
                    set({ 
                         error: error.response?.data?.error || "Erreur de connexion", 
                         loading: false 
                    });

                    return false;
               }
          },

          loginAction: async(formData) => {

               set({ loading: true, error: null });

               try {
                    const res = await login(formData)
                    
                    const { access_token, user } = res.data; 

                    set({ 
                         user, 
                         token: access_token, 
                         isAuthenticated: true, 
                         loading: false 
                    });

                    return true;
               } catch (error) {
                    console.log(error)
                    set({ error: error.response?.data?.error || "Erreur de connexion", loading: false });

                    return false;
               }
          },

          logout: async () => {
               try {
                    // Appel API pour blacklister le token côté Laravel
                    await logout(); 

                    return true

               } catch (error) {
                    set({ error: error?.response?.data?.error})
               } finally {
                    set({ 
                         user: null, 
                         token: null, 
                         isAuthenticated: false,
                         error: null
                    });

               } 
          },

          // cette fonction nous permet de verifier si le token est toujours valide depuis le backend
          checkAuth: async () => {

               set({ loading: true });

               try {
                    // Route Laravel qui renvoie l'user connecté
                    const res = await me(); 
                    console.log(res.data)
                    set({ 
                         user: res.data, 
                         isAuthenticated: true,
                         loading: false
                    });

               } catch (error) {
                    // Si le token est mort, on vide tout
                    set({ 
                         user: null, 
                         token: null, 
                         error: error?.response?.data?.error, 
                         isAuthenticated: false,
                         loading: false
                    });
               }
          }
     }),
     {
          // Nom de la clé dans le localStorage
          name: 'auth',
          storage: createJSONStorage(() => localStorage),
          // Appelé dès que le store est lu ()
          onRehydrateStorage: () => (state) => {
               state.setHydrated();
          },
          // Choisir les element que nous voulions stocker dans le localStorage
          partialize: (state) => ({ 
               token: state.token, 
               user: state.user, 
               isAuthenticated: state.isAuthenticated 
          }), 
     }
))