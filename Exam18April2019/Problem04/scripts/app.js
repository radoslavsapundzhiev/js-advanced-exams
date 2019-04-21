function solution (){
    //Login
    let loginBtn = $('#loginBtn');
    let username = $('#username');
    $('#create-offers').css('display', 'none');
    loginBtn.on('click', login);
    function login(e){
        e.preventDefault();
        
        if(loginBtn.text() === 'Logout'){
            $('#create-offers').css('display', 'none');
            $('#username').removeAttr('disabled');
            $('#username').removeClass('border-0 bg-light');
            loginBtn.text('Login');
            $('#username').val('');
            $('#notification').text('');
        }else{
            if(validateUsername(username.val())){
                $('#create-offers').css('display', 'block');
                let user = username.val();
                $('#username').val(`Hello, ${user}!`);
                $('#username').attr('disabled', 'disabled');
                $('#username').addClass('border-0 bg-light');
                loginBtn.text('Logout');
                $('#notification').text('');
            }else{
                $('#notification').text(`The username length should be between 4 and 10 characters.`);
            }
        }
    }
   
    function validateUsername(username){
        if(username.length < 4 || username.length > 10){
            return false;
        }
        return true;
    }
    //Create offers
    let createOfferBtn = $('#create-offer-Btn');
    let offerName = $('#offerName');
    let company = $('#company');
    let description = $('#description');
    createOfferBtn.on('click', createOffer);
    function createOffer(e){
        e.preventDefault();
        if(offerName.val() && company.val() && description.val()){
            let container = $('<div>').addClass('col-3');
            let innerContainer = $('<div>').addClass('card text-white bg-dark mb-3 pb-3').css('max-width', '18rem');
            let firstInnerDiv = $('<div>').addClass('card-header').text(offerName.val());
            let secondInnerDiv = $('<div>').addClass('card-body');
            let h5 = $('<h5>').addClass('card-title').text(company.val());
            let p = $('<p>').addClass('card-text').text(description.val());

            secondInnerDiv
            .append(h5)
            .append(p);

            innerContainer
            .append(firstInnerDiv)
            .append(secondInnerDiv);

            container.append(innerContainer);

            $('#offers-container').append(container);

        }
        offerName.val('');
        company.val('');
        description.val('');
    }
}

solution();