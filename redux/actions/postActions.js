import firebase from 'firebase';
import { SET_USER_POSTS_STATE } from './types';

export const fetchUserPosts = () => (dispatch) => {
    firebase
    .firestore()
    .collection('posts')
    .doc(firebase.auth().currentUser.uid)
    .collection('userPosts')
    .orderBy('creation', 'asc')
    .get()
    .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
            const { caption, downloadURL } = doc.data();
            // construct a return object containing the id, downloadURL and caption
            return { id: doc.id, downloadURL, caption };
        });
        console.log(`Dispatching ${SET_USER_POSTS_STATE} action from fetchUserPosts...`);
        dispatch({ type: SET_USER_POSTS_STATE, payload: posts });
    });
}