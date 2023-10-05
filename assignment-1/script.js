// Your JS code goes here

let selectedItem = null;
let listTable = document.getElementById("list-table");
let deleteModal = document.getElementById("delete-form");
let btnDel = document.getElementById("btn-delete");
let btnCancelDelete = document.getElementById("btn-cancel-delete");
let addFormModal = document.getElementById("add-form");
let btnAddBook = document.getElementById("btn-add-book");
let $txtName = document.getElementById("txtName");
let $txtAuthor = document.getElementById("txtAuthor");
let $selectTopic = document.getElementById("select-topic");
let $txtSearch = document.getElementById("txtSearch");

btnDel.addEventListener("click", () => {
  deleteItem();
});

btnCancelDelete.addEventListener("click", () => {
  closeDeleteModal();
});

const data = [
  {
    id: 0,
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programing",
    deleted: false,
  },
  {
    id: 1,
    name: "Refactoring 1 2 3",
    author: "Martin Fowler",
    topic: "Programing",
    deleted: false,
  },
];

const showDeleteModal = (id) => {
  selectedItem = id;
  deleteModal.style.display = "block";
  closeAddBookModal();
};

const showAddBookModal = () => {
  closeDeleteModal();
  addFormModal.style.display = "block";
};

const closeAddBookModal = () => {
  addFormModal.style.display = "none";
};

const closeDeleteModal = () => {
  deleteModal.style.display = "none";
};

const clearTable = () => {
  while (listTable.rows.length > 1) {
    listTable.deleteRow(1);
  }
};

const deleteItem = () => {
  const dataPos = data.findIndex((item) => {
    return item.id === selectedItem;
  });
  data[dataPos].deleted = true;
  closeDeleteModal();
  fetchListTableData();
};

const addBook = () => {
  $txtName;
  $txtAuthor;
  $selectTopic;
  const newData = {
    id: Math.random(9999),
    name: $txtName.value,
    author: $txtAuthor.value,
    topic: $selectTopic.value,
    deleted: false,
  };
  data.push(newData);
  fetchListTableData();
  closeAddBookModal();
};

const fetchListTableData = (keyword = "") => {
  keyword = keyword.trim();
  keyword = keyword.toLowerCase();
  clearTable();
  data.forEach((item) => {
    const name = item.name.toLowerCase();
    const author = item.author.toLowerCase();
    const topic = item.topic.toLowerCase();
    if (item.deleted) return;
    if (
      !name.includes(keyword) &&
      !author.includes(keyword) &&
      !topic.includes(keyword)
    )
      return;

    const row = listTable.insertRow();
    const nameCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const topicCell = row.insertCell(2);
    const deleteCell = row.insertCell(3);

    nameCell.textContent = item.name;
    authorCell.textContent = item.author;
    topicCell.textContent = item.topic;

    const deleteBtn = document.createElement("a");
    deleteBtn.textContent = "Delete";
    deleteBtn.href = "#";
    deleteBtn.onclick = function () {
      showDeleteModal(item.id);
    };
    deleteCell.appendChild(deleteBtn);
  });
};

let keyDownTimer = null;
$txtSearch.addEventListener("keydown", (e) => {
  if (keyDownTimer !== null) {
    clearTimeout(keyDownTimer);
    keyDownTimer = null;
  }
});

$txtSearch.addEventListener("keyup", (e) => {
  if (keyDownTimer === null) {
    keyDownTimer = setTimeout(() => {
      const searchKey = e.target.value;
      fetchListTableData(searchKey);
      keyDownTimer = null;
    }, 600);
  }
});

fetchListTableData();
