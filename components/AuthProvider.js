import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {BASE_URL} from '@env'

// axios.defaults.baseURL = 'https://ff97-196-61-20-103.ngrok.io';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const url = "https://ff97-196-61-20-103.ngrok.io"

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        // register: (email, password, name,) => {
        //     axios.post('/register', {
        //       name,
        //       email,
        //       password,
        //     })
        //     .then(response => {
        //       const userResponse = {
        //         email: response.data.user.email,
        //         name: response.data.user.name,
        //         password: response.data.user.password,
        //         token: response.data.token,
        //       }
        //       setUser(userResponse);
        //       setError(null);
        //       SecureStore.setItemAsync('user', JSON.stringify(userResponse));
        //     })
        //     .catch(error => {
        //         console.log(error.toJSON());
        //     })
        // //   },
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