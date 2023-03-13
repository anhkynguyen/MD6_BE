declare class PostService {
    private postRepository;
    constructor();
    getAll1: () => Promise<any>;
    save: (post: any) => Promise<any>;
    removePost1: (idPost: any) => Promise<any>;
    checkUser1: (idUser: any, idPost: any) => Promise<boolean>;
}
declare const _default: PostService;
export default _default;
