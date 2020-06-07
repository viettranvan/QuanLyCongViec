import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD4FLrVvd2SENCXzxPenBnbsIL3olCaqlU",
    authDomain: "todolist-f1641.firebaseapp.com",
    databaseURL: "https://todolist-f1641.firebaseio.com",
    projectId: "todolist-f1641",
    storageBucket: "todolist-f1641.appspot.com",
    messagingSenderId: "302221914342",
    appId: "1:302221914342:web:0f13425ad712051fd94b27"
};

class Fire{
    constructor(callback){
        this.init(callback)
    }
    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                callback(null,user)
            }else{
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }
    getLists(callback){
        let ref = this.ref;
        // hủy đăng ký
        this.unsubcribe = ref.onSnapshot(snapshot => {
            lists = []
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data() });
            });
            callback(lists);
        });
    }

    addList(list){
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }


    get userID(){
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase.firestore().collection('users').doc(this.userID).collection('lists');
    }

    remove(){
        this.unsubcribe;
    }
}

export default Fire;

