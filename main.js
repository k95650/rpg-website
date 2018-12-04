// Fuction constructor

var playerName = '';
var life = 10;
var attack = 'attack';
var pw = 1;

var player = {hp:10, at:1};
var enemy ={hp:10, at:1};


function begin(){
    document.getElementById("td-player-life").innerHTML ="HP: "+ player.hp;
    document.getElementById("td-enemy-life").innerHTML ="HP: "+ enemy.hp;
    document.getElementById("td-player-pw").innerHTML ="Power: " + pw;
    document.getElementById("td-enemy-pw").innerHTML = "Power: " + pw;

    return playerName;
}

function setPlayerName() {
    var x = document.getElementById("myName").value;
    document.getElementById("playerName").innerHTML = x;
    document.getElementById("myName").style.display = "none";
    document.getElementById('setName').style.display = 'none';

}
function hit() {
    enemy.hp = enemy.hp - player.at;
    player.hp = player.hp - enemy.at;
    document.getElementById("td-player-life").innerHTML ="HP: "+ player.hp;
    document.getElementById("td-enemy-life").innerHTML ="HP: "+ enemy.hp;
    console.log(enemy.hp);
    if (player.hp <= 0) {
        alert("GAME OVER!");
    }
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
 

} console.log(enemy.hp);







