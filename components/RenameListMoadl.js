import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Colors';

export default class RenameListModal extends React.Component {

    state = {
        name: '',
    }

    updateName(){
        let list = this.props.list;
        list.name = this.state.name;

        this.props.updateList(list);
        this.setState({ name: '' });
        Alert.alert(
            'Thông báo',
            'Cập nhật thành công'
        );
        this.props.closeModal();
        //Keyboard.dismiss();
    }

    checkName = () => {
        //Handler for the Submit onPress
        if (this.state.name != '') {
          this.updateName();
        } else {
          Alert.alert('Thông báo','Vui lòng nhập tên mới');
        }
      };

    render() {
        let list = this.props.list
        return (
            <ImageBackground source={require('../background/rename-background.jpg')} style={styles.container}>
                <TouchableOpacity style={styles.close} onPress={this.props.closeModal}>
                    <AntDesign name='close' size={24} color={Colors.black} />
                </TouchableOpacity>
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
                <View >
                    <Text style={styles.title}>Tên danh sách mới</Text>
                    <TextInput 
                        defaultValue={list.name} 
                        style={styles.inputNewName} 
                        onChangeText={text => this.setState({name: text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.input} onPress={() => this.checkName()}>
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
    }
});