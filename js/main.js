$("#btn-facebook").jLogg({
    appId      : "1046016745413247",
    mouseEvent : "click",
    result     : "#result",
    success    : function () {
        alert("Woohoo!");
    },
    error      : function () {
        alert("No way!");
    }
});