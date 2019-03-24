function attachEvents() {
    let btnAdd = $('#btnAdd');
    let btnDelete = $('#btnDelete');
    let inputTxt = $('#newItem');

    btnAdd.click(function(){
        if(inputTxt.val() !== ''){
            $('#towns').append($('<option>').text(inputTxt.val()));
            inputTxt.val('');
        }   
    });

    btnDelete.click(function(){
        $('#towns option:selected').remove();
    });
}