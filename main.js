// Fuction constructor

var playerName = '';
var life = 10;
var attack = 'attack';
var pw = 1;

var player = {hp:10, at:1};
var enemy ={hp:10, at:1};


function setPlayerName() {
    var x = document.getElementById("myName").value;
    document.getElementById("playerName").innerHTML = x;
    document.getElementById("myName").style.display = "none";
    document.getElementById('setName').style.display = 'none';
    document.getElementById("td-player-life").innerHTML = life;
    document.getElementById("td-enemy-life").innerHTML = life;
    document.getElementById("td-player-pw").innerHTML = pw;
    document.getElementById("td-enemy-pw").innerHTML = pw;
    console.log(x);
    return playerName;
}
function hit() {
    function add() {
        
        return player.at + enemy.hp;
       }
           console.log(enemy.hp);
           return add;
}
function hit2() {
    var x = document.getElementById("td-player-life").value;
    var y = document.getElementById("td-enemy-life").value;
    var a = document.getElementById("td-player-pw").value;
    var b = document.getElementById("td-enemy-pw").value;
    document.getElementById("td-player-life").innerHTML = z;
    document.getElementById("td-enemy-life").innerHTML = c;
    var z = parseInt(x) + parseInt(b);
    var c = parseInt(y) + parseInt(a);
 

} console.log(player.at);





