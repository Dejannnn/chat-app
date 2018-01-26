jQuery(document).ready(function () {
    console.log("ready!");
    var socket = io();

    function scrollToBUttom() {

        var messeges= jQuery("#messages");
        var scrollHeight= messeges.prop("scrollHeight");
            messeges.scrollTop(scrollHeight);

    }
    socket.on('connect', () => {
        const params=$.deparam(window.location.search);
        socket.emit('join', params, (err) => {
            if(err) {
                alert(err);
                window.location.href = '/';
            }
            else {
                console.log("NO error");
            }
        })
    });
    socket.on('disconnect', () => {
        console.log("Disconected from server");
    });
    socket.on('updateUserList', (users) => {
        console.log(users);
        const ol=  $('<ol></ol>');
        users.forEach((user)=> {
            ol.append($('<li></li>').text(user));
        });
        $('#users').html(ol);

    })
    socket.on("newMessage", function (message) {
        console.log("Ovo je poruka koju sam napisao", message);

        var formatedTime= moment(message.createAt).format('h:mm a');
        $('#messages').append('<li> <span style="font-weight: bold">'+message.from +'</span> '+ formatedTime +' : </br>'+ message.text +'</li>');
        scrollToBUttom();
    });
    socket.on("newLocationMessage" , (locationInf) => {

        var formatedTime= moment(locationInf.createAt).format('h:mm a');
        $('#messages').append('<li> <span style="font-weight: bold">'+ locationInf.from + '</span> ' + formatedTime +' : </br> <a target="_blank" href='+locationInf.url+'> Link to my location</a></li>');
        scrollToBUttom();
    })

    $("#message-from").on("submit", (event) => {
        event.preventDefault();

        socket.emit("createMessege", { text: $('[name=message]').val()}, () => {
            $('[name=message]').val("")
        });

    });
    const locationButton = $('#idLocation');
    locationButton.on("click", () => {
        if (!navigator.geolocation) {
            alert("Gelolocation is not supported on your browser");
        }
        locationButton.attr('disabled', 'disabled').text("Location is sending");
        if (navigator.geolocation.getCurrentPosition( (postion) => {
                locationButton.removeAttr('disabled').text("Send location");
                socket.emit('createLocationMessage', {
                    latitude: postion.coords.latitude,
                    longitude: postion.coords.longitude
                });
            }, () => {
                locationButton.removeAttr('disabled').text("Send location");
                alert("Unable postion");
            }));

    });

});
