import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");
export default function App() {
  const [task, setTask] = useState<string>("");
  const [activeButton, setActiveButton] = useState("Todo");
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<any>(null);
  const [listTodo, setListTodo] = useState<any>([]);
  const [allTodo, setAllTodo] = useState<any>([]);
  const handleAddTodo = () => {
    if (task.trim() != "") {
      const todo = {
        id: Date.now(),
        name: task,
        isComplated: false,
      };
      setListTodo([...listTodo, todo]);
      setAllTodo([...listTodo, todo]);

      setTask("");
    }
  };
  const togleCheckBox = (id: number) => {
    const newTodo = listTodo.map((item: any, index: number) => {
      if (item.id == id) {
        return { ...item, isComplated: !item.isComplated };
      }
      return item;
    });
    setListTodo(newTodo);
    const newAll=allTodo.map((item: any, index: number) => {
      if (item.id == id) {
        return { ...item, isComplated: !item.isComplated };
      }
      return item;
    });
    setAllTodo(newAll)//...
  };
  const handeUpdateTodo = () => {
    const newTodo = listTodo.map((item: any) => {
      if (item.id == editTodo?.id) {
        return { ...item, name: task };
      }
      return item;
    });
    setListTodo(newTodo);
    setAllTodo(newTodo);
    setIsEdit(false);
  };
  const handleEdit = (id: number) => {
    const newTodo = listTodo.find((item: any) => {
      return item.id == id;
    });
    //console.log(newTodo)
    setIsEdit(true);
    setEditTodo(newTodo);
    setTask(newTodo.name);
    //console.log('id',id)
  };
  const handleDelete = (id: number) => {
    const newTodo = listTodo.filter((item: any) => {
      return item.id != id;
    });

    setListTodo(newTodo);
    setAllTodo(newTodo);
  };
  const filterIncomplate = () => {
    const newList = allTodo.filter((item: any) => {
      return item.isComplated == false;
    });
    setListTodo(newList);
    setAllTodo(allTodo);
    setActiveButton("Incomplate");
  };
  const filterComplate = () => {
    const newList = allTodo.filter((item: any) => {
      return item.isComplated == true;
    });
    setListTodo(newList);
    setAllTodo(allTodo);
    setActiveButton("Complated");
  };
  const getAllTodo = () => {
    setListTodo(allTodo);
    setActiveButton("Todo");
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "blue", fontSize: 30, fontWeight: 500 }}>
        TodoList
      </Text>
      <TextInput
        style={{
          width: "100%",
          height: 40,
          paddingTop: 0,
          paddingBottom: 0,
          margin: 0,
          borderWidth: 2,
          justifyContent: "center",
        }}
        onChangeText={(text) => setTask(text)}
        placeholder="Enter new task"
        value={task}
      ></TextInput>

      {isEdit ? (
        <View style={{ flexDirection: "row", width: width * 0.9 }}>
          <TouchableOpacity
            onPress={() => {
              handeUpdateTodo();
            }}
            style={{
              flex: 2,
              height: 35,
              backgroundColor: "blue",
              borderRadius: 5,
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsEdit(false);
            }}
            style={{
              flex: 1,
              height: 35,
              backgroundColor: "white",
              borderRadius: 5,
              justifyContent: "center",
              marginVertical: 10,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: "black", textAlign: "center" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => handleAddTodo()}
          style={{
            width: "100%",
            height: 35,
            backgroundColor: "blue",
            borderRadius: 5,
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Add</Text>
        </TouchableOpacity>
      )}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => getAllTodo()}
          style={[styles.button, activeButton === "Todo" && styles.active]}
        >
          <Text>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterIncomplate()}
          style={[
            styles.button,
            activeButton === "Incomplate" && styles.active,
          ]}
        >
          <Text>Incomplete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterComplate()}
          style={[styles.button, activeButton === "Complated" && styles.active]}
        >
          <Text>Complated</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listTodo}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: width * 0.9,
              height: 40,
              backgroundColor: "white",
              marginBottom: 10,
              borderRadius: 5,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Checkbox
              status={item.isComplated ? "checked" : "unchecked"}
              onPress={() => {
                togleCheckBox(item.id);
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  { color: "black" },
                  {
                    textDecorationLine: item.isComplated
                      ? "line-through"
                      : "none",
                  },
                  styles.text,
                ]}
              >
                {item.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                style={{ marginHorizontal: 5 }}
              >
                <Icon name="pencil" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={{ marginHorizontal: 10 }}
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  text: {
    //width:500,
    fontSize: 16,
    //maxWidth: width*0.6,
    //minWidth:width*0.6
  },
  active: {
    backgroundColor: "#5afc03",
  },
  button: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
});
