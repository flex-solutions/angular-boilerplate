import {
  Component,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ReflectiveInjector,
  Type,
  HostListener,
  Renderer
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from '../dialog-config';

@Component({
  moduleId: module.id,
  selector: 'app-dialog-main',
  templateUrl: './dialog-main.component.html'
})
export class DialogMainComponent {
  @ViewChild('element', { read: ViewContainerRef })
  private element: ViewContainerRef;

  public shown = false;
  private content: DialogComponent;
  dialogPaddingTop = 0;

  // Setting values for directives used in this component view.
  // draggable setting is used in appModalDraggable directive code.
  dialogWidth: string;
  isGrayBackground: boolean;
  isAnimation: boolean;
  isDraggable: boolean;

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer
  ) {}

  /**
   * Creates and add to DOM main dialog (overlay) parent component
   * @return {DialogHostComponent}
   */
  addComponent(component: Type<DialogComponent>) {
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = ReflectiveInjector.fromResolvedProviders(
      [],
      this.element.injector
    );
    const componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.content = <DialogComponent>componentRef.instance;
    this.content.dialogMain = this;
    return this.content;
  }

  show(): void {
    // Check and overwrite default settings by dialog-level custom configs.

    this.dialogWidth =
      this.content.width === undefined ? DialogConfig.width : this.content.width;
    if (this.content.width === undefined) { this.content.width = this.dialogWidth; }

    this.isGrayBackground =
      this.content.grayBackground === undefined
        ? DialogConfig.grayBackground
        : this.content.grayBackground;
    if (this.content.grayBackground === undefined) {
      this.content.grayBackground = this.isGrayBackground;
    }

    this.isAnimation =
      this.content.animation === undefined
        ? DialogConfig.animation
        : this.content.animation;
    if (this.content.animation === undefined) {
      this.content.animation = this.isAnimation;
    }

    this.isDraggable =
      this.content.draggable === undefined
        ? DialogConfig.draggable
        : this.content.draggable;
    if (this.content.draggable === undefined) {
      this.content.draggable = this.isDraggable;
    }

    if (this.content.closeByEnter === undefined) {
      this.content.closeByEnter = DialogConfig.closeByEnter;
    }
    if (this.content.closeByEscape === undefined) {
      this.content.closeByEscape = DialogConfig.closeByEscape;
    }
    if (this.content.closeByClickOutside === undefined) {
      this.content.closeByClickOutside = DialogConfig.closeByClickOutside;
    }
    if (this.content.closeAllDialogs === undefined) {
      this.content.closeAllDialogs = DialogConfig.closeAllDialogs;
    }
    if (this.content.closeImmediateParent === undefined) {
      this.content.closeImmediateParent = DialogConfig.closeImmediateParent;
    }

    if (this.content.keepOpenForAction === undefined) {
      this.content.keepOpenForAction = DialogConfig.keepOpenForAction;
    }
    if (this.content.keepOpenForClose === undefined) {
      this.content.keepOpenForClose = DialogConfig.keepOpenForClose;
    }

    if (this.content.closeDelay === undefined) {
      this.content.closeDelay = DialogConfig.closeDelay;
    }
    if (this.content.closeDelayParent === undefined) {
      this.content.closeDelayParent = DialogConfig.closeDelayParent;
    }

    // For basic type dialogs only.
    if (this.content.showIcon === undefined && !this.content.showIcon) {
      this.content.showIcon = DialogConfig.showIcon;
    }
    if (this.content.basicType === 'message') {
      if (this.content.title === undefined) {
        this.content.title = DialogConfig.messageTitle;
      }
      if (this.content.showIcon) {
        if (this.content.icon === undefined || this.content.icon === '') {
          this.content.icon = DialogConfig.messageIcon;
        }
      }
      if (
        this.content.closeButtonLabel === undefined ||
        this.content.closeButtonLabel === ''
      ) {
        this.content.closeButtonLabel = DialogConfig.messageCloseButtonLabel;
        // Use action button pattern if no value for closeButtonLabel.
        if (
          (this.content.closeButtonLabel === undefined ||
            this.content.closeButtonLabel === '') &&
          this.content.actionButtonLabel === undefined
        ) {
          this.content.actionButtonLabel =
            DialogConfig.messageActionButtonLabel;
        }
      }
    } else if (this.content.basicType === 'confirm') {
      if (this.content.title === undefined) {
        this.content.title = DialogConfig.confirmTitle;
      }
      if (this.content.showIcon) {
        if (this.content.icon === undefined || this.content.icon === '') {
          this.content.icon = DialogConfig.confirmIcon;
        }
      }
      if (this.content.actionButtonLabel === undefined) {
        this.content.actionButtonLabel = DialogConfig.confirmActionButtonLabel;
      }
      if (this.content.closeButtonLabel === undefined) {
        this.content.closeButtonLabel = DialogConfig.confirmCloseButtonLabel;
      }
    }

    this.shown = true;
  }

  hide(): void {
    this.shown = false;
  }

  clickOutside(event) {
    if (
      this.content.closeByClickOutside &&
      event.target.classList.contains('modal-backdrop')
    ) {
      this.content.dialogResult();
    }
  }

  // Press Esc or Enter key to close dialog.
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    // event.preventDefault();
    event.stopPropagation();
    if (
      (this.content.closeByEnter && event.keyCode === 13) ||
      (this.content.closeByEscape && event.keyCode === 27)
    ) {
      this.content.dialogResult();
    }
  }
}
