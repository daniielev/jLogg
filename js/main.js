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
        onLogin       : function (api) {
            // console.log(api);
            alert("Welcome, " + api.first_name + ".");
        },
        onLogout      : function (response) {
            // console.log(response);
            alert("Come back soon, " + api.first_name + ".");
        }
    });
});