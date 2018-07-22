const promotionFields = {
    ID: '_id',
    TITLE: 'title',
    BANNER: 'banner',
    CONTENT: 'content',
    STATUS: 'status',
    VIEWCOUNT: 'viewCount',
};

const promotionRoute = {
    CREATE: 'promotions/create',
    EDIT: 'promotions/edit/',
    DETAIL: 'promotions/detail/',
};

const promotionLimits = {
    BRIEF_LENGTH: 300
};
export { promotionFields, promotionRoute, promotionLimits };
