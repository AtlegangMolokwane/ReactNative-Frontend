import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const url = "https://fat-octopus-30.loca.lt"

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        register: (name, email, password,password_confirmation) => {
            axios.post(url+'/api/register', {
              name,
              email,
              password,
              password_confirmation
            })
            .then(response => {
              const userResponse = {
                name: response.data.user.name,
                email: response.data.user.email,
                password: response.data.user.password,
                token: response.data.token,
              }
              setUser(userResponse);
              setError(null);
              SecureStore.setItemAsync('user', JSON.stringify(userResponse));
            })
            .catch(error => {
                console.log(error.toJSON());
            })
          },
            login: (email, password) => {
               axios.post(url+'/api/login', {
                email,
                password,
              })
              .then(response => {
                  
                const userResponse = {
                  email: response.data.user.email,
                  token: response.data.token,
                }
                setUser(userResponse);
                setError(null);
                SecureStore.setItemAsync('user', JSON.stringify(userResponse));
              })
              .catch(error => {
                console.log(error)
              })
            },

            logout: () => {
              axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
              axios.post(url+'/api/logout')
              .then(response => {
                setUser(null);
                SecureStore.deleteItemAsync('user')
              })
              .catch(error => {
                console.log(error.response);
              })
            }
          }}>
          {children}
    </AuthContext.Provider>
  );
}