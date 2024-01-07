
class BadRequestParameterError extends Error{
    code;
    constructor(code = 400, message){
        super(message);
        this.code = code;
    }
}

export default BadRequestParameterError;