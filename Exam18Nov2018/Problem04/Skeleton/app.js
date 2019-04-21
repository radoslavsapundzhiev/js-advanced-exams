function realEstateAgency () {
	//Reg offer field
	let regOfferButton = $('#regOffer button');
	regOfferButton.on('click', registerOffer);

	let rent = $('#regOffer').find('input[name="apartmentRent"]');
	let type = $('#regOffer').find('input[name="apartmentType"]');
	let commission = $('#regOffer').find('input[name="agencyCommission"]');
	let message = $('#message');
	let building = $('#building');
	let offers = [];

	function registerOffer(){
		message.text(validateAndReturnMessage());
		if(validateAndReturnMessage() === 'Your offer was created successfully.'){
			let newDiv = $('<div>').addClass('apartment');
			newDiv
			.append($('<p>').text(`Rent: ${rent.val()}`))
			.append($('<p>').text(`Type: ${type.val()}`))
			.append($('<p>').text(`Commission: ${commission.val()}`));
			building.append(newDiv);
			let offer = {};
			offer.rent = rent.val();
			offer.type = type.val();
			offer.commission = commission.val();
			offer.neededBudget = +offer.rent + ((+offer.rent) * (+offer.commission) / 100)
			offers.push(offer);
		}
		rent.val('');
		type.val('');
		commission.val('');
	}

	function validateAndReturnMessage(){
		if(!isValidRent() || !isValidCommission() || !isValidType()){
			return 'Your offer registration went wrong, try again.';
		}else{
			return 'Your offer was created successfully.';
		}
	}

	function isValidRent(){
		if(typeof +rent.val() !== 'number' || +rent.val() <= 0){
			return false;
		}
		return true;
	}

	function isValidCommission(){
		if(typeof +commission.val() !== 'number' || +commission.val() < 0 || +commission.val() > 100){
			return false;
		}
		return true;
	}

	function isValidType(){
		if(type.val() === '' || type.val().indexOf(':') !== -1){
			return false;
		}
		return true;
	}

	//Find offer field
	let findOfferButton = $('#findOffer button');
	let familyBudget = $('#findOffer').find('input[name="familyBudget"]');
	let familyApartmentType = $('#findOffer').find('input[name="familyApartmentType"]');
	let familyName = $('#findOffer').find('input[name="familyName"]');
	let profit = $('#roof h1');
	let agencyProfit = 0;

	findOfferButton.on('click', findApartment);

	function findApartment(){
		if(typeof +familyBudget.val() === 'number' && +familyBudget.val() > 0 && familyApartmentType.val() && familyName.val()){
			let filteredOffers = offers.filter(o => o.type === familyApartmentType.val());
			if(filteredOffers.length > 0){	

				let sorted = filteredOffers.sort(function(a, b){
					return a.neededBudget - b.neededBudget;
				});
				let choosenOffer = sorted[0];
				let neededBudget = choosenOffer.neededBudget;
				let choosenOfferElement;
				
				let choosenOfferElements = $('.apartment');
				let choosenIndex = 0;
				choosenOfferElements.each((i, e) => {
					let currentRent = $(e).children().eq(0).text();
					let currentType = $(e).children().eq(1).text();
					let currentCommission = $(e).children().eq(2).text();
					if(currentRent === `Rent: ${choosenOffer.rent}` && currentType === `Type: ${choosenOffer.type}` && currentCommission === `Commission: ${choosenOffer.commission}`){
						choosenIndex = i;
					}
				})

				choosenOfferElement = $('.apartment').eq(choosenIndex);

				if(neededBudget <= +familyBudget.val()){
					choosenOfferElement.empty();
					choosenOfferElement.css('border', '2px solid red');
					let moveOutBtn = $('<button>').text('MoveOut');
					choosenOfferElement
					.append($('<p>').text(`${familyName.val()}`))
					.append($('<p>').text('live here now'))
					.append(moveOutBtn);
					moveOutBtn.on('click', function(){
						$(this).parent().remove();
						message.text(`They had found cockroaches in ${$(this).parent().find('p').eq(0).text()}\'s apartment`)
					});
					agencyProfit += (+choosenOffer.rent * (+choosenOffer.commission / 100)) * 2;
					profit.text(`Agency profit: ${agencyProfit} lv.`);
					message.text('Enjoy your new home! :))');
				}else{
					message.text('We were unable to find you a home, so sorry :(');
				}
			}
		}else{
			message.text('We were unable to find you a home, so sorry :(');
		}
		familyBudget.val('');
		familyApartmentType.val('');
		familyName.val('');
	}
}