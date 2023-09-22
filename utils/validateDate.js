module.exports = {
    validator: (dateValue) => {
        const regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        if (!dateValue.match(regexDate)) {
            return false
        }

        const date = new Date(dateValue)
        if (isNaN(date.getTime())) {
            return false
        }

        return true
    }
}