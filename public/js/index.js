const socket = io();
function scrollToBottom () {
    // Seclectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    console.log('clientHeight',clientHeight);
    console.log('scrollTop',scrollTop);
    console.log('scrollHeight',scrollHeight);
    console.log('newMessageHeight',newMessageHeight);
    console.log('lastMessageHeight',lastMessageHeight);
    console.log('===========================================');

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        console.log("scrolling");
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    const formmatedTime = moment(message.createAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formmatedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    const formmatedTime = moment(message.createAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formmatedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    const messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your brower.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});