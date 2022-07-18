const create_response = (code, content) => {
    return {
        code: code,
        data: content
    }
}
exports.ok = (text) => {
    return create_response(200, text == null ? "Ok" : text)
}
exports.created = (text) => {
    return create_response(201, text == null ? "Created" : text)
}
exports.bad_request = (text) => {
    return create_response(400, text == null ? "Bad Request" : text)
}
exports.unauthorized = (text) => {
    return create_response(401, text == null ? "Unauthorized" : text)
}
exports.forbidden = (text) => {
    return create_response(403, text == null ? "Forbidden" : text)
}
exports.not_found = (text) => {
    return create_response(404, ttext == null ? "Not Found" : text)
}
