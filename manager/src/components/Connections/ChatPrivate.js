import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text,
  Button,
  Form,
  Left,
  Label,
  Row
} from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import MainFooterBar from "../common/MainFooterBar";
import { navigateToConnections } from "../../actions/NavigationActions";
import {
  UserInputHandle,
  sendPrivateMessage,
  loadPrivateMessages
} from "../../actions";

class ChatPrivate extends Component {
  state = { messageInput: "" };
  componentDidMount() {
    this.props.navigateToConnections();
    this.props.loadMessages(this.props.uid);
  }
  componentWillUnmount() {
    Actions.pop();
  }

  onButtonPress() {
    const { messageInput } = this.state;
    // console.log('login user');
    const { uid } = this.props;

    // this.props.UserInputHandle(messageInput);
    this.props.sendPrivateMessage(messageInput, uid);
    this.setState({
      messageInput: ""
    });
    this.props.loadPrivateMessages(uid);
  }

  UserInputHandle(text) {
    this.setState({
      messageInput: text
    });
  }

  render() {
    const { messageInput } = this.state;
    const { messageOutput } = this.props;
    // console.log(messageOutput);
    const data = messageOutput.map(val => {
      console.log(val);
      return (
        <Row>
          <Item>
            <Label>{val.user.name}</Label>
          </Item>
          <Item>
            <Text>{val.user.text}</Text>
          </Item>
        </Row>
      );
    });

    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button
              iconLeft
              onPress={() => Actions.connectionsHome()}
              transparent
            >
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
        </Header>
        <Content>
          <Item>
            <Text>connections</Text>
          </Item>
          <Form>
            <Item>
              <Input
                onChangeText={this.UserInputHandle.bind(this)}
                value={messageInput}
              />

              <Button onPress={() => this.onButtonPress()}>
                <Text>Send chat</Text>
              </Button>
            </Item>
          </Form>
          <Item>
            <Text>Message show here</Text>
          </Item>
          {data}
        </Content>
        <MainFooterBar page={this.props.sceneKey} />
      </Container>
    );
  }
}
const mapStateToProps = ({ chatPrivate }) => {
  const { messageInput, messageOutput } = chatPrivate;
  return { messageInput, messageOutput };
};
export default connect(
  mapStateToProps,
  { sendPrivateMessage, loadPrivateMessages, navigateToConnections }
)(ChatPrivate);
