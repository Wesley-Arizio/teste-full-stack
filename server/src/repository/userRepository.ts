import { Repository } from "typeorm";
import { database } from "../dataSource";
import { User } from "../entities/User";
import { ICreateUser } from "../schema/userSchema";

export class UserRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = database.getRepository(User)
    }

    async exists(email: string): Promise<boolean> {
        return this.repository.exist({ where: { email }});
    }

    async listAll(): Promise<User[]> {
        return this.repository.find()
    }

    async createUser({ user }: ICreateUser): Promise<User> {
        const userEntity = this.repository.create({
            name: user.name,
            email: user.email,
            address: user.address,
            birthdate: user.birthdate,
        });

        return this.repository.save(userEntity);
    }
}