"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
let UserService = class UserService {
    async createUser(dto) {
        const user = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, dto), { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        try {
            await dynamoDB
                .put({
                TableName: process.env.USERS_TABLE_NAME,
                Item: user,
            })
                .promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return user;
    }
    async getUserById(id) {
        let user;
        try {
            const result = await dynamoDB
                .get({
                TableName: process.env.USERS_TABLE_NAME,
                Key: { id },
            })
                .promise();
            user = result.Item;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map