const NewsStatusMessage = {
  Published: 'news_management-news_details-news_published_status',
  Deactivated: 'news_management-news_details-news_deactivated_status',
  New: 'news_management-news_details-news_new_status'
};

const NewsActionButtonText = {
  Deactivate: 'news_management-news_details-news_deactivate_button',
  Publish: 'news_management-news_details-news_publish_button'
};

const NewsRouteNames = {
  CREATE: 'news/create',
  EDIT: 'news/edit/',
  NEWS_HOME: 'news',
  VIEW: 'news/'
};

const Errors = {
  Delete_News_Success: 'news_detail-delete_news-ok',
  Change_Status_News_Success: 'news_detail-change_status_news-ok',
  PublicStatus: 'list-news-status-publish',
  DeactivedStatus: 'list-news-status-deactivated',
  NewStatus: 'list-news-status-new',
  Create_News_Sucess: 'news-create_edit_news-create_news_ok',
  Create_Published_News_Sucess: 'news-create_edit_news-create_publish_news_ok',
  FileSizeError: 'news-create_edit_news-file_size_error',
  Edit_News_Success: 'news-create_edit_news-edit_news_ok',
};

export {NewsStatusMessage, NewsActionButtonText, NewsRouteNames, Errors};
