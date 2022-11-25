export default interface LoginDetails {
    name: string;
    email: string;
    emailError?: string;
    password: string;
    password_again: string;
    message?: string;
}