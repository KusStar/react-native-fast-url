package com.fasturl;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FastUrlModule extends ReactContextBaseJavaModule {
    FastUrlModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return FastUrlModuleImpl.NAME;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean install() {
        return FastUrlModuleImpl.install();
    }
}
