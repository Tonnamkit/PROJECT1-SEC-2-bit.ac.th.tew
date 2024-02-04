const debugMode = (isOn) => {
    function debug(msg, val) {
        if(isOn) {
            console.log(msg, val)
        }
    }
    return {
        debug
    }
}

export default debugMode