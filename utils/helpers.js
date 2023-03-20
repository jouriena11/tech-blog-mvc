module.exports = {
        limitCharacters: (text, maxLength) => {
            if(text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        ifEq: (arg1, arg2, options) => {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
}
