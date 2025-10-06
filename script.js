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
let displayBasket = "";
let subtotal = 0;
let deliveryCost = 0;
let totalPrice = 0;
let basketComment = "";

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
    let basketCount = 0;
    const basketCommentRevDesktop = document.getElementById("countBasketDesktop");
    const basketCommentRevMobile = document.getElementById("countBasketMobile");

    if (Object.keys(basket).length === 0) {
        basketCommentRevDesktop.classList.add("displayNone");
        basketCommentRevDesktop.innerHTML = "";
        basketCommentRevMobile.classList.add("displayNone");
        basketCommentRevMobile.innerHTML = "";
        return;
    }

    for (let dishID in basket) {
        const quantity = basket[dishID];
        const dish = myDishes.find(d => d.ID == dishID);
        if (dish) {
            basketCount += quantity;
        }
    }

    basketCommentRevDesktop.classList.remove("displayNone");
    basketCommentRevDesktop.innerHTML = basketCount;
    basketCommentRevMobile.classList.remove("displayNone");
    basketCommentRevMobile.innerHTML = basketCount;
}

function calculateBasket() {
    subtotal = 0;
    if (Object.keys(basket).length != 0) {
        for (let dishID in basket) {
            let quantity = basket[dishID];
            let dish = myDishes.find(d => d.ID == dishID);
            if (dish) {
                subtotal += dish.Price * quantity;;
            }
        }
    }

    if (subtotal < 50) {
        deliveryCost = 3.50;
    } else {
        deliveryCost = 0;
    }
    totalPrice = (subtotal + deliveryCost);

    if (subtotal < 20) {
        basketComment = "<br> Mindestbestellwert von 20 Euro nicht erreicht";
        if (Object.keys(basket).length === 0) { basketComment = ""; }
    } else {
        basketComment = "";
    }

    if (subtotal >= 20 && subtotal < 50) {
        basketComment = "<br> noch €" + (50 - subtotal).toFixed(2) + " für kostenlose Lieferung";
    }

    countBasket();
    renderBasket();
}

function StartPage() {
    renderDishes();
}

function renderCartDesktop() {
    const basketRev = document.getElementById("basket");
    const dishesRev = document.querySelector(".dishes");
    const mainRev = document.getElementById("main");
    basketRev.classList.toggle("open");
    dishesRev.classList.toggle("shift-left");
    mainRev.classList.toggle("main-basket");
    document.getElementById("basket").classList.toggle("displayNone");
    renderBasket();
}

function order() {
    const dialog = document.getElementById("dialogBoxOrder");
    const content = document.getElementById("dialogBoxOrder-content");

    content.innerHTML = `<h2>Bestellung aufgegeben</h2> 
        <div> <br>Die aktuelle Lieferzeit beträgt ca. 35 Minuten <br> <br>Wir wünschen einen guten Appetit </div>`;
    dialog.showModal();
    
    basket = {};
    calculateBasket();
    closeDialogBasket();
    document.body.classList.add('modal-open');
}

function closeDialogBasket() {
    const dialog = document.getElementById("dialogBoxMobileBasket");
    dialog.close();

    document.body.classList.remove('modal-open');
}

function closeDialogOrder() {
    const dialog = document.getElementById("dialogBoxOrder");
    dialog.close();

    document.body.classList.remove('modal-open');
}

function orderMobile() {
  const dialog = document.getElementById("dialogBoxMobileBasket");
  
  calculateBasket();
  dialog.showModal();
  document.body.classList.add('modal-open');
}
