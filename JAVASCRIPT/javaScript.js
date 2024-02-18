
//ACCOMODATION-KOD-----------------------------------------

class Accomodation{
    constructor(roomType, imgUrl, description, price){
        this.roomType = roomType;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }
}

const accomodations = [
    new Accomodation("Nature Bungalow Rooms", "../Images/Fixad NatureBungalow.avif", "Escape to nature in one of our Dominican-country style bungalow room", 75.00),
    new Accomodation("Semi Delux Rooms", "../Images/Room fixad.avif", "For Guests who want some nature, but not all the way. These rooms are located in the main building having easy access to the restaurant and bar", 145.00),
    new Accomodation("Riverside Bungalow (Cottage)", "../Images/fixad flower.avif", "Located by the river, escape to the bungalow in the jungle, where you could swim in the azure blue Caribbean river. A family size tree house under the sun. Spectacular views of the forests.", 215.00)
]


const accomodationList = document.querySelector("#accomodations");



//CART-KOD--------------------------------------

class CartItem{
    constructor(accomodation, price, quantity){
        this.accomodation = accomodation,
        this.price = price,
        this.quantity = quantity
    }
    
    getTotalPrice() {
        return this.accomodation.price * this.quantity;
    }   
}

let quantity = 0;

const cartItems = [];

const cartList = document.querySelector("#cart");
const footer = document.querySelector("#cardfooter");

const totalPrice = document.createElement("p");
totalPrice.classList.add("p", "text-end");


// CheckoutBTN- kod---------------------------------------------

const checkOutBtn = document.createElement("button");
checkOutBtn.classList.add("btn", "btn-success");
checkOutBtn.innerText = "Pay"
checkOutBtn.onclick = () => {
    checkoutCart();
};
    
cardFooter.appendChild(checkOutBtn);
cardFooter.appendChild(totalPrice);

//FUNKTIONER------------------------------------------------------

displayAccomodations();

function displayAccomodations(){
    // for (const accomodation of accomodations)
    for (let i = 0; i < accomodations.length; i++)
     {
        const accomodation = accomodations[i];
        const li = document.createElement("li");
        const card = document.createElement("div");
        const cardBody = document.createElement("div");
        const imgUrl = document.createElement("img");
        imgUrl.setAttribute("alt", "RoomImage");

        const cardFooter = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardText = document.createElement("p");
        const cardPrice = document.createElement("p");
        
        const bookBtn = document.createElement("button");
        bookBtn.innerText = "Book now";
        bookBtn.onclick = () => {
            addToCart(accomodation);
        };

        const detailsBtn = document.createElement("button");
        detailsBtn.innerText = "More Details";
        detailsBtn.dataset.index = i;
        detailsBtn.onclick = () => {
            displayModal(accomodation);
        };

        applyStylesToAccomodation(li, card, cardBody, imgUrl, cardFooter, cardTitle, cardText, cardPrice, bookBtn, detailsBtn);


        cardTitle.innerText = accomodation.roomType;
        cardText.innerText = accomodation.description;
        cardPrice.innerText = accomodation.price;
        cardPrice.textContent = accomodation.price.toFixed(2) + " $ per night";
        imgUrl.src = accomodation.imgUrl;
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardPrice);
        cardFooter.appendChild(bookBtn);      
        cardFooter.appendChild(detailsBtn);
        card.appendChild(imgUrl);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        li.appendChild(card);
        accomodationList.appendChild(li);

        
    }
}

function applyStylesToAccomodation(li, card, cardBody, imgUrl, cardFooter, cardTitle, cardText, cardPrice, bookBtn, detailsBtn){
    li.classList.add("list-group-item", "col-3", "container-fluid");
    card.classList.add("card", "h-100", "w-100");
    cardBody.classList.add("card-body", "container-fluid");
    imgUrl.classList.add("card-img-top");
    cardFooter.classList.add("card-footer", "row");
    cardTitle.classList.add("card-title", "text-dark", "text-center");
    cardText.classList.add("card-text");
    cardPrice.classList.add("card-price");
    bookBtn.classList.add("btn", "btn-success", "mx-1", "col");
    detailsBtn.classList.add("btn", "btn-outline-info", "mx-1", "col");
}


DisplayCart();

function DisplayCart(){

    cartList.innerHTML = "";

for (const item of cartItems) {

        const li = document.createElement("li");
        const accomodationType = document.createElement("p");
        const price = document.createElement("p");
        const quantity = document.createElement("p");
        
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = () => {
        removeFromCart(item);
        };


        applyStylesToCart(li, accomodationType, price, quantity, removeBtn, item);

        accomodationType.innerText = item.accomodation;
        li.appendChild(accomodationType);
        li.appendChild(price);
        li.appendChild(quantity);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    }  
}


