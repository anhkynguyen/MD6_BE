declare class UserServices {
    private userRepository;
    constructor();
    getAll1: () => Promise<any>;
    getUserRequest: () => Promise<any>;
    getWaitUser: () => Promise<any>;
    getMyProfile: (idUser: any) => Promise<any>;
    checkOldPassword1: (idUser: any, password: any) => Promise<boolean | "User not found">;
    changePassword: (idUser: any, password: any) => Promise<any>;
    register1: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User not found" | "your account has been locked" | "Wrong password" | {
        idUser: any;
        username: any;
        role: any;
        avatar: any;
        token: string;
        gmail: any;
        birthday: any;
        gender: any;
        ask: any;
        category: any;
        status: any;
    }>;
    offline1: (id: any) => Promise<any>;
    changeStatus: (id: any) => Promise<string>;
    changeCategory: (id: any) => Promise<any>;
    removeUser1: (id: any) => Promise<any>;
    userRequest: (id: any) => Promise<string>;
    changeRole: (id: any) => Promise<"Bạn chưa đủ tuổi" | " Bạn đã đăng ký thành công">;
    findByNameService: (name: any) => Promise<any>;
    findByGenderService: (gender: any) => Promise<any>;
    findByBirthdayService: (yearOne: any, yearSecond: any) => Promise<any>;
}
declare const _default: UserServices;
export default _default;
