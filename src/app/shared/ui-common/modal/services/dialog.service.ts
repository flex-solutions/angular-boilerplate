import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { DialogHostComponent } from '../components/dialog-host.component';
import { DialogComponent } from '../components/dialog.component';

@Injectable()
export class DialogService {
  dialogs: any;
  private dialogHostComponent: DialogHostComponent;

  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Adds dialog.
   * @return {Observable<any>}
   */
  addDialog(
    component: Type<DialogComponent>,
    data?: any,
    index?: number
  ): Observable<any> {
    // Create an instance of dialogMainComponent if not exist.
    if (!this.dialogHostComponent) {
      this.dialogHostComponent = this.createDialogHost();
    }
    // Populate dialogs array for access by service caller.
    this.dialogs = this.dialogHostComponent.dialogs;

    return this.dialogHostComponent.addDialog(component, data, index);
  }

  // Hides and removes dialog from DOM
  removeDialog(component: DialogComponent, clearAll: boolean = false): void {
    if (!this.dialogHostComponent) {
      return;
    }

    // Close all dialogs if clearAll flag is passed.
    if (clearAll) {
      this.dialogHostComponent.removeAllDialogs();
    } else if (component.closeAllDialogs) {
      this.dialogHostComponent.removeAllDialogs();
    } else if (component.closeImmediateParent) {
      this.dialogHostComponent.removeDialogAndParent(component);
    } else {
      this.dialogHostComponent.removeDialog(component);
    }
  }

  /**
   * Creates and add to DOM top-level dialog host component
   * @return {DialogHostComponent}
   */
  private createDialogHost(): DialogHostComponent {
    const componentFactory = this.resolver.resolveComponentFactory(
      DialogHostComponent
    );
    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 1/14/2018 Update for Angular 5
    // let componentRootViewConainer = this.applicationRef["_rootComponents"][0]; //Angular 4
    const componentRootViewConainer = this.applicationRef['components'][0];

    const rootLocation: Element = (componentRootViewConainer.hostView as EmbeddedViewRef<
      any
    >).rootNodes[0] as HTMLElement;
    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    rootLocation.appendChild(componentRootNode);

    return componentRef.instance;
  }
}