function applyStylesToCart(li, accomodationType, Acprice, quantity, removeBtn, item){
    li.classList.add("cartListItem" , "container-fluid");
    accomodationType.classList.add("col-5",  "mr-3");
    
    Acprice.classList.add("col", "CardPrice");
    Acprice.textContent = item.price.toFixed(2) + " $";
    
    quantity.classList.add("col");
    quantity.textContent = item.quantity + " rooms";
    
    removeBtn.classList.add("btn", "btn-Remove", "btn-outline-danger", "mx-1", "col");

    
}


function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.accomodation === item.roomType);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push(new CartItem(item.roomType, item.price, 1));
    }
    DisplayCart();
    updateTotalPrice();
}



function removeFromCart(item){
    if (item.quantity <= 1) 
    {
        const index = cartItems.indexOf(item);
        if (index > -1) {
            cartItems.splice(index, 1);
        }
    } 
    else {
        item.quantity--;
    }
    DisplayCart();
    updateTotalPrice();
}


function checkoutCart(){
    cartItems.length = 0;
    DisplayCart();
    updateTotalPrice();

    const modal = new bootstrap.Modal(document.getElementById("CheckoutModal"));
    modal.show();
    
}


function displayModal(accomodation){
    let roomName;
    let roomSize;
    let capacity;
    let roomDescription;
    let totalCapacity;
    let roomFeatures = [];


    if (accomodation.roomType === "Nature Bungalow Rooms"){
        roomName = "Nature Bungalow Rooms";
        roomSize = "17 m²";
        capacity = "1 – 2";
        roomDescription = "Escape to nature in one of our Dominican-country style bungalow room. Divided into two units per bungalow, each veranda faces our lush, growing garden, and is equipped with a coffee table, two chairs and a hammock. A solar heater provides warm water in the shower. All rooms vary in style and appearance.";
        totalCapacity = "Rooms: 8 | People: 22";
        roomFeatures = [
            "Garden and mountain views",
            "Located on the ground floor",
            "Family Friendly",
            "Balcony",
            "Attached bathroom",
            "Fan",
            "Mosquito nets",
            "Safety deposit box"
        ];
        
    } 
    else if (accomodation.roomType === "Semi Delux Rooms"){
        roomName = "Semi Delux Rooms";
        roomSize = "23 m²";
        capacity ="3 | 1 Queen bed";
        roomDescription = "Escape to nature in one of our Dominican-country style bungalow room. Divided into two units per bungalow, each veranda faces our lush, growing garden, and is equipped with a coffee table, two chairs and a hammock. A solar heater provides warm water in the shower. All rooms vary in style and appearance.";
        totalCapacity = "Rooms: 3 | People: 10";
        roomFeatures = [
            "Garden and mountain views",
            "Located on the ground floor",
            "Family Friendly",
            "Balcony",
            "Attached bathroom",
            "Fan",
            "Mosquito nets",
            "Safety deposit box"
        ];
    
    } 
    else if (accomodation.roomType === "Riverside Bungalow (Cottage)"){
        roomName = "Riverside Bungalow (Cottage)";
        roomSize = "45 m²";
        capacity ="5 – 7 | 2 double beds | 1 single bed ";
        roomDescription = "Located by the river, escape to the bungalow in the jungle, where you could swim in the azure blue Caribbean river. A family size tree house under the sun. Spectacular views of the forests. Available for long term stay. Contact us for information and price. ";
        totalCapacity = "1 cottage | 7 sleeps"
        roomFeatures = [
            "River and mountain views",
            "Located on the ground floor",
            "Private",
            "Family Friendly",
            "Large Balcony",
            "Kitchenette (optional)",
            "Attached bathroom",
            "Safety deposit box"
        ];
        
    }
  
        
        let modalContent = `
        <div class="modal fade" id="RoomModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${roomName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Room Size: ${roomSize}</p>
                        <p>Sleeps: ${capacity}</p>
                        <p>${roomDescription}</p>
                        <p>Total capacity: ${totalCapacity}</p>
                        <h6>Features:</h6>
                        <ul>${roomFeatures.map(feature => `<li>${feature}</li>`).join('')}</ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;


        // Ta bort den befintliga modalen från DOM
    const existingModal = document.getElementById("RoomModal");
    if (existingModal) {
        existingModal.parentElement.removeChild(existingModal);
    }


        // Lägg till modalfönsterinnehållet till body
    document.body.insertAdjacentHTML("beforeend", modalContent);

    // Visa modalfönster
    const modal = new bootstrap.Modal(document.getElementById("RoomModal"));
    modal.show();
}

    
function getTotalPrice(){

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
}

function updateTotalPrice() {
  // Beräkna det totala priset
  const total = getTotalPrice();

  // Uppdatera det totala priset i elementet med id "totalPrice"
  totalPrice.innerText = `Total price: ${total} $`;
}