;(function ( $, window, document, undefined ) {

    "use strict";

        var pluginName = "jLogg",
            defaults = {
            appId: "1046016745413247",
            class: ["btn-fb-login", "btn-fb"],
            mouseEvent: "click",
            result: "",
            success: function () {
                alert("Woohoo! You have been sucessfully login into Facebook using jLogg");
            },
            error: function () {
                alert("Error :(");
            }
        };

        var self;

        function Plugin ( element, options ) {
            this.element = element;
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._options = options;
            this._name = pluginName;
            self = this;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {
            init: function () {
                var elemName = this.element.nodeName;

                if (elemName === "BUTTON" || elemName === "INPUT" || elemName === "IMG") {
                    if (elemName === "BUTTON" || elemName === "INPUT") {
                        // Make sure that the client sets
                        // the element type as submit properly.
                        // (ie. You forget to declare the input/button type attribute as submit);
                        $(this.element).attr("type", "submit");
                    }
                    this.setFacebookSDK();
                } else {
                    console.error("Nope! This plugin only works with INPUT, BUTTON or IMG elements. You're using the: " + elemName + " element.");
                    return false;
                }

                $(this.settings.class).each(function () {
                    $(self.element).addClass(this);
                });

                // Set the event trigger for the element
                $(this.element).on(this.settings.mouseEvent, this.askStatus);
            },

            // Calls the <script> with the
            // requested parameters from Facebook.
            // See: https://developers.facebook.com/docs/facebook-login/login-flow-for-web/v2.3
            setFacebookSDK: function () {
                window.fbAsyncInit = function() {
                    FB.init({
                    appId      : self.settings.appId,
                    xfbml      : true,
                    version    : "v2.3"
                    });
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, "script", "facebook-jssdk"));
            }, // setFBSDK

            setLogin: function () {
                FB.login(function (response) {
                    if (response.status === "connected") {
                        self.settings.success();
                        self.yay(response);
                    }
                }, scope: "public_profile, email");
            },

            askStatus: function () {
                FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                });
            },

            yay: function () {
                FB.api("/me", function (response) {
                    $(self.settings.result).append("<p>"+response.first_name+"</p>");
                    $(self.settings.result).append("<p>"+response.last_name+"</p>");
                    $(self.settings.result).append("<p>"+response.email+"</p>");
                });
            },

            statusChangeCallback: function (response) {
                console.log(response);
                if (response.status === 'connected') {
                    console.log("Yay!");
                    // call the function afterLogin();
                    // self.settings.success();
                    self.yay(response);
                } else if (response.status === 'not_authorized') {
                    // Throw an error();
                    // console.error("NOPE!");
                    self.settings.error();
                } else {
                    // Please log into Facebook to continue.
                    console.warn("You must be logged into Facebook!");
                }
            }
        });

        $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

})( jQuery, window, document );
