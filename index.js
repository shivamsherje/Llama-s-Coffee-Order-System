const arr = JSON.parse(localStorage.getItem('orders')) || [];

const OrderCoffee = () => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;
  const size = document.getElementById('size').value;

  const quantity = Number(document.getElementById('quantity').value);
  let total;

  if (name == '' || type == '' || size == '' || quantity == '') {
    alert('fill all the details');
  } else {
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

    let totalPrice = total * quantity;

    let obj = { name, type, size, quantity, totalPrice };
    arr.push(obj);
    localStorage.setItem('orders', JSON.stringify(arr));
    alert('Order has been placed');
    window.location.href = 'dashboard.html';
  }
};
