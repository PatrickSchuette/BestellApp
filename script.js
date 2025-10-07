let myDishes = [
    // pasta
    { "ID": 1, "Name": "Spaghetti Carbonara", "Price": 12.99, "description": "Klassische pasta mit Speck, Ei und Parmesan", "Kategorie": "pasta" },
    { "ID": 2, "Name": "Penne Arrabbiata", "Price": 10.49, "description": "Würzige Tomatensauce mit Knoblauch und Chili", "Kategorie": "pasta" },
    { "ID": 3, "Name": "Lasagne Bolognese", "Price": 13.99, "description": "Hausgemachte Lasagne mit Rindfleisch und Bechamelsauce", "Kategorie": "pasta" },
    { "ID": 4, "Name": "Tagliatelle al Pesto", "Price": 11.49, "description": "Mit frischem Basilikum-Pesto und Pinienkernen", "Kategorie": "pasta" },

    // pizza
    { "ID": 5, "Name": "Pizza Margherita", "Price": 9.99, "description": "Tomatensauce, Mozzarella und frisches Basilikum", "Kategorie": "pizza" },
    { "ID": 6, "Name": "Pizza Salami", "Price": 11.49, "description": "Mit würziger Salami und Mozzarella", "Kategorie": "pizza" },
    { "ID": 7, "Name": "Pizza Hawaii", "Price": 11.99, "description": "Mit Schinken und Ananas", "Kategorie": "pizza" },
    { "ID": 8, "Name": "Pizza Tonno", "Price": 12.49, "description": "Mit Thunfisch, Zwiebeln und Mozzarella", "Kategorie": "pizza" },
    { "ID": 9, "Name": "Pizza Diavolo", "Price": 12.99, "description": "Scharfe Salami, Jalapeños und Peperoni", "Kategorie": "pizza" },

    // getraenke
    { "ID": 10, "Name": "Coca-Cola 0,5L", "Price": 2.49, "description": "Erfrischungsgetränk mit Kohlensäure", "Kategorie": "getraenke" },
    { "ID": 11, "Name": "Mineralwasser 0,5L", "Price": 1.99, "description": "Still oder sprudelnd", "Kategorie": "getraenke" },
    { "ID": 12, "Name": "Eistee Pfirsich 0,5L", "Price": 2.29, "description": "Kalt serviert, süß und fruchtig", "Kategorie": "getraenke" },
    { "ID": 13, "Name": "Orangensaft 0,3L", "Price": 2.49, "description": "Frisch gepresst", "Kategorie": "getraenke" }
];


let basket = {};
let basketValue = {
    displayBasket: "",
    subtotal: 0,
    deliveryCost: 0,
    totalPrice: 0,
    basketComment: ""
};

let elementRev = {
    basketCommentDesktop: document.getElementById("countBasketDesktop"),
    basketCommentMobile: document.getElementById("countBasketMobile"),
    basket: document.getElementById("basket"),
    dishes: document.querySelector(".dishes"),
    main: document.getElementById("main"),
    dbOrder: document.getElementById("dialogBoxOrder"),
    dbOrderContent: document.getElementById("dialogBoxOrder-content"),
    dbBasketMobile: document.getElementById("dialogBoxMobileBasket")

};

function addBasket(ID) {
    if (basket[ID]) {
        basket[ID] += 1;
    } else {
        basket[ID] = 1;
    }

    calculateBasket()
}

function removeBasket(ID) {
    if (basket[ID]) {
        if (basket[ID] > 1) {
            basket[ID] -= 1;
        } else {
            delete basket[ID];
        }
    }
    calculateBasket()
}

function deleteDish(ID) {
    delete basket[ID];
    calculateBasket()
}

function countBasket() {
    if (Object.keys(basket).length === 0) {
        countBasketHide();
    } else {
        countBasketShow();
    }
}

function countBasketHide() {
    let basketCount = 0;

    elementRev.basketCommentDesktop.classList.add("displayNone");
    elementRev.basketCommentDesktop.innerHTML = "";
    elementRev.basketCommentMobile.classList.add("displayNone");
    elementRev.basketCommentMobile.innerHTML = "";
}

function countBasketShow() {
    let basketCount = 0;

    for (let dishID in basket) {
        const quantity = basket[dishID];
        const dish = myDishes.find(d => d.ID == dishID);
        if (dish) {
            basketCount += quantity;
        }
    }

    elementRev.basketCommentDesktop.classList.remove("displayNone");
    elementRev.basketCommentDesktop.innerHTML = basketCount;
    elementRev.basketCommentMobile.classList.remove("displayNone");
    elementRev.basketCommentMobile.innerHTML = basketCount;
}

function resetBasketCalculation() {
    basketValue.subtotal = 0;
    basketValue.deliveryCost = 0;
    basketValue.totalPrice = 0;
    basketValue.basketComment = "";
}

