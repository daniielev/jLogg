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

    // Facebook SDK Functions
    var btnFBLogin = $("#btn-facebook-login"),
        btnFBLogout = $("#btn-facebook-logout"),
        container = $("#profile-card"),
        output = $("#profile-card .caption");

     $("#form-login").jLogg({
        appId         : "1046016745413247",
        defaultButton : false,
        permissions   : "public_profile, email, user_about_me",
        onLogin       : function (api) {
            // console.log(api);

            btnFBLogin.addClass("hidden");
            btnFBLogout.removeClass("hidden");

            var name = $("<h3>"+ api.name +"</h3>"),
                link = $("<p><a href='"+ api.link +"'>Go to "+ api.first_name +"'s profile</a></p>"),
                mail = $("<p><a href='mailto:"+ api.email +"'><small>"+ api.email +"</small></a></p>"),
                bio;

            if (api.bio) {
                bio = $("<p>"+ api.bio.replace(/(?:\r\n|\r|\n)/g, "<br>") + "</p>");
            } else {
                bio = $("<p>This user has not a bio.</p>");
            }

            var toAppend = [name, link, mail, bio];

            $(toAppend).each(function () {
                var item = $(this);

                output.append(item);
            });

            container.removeClass("hidden");
        },
        onLogout      : function () {
            btnFBLogin.removeClass("hidden");
            btnFBLogout.addClass("hidden");
            output.html("");
            container.addClass("hidden");
        }
    });
});