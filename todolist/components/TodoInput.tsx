import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
  task:any,
  setTask:any,
  editTodo:any,
  setEditTodo:any,
  listTodo:any,
  setListTodo:any,
}
const { width } = Dimensions.get("window");

const TodoInput = ({task,setEditTodo,setListTodo,setTask,listTodo,editTodo}: Props) => {
  const handleAddTodo = () => {
    if (task.trim() != "") {
      const todo = {
        id: Date.now(),
        name: task,
        isComplated: false,
      };
      setListTodo([...listTodo, todo]);
      setTask("");
    }
  };
  
  const handeUpdateTodo = () => {
    const newTodo = listTodo.map((item: any) => (item.id == editTodo?.id)? { ...item, name: task }:item);
    setListTodo(newTodo);
    setEditTodo(null)
  };
  return (
    <View>
      <TextInput style={styles.textInput} placeholder='Enter a new task' value={task} onChangeText={(text)=>setTask(text)}></TextInput>
        {
          editTodo ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handeUpdateTodo} style={styles.buttonUpdate}>
              <Text style={styles.textUpdate}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {setEditTodo(null)}} style={styles.buttonEdit}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleAddTodo} style={styles.buttonAdd}>
            <Text style={styles.textAdd}>Add</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default TodoInput

const styles = StyleSheet.create({
  textInput:{
    width:width*0.9,
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    borderWidth: 2,
    justifyContent: "center",
  },
  buttonContainer:{ flexDirection: "row", width: width * 0.9},
  buttonUpdate:{
    flex: 2,
    height: 35,
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonEdit:{
    flex: 1,
    height: 35,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
  },
  buttonAdd:{
    width: width*0.9,
    height: 35,
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
  textAdd:{
    color: "white", textAlign: "center",
  },
  textCancel:{ color: "black", textAlign: "center", },
  textUpdate:{ color: "white", textAlign: "center", },
})