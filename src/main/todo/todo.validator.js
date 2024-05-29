
const validate_TodoDto = (TodoDto) => {
    console.info("Try Validate : ", TodoDto);
    if (typeof TodoDto.content !== 'string' ||
        typeof TodoDto.isDone !== 'boolean' ||
        typeof TodoDto.createdDate !== 'number'
    ){
        const error = new Error()
        error.code = "VALIDATION"
        throw error;
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
        next(error);
    }
}

export const TodoValidator = {
    TodoDtoValidator,
}