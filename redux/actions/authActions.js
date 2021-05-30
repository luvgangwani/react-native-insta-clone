import firebase from 'firebase';
import { SET_AUTH_USER_STATE } from './types';

/* export const fetchUser = () => (dispatch) => {
    console.log(`Signed in user: ${JSON.stringify(firebase.auth().currentUser)}` );
    firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
        const { exists, data } = snapshot;
        console.log(`Exists: ${exists}`);
        if (exists) {
            console.log(`Fetched data from 'users' collection. User: ${data()}`);
            dispatch({ type: FETCH_USER, payload: data() })
        }
        else console.log('User does not exist!');
    })
    .catch((error) => {
        console.log('Error:', error);
    });

} */

export const register = (newUser) => (dispatch) => {
    const { name, email, password } = newUser;
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
        console.log(`Created user: ${JSON.stringify(user)}`);
        firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
            name,
            email
        })
        .then(() => {
            const { uid, email } = user;
            console.log(`Added user to the users collection: ${JSON.stringify(email)}`);
            // update the auth state with the recently added user
            console.log('Fetching recently regeistered user...');
            firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) dispatch({ type: SET_AUTH_USER_STATE, payload: snapshot.data() })
            })
            .catch(({ code, message }) => { console.log(`Error in retrieving registered user - ${code}: Message - ${ message }`)})
        })
        .catch(({ code, message }) => { console.log(`Error in registering to collection - ${code}: Message - ${ message }`)});
    })
    .catch(({ code, message }) => { console.log(`Error in registering user to auth - ${code}: Message - ${ message }`)});
}

export const logIn = (authInput) => () => {
    const { email, password } = authInput;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
        const { email } = user;
        console.log(`User ${ email } logged in!`);
    })
    .catch(({ code, message }) => {
        console.log(`Error in logging user in - ${code}: Message - ${message}`);
    });
};

export const verifyAuth = () => (dispatch) => {
    const type = SET_AUTH_USER_STATE;
    firebase
    .auth()
    .onAuthStateChanged(function(user) {
        if (user) {
            firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) dispatch({ type, payload: snapshot.data() });
            })
            .catch(({ code, message }) => { console.log(`Error in verifying auth - ${code}: Message - ${ message }`)});
        }
        else dispatch({ type, payload: null });
    });

}

export const logOut = () => (dispatch) => {
    console.log('Attempting to logout..')
    firebase.auth().signOut()
    .then(() => {
        dispatch({ type: SET_AUTH_USER_STATE, payload: null })
        console.log('Logout successful!')
    })
    .catch((error) => {
        const { code, message } = error;
        console.error(`Error in logging out - ${code}: Message - ${message}`);
    });
};
