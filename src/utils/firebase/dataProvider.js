import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from 'react-admin-firebase'

const config = {
  apiKey: 'AIzaSyDpDrgUW6crHfEWIbLvUC1s51vj73BXy70',
  authDomain: 'react-admin-e3ca5.firebaseapp.com',
  databaseURL: 'https://react-admin-e3ca5.firebaseio.com',
  projectId: 'react-admin-e3ca5',
  storageBucket: 'react-admin-e3ca5.appspot.com',
  messagingSenderId: '575527788161',
  appId: '1:575527788161:web:66e4b92d068f026a63b780',
} 

const options = {}

export const dataProvider = FirebaseDataProvider(config, options)
export const authProvider = FirebaseAuthProvider(config, options)
