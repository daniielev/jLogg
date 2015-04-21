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

		var pluginName = "jLogg",
				defaults = {
				appId: "1046016745413247",
				class: ["btn-fb-login", "btn-fb"],
				result: "",
				success: function () {
					alert("Woohoo! You have been sucessfully login into Facebook using jLogg");
				},
				error: function () {
					alert("Error :(");
				}
		};

		var self;

		// The actual plugin constructor
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
				} // setFBSDK
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
