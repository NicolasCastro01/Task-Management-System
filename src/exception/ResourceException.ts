import { Exception } from "./Exception"

interface ResourceDetailsProps {
    field: string;
}

export class ResourceException extends Exception<ResourceDetailsProps> {
    private constructor(message: string, details?: ResourceDetailsProps) {
        super(message, 422);

        if(details?.field) this.addDetails(details);
    }

    static notFound(details?: ResourceDetailsProps): ResourceException {
        return new ResourceException("Resource not found.", details);
    }
}