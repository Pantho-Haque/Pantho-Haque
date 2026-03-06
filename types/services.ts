
export type TPost = {
    id: number;
    title: string;
    body: string;
    userId: number;
}


export type TForm = {
    name: string;
    email: string;
    password: string;
    country: string;
    agree: boolean;
}

export type TFormRespose = {
    message: string;
    body : TForm;
    id : string;
    error?: string;
}