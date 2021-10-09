// Initialize Firebase with config
var config = {
    apiKey: "AIzaSyABa2n-PNSagbG9rNR8DFWnOe4zMn-UYpc",
    authDomain: "takeanumber-tech.firebaseapp.com",
    databaseURL: "https://takeanumber-tech.firebaseio.com",
    projectId: "takeanumber-tech",
};
firebase.initializeApp(config);

// make firestore reference
const db = firebase.firestore();

// update firestore settings
db.settings({ timestampsInSnapshots: true });

// Initialize arrays to be used later
let customerInfo = [];
let transactionsOnly = [];
let transactionContent = [];
var flattenedTransactions = [];

// Reference to customer data in Firebase database
const customerdbRef = firebase.database().ref('users/customers/bellsSweetFactory');
// Grab customer phone number data from Firebase
customerdbRef.on('value', function (snapshot) {
    // Push phone number data from Firebase into Array
    snapshot.forEach(function (childSnapshot) {
        customerInfo.push([childSnapshot.val().phone, childSnapshot.val().lastActiveDate, childSnapshot.val().lastActiveTime]);
    });
});

// Reference to transaction data in Firebase database
const dbRef = firebase.database().ref('restaurants/bellsSweetFactory');
// Grab transation data from Firebase
dbRef.on('value', function (snapshot) {
    // Push transaction data by date from Firebase into transactionContent array
    snapshot.forEach(function (childSnapshot) {
        transactionContent.push(childSnapshot.val());
    });
    // Remove restaurant client_info node from the transactionContent 
    transactionContent.forEach(function (element) {
        if (!element.address) {
            transactionsOnly.push(element);
        }
    })
    // Loop through dates of transactions
    $.each(transactionsOnly, function (index, res) {
        // Push individual transactions into flattenedTransactions
        $.each(res, function (key, value) {
            flattenedTransactions.push(value);
        });
    });
});
