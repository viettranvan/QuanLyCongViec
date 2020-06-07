import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ImageBackground,ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
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
    user: {},
    loading: true
  }

  // phương thức được gọi khi component vừa được tạo ra
  componentDidMount(){
    firebase = new Fire((error, user) =>{
      if(error){
        return alert('Lỗi !!!');
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({loading: false});
        });
      });

      this.setState({user});
    });
  }

  // phương thức được gọi khi component bị xóa đi
  componentWillUnmount(){
    firebase.remove();
  }

  toggleModal() {
    this.setState({ show: !this.state.show })
  }

  renderList=list => {
    return <ListWork list = {list} updateList={this.updateList}/>
  }

  addList = list => {
    /*
    // thêm list: lists mới đc cập nhật lại bằng cách copy lại list cũ (...this.state.list) rồi thêm 1 list vào cuối
    // {...list, id: this.state.lists.length + 1, work: []}: ...list=> copy {name,color}, id: giá trị hiện tại + thêm 1, work: []
    this.setState({lists: [...this.state.lists,{...list, id: this.state.lists.length + 1, work: []}] }); // toán tử ... dùng để copy
    */
    firebase.addList({
      name: list.name,
      color: list.color,
      work: []
    })
  };

  updateList = list =>{
    // this.setState({
    //   lists: this.state.lists.map(item =>{
    //     return item.id === list.id ? list:item
    //   })
    // })
    firebase.updateList(list);
  };

  render() {
    // chờ loading firebase
    if(this.state.loading){
      return(
        <View style={styles.container}>
            <ActivityIndicator size='large' color={Colors.blue} />
            <Text>Loading</Text>
        </View>
      );
    }
    return (
      <ImageBackground source={require('./background/note-background.jpg')} style={styles.container}>
        <Modal
          animationType='fade'
          visible={this.state.show}
          onRequestClose={() => this.toggleModal()}
        >
          <AddNewListModal closeModal={() => this.toggleModal()} addList={this.addList} />
        </Modal>

        {/* User
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View> 
        */}

        {/* Tiêu đề */}
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <View style={styles.divider} />
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Quản Lý
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: colors.blue }}> Công Việc</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        {/* button thêm list */}
        <View style={{ paddingTop: 10, paddingBottom:20 }}>
          <TouchableOpacity style={styles.addNewList} onPress={() => this.toggleModal()}>
            <Text style={{ margin: 3, fontSize: 15, fontWeight: '800' }}>Thêm list</Text>
          </TouchableOpacity>
        </View>

        {/* danh sách các list công việc */}
        <View style={{ height: 400, padding: 20 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            //horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>   this.renderList(item)}
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