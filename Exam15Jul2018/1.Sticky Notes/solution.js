function addSticker(){
    let title = $('.title');
    let text = $('.content');
    if(title.val() !== '' && text.val() !== ''){
        let li = $('<li>').addClass('note-content');
        let button = $('<a>').addClass('button').text('x');
        let h2 = $('<h2>').text(title.val());
        let hr = $('<hr>');
        let p = $('<p>').text(text.val());
        li
        .append(button)
        .append(h2)
        .append(hr)
        .append(p);
        button.click(function(){
            $(this).parent().remove();
        });
        $('#sticker-list').append(li);
        title.val('');
        text.val('');
    }
}