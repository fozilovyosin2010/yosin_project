let data = [
  {
    id: 1,
    name: "John",
    description: "I am John",
    complete: false,
  },
  {
    id: 2,
    name: "Anton",
    description: "I am Anton",
    complete: true,
  },
  {
    id: 3,
    name: "Mina",
    description: "I am Mina",
    complete: false,
  },
];

let root = document.querySelector("#root");

let modal = document.querySelector(".modal");
let inpEditName = document.querySelector(".inpEditName");
let inpEditDes = document.querySelector(".inpEditDes");
let btnChange = document.querySelector(".btnChange");
let closeBtn = document.querySelector(".closeBtn");

let inpAddName = document.querySelector(".inpAddName");
let inpAddDes = document.querySelector(".inpAddDes");
let btnAdd = document.querySelector(".btnAdd");

let inpSearch = document.querySelector(".inpSearch");

let filter = document.querySelector(".filter");

//FILTER DATA

filter.onclick = () => {
  let arr;
  arr = data.filter((e) => {
    if (filter.value == "true") {
      return e.complete;
    } else if (filter.value == "false") {
      return !e.complete;
    } else {
      return e;
    }
  });
  getData(arr);
};
//SEARCH DATA

inpSearch.oninput = () => {
  let arr;
  arr = data.filter((e) => {
    return e.name.toLowerCase().includes(inpSearch.value.trim().toLowerCase());
  });
  getData(arr);
};
//ADD DATA

btnAdd.onclick = () => {
  let obj = {
    id: data.length + 1,
    name: inpAddName.value,
    description: inpAddDes.value,
    complete: false,
  };
  data.push(obj);
  getData(data);
  inpAddDes.value = "";
  inpAddName.value = "";
};
//CLOSE MODAL

closeBtn.onclick = () => {
  modal.close();
};

//edit data

let id2 = null;
let editOpen = function (id) {
  id2 = id;
  modal.showModal();
  let sel = data.find((e) => {
    return e.id == id;
  });
  inpEditName.value = sel.name;
  inpEditDes.value = sel.description;
};

//CHANGE DATA

btnChange.onclick = () => {
  data.map((e) => {
    if (id2 == e.id) {
      e.name = inpEditName.value;
      e.description = inpEditDes.value;
    }
    return e;
  });
  getData(data);
  modal.close();
};

//CHECK DATA

function checkData(id) {
  data.map((e) => {
    if (e.id == id) {
      return (e.complete = !e.complete);
    }
  });
  getData(data);
}
//DEL DATA

let delData = (id) => {
  data = data.filter((e) => {
    return e.id !== id;
  });
  getData(data);
};
//GET DATA

function getData(data) {
  root.innerHTML = "";
  data.forEach((e) => {
    let sec = document.createElement("div");
    sec.classList.add("section");

    let name = document.createElement("h2");
    name.innerHTML = e.name;

    let des = document.createElement("p");
    des.innerHTML = e.description;

    if (e.complete) {
      name.style.textDecoration = "line-through";
    }

    let btnSec = document.createElement("div");
    btnSec.classList.add("btnSec");

    let btnDel = document.createElement("button");
    btnDel.innerHTML = "DEL";
    btnDel.onclick = () => {
      delData(e.id);
    };

    let btnEditOpen = document.createElement("button");
    btnEditOpen.innerHTML = "edit";
    btnEditOpen.onclick = () => {
      editOpen(e.id);
    };

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = e.complete;
    checkBox.onclick = () => {
      checkData(e.id);
    };

    let block1 = document.createElement("div");
    block1.classList.add("block1");
    block1.append(name, des);

    btnSec.append(btnDel, btnEditOpen, checkBox);
    sec.append(block1, btnSec);
    root.appendChild(sec);
  });
}
getData(data);
