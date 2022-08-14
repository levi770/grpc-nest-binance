import { FastifyRequest } from 'fastify';

export interface RequestWithUser extends FastifyRequest {
    user: any;
}
