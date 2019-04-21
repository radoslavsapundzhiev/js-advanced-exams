function acceptance() {
	let shippingCompany = $('input[name="shippingCompany"]');
	let productName = $('input[name="productName"]');
	let productQuantity = $('input[name="productQuantity"]');
	let productScrape = $('input[name="productScrape"]');
	let warehouse = $('#warehouse');

	let isValidCompanyAndProduct = (shippingCompany.val() !== '') && (productName.val() !== '');
	let isValidQuantityAndScrape = (typeof +productQuantity.val() === 'number') && (typeof +productScrape.val() === 'number');

	if(isValidCompanyAndProduct && isValidQuantityAndScrape){
		let availableProductQuantity = +productQuantity.val() - (+productScrape.val());
		if(availableProductQuantity > 0){
		let div = $('<div>');
		let btn = $('<button>').attr('type', "button").text('Out of stock');

		btn.on('click', function(){
			$(this).parent().remove();
		});

		div
		.append($('<p>').text(`[${shippingCompany.val()}] ${productName.val()} - ${availableProductQuantity} pieces`))
		.append(btn);

		warehouse.append(div);

		}
	}
	shippingCompany.val('');
	productQuantity.val('');
	productName.val('');
	productScrape.val('');
}		