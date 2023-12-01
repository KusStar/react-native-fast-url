#include "fast-url.h"

#include <fbjni/fbjni.h>
#include <jni.h>
#include <jsi/jsi.h>

using namespace facebook;

struct FastUrlBridge : jni::JavaClass<FastUrlBridge> {
  static constexpr auto kJavaDescriptor =
      "Lcom/fasturl/FastUrlBridge;";

  static void registerNatives() {
    javaClassStatic()->registerNatives(
        {// initialization for JSI
         makeNativeMethod("installNativeJsi",
                          FastUrlBridge::installNativeJsi)
        });
  }

private:
  static void installNativeJsi(
      jni::alias_ref<jni::JObject> thiz, jlong jsiRuntimePtr) {
    auto jsiRuntime = reinterpret_cast<jsi::Runtime *>(jsiRuntimePtr);

    fasturl::install(*jsiRuntime);
  }
};

JNIEXPORT jint JNI_OnLoad(JavaVM *vm, void *) {
  return jni::initialize(vm, [] { FastUrlBridge::registerNatives(); });
}
