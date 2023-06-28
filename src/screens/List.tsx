import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List: React.FC = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATED?");
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    console.log("add Todo?", doc);
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const toggleDone = async () => {};

    const deleteItem = async () => {};
    return (
      <View>
        <TouchableOpacity onPress={toggleDone}>
          {item.done && <Ionicons name="md-checkmark-circle" />}
          {!item.done && <Entypo name="circle" size={24} color="black" />}
          <Text>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color={"red"}
          onPress={deleteItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new Todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
      </View>
      <Button
        onPress={() => addTodo()}
        title="Add To-do"
        disabled={todo === ""}
      />
      {todos.length > 0 && (
        <View>
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </View>
      )}
      {/* <View>
        {todos.map((todo) => (
          <Text key={todo.id}>{todo.title}</Text>
        ))}
      </View> */}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
