import React, {useState} from 'react';

import {
  StyleSheet,
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
import CheckBox from 'react-native-check-box';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [textInput, setTextInput] = React.useState('');

  // const [archivedTodos, setArchivedTodos] = useState([]);

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        key: counter,
        task: textInput,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setTextInput('');
      setCounter(prev => prev + 1);
    }
  };

  const markTodoComplete = (todoId, taskVal) => {
    setTodos(todo => {
      return todo.filter(todo => todo.key !== todoId);
    });

    setTodos(todo => [...todo, {key: todoId, task: taskVal, completed: true}]);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setTodos(newTodosItem);
  };

  const ListItem = props => {
    return (
      <View>
        <View style={styles.listItem}>
          <View style={{flex: 1, padding: 5}}>
            <CheckBox
              tintColors={{
                true: isDark === true ? 'grey' : 'black',
                false: 'black',
              }}
              disabled={false}
              onValueChange={() => {
                props.onComplete(props.id, props.val);
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#1f145c',
                textDecorationLine: props.completed ? 'line-through' : 'none',
              }}>
              {props.task}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => deleteTodo(props.id)}>
            <View style={styles.actionIcon}>
              <Icon name="delete" size={30} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const toggle = () => setIsDark(prev => !prev);

  return (
    <View style={isDark === true ? styles.darkTheme : styles.lightTheme}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TODO APP</Text>
        <Switch
          style={styles.switch}
          trackColor={{false: 'green', true: 'red'}}
          onValueChange={toggle}
          value={isDark}
        />
      </View>

      {/* listItems */}

      <FlatList
        keyExtractor={(item, index) => item.key}
        data={todos}
        renderItem={itemData => (
          <ListItem
            id={itemData.key}
            task={itemData.task}
            completed={itemData.completed}
            onComplete={markTodoComplete}
            dark={isDark}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add Todo"
            onChangeText={text => setTextInput(text)}
            value={textInput}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  // },
  // switch: {
  //   // marginLeft: 320,
  //   marginTop: 50,
  //   width: 15,
  //   height: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: 1,
  // },

  darkTheme: {
    flex: 1,
    backgroundColor: '#151618',
    color: 'black',
    justifyContent: 'space-between',
  },

  lightTheme: {
    flex: 1,
    backgroundColor: '#E8EAED',
    color: 'black',
    justifyContent: 'space-between',
  },

  header: {
    paddingTop: 50,
    width: '100%',
    height: 100,
    backgroundColor: '#00e6e6',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    // paddingTop: 50,
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    elevation: 40,
    flex: 1,
    height: 40,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    // borderEndColor: 'black',
    // borderColor: 'black',
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#1f145c',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
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
