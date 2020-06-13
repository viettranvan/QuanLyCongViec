import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Colors';


export default class RenameListModal extends React.Component {
    backgroundColor = ['#24A6D9', '#A7CBD9', '#EBE306', '#19925B', '#800080', '#F70F32', '#FF69B4'];
    state = {
        name: '',
        color: this.props.list.color
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

    // cập nhật lại tên list
    updateName() {
        let list = this.props.list;
        list.name = this.state.name;
        list.color = this.state.color;

        this.props.updateList(list);
        this.setState({ name: '' });
        Alert.alert(
            'Thông báo',
            'Cập nhật thành công'
        );
        this.props.closeModal();
        //Keyboard.dismiss();
    }

    // nếu state.name khác rỗng thì cập nhật lại tên list
    checkName = () => {
        //Handler for the Submit onPress

        if (this.state.name != '') {
            this.updateName();
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập tên mới');
        }
    };

    render() {
        let list = this.props.list
        return (
            // source={require('../background/rename-background.jpg')}
            <ImageBackground source={require('../background/rename-background.jpg')} style={styles.container}>
                {/* nút thoát */}
                <TouchableOpacity style={styles.close} onPress={this.props.closeModal}>
                    <AntDesign name='close' size={24} color={Colors.black} />
                </TouchableOpacity>

                {/* tên danh sách hiện tại */}
                <View style={{ borderBottomColor: list.color, borderBottomWidth: 3 }}>
                    <Text style={styles.title}>Tên danh sách hiện tại</Text>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                    >
                        {list.name}</Text>
                </View>

                {/* nhập tên mới cho list, defaultValue bằng tên hiện tại của list */}
                <View >
                    <Text style={styles.title}>Tên danh sách mới</Text>
                    <TextInput
                        defaultValue={list.name}
                        style={styles.inputNewName}
                        onChangeText={text => this.setState({ name: text })}
                    />
                </View>

                {/* chọn màu cho list */}
                <View style={styles.setColor}>
                    <Text style={{ color: Colors.black, fontWeight: 'bold' }}>Chọn màu:</Text>
                    {this.renderColor()}
                </View>

                {/* TouchableOpacity cập nhật lits */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={[styles.input, { backgroundColor: this.state.color }]}
                        onPress={() => this.checkName()}
                    >
                        <Text>Cập nhật</Text>
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
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: Colors.green
    },
    inputNewName: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
        fontWeight: '800',
        backgroundColor: Colors.lightGray2,
        fontSize: 16
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        backgroundColor: Colors.lightBlue
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 5
    },
    setColor: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
});