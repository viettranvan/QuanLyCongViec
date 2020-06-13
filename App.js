import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import colors from './Colors';
import tempData from './tempData';
import ListWork from './components/ListWork';
import AddNewListModal from './components/AddNewListModal';
import Fire from './Fire';
import Colors from './Colors';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);


export default class App extends Component {

  state = {
    show: false, // ẩn/hiện modal
    lists: [],
    Selectindex: 0,
    user: {},
    loading: true
  }

  // phương thức được gọi khi component vừa được tạo ra
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert('Lỗi !!!');
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      
      this.setState({ user });
    });
  }

  // phương thức được gọi khi component bị xóa đi
  componentWillUnmount() {
    firebase.remove();
  }

  toggleModal() {
    this.setState({ show: !this.state.show })
  }

  renderList = (list, index) => {
    return <ListWork list={list} updateList={this.updateList} />
  }

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      work: [],
    })
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  render() {
    // chờ loading firebase
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={Colors.blue} />
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <ImageBackground source={require('./background/main-background.jpg')} style={styles.container}>
        <Modal
          animationType='fade'
          visible={this.state.show}
          onRequestClose={() => this.toggleModal()}
        >
          <AddNewListModal closeModal={() => this.toggleModal()} addList={this.addList} />
        </Modal>

        {/* Tiêu đề */}
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <View style={styles.divider} />
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.white }}>Quản Lý
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: colors.blue }}> Công Việc</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        {/* button thêm list */}
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
          <TouchableOpacity style={styles.addNewList} onPress={() => this.toggleModal()}>
            <Text style={{ margin: 3, fontSize: 15, fontWeight: '800' }}>Thêm list</Text>
          </TouchableOpacity>
        </View>

        {/* danh sách các list công việc */}
        <View style={{ height: 450, padding: 15 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            //horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => this.renderList(item, index)}
            keyboardShouldPersistTaps='always'
          />

        </View>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // resizeMode: 'cover',
  },
  divider: {
    flex: 1,
    height: 4,
    backgroundColor: colors.blue,
    alignSelf: 'center'
  },
  addNewList: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    height: 30,
    backgroundColor: colors.lightBlue
  }
});