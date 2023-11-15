import { Exception } from "./Exception"

interface ValidationDetailsProps {
    field: string;
    rule: string
}

export class ValidationException extends Exception<ValidationDetailsProps> {
    private constructor(message: string, details?: ValidationDetailsProps) {
        super(message, 403);

        if(details?.field || details?.rule) this.addDetails(details);
    }

    static invalid(details?: ValidationDetailsProps): ValidationException {
        return new ValidationException("Field empty.", details);
    }
}