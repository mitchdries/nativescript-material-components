import { View } from '@nativescript/core/ui/page/page';

export enum MDIcons {
    EyeOpen = 'eye-open',
    EyeClosed = 'eye-closed'
}

export class ToggleTapHandlerImpl extends NSObject {
    private _owner: WeakRef<View>;
    private _textField: MDCTextField;

    public static initWithOwnerAndTextField(owner: WeakRef<View>, textField: MDCTextField): ToggleTapHandlerImpl {
        let handler = <ToggleTapHandlerImpl>ToggleTapHandlerImpl.new();
        handler._owner = owner;
        handler._textField = textField;
        return handler;
    }

    public tap(recognizer: UITapGestureRecognizer): void {
        this._textField.secureTextEntry = !this._textField.secureTextEntry;
        (this._textField.trailingView as UIImageView).image = this._textField.secureTextEntry ? getMDIcon(MDIcons.EyeClosed) : getMDIcon(MDIcons.EyeOpen);
    }

    public static ObjCExposedMethods = {
        tap: { returns: interop.types.void, params: [interop.types.id] }
    };
}

export function getMDIcon(icon: MDIcons) {
    return UIImage.imageNamed(icon).imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate);
}

export function createInitialImageView(): UIImageView {
    const imageView = new UIImageView({ image: getMDIcon(MDIcons.EyeClosed) });
    imageView.frame = CGRectMake(imageView.frame.origin.x, imageView.frame.origin.y, 28, 22);
    imageView.userInteractionEnabled = true;
    imageView.contentMode = UIViewContentMode.ScaleAspectFit; // This determines position of image
    return imageView;
}
