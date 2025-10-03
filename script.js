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
let Zwischensumme = 0;
let Lieferkosten = 0;
let Gesamtpreis = 0;
let basketComment = "";

function renderDishes() {
    const categories = ["pizza", "pasta", "getraenke"];
    categories.forEach(cat => {
        const section = document.getElementById(cat);
        if (section) section.innerHTML =
            `
                
                <img src="./img/${cat}.jpg" alt="${cat}" class="dish-category"> 
            `;
    });

    // Gerichte einfügen
    myDishes.forEach(dish => {
        const section = document.getElementById(dish.Kategorie);
        if (section) {
            const dishElement = document.createElement("div");
            dishElement.classList.add("dish");

            dishElement.innerHTML = `
        <div class="dish-card">
            <div class="dish-info">
                <h3>${dish.Name}</h3>
                <p class="dish-description">${dish.description}</p>
                <p class="dish-price">€${dish.Price.toFixed(2)}</p>
            </div>
            <div class="dish-action">
                <button onclick=addBasket(${dish.ID}) aria-label="Gericht hinzufügen" class="btn-to-basket">+</button>
            </div>
        </div>
      `;

            section.appendChild(dishElement);
        }
    });

    calculateBasket();
}

function addBasket(ID) {
    if (basket[ID]) {
        basket[ID] += 1;
    } else {
        basket[ID] = 1;
    }

    calculateBasket()
    //console.table(basket);
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
    //console.table(basket);
}


function deleteDish(ID) {
    delete basket[ID];
    calculateBasket()
    //console.table(basket);
}

function renderBasket() {

    let output = "";

    if (Object.keys(basket).length === 0) {
        output = "Warenkorb ist leer, bitte etwas auswählen"
    } else {

        for (let dishID in basket) {
            let quantity = basket[dishID];
            let dish = myDishes.find(d => d.ID == dishID);
            if (dish) {
                output += `
                    ${dish.Name} <br>
                    <button onclick="removeBasket(${dishID})" class="btn-cart-item-controls">-</button> 
                    ${quantity} 
                    <button onclick="addBasket(${dishID})" class="btn-cart-item-controls">+</button> 
                    €${(dish.Price * quantity).toFixed(2)} 
                    <button onclick="deleteDish(${dishID})" class="btn-remove-item"></button> <br>
                `;
            }
        }
    }

    let btnOrderStatus = ""
    if (Zwischensumme < 20) {
        btnOrderStatus = "order-disabled";
    }



    displayBasket = `
                <h2>Warenkorb</h2>

            <div id="selected-Dish">
            ${output}

            ${basketComment}
            </div>

            <div id="basketComment"></div>
            <div class="billing-summary">
                <table>
                    <tr>
                        <td>Zwischensumme:</td>
                        <td>
                            € ${Zwischensumme.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td>Lieferkosten:</td>
                        <td>
                            € ${Lieferkosten}
                        </td>
                    </tr>

                    <tr>
                        <td>Gesamtpreis:</td>
                        <td>
                            € ${Gesamtpreis.toFixed(2)}
                        </td>
                    </tr>
                </table>
            </div>
            <button class="btnOrder ${btnOrderStatus}" onclick="order()">bestellen</button>
        
    `

    document.getElementById("basket").innerHTML = displayBasket;
    document.getElementById("dialogBoxMobileBasket-content").innerHTML = displayBasket;
}


function countBasket() {
    let basketCount = 0;
    const basketCommentRev = document.getElementById("countBasket");

    if (Object.keys(basket).length === 0) {
        basketCommentRev.classList.add("displayNone");
        basketCommentRev.innerHTML = "";
        return;
    }

    for (let dishID in basket) {
        const quantity = basket[dishID];
        const dish = myDishes.find(d => d.ID == dishID);
        if (dish) {
            basketCount += quantity;
        }
    }

    basketCommentRev.classList.remove("displayNone");
    basketCommentRev.innerHTML = basketCount;
}


function calculateBasket() {
    Zwischensumme = 0;
    if (Object.keys(basket).length != 0) {
        for (let dishID in basket) {
            let quantity = basket[dishID];
            let dish = myDishes.find(d => d.ID == dishID);
            if (dish) {
                Zwischensumme += dish.Price * quantity;;
            }
        }
    }

    if (Zwischensumme < 50) {
        Lieferkosten = 3.5;
    } else {
        Lieferkosten = 0;
    }
    Gesamtpreis = (Zwischensumme + Lieferkosten);

    if (Zwischensumme < 20) {
        basketComment = "<br> Mindestbestellwert von 20 Euro nicht erreicht";
        if (Object.keys(basket).length === 0) { basketComment = ""; }
    } else {
        basketComment = "";
    }

    if (Zwischensumme >= 20 && Zwischensumme < 50) {
        basketComment = "<br> noch €" + (50 - Zwischensumme).toFixed(2) + " für kostenlose Lieferung";
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
    basketRev.classList.toggle("open");
    dishesRev.classList.toggle("shift-left");
    //document.getElementById("basket").classList.toggle("displayNone");
    renderBasket();
}

function order() {
    const dialog = document.getElementById("dialogBoxOrder");
    const content = document.getElementById("dialogBoxOrder-content");

    content.innerHTML = "<h2>Bestellung aufgegeben</h2>";
    dialog.showModal();
    basket = {};
    calculateBasket();

}

function closeDialog() {
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach(dialog => {
        if (dialog.open) {
            dialog.close();
        }
    });
}

document.getElementById("dialogBoxOrder").addEventListener("click", function (event) {
    const rect = this.getBoundingClientRect();
    const isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if (!isInDialog) {
        closeDialog();
    }
});

function orderMobile() {

    const dialog = document.getElementById("dialogBoxMobileBasket");
    calculateBasket();
    dialog.showModal();

}