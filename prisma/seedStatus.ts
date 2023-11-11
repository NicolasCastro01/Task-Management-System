import { PrismaClient } from "@prisma/client";

type Status = {
    id: number;
    description: string;
}

export class SeederStatus {
    protected readonly status: Status[] = [
        {
            id: 1,
            description: 'pending'
        },
        {
            id: 2,
            description: 'completed'
        }
    ]

    constructor(
        private readonly database: PrismaClient
    ) { }

    async run(): Promise<void> {
        await this.insertStatus();
    }

    async insertStatus(): Promise<void> {
        this.status.forEach(async ({ id, description }) => {
            await this.database.status.upsert({
                create: {
                    id,
                    description
                },
                update: {
                    id,
                    description
                },
                where: {
                    id
                }
            });
        })
    }
}