import { UserRepository } from "../repository/userRepository";

export class UserService {
    constructor(private userRepository: UserRepository) {

    }

    async listUsers() {
        const users = await this.userRepository.listAll();

        return { users }
    }


    async getUser() {
        console.log("hello word");

        return {ok: true}
    }

    async createUser() {
        console.log("hello word");

        return {ok: true}
    }

    async deleteUser() {
        console.log("hello word");

        return {ok: true}
    }

    async updateUser() {
        console.log("hello word");

        return {ok: true}
    }
}