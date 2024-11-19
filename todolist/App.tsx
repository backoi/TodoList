import { useState } from "react";
import {Text,View} from "react-native";
import { TodoFilter, TodoInput, TodoList } from "./components";
import { StyleSheet } from "react-native";
const STATUS={
  TODO:'TODO',
  iN_COMPLATE:'Incomplate',
  COMPLATED:'Complated',
}
export default function App() {
  const [task, setTask] = useState<string>("");
  const [activeButton, setActiveButton] = useState(STATUS.TODO);
  const [editTodo, setEditTodo] = useState<any>(null);
  const [listTodo, setListTodo] = useState<any>([]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TodoList</Text>
      <TodoInput task={task} setTask={setTask} listTodo={listTodo} setListTodo={setListTodo} editTodo={editTodo} setEditTodo={setEditTodo}></TodoInput>
      <TodoFilter activeButton={activeButton} setActiveButton={setActiveButton}/>
      <TodoList activeButton={activeButton} setEditTodo={setEditTodo} listTodo={listTodo} setListTodo={setListTodo} setTask={setTask} />
    </View>
  );
}
const styles = StyleSheet.create({
  title:{
    color: "blue", fontSize: 30, fontWeight: 500, 
  },
  container:{
    flex: 1,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 40,
  }
})
