import { InjectionToken } from '@angular/core';

interface IVersionController {
    showVersion();
}

const VERSION_TOKEN = new InjectionToken<IVersionController>('appVersionController');

export {IVersionController, VERSION_TOKEN};
