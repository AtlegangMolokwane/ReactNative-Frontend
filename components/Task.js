import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
    const [isSelected, setSelection] = useState(true);

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
      <TouchableOpacity onPress={() => setSelection(isSelected=>!isSelected)}>
        <View style={styles.square}></View>
      </TouchableOpacity>
        <Text style={ isSelected ? styles.itemText : styles.itemTextCross}>{props.text}</Text>
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={props.editItem}>
        <View style={styles.editCircular}>
        <Text style={styles.editAddText}>edit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.delete}>
        <View style={styles.circular}>
        <Text style={styles.addText}>x</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 20,
    height: 20,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  itemTextCross: {
    maxWidth: '80%',
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  row: {
   
    flexDirection: "row",
  },
  circular: {
    marginLeft: 15,
    width: 20,
    height: 20,
    borderColor: '#feb1b7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
  },
  addText: {
     color: '#fb788b',
     fontWeight: "bold", 
  },
  editCircular: {
    alignItems: 'flex-end',
    width: 45,
    height: 20,
    borderColor: '#9DD9F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
  },
  editAddText: {
     color: '#77C3EC',
     fontWeight: "bold", 
  },
});

export default Task;