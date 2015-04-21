$("#btn-facebook").jLogg({
    appId      : "1046016745413247",
    class      : ["btn-facebook-login"],
    mouseEvent : "click",
    result     : "#result",
    success    : function () {
        alert("Woohoo!");
    },
    error      : function () {
        alert("No way!");
    }
});