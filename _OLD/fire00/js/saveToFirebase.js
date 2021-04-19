function saveToFirebase(inputData) {
    var dataObject = {
        inputData: inputData
    };

    firebase.database().ref('big-mass-of-data').push().set(dataObject)
        .then(function(snapshot) {
            console.log('haha Success!'); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}
