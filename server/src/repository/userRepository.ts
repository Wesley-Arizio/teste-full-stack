import { Repository } from "typeorm";
import { database } from "../dataSource";
import { User } from "../entities/User";
import { ICreateUser } from "../schema/userSchema";
import { IUpdateUserWithId } from "../service/userService";

export class UserRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = database.getRepository(User)
    }

    async exists({ email, id }: { email?: string, id?: number }): Promise<boolean> {
        if (email) {
            return this.repository.exist({ where: { email }});
        }

        return this.repository.exist({ where: { id }});
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

    async getUser(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id } })
    }

    async deleteUser(id: number): Promise<boolean> {
        return !!((await this.repository.delete({ id })).affected);
    }

    async updateUser({ user, id  }: IUpdateUserWithId) {
        return !!((await this.repository.update({ id }, user)).affected);
    }
}