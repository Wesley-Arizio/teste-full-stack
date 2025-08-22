import { Repository } from "typeorm";
import { database } from "../dataSource";
import { User } from "../entities/User";

export class UserRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = database.getRepository(User)
    }

    async listAll(): Promise<User[]> {
        return this.repository.find()
    }
}