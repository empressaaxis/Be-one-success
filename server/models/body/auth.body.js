export const createUser = (req) => {
    const user = {
        names: req.body.names,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    }

    return user;
}
