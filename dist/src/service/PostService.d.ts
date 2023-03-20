declare class PostService {
    private postRepository;
    private userRepository;
    constructor();
    count: () => Promise<any>;
    getAll2: (limit: any, offset: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    save: (post: any) => Promise<any>;
    get12Post: () => Promise<any>;
    updatePost: (idPost: any, newPost: any) => Promise<any>;
    removePost1: (idPost: any) => Promise<any>;
    checkUser1: (idUser: any, idPost: any) => Promise<boolean>;
    checkSeller: (idPost: any) => Promise<any>;
}
declare const _default: PostService;
export default _default;
