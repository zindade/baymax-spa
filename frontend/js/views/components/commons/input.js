function input(type, id, placeholder ){

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.placeHolder = placeholder;

    return input;
}

export {input};





