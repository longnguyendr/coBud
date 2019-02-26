import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Row,
  Label,
  Right,
  Thumbnail,
  Button
} from 'native-base';
import { Alert, ListView, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MainFooterBar from '../common/MainFooterBar';
import { loadFriendList, navigateToConnections } from '../../actions';

const image1 = require('./images/business.png');

const image2 = require('./images/facebook.png');

const image3 = require('./images/linkedin.png');

const image4 = require('./images/tweet.png');

const data = [
  {
    id: 1,
    first_name: 'Google Business',
    message: 'I just need to be alone',
    image: image1
  },
  {
    id: 2,
    first_name: 'Facebook',
    message: 'What is in your mind ?',
    image: image2
  },
  {
    id: 2,
    first_name: 'LinkedIn',
    message: 'I got a new connection for you',
    image: image3
  },
  {
    id: 2,
    first_name: 'Tweeter',
    message: 'Hashtag has changed your business',
    image: image4
  }
];

class Connections extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: data
    };
  }
  componentDidMount() {
    this.props.navigateToConnections();
    Keyboard.dismiss();
    this.props.loadFriendList();
  }

  componentWillUnmount() {
    Actions.pop();
  }

  // deleteRow(secId, rowId, rowMap) {
  //   rowMap[`${secId}${rowId}`].props.closeRow();
  //   const newData = [...this.state.listViewData];
  //   newData.splice(rowId, 1);
  //   this.setState({ listViewData: newData });
  // }

  aler(msg) {
    console.log(msg);
  }

  render() {
    const { userDetails } = this.props;
    console.log('userDetails load from connection');
    console.log(userDetails);
    console.log('userDetails load from connection');

    const showUserList = userDetails.map(val => {
      console.log(val);
      return (
        <ListItem avatar>
          <Left>
            <Thumbnail source={image1} />
          </Left>
          <Body>
            <Button id={val.userUid} onPress={() => Actions.chat({ uid: val.userUid })}>
              <Text>{val.userName ? val.userName : val.userEmail}</Text>
            </Button>
          </Body>
        </ListItem>
      );
    });

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <Content>
          <Button onPress={() => Actions.chat()}>
            <Text>Chat Here</Text>
          </Button>
          <Item>
            <Left>
              <Text style={styles.textTitle}>My Connections</Text>
            </Left>
            <Right>
              <Button transparent primary style={{ marginRight: 19 }}>
                <Icon name="person-add" />
              </Button>
            </Right>
          </Item>
          {showUserList}
          {/* <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={rowData => (
              <TouchableOpacity style={{ marginHorizontal: 28 }}>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={rowData.image} />
                  </Left>
                  <Body>
                    <Text>{rowData.first_name}</Text>
                    <Text note>{rowData.message}</Text>
                  </Body>
                </ListItem>
              </TouchableOpacity>
            )}
            renderLeftHiddenRow={rowData => (
              <Button
                full
                success
                onPress={() =>
                  Alert.alert('User info', rowData.first_name, [
                    { text: 'OK', onPress: () => console.log('OK Pressed!') }
                  ])
                }
              >
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(rowData, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() =>
                  Alert.alert(
                    'Warning',
                    'Do you want to delete it ?',
                    [
                      { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                      { text: 'OK', onPress: () => this.deleteRow(secId, rowId, rowMap) }
                    ],
                    { cancelable: true }
                  )
                }
              >
                <Icon active name="trash" />
              </Button>
            )}
          /> */}
        </Content>
        <MainFooterBar page={this.props.sceneKey} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    flex: 1,
    color: '#3F51B5',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 40,
    marginLeft: 28
  }
});
const mapStateToProps = ({ auth }) => {
  const { userDetails } = auth;
  return { userDetails };
};
export default connect(
  mapStateToProps,
  { loadFriendList, navigateToConnections }
)(Connections, List);