function updateBasketState() {
    resetBasketCalculation();

    for (let dishID in basket) {
        const quantity = basket[dishID];
        const dish = myDishes.find(d => d.ID == dishID);
        if (dish) basketValue.subtotal += dish.Price * quantity;
    }

    basketValue.deliveryCost = basketValue.subtotal < 50 ? 3.50 : 0;
    basketValue.totalPrice = basketValue.subtotal + basketValue.deliveryCost;

    if (basketValue.subtotal < 20 && Object.keys(basket).length > 0) {
        basketValue.basketComment = "<br> Mindestbestellwert von 20 Euro nicht erreicht";
    } else if (basketValue.subtotal >= 20 && basketValue.subtotal < 50) {
        basketValue.basketComment = "<br> noch €" + (50 - basketValue.subtotal).toFixed(2) + " für kostenlose Lieferung";
    }
}

function calculateBasket() {
    basketValue.subtotal = 0;
    if (Object.keys(basket).length != 0) {
        for (let dishID in basket) {
            let quantity = basket[dishID];
            let dish = myDishes.find(d => d.ID == dishID);
            if (dish) {
                basketValue.subtotal += dish.Price * quantity;;
            }
        }
    }

    calculateBasketInfo()
    updateBasket()
}

function calculateBasketInfo() {
    if (basketValue.subtotal < 50) { basketValue.deliveryCost = 3.50; }
    else { basketValue.deliveryCost = 0; }
    basketValue.totalPrice = (basketValue.subtotal + basketValue.deliveryCost);

    if (basketValue.subtotal < 20) {
        basketValue.basketComment = "<br> Mindestbestellwert von 20 Euro nicht erreicht";
        if (Object.keys(basket).length === 0) { basketValue.basketComment = ""; }
    }
    else { basketValue.basketComment = ""; }

    if (basketValue.subtotal >= 20 && basketValue.subtotal < 50) {
        basketValue.basketComment = "<br> noch €" + (50 - basketValue.subtotal).toFixed(2) + " für kostenlose Lieferung";
    }
}

function renderDishes() {
    document.getElementById("pizza").innerHTML = `<h2>Pizza</h2> <img src="./img/pizza.jpg" alt="Pizza" class="dish-category">`;
    document.getElementById("pasta").innerHTML = `<h2>Pasta</h2> <img src="./img/pasta.jpg" alt="PAsta" class="dish-category">`;
    document.getElementById("getraenke").innerHTML = `<h2>Getränke</h2> <img src="./img/getraenke.jpg" alt="Getränke" class="dish-category">`;

    myDishes.forEach(dish => {
        const section = document.getElementById(dish.Kategorie);
        if (section) {
            const dishElement = document.createElement("div");
            dishElement.classList.add("dish");
            dishElement.innerHTML = renderDishesHTML(dish);
            section.appendChild(dishElement);
        }
    });
}

function renderBasket() {
    let output = "";

    if (Object.keys(basket).length === 0) {
        output = "Warenkorb ist leer, bitte etwas auswählen";
    } else {
        for (let dishID in basket) {
            const quantity = basket[dishID];
            const dish = myDishes.find(d => d.ID == dishID);
            if (dish) {
                output += renderBasketSelectionHTML(dish, dishID, quantity);
            }
        }
    }

    const btnOrderStatus = basketValue.subtotal < 20 ? "order-disabled" : "";

    basketValue.displayBasket = renderBasketPriceHTML(output, btnOrderStatus);

    document.getElementById("basket").innerHTML = basketValue.displayBasket;
    document.getElementById("dialogBoxMobileBasket-content").innerHTML = basketValue.displayBasket;
}

function StartPage() {
    renderDishes();
}

function updateBasket() {
    updateBasketState();
    countBasket();
    renderBasket();
}

function renderCartDesktop() {

    elementRev.basket.classList.toggle("open");
    elementRev.dishes.classList.toggle("shift-left");
    elementRev.main.classList.toggle("main-basket");
    elementRev.basket.classList.toggle("displayNone");
    renderBasket();
}

function order() {
    elementRev.dbOrderContent.innerHTML = `<h2>Bestellung aufgegeben</h2> 
        <div> <br>Die aktuelle Lieferzeit beträgt ca. 35 Minuten <br> <br>Wir wünschen einen guten Appetit </div>`;
    elementRev.dbOrder.showModal();

    basket = {};
    calculateBasket();
    closeDialogBasket();
    document.body.classList.add('modal-open');
}

function closeDialogBasket() {
    elementRev.dbBasketMobile.close();

    document.body.classList.remove('modal-open');
}

function closeDialogOrder() {
    const dialog = document.getElementById("dialogBoxOrder");
    dialog.close();

    document.body.classList.remove('modal-open');
}

function orderMobile() {
    calculateBasket();
    elementRev.dbBasketMobile.showModal();
    document.body.classList.add('modal-open');
}
