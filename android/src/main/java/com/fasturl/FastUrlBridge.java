package com.fasturl;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;

public class FastUrlBridge {
  private native void installNativeJsi(long jsContextNativePointer);

  public static final FastUrlBridge instance = new FastUrlBridge();

  public void install(ReactContext context) {
      long jsContextPointer = context.getJavaScriptContextHolder().get();
      installNativeJsi(jsContextPointer);
  }
}
