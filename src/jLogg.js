/*
 *  jLogg - v0.1.0
 *  A simple jQuery Plugin that allow you to log-in into your web app using the Facebook Javascript SDK.
 *  http://dev.danielmunnoz.com/jLogg
 *
 *  Made by Daniel Muñoz
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

    "use strict";

        // Declare Plugin default options
        var pluginName = "jLogg",
            defaults = {
                appId         : "1046016745413247",
                defaultButton : false,
                button        : {
                    size  : "medium"
                },
                permissions   : "public_profile, email",
                onLogin       : function () {},
                onLogout      : function () {}
            };

        // Plugin Constructor
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
                this.setFacebookSDK();

                if (!this.settings.defaultButton) {
                    this.settings.button = $(this.element).find("[data-action='facebook-login']")[0];
                    $(this.settings.button).on("click", self.login);
                } else {
                    // Removes the custom button if you already declare it.
                    // This is because defaulButton has been set as TRUE, so
                    // you don't need two login buttons.
                    if ($(this.element).find("[data-action='facebook-login']")[0]) {
                        $(this.element).find("[data-action='facebook-login']")[0].remove();
                    }

                    // Sets the default facebook login button.
                    var container = $(this.element).find("[data-contains='facebook-button']")[0],
                        btn = $("<div class='fb-login-button' data-auto-logout-link='true' data-size='"+ this.settings.button.size +"' data-scope='"+ this.settings.permissions +"' onlogin='"+ checkLoginState() +"'></div>");

                        $(container).append(btn);
                }

            },

            // Calls the <script> with the
            // requested parameters from Facebook.
            // See: https://developers.facebook.com/docs/facebook-login/login-flow-for-web/v2.3
            setFacebookSDK: function () {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId   : self.settings.appId,
                        xfbml   : true,
                        version : "v2.3"
                    });
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, "script", "facebook-jssdk"));
            },

            // This function is trigger when
            // the Login Button is clicked.
            login: function (e) {
                // In case the form has action and the
                // custom login button is type="submit".
                e = event || window.event;
                e.preventDefault();

                FB.login(function (response) {
                    if (response.status === "connected") {
                        // Woohoo. You are now connected.
                        // We can save the session token in the
                        // localStorage.
                        localStorage.removeItem("jLoggSessionToken");
                        localStorage.setItem("jLoggSessionToken", response.authResponse.accessToken);

                        // Creates the logout button if using
                        // your own custom btn.
                        if (self.settings.defaultButton === false) {
                            var btnLogout = $("<button type='button' id='btn-facebook-logout' data-action='facebook-logout' class='btn btn-primary'>Logout</button>");
                            btnLogout.on("click", self.logout);
                            if (!$(self.element).find("#btn-facebook-logout")[0]) {
                                $(self.element).append(btnLogout);
                            }
                        }

                        self.success(response);
                    }
                }, {scope: self.settings.permissions});

                FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                });
            },

            // This function is called when the logout
            // button is trigger.
            logout : function () {
                FB.logout(function(response) {
                    localStorage.removeItem("jLoggSessionToken");
                    self.settings.onLogout(response);
                });
            },

            // When login, and the FBSDK checked the accessToken,
            // this function is called.
            success: function () {
                FB.api("/me", function (response) {
                    self.settings.onLogin(response);
                });
            }
        });

        // Public function which is
        // trigger when a login status check
        // needs to be perform.
        function statusChangeCallback (response) {
            // console.log(response);
            if (response.status === "connected") {
                if (!localStorage.getItem("jLoggSessionToken")) {
                    self.success();
                }
            } else if (response.status === "not_authorized") {
                console.error("You are not logged into the app, please login to continue!");
            }
        }

        function checkLoginState () {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        }

        $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

})( jQuery, window, document );
