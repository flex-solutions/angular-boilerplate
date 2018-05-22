export interface HttpExceptionResponse {
    statusCode: number;
    message: {
        statusCode: number,
        error: any,
        message: Message,
    };
}

export interface Message {
    message_code: string;
    type: number;
    content: { en: string; vi: string };
}
