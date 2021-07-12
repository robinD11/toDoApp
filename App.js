import React, {useState} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Switch,
  ScrollView,
  TextPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [textInput, setTextInput] = React.useState('');

  const bgColor = isDark ? 'black' : 'lightblue';

  const toggle = () => setIsDark(prev => !prev);

  const updateTodoStatus = (item, newStatus) => {
    // const status = item.isComplete;
    const taskVal = item.task;
    const taskId = item.key;
    setTodos(todo => {
      return todo.filter(todo => todo.key !== taskId);
    });

    if (newStatus === false) {
      setTodos(todo => [
        {key: taskId, task: taskVal, isComplete: false},
        ...todo,
      ]);
    } else {
      setTodos(todo => [
        ...todo,
        {key: taskId, task: taskVal, isComplete: true},
      ]);
    }
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.key != todoId);
    setTodos(newTodosItem);
  };

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        key: counter,
        task: textInput,
        isComplete: false,
      };
      setTodos([newTodo, ...todos]);
      setTextInput('');
      setCounter(prev => prev + 1);
    }
  };

  const Header = props => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.titleContainer}>TODO APP</Text>
        <Switch
          style={styles.switch}
          trackColor={{false: 'green', true: 'yellow'}}
          onValueChange={toggle}
          value={isDark}
        />
      </View>
    );
  };

  const InputContainer = props => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a task"
          placeholderTextColor="black"
          onChangeText={text => setTextInput(text)}
          value={textInput}
        />

        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ListItem = props => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <CheckBox
            tintColors={{
              true: isDark === true ? 'grey' : 'black',
              false: 'black',
            }}
            disabled={false}
            onValueChange={props.onChange}
            value={props.item.isComplete} // toggle it
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 23,
              paddingRight: 115,
              color: '#1f145c',
              textAlign: 'center',
              // justifyContent: 'space-around',
              textDecorationLine: props.item.isComplete
                ? 'line-through'
                : 'none',
            }}>
            {props.item.task}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => deleteTodo(props.item.key)}>
            <View style={styles.actionIcon}>
              <Icon name="delete" size={30} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: bgColor}}>
      <Header toggle={toggle} mode={isDark} />
      <View style={{flex: 1}}>
        <InputContainer />
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => item.key}
            data={todos}
            renderItem={({item}) => (
              <ListItem
                item={item}
                onChange={val => updateTodoStatus(item, val)}
                dark={isDark}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {},
  headerContainer: {
    height: 125,
    backgroundColor: 'purple',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 25,
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 5,
    marginHorizontal: 5,
    paddingTop: 50,
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 10,
    marginLeft: 10,
    borderRadius: 25,
    color: 'black',
  },
  iconContainer: {
    height: 45,
    width: 45,
    backgroundColor: 'purple',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    marginVertical: 7,
    marginHorizontal: 30,
    height: 45,
  },
  listContainer: {
    paddingTop: 50,
  },

  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
});

export default App;
