const StyleUtils = {
    getVariable: function(name) {
        return getComputedStyle(document.body).getPropertyValue(name);
    }
};