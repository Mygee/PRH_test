(function ($) {
    $('button').on('click', function () {
        // remove resultset if this has already been run
        $('.content ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        // get selected zip code from selectbox
        var businessId = document.getElementById('businessId');

        // make AJAX call
        $.getJSON('http://avoindata.prh.fi:80/tr/v1?totalResults=false&maxResults=10&resultsFrom=0&companyRegistrationFrom=2014-02-28', function (data) {
            
            // do all this on success       
            var items = [],
                $ul;
            
            $.each(data, function (key, val) {
                //iterate through the returned data and build a list
                items.push('<li id="' + key + '"><span class="name">' + val.name + '</span><br><span class="registrationDate">' + val.registrationDate + '</span> <span class="companyForm">' + val.companyForm + '</span></li>');
            });
            // if no items were returned then add a message to that effect
            if (items.length < 1) {
                items.push('<li>Ei tuloksia y-tunnuksella, yrita uudestaan</li>');
            }
            
            // remove spinner
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').appendTo('.content');
            
            //append list items to list
            $ul.append(items);
        });
    });
}(jQuery));
