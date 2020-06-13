// danh sạch hiển công việc hiển thị trong FlatList     ** TodoList
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import colors from '../Colors';
import AddWorkModal from './AddWorkModal';
import { Swipeable } from 'react-native-gesture-handler';
import firebase, { firestore } from 'firebase';
import '@firebase/firestore';


export default class ListWork extends React.Component {



    // trượt sang phải để hiên TouchableOpacity Xóa list
    RightAction = (index) => {
        return (
            <View style={styles.deleteListContainer}>
                <TouchableOpacity style={styles.deleteList} onPress={() => this.deleteListOtion()}>
                    <Text style={styles.delete}>Xóa List</Text>
                </TouchableOpacity>

            </View>
        );
    }
    state = {
        show: false
    }
    toggleModal() {
        this.setState({ show: !this.state.show })
    }

    // option xóa,  hiện thông báo muốn xóa
    deleteListOtion(){
        Alert.alert(
            'Thông báo',
            'Tất cả dữ liệu bên trong List cũng đồng thời bị xóa!!!\nBạn có thực sự muốn xóa hay không ?',
            [
                { text: 'Không', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                { text: 'Có', onPress: () => this.delete() }
            ]
        );
    }

    // thực hiện xóa list
    delete = () => {
        let ref = this.ref;
        ref.doc(this.listID).delete();

        Alert.alert(
            'Thông báo',
            'Xóa thành công'
        );
    }

    // lấu userID
    get userID() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase.firestore().collection('users').doc(this.userID).collection('lists');
    }

    // lấy ID của list
    get listID(){
        return this.props.list.id
    }


    render() {
        const list = this.props.list
        // tổng số lượng công việc
        const WorkAmount = list.work.length;
        // số lượng công việc đã hoàn thành (conpleted=true) : list.work -> work trong tempData.js
        const CompletedAmount = list.work.filter(todo => todo.completed).length;
        // số lượng công việc chưa hoàn thành
        const RemainingAmount = WorkAmount - CompletedAmount;

        return (
            <Swipeable renderRightActions={this.RightAction}>
                <View>

                    {/* Modal thêm công việc mới: AddWorkModal */}
                    <Modal
                        animationType='fade'
                        visible={this.state.show}
                        onRequestClose={() => this.toggleModal()}
                    >
                        <AddWorkModal list={list} closeModal={() => this.toggleModal()} updateList={this.props.updateList} />
                    </Modal>

                    {/* cái list là TouchableOpacity, ấn vào để chuyển qua Modal thêm công việc mới */}
                    <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => this.toggleModal()}>

                        <Text style={
                            [styles.listTitle,
                            { textDecorationLine: (CompletedAmount === WorkAmount && WorkAmount !== 0) ? 'line-through' : 'none' },
                            { color: CompletedAmount === WorkAmount ? colors.black : colors.white },
                            { color: WorkAmount === 0 ? colors.brown : colors.white}
                            ]}
                            numberOfLines={1}
                        >
                            {list.name}
                        </Text>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.paragraph}>Số lượng công việc : {WorkAmount}</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.paragraph}>Đã hoàn thành : {CompletedAmount}</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.paragraph}>Chưa hoàn thành : {RemainingAmount}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Swipeable>

        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: 300,
        height: 150,
        justifyContent: 'center',
        borderRadius: 4,
        marginVertical: 12,
        alignItems: 'center'
    },
    listTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        paddingBottom: 5
    },
    paragraph: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.white,
        textAlign: 'center'
    },
    deleteListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        marginLeft: 5
    },
    deleteList: {
        borderWidth: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 4,
        backgroundColor: colors.red
    },
    delete: {
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '800',
        color: colors.white
    },
    imageStyle: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 10,
        right: 10
    }

});