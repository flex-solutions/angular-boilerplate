import { ApplicationConfigurationService } from '../services/application-configuration.service';

export abstract class AbstractRestService {
  protected baseUrl: string;
  constructor(
    protected controllerName: string,
    configurationService: ApplicationConfigurationService
  ) {
    // Get base url provide by application configuration service
    this.baseUrl = configurationService.getApiURI();
  }

  // Build full path for api
  protected buildFullApi(api: string) {
    return `${this.baseUrl}/${this.controllerName}/${api}`;
  }
}
