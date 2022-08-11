import { FastifyRequest } from 'fastify';

export interface RequestWithUser extends FastifyRequest {
    client: any;
    user: any;
}
