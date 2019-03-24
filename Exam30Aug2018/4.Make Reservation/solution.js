function makeReservation() {
    let submitBtn = $('#submit');
    let fullName = $('#fullName');
    let email = $('#email');
    let phoneNumber = $('#phoneNumber');
    let address = $('#address');
    let postalCode = $('#postalCode');
    let infoPreview = $('#infoPreview');
    let editBtn = $('#edit');
    let continueBtn = $('#continue');
    let container = $('#container');

    let fullNameVal;
    let emailVal;
    let phoneNumberVal;
    let addressVal;
    let postalCodeVal;

    submitBtn.click(function () {
        if (fullName.val() !== '' && email.val() !== '') {
            infoPreview
                .append($('<li>').text(`Name: ${fullName.val()}`))
                .append($('<li>').text(`E-mail: ${email.val()}`))
                .append($('<li>').text(`Phone: ${phoneNumber.val()}`))
                .append($('<li>').text(`Address: ${address.val()}`))
                .append($('<li>').text(`Postal Code: ${postalCode.val()}`));

            fullNameVal = fullName.val();
            emailVal = email.val();
            phoneNumberVal = phoneNumber.val();
            addressVal = address.val();
            postalCodeVal = postalCode.val();

            fullName.val('');
            email.val('');
            phoneNumber.val('');
            address.val('');
            postalCode.val('');

            submitBtn.attr('disabled', true);
            editBtn.attr('disabled', false);
            continueBtn.attr('disabled', false);
        }
    });

    editBtn.on('click', function () {
        fullName.val(fullNameVal);
        email.val(emailVal);
        phoneNumber.val(phoneNumberVal);
        address.val(addressVal);
        postalCode.val(postalCodeVal);

        editBtn.attr('disabled', true);
        continueBtn.attr('disabled', true);
        submitBtn.attr('disabled', false);
        infoPreview.empty();
    });

    continueBtn.on('click', function () {
        editBtn.attr('disabled', true);
        continueBtn.attr('disabled', true);
        submitBtn.attr('disabled', true);
        let h2 = $('<h2>').text('Payment details');
        let select = $('<select>').attr('id', 'paymentOptions').addClass('custom-select');
        select
            .append($('<option>').attr('selected', 'selected').attr('disabled', true).attr('hidden', true).text('Choose'))
            .append($('<option>').val('creditCard').text('Credit Card'))
            .append($('<option>').val('bankTransfer').text('Bank Transfer'));
        let extraDetails = $('<div>').attr('id', 'extraDetails');
        container.append(h2).append(select).append(extraDetails);

        $('#paymentOptions').on('change', function () {
            let paymentOption = $('#paymentOptions option:selected');;
            if (paymentOption.val() === 'creditCard') {
                extraDetails.empty();
                extraDetails
                    .append($('<div>').addClass('inputLabel').text("Card Number").append('<input>'))
                    .append($('<br>'))
                    .append($('<div>').addClass('inputLabel').text("Expiration Date").append('<input>'))
                    .append($('<br>'))
                    .append($('<div>').addClass('inputLabel').text("Security Numbers").append('<input>'))
                    .append($('<br>'))
                    .append($('<button>').text('Check Out').attr('id', 'checkOut').click(checkOut));
            }else if(paymentOption.val() === 'bankTransfer'){
                extraDetails.empty();
                extraDetails
                    .append($('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>'))
                    .append($('<button>').text('Check Out').attr('id', 'checkOut').click(checkOut));
            }
        });
    });
    function checkOut(){
        $('#wrapper').empty();
        $('#wrapper').append($('<h4>').text("Thank you for your reservation!"));
    }
}