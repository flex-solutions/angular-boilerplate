enum MessageConstant {
    CreatePromotionTitle = 'promotions-create_promotion-app-card-promotions_title_field',
    CreatePromotionDescription = 'promotions-create_promotion-app-card-promotions_subtitle_field',
    EditPromotionTitle = 'promotions-edit_promotion-app-card-promotions_title_field',
    EditPromotionDescription = 'promotions-edit_promotion-app-card-promotions_subtitle_field',
    CreatePromotionSuccess = 'promotion-create_promotion-message-create_success',
    CreateAndStartPromotionSuccess = 'promotion-create_promotion-message-create_start_success',
    UpdatePromotionSuccess = 'promotion-create_promotion-message-update_success',
    RequireTitle = 'promotion-create_promotion-error-require_title',
    NewStatus = 'list-promotions-status-new-promotion',
    DeactivedStatus = 'list-promotions-status-deactived-promotion',
    ActiveStatus = 'list-promotions-status-active-promotion',
    StartButton = 'list-promotions-btn-start-promotion',
    StopButton = 'list-promotions-btn-stop-promotion'
}

export const PromotionRouting = {
    CREATE_PAGE: 'create',
    EDIT_PAGE: 'edit/',
    PROMOTION_PAGES: ''
  };


export { MessageConstant };
