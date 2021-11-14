import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput } from "react-native";

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { error &&
        <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
      }
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8 }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        autoCapitalize = 'none'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => login(email, password)}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const { register, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // const [c_password, setCpassword] = useState('');

  // function validate () {
  //   if(){
  //     return register(name,email, password)
  //   } else{
  //     return 
  //   }
  // };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      { error &&
        <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
      }
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8 }}
        onChangeText={text => setName(text)}
        placeholder="Name"
        autoCapitalize = 'none'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24  }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        autoCapitalize = 'none'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={false}
        value = {password}
      />
      {/* <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setCpassword(text)}
        placeholder="c_password"
        secureTextEntry={false}
        value = {c_password}
      /> */}
      {/* {password == c_password ?  */}
      <Button
        title="Sign-up"
        onPress={() => register(name,email, password)}
      /> 
      {/* : <Text>Check your email</Text>} */}
      
      {/* <Button
        title="Sign-up"
        onPress={() => console.log(password === c_password)}
      /> */}
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}
