import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import Task from './Task';
import axios from 'axios';


const Stack = createStackNavigator();

function DashboardScreen({ navigation }) {
  const url = "https://fat-octopus-30.loca.lt"
  const { user, logout } = useContext(AuthContext);
  const [item, setItem] = useState([]);
  const [task, setTask] = useState();
  const [refreshKey, setRefreshKey] = useState(0);


  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get(url+'/api/to_dos')
    .then(function(response){
        setItem([...response.data]);
        
    },[refreshKey])


  }, []);
  const handleAddTask = () => {
    axios.post(url+'/api/to_dos', {
        item : task,
      })
    .then((response) => {
      
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
      setRefreshKey(oldKey => oldKey +1)
    })  
  }

  const completeTask = (id) => {
        let itemsCopy = [...item];
        axios.delete(url+'/api/to_dos/'+id)
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
            <Task key={item.id} text={item.item} delete = {()=> completeTask(item.id)} editItem={() => navigation.navigate('EditItem', {id: item.id, item: item.item})}/>
          
          )})}
      </View>
      </View>
      <Button title="Go to EditItem" />
      <Button title="Logout" onPress={() => logout()} />
      </ScrollView>
      <KeyboardAvoidingView 
        behavior='position'
        style={styles.writeTaskWrapper}
      >
          <View style={styles.row}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={item => setTask(item)} />
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

function EditItemScreen({ route, navigation }) {
  const { id } = route.params;
  const url = "https://fat-octopus-30.loca.lt"
  const { item } = route.params;
  const { user, logout } = useContext(AuthContext);
  const [task, setTask] = useState();


  const handleEditTask = () => {
    const ID = JSON.stringify(id) 
    axios.put(url+'/api/to_dos/'+ID,{ 
        item: task.text}
      )
    .then(function(response){
      setTask(''); 
      console.log(response.data.item)
    })    
  }


  return ( 
    <View style={styles.container}>

      <Text >User: {user.email}</Text>

      <Button title="Logout" onPress={() => logout()} />
          <View style={styles.editRow}>
        <TextInput style={styles.editInput} placeholder={'Write a task'} defaultValue={task} onChangeText={text => setTask({text})} />
        <TouchableOpacity>
          <View style={styles.addWrapper}>
            <Text style={styles.addText} onPress={() => handleEditTask()}>edit</Text>
          </View>
        </TouchableOpacity>
        </View>

      
    </View>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="EditItem" component={EditItemScreen} />
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
    editRow: {
      flex: 1,
      marginTop:60,
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
    editInput: {
      marginRight: 20,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
      height:60,
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
  