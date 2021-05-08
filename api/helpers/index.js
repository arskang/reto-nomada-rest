const setResponseHelper = ({
    ok = false,
    message,
    ...rest
}) => ({
    ok,
    message,
    ...rest
});

const getMessageRest = (rest, validos) => {
    let message = "";
    Object.keys(rest).forEach(key => {
        message = `${message === "" ? "" : `${message}, `}${key}: ${rest[key]}`;
    })
    return Object.keys(rest).length > 0 ? ` Recibimos la siguiente información innecesaria: ${message}; solo necesitamos recibir ${validos || "los datos necesarios"}.` : "";
}

module.exports = {
    setResponseHelper,
    getMessageRest,
};