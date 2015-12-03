/**
 * Created by jayantbhawal on 4/12/15.
 */

ready(function () {
    navigator.webkitGetUserMedia({video:true},function(stream){stream.stop();},function(err){});
});