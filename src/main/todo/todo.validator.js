
const validate_TodoDto = (TodoDto) => {
    console.info("Try Validate : ", TodoDto);
    if (typeof TodoDto.content !== 'string'){
        throw new Error("content must be a string");
    }
    if (typeof TodoDto.isDone !== 'boolean') {
        throw new Error("isDone must be a boolean");
    }

    if (typeof TodoDto.createdDate !== 'number'){
        throw new Error("createDate must be a number");
    }

    return true
}


const TodoDtoValidator = (req, res, next) => {
    try {
        validate_TodoDto(req.body);
        next();
    }
    catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

export const TodoValidator = {
    TodoDtoValidator,
}