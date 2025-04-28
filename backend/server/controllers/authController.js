const UserService = require('../services/user.service');

exports.Register = async (params, callback) => {
    try {
        const user = await UserService.create(params);
        callback(null, user);
    } catch (error) {
        callback(error, undefined);
    }
};

exports.create = async (params) => {
    // ... logique ...
    // Par exemple avec un ORM ou du SQL async :
    const user = await UserModel.create(params); // ou autre logique async
    return user;
};

exports.login = async (params) => {
    // ... logique ...
    const user = await UserModel.findByCredentials(params); // ou autre logique async
    if (!user) throw new Error('User not found or bad credentials');
    return user;
};