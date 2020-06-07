// Modal thêm công việc mới         ** TodoModal
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ImageBackground, Modal, Animated, Keyboard, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Colors from '../Colors';
import RenameListMoadl from './RenameListMoadl';




export default class AddWorkModal extends React.Component {
    state = {
        // name: this.props.list.name,
        // color: this.props.list.color,
        // work: this.props.list.work
        showRename: false,
        newWork: ''
    }
    

    // chuyển đổi trạng thái công việc, truyền vào index là chỉ số của công việc
    toggleWorkCompleted = index => {
        let list = this.props.list;
        list.work[index].completed = !list.work[index].completed;

        this.props.updateList(list);
    };

    // thêm 1 công việc mới
    addWork() {
        let list = this.props.list;

        if(this.state.newWork === ''){
            Alert.alert(
                'Thông báo',
                'Vui lòng nhập tên công việc!'
            )
        }
        else if(!list.work.some(todo => todo.title === this.state.newWork && this.state.newWork !== '')){
          
            list.work.push({
                title: this.state.newWork,
                completed: false
            });
            
            this.props.updateList(list);
        }
        this.setState({ newWork: '' });
        //Keyboard.dismiss();
    }

    // thao tác xóa
    deleteWork = index => {
        let list = this.props.list
        
        list.work.splice(index,1);
        this.props.updateList(list);
        Alert.alert(
            'Thông báo',
            'Xóa thành công'
        );
    }

    // Hiện bảng thông báo có muốn xóa hay không
    deleteOption= index =>{
        Alert.alert(
            'Thông báo',
            'Bạn có muốn xóa không ?',
            [
                {text: 'Không', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
                {text: 'Có', onPress: () => this.deleteWork(index)}
            ]
        );
    }

    renderWork = (todo, index) => {
        return (
            <View style={styles.workContainer}>
                <TouchableOpacity onPress={() => this.toggleWorkCompleted(index)}>
                    <Ionicons
                        name={todo.completed ? 'md-square' : 'md-square-outline'}   // nếu công việc đã hoàn thành thì tô đậm icon, chưa thì để icon k tô
                        size={30}
                        color={Colors.darkGreen}
                    />
                </TouchableOpacity>
                <Text style={[
                    styles.workList,
                    { textDecorationLine: todo.completed ? 'underline' : 'none' },  // nếu công việc đã hoàn thành thì gạch chân công việc đó
                    { color: todo.completed ? Colors.red : Colors.black }           // và đổi màu text thành màu đỏ
                ]}>
                    {todo.title}
                </Text>
                <TouchableOpacity style={{position:'absolute',right:10}} onPress={() => this.deleteOption(index)}>
                    <AntDesign name='delete' size={24} color={Colors.black}/>
                </TouchableOpacity>
            </View>
        );
    }
    rightActions = (dragX, index) => {
        return (
            <TouchableOpacity>
                <Animated.View>
                    <Animated.Text>Delete</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
    toggleRenameModal() {
        this.setState({ showRename: !this.state.showRename });
    }


    render() {
        const list = this.props.list;
        // tổng số lượng công việc
        const WorkAmount = list.work.length;
        // số lượng công việc đã hoàn thành (conpleted=true) : list.work -> work trong tempData.js
        const CompletedAmount = list.work.filter(todo => todo.completed).length;

        return (
            <ImageBackground source={require('../background/background-hoa.png')} style={{ flex: 1 }}>

                {/* Modal đổi tên list */}
                <Modal
                    animationType='fade'
                    visible={this.state.showRename}
                    onRequestClose={() => this.toggleRenameModal()}

                >
                    <RenameListMoadl list={list} closeModal={() => this.toggleRenameModal()} updateList={this.props.updateList}/>
                </Modal>

                {/* nút thoát và header */}
                <View style={{ flex: 3 }}>
                    <TouchableOpacity style={styles.close} onPress={this.props.closeModal}>
                        <AntDesign name='close' size={24} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={[styles.header, { borderBottomColor: list.color }]}>
                        <Text style={{
                            fontSize: 36,
                            fontWeight: 'bold',
                            fontStyle: 'italic'
                        }}>
                            {list.name}
                        </Text>
                        <Text style={{ fontStyle: 'italic' }}>Đã hoàn thành {CompletedAmount} trong {WorkAmount} công việc</Text>

                        {/* chỉnh sửa tên list */}
                        <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10 }} onPress={() => this.toggleRenameModal()}>
                            <AntDesign name='edit' size={24} color={Colors.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* danh sách công việc */}
                <View style={{ flex: 12 }}>
                    <FlatList
                        data={list.work}
                        renderItem={({ item, index }) => this.renderWork(item, index)}
                        keyExtractor={(_, index) => index.toString()}
                        //contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        //showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* textinput */}
                <View style={styles.footer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập công việc mới'
                        onChangeText={text => this.setState({ newWork: text })}
                        value={this.state.newWork}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={() => this.addWork()}>
                        <AntDesign name='plus' size={24} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10
    },
    header: {
        flex: 1,
        alignSelf: 'stretch',
        borderBottomWidth: 4,
        justifyContent: 'flex-end',
        marginLeft: 32,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        marginLeft: 20,
        marginRight: 10,
        width: 260
    },
    footer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        borderWidth: 1,
        padding: 6,
        borderRadius: 4,
        backgroundColor: Colors.lightBlue
    },
    workList: {
        fontSize: 24,
        fontWeight: '700',
        padding: 5,
        paddingLeft: 20
    },
    workContainer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
});