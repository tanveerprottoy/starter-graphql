import { DbDataOpsInstance } from "../../libs/mongodb";

class ContentsRepository {
    private collectionName = "contents";

    create = async (data: any): Promise<any> => {
        try {
            const result = DbDataOpsInstance.insertOne<any>(
                this.collectionName,
                data
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readMany = (
        limit: number,
        page: number,
        userId?: string
    ): any => {
        try {
            let filter = null;
            if(userId) {
                filter = {
                    userId: userId
                };
            }
            return DbDataOpsInstance.find<any>(
                this.collectionName,
                filter,
                {
                    limit: limit,
                    skip: page * limit - limit
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readOne = async (id: string): Promise<any> => {
        try {
            return await DbDataOpsInstance.findOne<any>(
                this.collectionName,
                {
                    id: id
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }
}

export default new ContentsRepository;