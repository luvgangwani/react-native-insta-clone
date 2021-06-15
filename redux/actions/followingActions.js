import firebase from 'firebase';
import { SET_USER_FOLLOWING_STATE } from './types';

export const registerFetchListenerForUserFollowing = () => (dispatch) => {
    firebase
    .firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowing')
    .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
            const id = doc.id;
            return id;
        });
        dispatch({ type: SET_USER_FOLLOWING_STATE, payload: following });
    });
};