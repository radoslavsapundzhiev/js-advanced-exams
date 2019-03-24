   function addDestination() {
       let city = $('.inputData')[0];
       let country = $('.inputData')[1];
       let season = $('#seasons').find(':selected');
       let tbody = $('#destinationsList');
       let summer = $('#summer');
       let autumn = $('#autumn');
       let winter = $('#winter');
       let spring = $('#spring');
       let summerCounter = 0;
       let autumnCounter = 0;
       let winterCounter = 0;
       let springCounter = 0;

       if ($(city).val() !== '' && $(country).val() !== '') {
           let row = $('<tr>');
           let destinationTd = $('<td>').text($(city).val() + ', ' + $(country).val());
           let seasonTd = $('<td>').text(season.text());
           row.append(destinationTd).append(seasonTd);
           tbody.append(row);
           $(city).val('');
           $(country).val('');
       }
       let seasons = $('#destinationsList tr td:nth-child(2)').toArray().map(e => $(e).text());
       for (let season of seasons) {
        switch (season) {
            case "Summer":
                summerCounter++;
                break;
            case "Autumn":
                autumnCounter++;
                break;
            case "Winter":
                winterCounter++;
                break;
            case "Spring":
                springCounter++;
                break;
        }
       };

       summer.val(summerCounter);
       autumn.val(autumnCounter);
       winter.val(winterCounter);
       spring.val(springCounter);
   }