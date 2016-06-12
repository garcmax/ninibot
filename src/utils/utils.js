'use strict'

export function trim(str) {
    return str.replace(/[^\x20-x7E]+/g, '').trim();
}
