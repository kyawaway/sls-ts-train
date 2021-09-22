import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(body: any): Promise<any>;
    getUserById({ id }: any): Promise<any>;
}
