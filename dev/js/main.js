"use strict";

var inputAllFriends = document.getElementById("serchAllFriends");
var inputAddFriends = document.getElementById("serchAddFriends");

//если информация сохранена
if (localStorage.content) {
    document.querySelector(".friends").innerHTML = localStorage.content;
}

//поиск по всем друзьям
inputAllFriends.addEventListener("input", function () {
    var allFriends = document.querySelectorAll(".all-friends li");

    search(inputAllFriends, allFriends);
});

//поиск по выбраным друзьям
inputAddFriends.addEventListener("input", function () {
    var addFriends = document.querySelectorAll(".add-friends li");

    search(inputAddFriends, addFriends);
});

//drag'n'drop
var active = void 0;
var elem = void 0;
var leftX = void 0;
var topY = void 0;
var width = void 0;
var addFriends = document.querySelector(".add-friends");
var coordsAddFriends = addFriends.getBoundingClientRect();
var allFriends = document.querySelector(".all-friends");
var coordsAllFriends = allFriends.getBoundingClientRect();
var coordsElem = void 0;

//нажали на кнопку мышки
document.body.addEventListener("mousedown", function (e) {

    if (e.which != 1) {
        return;
    }

    //добавить в список друзей
    if (e.target.getAttribute("class") === "glyphicon glyphicon-plus") {
        //console.log(123);
        e.target.setAttribute("class", "glyphicon glyphicon-remove");
        var li = e.target.parentElement;
        document.querySelector(".add-friends ul").appendChild(li);
        return;
    }

    //удалить из списка друзей
    if (e.target.getAttribute("class") === "glyphicon glyphicon-remove") {
        e.target.setAttribute("class", "glyphicon glyphicon-plus");
        var _li = e.target.parentElement;
        document.querySelector(".all-friends ul").appendChild(_li);
        return;
    }

    active = true;
    elem = e.target.closest("li");

    if (elem !== null) {
        elem.style.backgroundColor = "#f0f0f0";
    }

    if (elem) {
        coordsElem = elem.getBoundingClientRect();
        leftX = e.offsetX;
        topY = e.offsetY;
        width = coordsElem.width;
    }
});

//отпустили кнопку мышки
document.body.addEventListener("mouseup", function (e) {

    if (e.which != 1) {
        return;
    }

    active = false;

    if (elem) {
        elem.style.backgroundColor = "#fff";

        //если элемент попал в блок add-friends добавляем элемент в этот блок
        if (parseInt(elem.style.left) >= coordsAddFriends.left && parseInt(elem.style.left) <= coordsAddFriends.right && parseInt(elem.style.top) >= coordsAddFriends.top && parseInt(elem.style.top) <= coordsAddFriends.bottom) {

            elem.className = "";
            elem.style = "";
            elem.querySelector("span").className = "glyphicon glyphicon-remove";
            document.querySelector(".add-friends ul").appendChild(elem);
            document.querySelector(".add-friends").style.backgroundColor = "#fff";
        } else if (parseInt(elem.style.left) >= coordsAllFriends.left && parseInt(elem.style.left) <= coordsAllFriends.right && parseInt(elem.style.top) >= coordsAllFriends.top && parseInt(elem.style.top) <= coordsAllFriends.bottom) {
            //если элемент попал в блок all-friends добавляем элемент в этот блок
            elem.className = "";
            elem.style = "";
            elem.querySelector("span").className = "glyphicon glyphicon-plus";
            document.querySelector(".all-friends ul").appendChild(elem);
            document.querySelector(".all-friends").style.backgroundColor = "#fff";
        }
    }
});

//передвижение мышки по экрану
document.addEventListener("mousemove", function (e) {
    if (active) {
        elem.className = "selected";
        elem.style.width = width + "px";
        elem.style.backgroundColor = "#f0f0f0";
        document.body.appendChild(elem);
        document.body.style.userSelect = "none";
        elem.style.top = e.clientY - topY + "px";
        elem.style.left = e.clientX - leftX + "px";

        //если элемент попал в блок add-friends меняем цвет фона
        if (parseInt(elem.style.left) >= coordsAddFriends.left && parseInt(elem.style.left) <= coordsAddFriends.right && parseInt(elem.style.top) >= coordsAddFriends.top && parseInt(elem.style.top) <= coordsAddFriends.bottom) {
            document.querySelector(".add-friends").style.backgroundColor = "#f0f0f0";
        } else {
            document.querySelector(".add-friends").style.backgroundColor = "#fff";
        }

        //если элемент попал в блок all-friends меняем цвет фона
        if (parseInt(elem.style.left) >= coordsAllFriends.left && parseInt(elem.style.left) <= coordsAllFriends.right && parseInt(elem.style.top) >= coordsAllFriends.top && parseInt(elem.style.top) <= coordsAllFriends.bottom) {
            document.querySelector(".all-friends").style.backgroundColor = "#f0f0f0";
        } else {
            document.querySelector(".all-friends").style.backgroundColor = "#fff";
        }
    }
});

//save
document.querySelector("#save").addEventListener("click", function () {
    var content = document.querySelector(".friends").innerHTML;
    localStorage.content = content;
});

//функция поиска по друзьям
function search(input, friendColl) {
    var serchStr = '';
    serchStr = input.value.toLowerCase();

    for (var i = 0; i < friendColl.length; i++) {
        var friend = friendColl[i].querySelector("h3").innerText.toLowerCase();

        if (serchStr === friend.slice(0, serchStr.length)) {
            friendColl[i].style.display = "block";
        } else {
            friendColl[i].style.display = "none";
        }
    }
}