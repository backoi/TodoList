import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    activeButton:any,
    setActiveButton:any,
}
const STATUS={
    TODO:'TODO',
    iN_COMPLATE:'Incomplate',
    COMPLATED:'Complated',
  }
const TodoFilter = ({activeButton,setActiveButton}: Props) => {
    const filterIncomplate = () => {
        setActiveButton(STATUS.iN_COMPLATE);
      };
      const filterComplate = () => {
        setActiveButton(STATUS.COMPLATED);
      };
      const getAllTodo = () => {
        setActiveButton(STATUS.TODO);
      };
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={getAllTodo} style={[styles.button,activeButton === STATUS.TODO && styles.activeButton]}>
          <Text>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={filterIncomplate} style={[styles.button,activeButton === STATUS.iN_COMPLATE && styles.activeButton]}>
          <Text>Incomplete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={filterComplate}  style={[styles.button,activeButton === STATUS.COMPLATED && styles.activeButton]}>
          <Text>Complated</Text>
        </TouchableOpacity>
      </View>
  )
}

export default TodoFilter

const styles = StyleSheet.create({
    container:{ flexDirection: "row", marginBottom: 10, },
    button:{
        borderRadius: 5,
        padding: 5,
        backgroundColor: "white",
        marginHorizontal: 5,
    },
    activeButton:{
        backgroundColor: "#5afc03",
    }
})