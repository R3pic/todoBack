import createHttpError from "http-errors";

const MainErrorHandler = (err, req, res, next) => {
    console.log("에러처리 미들웨어 작동됨.");
    res.status(err.status).send(err);
}

const NotFoundHandler =  (req, res, next) => {
    console.log("404 Not Found 미들웨어");
    next(createHttpError(404, `Router ${req.url} Not Found\n`));
}

export const ErrorHandler = {
    MainErrorHandler,
    NotFoundHandler
}