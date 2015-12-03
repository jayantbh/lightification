/**
 * Created by jayantbhawal on 3/12/15.
 */

(function () {
    var lighted = false;
    var show_notification = function (site, count) {
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "icons/" + site + ".png",
            title: "Lightification from " + site,
            message: count + " unread notifications from " + site,
            buttons: [
                {
                    title: "Clear"
                }
            ],
            isClickable: true
        }, function (id) {

        });
    };
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type == "notification") {
            show_notification(message.site, message.count);
            sendResponse("Nananananotified!");
            sendResponse(Webcam);
        }
        if (message.type == "light") {
           if(!lighted){
               var s;
               var i = 0;
               lighted = true;
               if (!message.duration_per_blip) {
                   message.duration_per_blip = 100;
               }
               if (!message.number_of_blips) {
                   message.number_of_blips = 5;
               }
               var clr = setInterval(function () {
                   if (i % 2 == 0) {
                       navigator.webkitGetUserMedia({video: true}, function (stream) {
                           s = stream
                       }, function (err) {
                       });
                       console.log("Lightification Blip " + (i / 2) + "!");
                   }
                   else {
                       s.stop();
                   }
                   i++;

                   if (i >= 2 * message.number_of_blips) {
                       clearInterval(clr);
                       lighted = false;
                       sendResponse("Blipped!");
                   }
               }, message.duration_per_blip * message.number_of_blips);
           }
        }
    });
})();
