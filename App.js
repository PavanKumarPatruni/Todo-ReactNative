import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Root, Container, Header, Content, ActionSheet, Body, Title, Fab, Icon, List, ListItem, Text, Left, Right } from 'native-base';
import DialogInput from 'react-native-dialog-input';

var BUTTONS = ["Complete", "Delete", "Cancel"];
var BUTTONS2 = ["Reset", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
            text: "Order Groceries",
            isCompleted: false
        },
        {
            text: "Call medical shop order medicines",
            isCompleted: false
        },
        {
            text: "Get medicines",
            isCompleted: false
        }
      ],
      isDialogVisible: false
    }
  }

  onComplete = index => {
    let { todos } = this.state;
    todos[index].isCompleted = !todos[index].isCompleted;

    this.setState({
      todos
    });
  }

  onRemove = index => {
    let { todos } = this.state;
    todos.splice(index, 1);

    this.setState({
      todos
    });
  }

  manageDialog = () => {
    let { isDialogVisible } = this.state;
    isDialogVisible = !isDialogVisible;

    this.setState({
      isDialogVisible
    });
  }

  sendInput = text => {
    let { todos, isDialogVisible } = this.state;
    isDialogVisible = !isDialogVisible;
    let todo = {
      text,
      isCompleted: false
    }
    todos.push(todo);

    this.setState({
      todos,
      isDialogVisible
    });
  }

  onOptionSelected = (index, actionIndex) => {
    switch(actionIndex) {
      case 0: 
        this.onComplete(index)
        break;
      case 1:
        this.onRemove(index)
        break;
      default:
        break;
    }
  }

  render() {

    let {todos} = this.state;

    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title>Todo</Title>
            </Body>
          </Header>
          <Content padder>
            {
              todos.length > 0 ? 
              (
                <List> 
                {
                  todos.map((todo, index) => {
                    return(
                        <ListItem key={index}  onPress={() => 
                          ActionSheet.show(
                            {
                              options: todo.isCompleted ? BUTTONS2 : BUTTONS,
                              cancelButtonIndex: CANCEL_INDEX,
                              destructiveButtonIndex: DESTRUCTIVE_INDEX,
                              title: "Options"
                            },
                            actionIndex => this.onOptionSelected(index, actionIndex)
                          )}>
                          <Left>
                            <Text
                            style={{ textDecorationLine: todo.isCompleted ? 'line-through' : 'none'}}>
                              {todo.text}
                            </Text>
                          </Left>
                          <Right>
                            <Icon name="arrow-forward"/>
                          </Right>
                        </ListItem>
                    )
                  })
                }
                </List>
              ) : (
                <Text style={styles.noContent}>No Content!!</Text>
              )
            }
          </Content>
          <Fab 
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.manageDialog()}>
              <Icon name="add" />
          </Fab>
          <DialogInput isDialogVisible={this.state.isDialogVisible}
              title={"Create Todo"}
              hintInput={"Enter"}
              submitText= {"Create"}
              submitInput={inputText => {this.sendInput(inputText)}}
              closeDialog={() => {this.manageDialog()}}>
          </DialogInput> 
        </Container>  
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  noContent: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    color: "#6f6f6f"
  }
});

export default App;