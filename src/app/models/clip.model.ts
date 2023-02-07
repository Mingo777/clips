import firebase from 'firebase/compat/app'


export default interface Clip {
docId?:string
 displayName: string;
 title:string;
 fileName:string;
 url: string;
 screenshotURL:string;
 timestamp: firebase.firestore.FieldValue;
 screenshotFileName:string;

}