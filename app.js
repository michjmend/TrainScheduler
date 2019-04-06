  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuW4am7X3sGw_mJTRx3k_U17ol2GvIvdw",
    authDomain: "train-project-b601f.firebaseapp.com",
    databaseURL: "https://train-project-b601f.firebaseio.com",
    projectId: "train-project-b601f",
    storageBucket: "train-project-b601f.appspot.com",
    messagingSenderId: "823317561192"
  };

  firebase.initializeApp(config);

  var database = firebase.database()

  $("#submit").on("click", function(event){
    event.preventDefault()
    var name = $("#train-name").val().trim()
    var destination = $("#destination").val().trim()
    var firstTrainTime = $("#first-train-time").val().trim()
    var frequency = $("#frequency").val().trim()

    firstTrainTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrainTime), "minutes");

    var tRemainder = diffTime % frequency;

    var minutesAway = frequency - tRemainder;

    var nextArrival = moment().add(minutesAway, "minutes");

// I am unable to get the minutes away and next arrival fixed :(
  //also unable to get things t push up
  //cant figure out why the console log says that firstTrainTime is not defined when it definitely is!!

    database.ref().push({
      name : name,
      destination : destination,
      // firstTrainTime : firstTrainTime,
      frequency : frequency,
    })

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("")
  })

  database.ref().on("child_added", function(childSnapshot) {
    var newLine = childSnapshot.val();
    console.log(newLine);
    $("#table-area").append("<tr>")
    $("#table-area").append("<td>" + newLine.name)
    $("#table-area").append("<td>" + newLine.destination)
    $("#table-area").append("<td>" + newLine.frequency)
    $("#table-area").append("<td>" + newLine.nextArrival)
    $("#table-area").append("<td>" + newLine.minutesAway)
  });
