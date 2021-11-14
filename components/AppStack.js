import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import Task from './Task';
import axios from 'axios';


const Stack = createStackNavigator();

function DashboardScreen({ navigation }) {
  const url = "https://ff97-196-61-20-103.ngrok.io"
  const { user, logout } = useContext(AuthContext);
  const [item, setItem] = useState([]);
  const [task, setTask] = useState();



//   const [to_do, setTo_do] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('https://fresh-duck-29.loca.lt/api/to_dos')
    .then(function(response){
        setItem([...response.data]);
        
    })


  }, []);
  const handleAddTask = () => {
    axios.post('https://fresh-duck-29.loca.lt/api/to_dos', {
        item : task,
      })
    .then((response) => {
      Keyboard.dismiss();
      const userResponse = {
          item: response.data.item,
          created_at: response.data.created_at,
          id: response.data.id,
          updated_at: response.data.updated_at
            }
      setTask(userResponse);
      console.log(task)
      setItem([...item, task])
      setTask(null)
    })
  }

  const completeTask = (id) => {
        let itemsCopy = [...item];
        axios.delete('https://fresh-duck-29.loca.lt/api/to_dos/'+id)
        .then(() => 
        itemsCopy.splice(id, 1),
        setItem(itemsCopy),
        console.log('Delete successful' ))
      
  }
  console.log(item);

  return (
    <View style={styles.container}>
        <ScrollView
        style={{flex: 1}} 
      >
      <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>ToDo List!</Text>
      <Text>User: {user.email}</Text>
      <View style={styles.items}>
      {item && item.map((item) => {
          return( 
            <Task key={item.id} text={item.item} delete = {()=> completeTask(item.id)}/>
          
          )})}
      </View>
      </View>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={() => logout()} />
      </ScrollView>
      <KeyboardAvoidingView 
        behavior='position'
        style={styles.writeTaskWrapper}
      >
          <View style={styles.row}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Text>User: {user.email}</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    row: {
        flex: 1,
        flexDirection: "row",
      },
    tasksWrapper: {
      paddingTop: 40,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      flex: 1,
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      marginBottom:100,
      marginRight: 20,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText: {},
  });