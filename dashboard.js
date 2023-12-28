const arr = JSON.parse(localStorage.getItem('orders')) || [];
const container = document.getElementById('container');

const append = (arr) => {
  container.innerHTML = null;
  arr.map((ele, i) => {
    const card = document.createElement('div');
    card.setAttribute('id', 'card');

    card.innerHTML = `
                <p>${ele.name}</p>
                <p>${ele.type}</p>
                <p>${ele.size}</p>
                <p>${ele.quantity}</p>
                <p>${ele.totalPrice}</p>
            `;
    const edit = document.createElement('button');
    edit.innerText = 'Edit';
    edit.style.backgroundColor = 'snow';
    edit.style.border = 'none';
    edit.style.fontSize = '17px';
    edit.addEventListener('click', function () {
      createModal(ele, i);
    });

    const delet = document.createElement('button');
    delet.style.backgroundColor = 'orange';
    delet.style.border = 'none';
    delet.style.fontSize = '17px';
    delet.addEventListener('click', function () {
      deleteFunction(i);
    });
    delet.innerText = 'Delete';

    card.append(edit, delet);

    container.append(card);
  });
};
console.log(arr);
append(arr);

const filterbyCoffeetype = () => {
  let type = document.getElementById('type').value;

  if (type == '') {
    append(arr);
  } else {
    let filterByType = arr.filter((ele) => {
      return ele.type === type;
    });

    append(filterByType);
  }
};

const filterbyCoffeesize = () => {
  let size = document.getElementById('size').value;

  if (size == '') {
    append(arr);
  } else {
    let filterByType = arr.filter((ele) => {
      return ele.size === size;
    });

    append(filterByType);
  }
};

const sortbyPrice = () => {
  const sort = document.getElementById('sort').value;

  if (sort === 'ascending') {
    let sortedArr = arr.sort((a, b) => {
      return a.totalPrice - b.totalPrice;
    });
    append(sortedArr);
  } else if (sort === 'descending') {
    let sortedArr = arr.sort((a, b) => {
      return b.totalPrice - a.totalPrice;
    });
    append(sortedArr);
  } else {
    append(arr);
  }
};

const deleteFunction = (index) => {
  arr.splice(index, 1);

  localStorage.setItem('orders', JSON.stringify(arr));

  const deletedarr = JSON.parse(localStorage.getItem('orders'));

  append(deletedarr);
};

const createModal = (payload, i) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeModal);

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Edit Order';

  const modalForm = document.createElement('div');

  modalForm.innerHTML = `
        <input type="text" id="Edname" placeholder="Name">
        <select id="Edtype">
            <option value="">Type</option>
            <option value="Americano">Americano</option>
            <option value="Expresso">Expresso</option>
            <option value="Cappuccino">Cappuccino</option>
        </select>
        <select id="Edsize">
            <option value="">Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
        </select>
        <input type="number" id="Edquentaty" placeholder="Quantity">
        `;

  const editBtn = document.createElement('button');

  editBtn.addEventListener('click', function () {
    editFunction(payload, i);
  });
  editBtn.innerText = 'Add';
  editBtn.style.backgroundColor = 'orange';
  editBtn.style.padding = '10px';
  editBtn.style.color = 'white';
  editBtn.style.marginLeft = '30%';
  editBtn.style.width = '200px';

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalForm);
  modalContent.appendChild(editBtn);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.style.display = 'block';
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  document.body.removeChild(modal);
};

const editFunction = (ele, i) => {
  let name = document.getElementById('Edname').value || ele.name;
  let type = document.getElementById('Edtype').value || ele.type;
  let size = document.getElementById('Edsize').value || ele.size;
  let quantity = document.getElementById('Edquentaty').value || ele.quantity;

  let total;

  if (type === 'Americano' && size === 'Small') {
    total = 100;
  } else if (type === 'Americano' && size === 'Medium') {
    total = 200;
  } else if (type === 'Americano' && size === 'Large') {
    total = 300;
  } else if (type === 'Expresso' && size === 'Small') {
    total = 70;
  } else if (type === 'Expresso' && size === 'Medium') {
    total = 140;
  } else if (type === 'Expresso' && size === 'Large') {
    total = 210;
  } else if (type === 'Cappuccino' && size === 'Small') {
    total = 50;
  } else if (type === 'Cappuccino' && size === 'Medium') {
    total = 100;
  } else if (type === 'Cappuccino' && size === 'Large') {
    total = 150;
  }

  let totalPrice = quantity * total;

  let obj = { name, type, size, quantity, totalPrice };

  arr[i] = obj;

  localStorage.setItem('orders', JSON.stringify(arr));
  let updatedArr = JSON.parse(localStorage.getItem('orders'));
  append(updatedArr);
  closeModal();
};
