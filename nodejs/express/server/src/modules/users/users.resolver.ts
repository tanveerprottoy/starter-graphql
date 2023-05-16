import usersService from "./users.service";

class UsersResolver {

    create = async (parent: any, args: any) => {
        // call service
        return await usersService.create({
            name: args.name
        });
    }

    readMany = (parent: any, args: any) => {
        // call service
        return usersService.readMany(args.limit, args.page);
    }

    readOne = (parent: any, args: any) => {
        // call service
        return usersService.readOne(args.id);
    }

    update = (parent: any, args: any) => {
        // call service
        return usersService.update(
            args.id,
            {
                name: args.name
            }
        );
    }
}

export default new UsersResolver();