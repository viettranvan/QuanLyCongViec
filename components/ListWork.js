// danh sạch hiển công việc hiển thị trong FlatList     ** TodoList
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import colors from '../Colors';
import AddWorkModal from './AddWorkModal';
import { Swipeable } from 'react-native-gesture-handler';

const RightAction = () => {
    return (
        <View style={styles.deleteListContainer}>
            <TouchableOpacity style={styles.deleteList}>
                <Text style={styles.delete}>Xóa List</Text>
            </TouchableOpacity>

        </View>
    );
}
export default class ListWork extends React.Component {
    state = {
        show: false
    }
    toggleModal() {
        this.setState({ show: !this.state.show })
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
            <Swipeable renderRightActions={RightAction}>
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
                        <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.paragraph}>Số lượng công việc : {WorkAmount}</Text>
                            {/* <Text style={[styles.paragraph, { fontSize: 16 }]}>{WorkAmount}</Text> */}
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.paragraph}>Đã hoàn thành : {CompletedAmount}</Text>
                            {/* <Text style={[styles.paragraph, { fontSize: 16 }]}>{CompletedAmount}</Text> */}
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.paragraph}>Chưa hoàn thành : {RemainingAmount}</Text>
                            {/* <Text style={[styles.paragraph, { fontSize: 14 }]}>{RemainingAmount}</Text> */}
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
        //paddingVertical: 32,
        //paddingHorizontal: 12,
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
        paddingBottom: 10
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
        borderWidth:1,
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
    }
});