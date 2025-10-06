function renderDishes() {
    const categories = ["pizza", "pasta", "getraenke"];
    categories.forEach(cat => {
        const section = document.getElementById(cat);
        if (section) section.innerHTML =
            ` <img src="./img/${cat}.jpg" alt="${cat}" class="dish-category"> `;
    });

    myDishes.forEach(dish => {
        const section = document.getElementById(dish.Kategorie);
        if (section) {
            const dishElement = document.createElement("div");
            dishElement.classList.add("dish");
            dishElement.innerHTML = `
                <div class="dish-card">
                    <div class="dish-info">
                        <h2>${dish.Name}</h2>
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
                    <div class="basket-dish">${dish.Name} </div>
                    <div class="basket-dishRow">
                        <button onclick="removeBasket(${dishID})" class="btn-cart-item-controls" aria-label="Produkt um 1 verringern">−</button> 
                        ${quantity} 
                        <button onclick="addBasket(${dishID})" class="btn-cart-item-controls" aria-label="Produkt um 1 erhöhen">+</button> 
                        €${(dish.Price * quantity).toFixed(2)} 
                        <button onclick="deleteDish(${dishID})" class="btn-remove-item" aria-label="Produkt entfernen"></button> <br>
                    </div>`;
            }
        }
    }

    let btnOrderStatus = ""
    if (subtotal < 20) {
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
                            € ${subtotal.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td>Lieferkosten:</td>
                        <td>
                            € ${deliveryCost.toFixed(2)}
                        </td>
                    </tr>

                    <tr>
                        <td>Gesamtpreis:</td>
                        <td>
                            € ${totalPrice.toFixed(2)}
                        </td>
                    </tr>
                </table>
            </div>
            <button class="btnOrder ${btnOrderStatus}" onclick="order()">bestellen</button>`

    document.getElementById("basket").innerHTML = displayBasket;
    document.getElementById("dialogBoxMobileBasket-content").innerHTML = displayBasket;
}