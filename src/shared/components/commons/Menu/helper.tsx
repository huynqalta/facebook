export const pushIfNotExit = (array, item, multiple?) => {
    const index = array.indexOf(item);

    if (index == -1) {
        if (multiple) {
            array.push(item);
        } else {
            array = [item];
        }
    }
    return [...array];
}

export const spliceIfExit = (array, item) => {
    const index = array.indexOf(item);

    if (index != -1) {
        array.splice(index, 1);
    }
    return [...array]
}

export const editByCodition = (array, item, multiple?, status?) => {
    const index = array.indexOf(item);

    if (!status) {
        if (index == -1) {
            return pushIfNotExit(array, item, multiple);
        } else {
            return spliceIfExit(array, item);
        }
    } else {
        let editFunc;
        if (status == 'on') {
            editFunc = pushIfNotExit;
        } else {
            editFunc = spliceIfExit;
        }
        return editFunc(array, item, multiple)
    }
}
declare global {
    interface Array<T> {
        diff(array: Array<T>);
    }
}
export const isCoincide = (array1, array2) => {
    if (!Array.isArray(array1) || !Array.isArray(array2)) return false;
    Array.prototype.diff = function (arr2) {
        var ret = [];
        for (var i in this) {
            if (arr2.indexOf(this[i]) > -1) {
                ret.push(this[i]);
            }
        }
        return ret;
    };
    return array1.diff(array2).length != 0;
}

export const debounce = (callback, delay) => {
    let timeoutHandler = null;
    return (...args) => {
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
        }
        timeoutHandler = setTimeout(() => {
            callback(...args);
            timeoutHandler = null;
        }, delay);
    };
};

export const indexOfArrObject = (arr, key, value) => {
    let index = -1;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i][key] === value) {
            index = i;
            break;
        }
    }
    return index;
};

export const isInArray = (array, item) => {
    if (!Array.isArray(array)) return;
    const index = array.indexOf(item);
    return index != -1;
}

export const convertToArray = (array) => {
    if (Array.isArray(array)) {
        return array;
    }
    return [array]
}