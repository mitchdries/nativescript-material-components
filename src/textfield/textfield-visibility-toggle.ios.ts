import { View, Color } from '@nativescript/core/ui/page/page';

export enum MDIcons {
    EyeOpen = 'eye-open',
    EyeClosed = 'eye-closed'
}

const ICON_WIDTH = 28;
const ICON_HEIGHT = 22;

export class ToggleTapHandlerImpl extends NSObject {
    private _owner: WeakRef<View>;
    private _textField: MDCTextField;
    private _imageView: UIImageView;

    public static initWithOwnerAndTextField(owner: WeakRef<View>, textField: MDCTextField, imageView: UIImageView): ToggleTapHandlerImpl {
        let handler = <ToggleTapHandlerImpl>ToggleTapHandlerImpl.new();
        handler._owner = owner;
        handler._textField = textField;
        handler._imageView = imageView;
        return handler;
    }

    public tap(recognizer: UITapGestureRecognizer): void {
        this._textField.secureTextEntry = !this._textField.secureTextEntry;
        this._imageView.image = this._textField.secureTextEntry ? getMDIcon(MDIcons.EyeClosed) : getMDIcon(MDIcons.EyeOpen);
    }

    public static ObjCExposedMethods = {
        tap: { returns: interop.types.void, params: [interop.types.id] }
    };
}

function getIconBounds(): CGRect {
    return CGRectMake(0, 0, ICON_WIDTH, ICON_HEIGHT);
}

export function getMDIcon(icon: MDIcons) {
    return UIImage.imageNamed(icon).imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate);
}

export function createInitialImageViewFrame(imageView: UIImageView): UIView {
    // This frame is needed for proper positioning in iOS 13
    const view = new UIView({ frame: getIconBounds() });
    view.widthAnchor.constraintEqualToConstant(ICON_WIDTH).active = true;
    view.heightAnchor.constraintEqualToConstant(ICON_HEIGHT).active = true;
    return view;
}

export function createInitialImageView(): UIImageView {
    let imageView = new UIImageView({ image: getMDIcon(MDIcons.EyeClosed) });
    imageView.frame = getIconBounds();
    imageView.userInteractionEnabled = true;
    imageView.contentMode = UIViewContentMode.ScaleAspectFit; // This determines position of image
    return imageView;
}
