import { TranslateService } from './../services/translate.service';
import { AbstractFormComponent } from './abstract-form-component';

// Define common behavior for Form component
export abstract class AbstractFormCreateMoreComponent extends AbstractFormComponent {
    isCreateAnother = false;
    protected translateService: any;
    constructor(translateService: TranslateService) {
        super();
        this.translateService = translateService;
    }

    get createAnother() {
        return this.formGroup.get('createAnother');
    }

    protected getMessage(key: string, ...params) {
        if (params.length) {
            return this.translateService.translate(key, params);
        }
        return this.translateService.translate(key);
    }
}
