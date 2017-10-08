// Initialize Firebase
var config = {
  apiKey: "AIzaSyBFefooZ3Sg0KFBS2wzUbQCGmiR_NwzNXE",
  authDomain: "rps-multiplayer-game-ab04d.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-game-ab04d.firebaseio.com",
  projectId: "rps-multiplayer-game-ab04d",
  storageBucket: "rps-multiplayer-game-ab04d.appspot.com",
  messagingSenderId: "264694984836"
};
firebase.initializeApp(config);

//Global Variables
var database = firebase.database();
var player1, player2, user;

//Set player1 and player2 variables from database
database.ref('players').on('child_added', function(snapshot){
  if(snapshot.key == 1){
    player1 = snapshot.val();
    console.log(player1.name);
  } else if(snapshot.key == 2){
    player2 = snapshot.val();
    console.log(player2.name);
  }
});

//User Disconnects and Firebase is updated
database.ref('players').onDisconnect().set("disconnected");
database.ref('players').onDisconnect().remove();

//User Logs in
$('#submit').on('click', function(){
  database.ref('players').child('1').remove();
  var userName = $('#name').val();
  if(player1 == null || player1 == '' ){
    database.ref('players').child('1').set({ 
      name: userName,
      win: 0,
      loss: 0,
      player: 1
    })
    user = player1;
  } else if(player2 == null || player2 == '' ){
    database.ref('players').child('2').set({
      name: userName,
      win: 0,
      loss: 0,
      player: 2
    })
    user = player2;
  }
});


