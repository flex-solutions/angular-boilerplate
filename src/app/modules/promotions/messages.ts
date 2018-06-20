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
    StopButton = 'list-promotions-btn-stop-promotion',
     DeleteTitle = 'promotion-delete-title-dialog',
    DeleteConfirmation = 'promotion-delete-confirm-message-dialog',
    DeleteSuccessfullyNotification = 'promotion-delete-successfully-notification'
}

export const PromotionRouting = {
    CREATE_PAGE: 'promotions/create',
    EDIT_PAGE: 'promotions/edit/',
    PROMOTION_PAGES: 'promotions',
    DETAIL_PAGE: 'promotions/detail/',
  };


export { MessageConstant };
