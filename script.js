    $(function(){
        var iframeContainerID = "#iframeContainer";
        var iframeID = "#workContainer";
        var fadeOutDuration = 200;
        var fadeInDuration = 200;


        $("#menu ul.work li a").click(function(e){

            var target = this;
            $(iframeContainerID).fadeTo(fadeOutDuration,0.0,function(){
                var src = $(target).attr("href");
                $(iframeContainerID).hide();
                $(iframeID).attr("src", src).ready(function(){
                    $(iframeContainerID).delay(50).fadeTo(fadeInDuration,1.0);
                });
            });
            return false;
        })

        function setup(){
        }

        function loadItemAtIndex(index){
            var item = $("#menu ul.work li a:eq(" + index + ")");

            var src = $(item).attr("href");
            $(iframeID).attr("src", src).ready(function(){
                $(iframeContainerID).fadeTo(fadeInDuration,1.0);
            });
        }

        setup();
    });



