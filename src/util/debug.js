const debugMode = (isOn) => {
    function debug(str) {
        if(isOn) {
            console.log(str)
        }
    }
    return {
        debug
    }
}

export default debugMode