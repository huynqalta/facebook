class UserSystem {
    userCMSId: string = ""
    userName: string = ""
    userEmail: string = ""
    userCmsCreateAt: string = ""
    userCmsBlockTo: string
    permissions: Array<string> = []
    constructor(userSystem?) {
        if (userSystem) {
            Object.keys(this).forEach((user) => {
                if (userSystem[ user ]) {
                    this[ user ] = userSystem[ user ]
                }
            })
        }
    }
    createListUser(listUser) {
        if (!Array.isArray(listUser)) return [];
        return listUser.map((user) => {
            return new UserSystem(user);
        });

    }
}
export default UserSystem