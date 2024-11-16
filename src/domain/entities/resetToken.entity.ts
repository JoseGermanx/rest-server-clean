

export class ResetTokenEntity {
    constructor(
        public id: string,
        public userId: string,
        public token: string,
        public expires: Date,        
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}