

function renderDishesHTML(dish) {
    return `
        <div class="dish-card">
            <div class="dish-info">
                <h3>${dish.Name}</h3>
                <p class="dish-description">${dish.description}</p>
                <p class="dish-price">€${dish.Price.toFixed(2)}</p>
            </div>
            <div class="dish-action">
                <button onclick="addBasket(${dish.ID})" aria-label="Gericht hinzufügen" class="btn-to-basket">+</button>
            </div>
        </div>
         `;
}

function renderBasketSelectionHTML(dish, dishID, quantity){
    return`
                    <div class="basket-dish">${dish.Name}</div>
                    <div class="basket-dishRow">
                        <button onclick="removeBasket(${dishID})" class="btn-cart-item-controls" aria-label="Produkt um 1 verringern">−</button> 
                        ${quantity} 
                        <button onclick="addBasket(${dishID})" class="btn-cart-item-controls" aria-label="Produkt um 1 erhöhen">+</button> 
                        €${(dish.Price * quantity).toFixed(2)} 
                        <button onclick="deleteDish(${dishID})" class="btn-remove-item" aria-label="Produkt entfernen"></button> <br>
                    </div>`;
}

function renderBasketPriceHTML(output, btnOrderStatus){
    return `
        <h2>Warenkorb</h2>
        <div id="selected-Dish">
            ${output}
            ${basketValue.basketComment}
        </div>
        <div id="basketComment"></div>
        <div class="billing-summary">
            <table>
                <tr>
                    <td>Zwischensumme:</td>
                    <td>€ ${basketValue.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Lieferkosten:</td>
                    <td>€ ${basketValue.deliveryCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Gesamtpreis:</td>
                    <td>€ ${basketValue.totalPrice.toFixed(2)}</td>
                </tr>
            </table>
        </div>
        <button class="btnOrder ${btnOrderStatus}" onclick="order()">bestellen</button>
    `;
}


