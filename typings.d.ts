export interface PostInterface {
    _id: string,
    _createdAt: string,
    title: string,
    author: {
        name: string,
        image: string,
        bio: object[]
    },
    description: string,
    mainImage: {
        asset: obj,
    },
    slug: {
        current: string,
    },
    publishedAt: string,
    body: object[],
    comments: Comment[];
}

export interface Comment {
    // approved?: boolean,
    _id: string,
    name: string,
    email: string,
    comment: string,
    post?: {
        _ref: string,
        _type: string,
    },
    _createdAt?: string,
    _rev?: string,
    _type?: string,
    _updatetAt?: string
}