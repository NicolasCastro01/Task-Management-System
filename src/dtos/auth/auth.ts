export interface Credentials {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly password: string;
}

interface CredentialsRequest {
    readonly email: string;
    readonly password: string;
}

export class CredentialsDTO {
    readonly email: string;
    readonly password: string;
    
    constructor(credentialsRequest: CredentialsRequest) {
        this.email = credentialsRequest.email;
        this.password = credentialsRequest.password;
    }
}

export class CredentialsToRegisterDTO {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;

    constructor(credentialsToRegisterRequest: Credentials) {
        this.firstName = credentialsToRegisterRequest.first_name;
        this.lastName = credentialsToRegisterRequest.last_name;
        this.email = credentialsToRegisterRequest.email;
        this.password = credentialsToRegisterRequest.password;
    }
}