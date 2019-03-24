function solution() {
	let toyType = $('#toyType');
	let toyPrice = $('#toyPrice');
	let toyDescription = $('#toyDescription');
	let button = $('#fields').find('button');
	let christmasGiftShop = $('#christmasGiftShop');
	//button.click(addItem);
	//function addItem() {
		if (toyType.val() !== '' && Number(toyPrice.val()) && (toyDescription.val())) {
			let div = $('<div>').addClass('gift');
			let img = $('<img src="gift.png">');
			let h2 = $('<h2>').text(`${toyType.val()}`);
			let p = $('<p>').text(`${toyDescription.val()}`);
			let btn = $('<button>').text(`Buy it for $${toyPrice.val()}`);
			btn.click(disappear);
			div.append(img).append(h2).append(p).append(btn);
			christmasGiftShop.append(div);
			toyType.val('');
			toyPrice.val('');
			toyDescription.val('');
		}
	//}

	function disappear() {
		$(this).parent().remove();
	}
}