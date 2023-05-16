import DbUtils from "../../libs/mongodb/db.utils";
import contentsRepository from "./contents-repository";

class ContentsService {

    readMany = async (
        limit: number,
        page: number,
        userId?: string
    ): Promise<any> => {
        const cursor = contentsRepository.readMany(limit, page);
        const docs = await DbUtils.streamCursorData(cursor);
        return docs;
    };

    readOne = async (
        id: string
    ): Promise<any> => {
        return await contentsRepository.readOne(id);
    };
}

export default new ContentsService;