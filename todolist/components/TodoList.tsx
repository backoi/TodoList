import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    listTodo:any,
    setEditTodo:any,
    setTask:any,
    setListTodo:any,
    activeButton:any,
}
const { width } = Dimensions.get("window");

const STATUS={
    TODO:'TODO',
    iN_COMPLATE:'Incomplate',
    COMPLATED:'Complated',
  }
const TodoList = ({listTodo,setEditTodo,setTask,setListTodo,activeButton}: Props) => {
    const handleEdit = (id: number) => {
        const newTodo = listTodo.find((item: any) => item.id == id);
        setEditTodo(newTodo);
        setTask(newTodo.name);
      };
      
    const togleCheckBox = (id: number) => {
        const newTodo = listTodo.map((item: any) =>item.id == id?{ ...item, isComplated: !item.isComplated} :item);
        setListTodo(newTodo);
      };
    const handleDelete = (id: number) => {
        const newTodo = listTodo.filter((item: any) => item.id != id);
        setListTodo(newTodo);
      };

  return (
    <FlatList
        showsVerticalScrollIndicator={false}
        data={listTodo.filter((item:any)=>{
            if(activeButton==STATUS.iN_COMPLATE) return !item.isComplated
            if(activeButton==STATUS.COMPLATED) return item.isComplated
            return true
        })}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>

            <Checkbox status={item.isComplated ? "checked" : "unchecked"} onPress={() => {togleCheckBox(item.id)}}/>
           
            <View style={styles.textContainer}>
              <Text style={[styles.text,{textDecorationLine: item.isComplated? "line-through": "none"}]}>{item.name}</Text>
            </View>
            
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
                <Icon name="pencil" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.action}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>

          </View>
        )}  
      ></FlatList>
  )
}

export default TodoList

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.9,
        height: 40,
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
    },
    textContainer:{
        flex:1,
    },
    text:{
        fontSize:17,
    },
    actionContainer:{
        flexDirection: "row", 
    },
    action:{
        marginHorizontal: 10, 
    }
})