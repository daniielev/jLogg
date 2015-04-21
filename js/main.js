$("#btn-facebook").jLogg({
    appId         : "1046016745413247",
    button        : "facebook",
    success       : function (fbAPI) {
        // Code on login successful;
    },
    error         : function (response) {
        // Code on failed login;
    }
});