/*
    Base de datos de productos
*/

let productos = [
    {
        id: 1,
        nombre: 'Big Mac',
        precio: 8.15,
        imagen: 'item1.png'
    },
    {
        id: 2,
        nombre: 'American Chicken',
        precio: 9.35,
        imagen: 'item2.png'
    },
    {
        id: 3,
        nombre: 'Grand McExtreme',
        precio: 10.45,
        imagen: 'item3.png'
    },
    {
        id: 4,
        nombre: 'McMenu CBO',
        precio: 9.55,
        imagen: 'item4.png'
    },
    {
        id: 5,
        nombre: 'McNuggets',
        precio: 10.95,
        imagen: 'item5.png'
    },
    {
        id: 5,
        nombre: 'Alitas/McNuggets',
        precio: 11.25,
        imagen: 'item6.png'
    },
    {
        id: 6,
        nombre: 'McFlurry Oreo',
        precio: 33.55,
        imagen: 'item6.png'
    }
    
    
];

let cartItems = [];


/*
    Creamos de manera recursiva nuestros elementos:

    <div class="item">
        <div class="item-description">
            <img class="item-img" src="./assets/item1.png">
            <p class="item-name">MacMenu Big Mac</p>
        </div>
        <div class="item-order">
            <p class="item-price">8,10 €</p>
            <button class="item-add">+</button>
        </div>
    </div>
*/

function renderProducts(){
    let listElement = document.getElementById('listItems');

    for( let i = 0; i < productos.length; i++){

        let divElementItem = document.createElement('div');
        divElementItem.classList.add('item');

        let divElementItemDescription = document.createElement('div');
        divElementItemDescription.classList.add('item-description');

        let imgElementItem = document.createElement('img');
        imgElementItem.classList.add('item-img');
        let url = './assets/' + productos[i].imagen;
        imgElementItem.setAttribute('src', url);

        let nameElementItem = document.createElement('p');
        nameElementItem.classList.add('item-name');
        nameElementItem.textContent = productos[i].nombre;

        let divElementItemOrder = document.createElement('div');
        divElementItemOrder.classList.add('item-order');

        let priceElementItem = document.createElement('p');
        priceElementItem.classList.add('item-price');
        priceElementItem.textContent = productos[i].precio + '€';

        let buttonElementItem = document.createElement('button');
        buttonElementItem.classList.add('item-add');
        buttonElementItem.textContent = '+';
        buttonElementItem.addEventListener('click', function() { addProductsToCart(productos[i]) });

        divElementItemDescription.appendChild(imgElementItem);
        divElementItemDescription.appendChild(nameElementItem);
        
        divElementItemOrder.appendChild(priceElementItem);
        divElementItemOrder.appendChild(buttonElementItem);

        divElementItem.appendChild(divElementItemDescription);
        divElementItem.appendChild(divElementItemOrder);

        listElement.appendChild(divElementItem);
    }
}

/* Añadimos nuestros productos y renderizamos */
function addProductsToCart(item){
    cartItems.push(item);
    renderCart();
}

/*
    Creamos de manera recursiva nuestros carrito:

    <div class="cart-item">
        <p class="cart-item-quantity">2X</p>
        <p class="cart-item-description">MacMenu Big Mac</p>
        <p class="cart-item-price">8,10 €</p>
        <button class="cart-item-btn">x</button>
    </div>
*/

function renderCart(){
    let elementNoCartList = document.getElementById('cartNoItems');

    let elementCartList = document.getElementById('cartItems');
    elementCartList.textContent = ''; /* Truki para eliminar contenido dentro del div */

    let totalPrice = 0;
    //comprobamos el estado del carrito, si no tiene items pintamos el dibujo de carrito vacío
    if(cartItems.length > 0){
        //eliminaremos la información de que no hay nada en el carro
        elementNoCartList.style.display = 'none';

        //pintaremos la lista
        for( let i = 0; i < cartItems.length; i++){
            let elementCartItem = document.createElement('div');
            elementCartItem.classList.add('cart-item');

            let elementCartQuantity = document.createElement('p');
            elementCartQuantity.classList.add('cart-item-quantity');
            elementCartQuantity.textContent = '1X';

            let elementCartDescription = document.createElement('p');
            elementCartDescription.classList.add('cart-item-description');
            elementCartDescription.textContent = cartItems[i].nombre;

            let elementCartPrice = document.createElement('p');
            elementCartPrice.classList.add('cart-item-price');
            elementCartPrice.textContent = cartItems[i].precio + '€';

            let elementItemBtn = document.createElement('button');
            elementItemBtn.classList.add('cart-item-btn');
            elementItemBtn.textContent = '-';
            elementItemBtn.addEventListener('click', function() { deleteProductFromCart(i) });
            
            elementCartItem.appendChild(elementCartQuantity);
            elementCartItem.appendChild(elementCartDescription);
            elementCartItem.appendChild(elementCartPrice);
            elementCartItem.appendChild(elementItemBtn);

            elementCartList.appendChild(elementCartItem);
            console.log(cartItems[i].precio);
            totalPrice += cartItems[i].precio;            
        }

        let elementTotal = document.createElement('p');
        elementTotal.classList.add('cart-total');
        elementTotal.textContent = 'Total: ' + totalPrice.toFixed(2) + '€';

        elementCartList.appendChild(elementTotal);

    } else {
        //mostraremos información de que no hay nada en el carro
        elementNoCartList.style.display = 'flex';
    }
}

function deleteProductFromCart(elementPosition){
    let cartItemsAux = [];

    for(let i = 0; i< cartItems.length; i++){
        if(i !== elementPosition){
            cartItemsAux.push(cartItems[i]);
        }
    }
    cartItems = cartItemsAux;
    renderCart();
}


renderProducts();
renderCart();

