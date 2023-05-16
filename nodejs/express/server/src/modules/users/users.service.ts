import DbUtils from "../../libs/mongodb/db.utils";
import usersRepository from "./users.repository";

class UsersService {

    create = async (
        data: any
    ): Promise<any> => {
        const result = await usersRepository.create(data);
        console.log(result);
        console.log(result.insertedId.toString());
        return result.insertedId.toString();
    };

    readMany = async (
        limit: number,
        page: number
    ): Promise<any> => {
        const cursor = usersRepository.readMany(limit, page);
        const docs = await DbUtils.streamCursorData(cursor);
        return docs;
    };

    readOne = async (
        id: string
    ): Promise<any> => {
        return await usersRepository.readOne(id);
    };

    update = async (
        id: string,
        data: any
    ): Promise<any> => {
        return await usersRepository.update(id, data);
    };
}

export default new UsersService;