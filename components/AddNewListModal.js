// Modal thêm 1 danh sách công việc mới         **addListModal
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Colors';


export default class AddNewListModal extends React.Component {
    backgroundColor = ['#24A6D9', '#A7CBD9', '#EBE306', '#19925B', '#800080', '#F70F32', '#FF69B4'];

    state = {
        name: '',
        color: this.backgroundColor[0]
    }

    renderColor() {
        return this.backgroundColor.map(color => {
            return (
                <TouchableOpacity
                    style={{ height: 30, width: 30, borderRadius: 8, backgroundColor: color }}
                    key={color}
                    onPress={() => this.setState({ color })}
                />
            );
        });
    }

    // tạo danh sách mới
    createNewList() {
        const { name, color } = this.state

        const list = { name, color };
        this.props.addList(list);

        this.setState({ name: '' })
        Alert.alert(
            'Thông báo',
            'Thêm mới thành cônng!!'
        );
        this.props.closeModal();
    }

    // kiểm tra text input có rỗng hay không: rống -> alert
    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.name != '') {
            this.createNewList();
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập tên');
        }
    };

    render() {
        return (
            <ImageBackground source={require('../background/newList-background.jpg')} style={styles.container}>
                {/* thoát Modal */}
                <TouchableOpacity style={styles.close} onPress={this.props.closeModal}>
                    <AntDesign name='close' size={24} color={Colors.black} />
                </TouchableOpacity>

                {/* tiêu đề và thẻ textInput */}
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.AddListTitle}>Thêm Danh Sách Mới</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập tên danh sách'
                        onChangeText={text => this.setState({ name: text })}
                    />
                </View>

                {/* render màu */}
                <View style={styles.setColor}>
                    <Text
                        style={{
                            fontWeight: '800',
                            fontSize: 14,
                            color: Colors.black
                        }}
                    >
                        Chọn màu:
                    </Text>
                    {this.renderColor()}
                </View>

                {/* nút submit */}
                <TouchableOpacity style={[styles.button, { backgroundColor: this.state.color }]} onPress={() => this.CheckTextInput()}>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>Đồng ý</Text>
                </TouchableOpacity>

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
        top: 12,
        right: 12
    },
    AddListTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.green
    },
    input: {
        borderWidth: 2,
        borderRadius: 4,
        marginTop: 8,
        height: 40,
        padding: 8,
        width: 280,
        color: Colors.black
    },
    setColor: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    }
});