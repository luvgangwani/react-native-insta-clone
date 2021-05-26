import firebase from 'firebase';
import { FETCH_USER, USER_REGISTER } from './types';

export const fetchUser = () => (dispatch) => {
    firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
        const { exists, data } = snapshot;
        if (exists) dispatch({ type: FETCH_USER, payload: data });
        else console.log('User does not exist!');
    });

}

export const register = (newUser) => (dispatch) => {
    const { name, email, password } = newUser;
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.id)
        .set({
            name,
            email
        })
        .then((doc) => dispatch({ type: USER_REGISTER, payload: { ...doc }}))
    })
}