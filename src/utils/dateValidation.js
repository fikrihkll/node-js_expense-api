exports.isValidDateTime = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!dateString.match(regEx)) {
        return false; // Invalid format
    }
    const date = new Date(dateString);
    const isValid = !isNaN(date.getTime());
    return isValid;
}