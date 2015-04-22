$(function(){
    $("a[href='#']").click(function (e) {
        e.preventDefault();
        return false;
    });

    //Load Goodle Code Pretiffy
    window.prettyPrint && prettyPrint();

    //Tab function
    $('#pluginTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //FAQ autosuggest
    $('.typeahead').typeahead();

    //tooltip init
    $("a.tip").tooltip();

    //footer link to got top
    gotoTop();
    function gotoTop(){
         // scroll body to 0px on click
            $('a#top').on('click',function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
     };

     $("#form-login").jLogg({
        appId         : "1046016745413247",
        defaultButton : false,
        permissions   : "public_profile,email",
        onLogin       : function (api) {
            console.log(api);
            var container = $("#profile-card");
            var output = $("#profile-card .caption");

            $("#btn-facebook").fadeOut("fast", function () {
                $("#btn-login").parent().append($("#btn-facebook-logout"));
            });


            var name = $("<h3>"+ api.name +"</h3>"),
                link = $("<p><a href='"+ api.link +"'>Go to the Facebook Profile</a></p>"),
                mail = $("<p><a href='mailto:"+ api.email +"'><small>"+ api.email +"</small></a></p>");

            output.append(name);
            output.append(link);
            output.append(mail);
            container.removeClass("hidden");
        },
        onLogout      : function (response) {
            console.log(response);
            $("#btn-facebook-logout").remove(function () {
                $("#btn-facebook").fadeIn();
            });
        }
    });
});