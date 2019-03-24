function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    let submitBtn = $('#submit');
    let product = $('.custom-select');
    let price = $('#price');
    let quantity = $('#quantity');
    let capacityField = $('#capacity');
    let priceField = $('#sum');
    submitBtn.on('click', createOrder);
    product.on('input', function(){
        if(submitBtn.attr('disabled', true)){
            submitBtn.attr('disabled', false);
        }
    });
    let capacity = 0;
    let totalPrice = 0;
    function createOrder(){
        let li = $('<li>')
        .text(`Product: ${product.val()} Price: ${price.val()} Quantity: ${quantity.val()}`);
        $('.display').append(li);
        capacity += Number(quantity.val());
        totalPrice += Number(price.val());
        if(capacity >= 150){
            capacityField.val('full');
            submitBtn.attr('disabled', true);
            product.attr('disabled', true);
            price.attr('disabled', true);
            quantity.attr('disabled', true);
            capacityField.addClass('fullCapacity');
        }else{
            capacityField.val(capacity);
        }
        
        priceField.val(totalPrice);
        product.val('');
        price.val('1');
        quantity.val('1');
        submitBtn.attr('disabled', true);
    }
}
