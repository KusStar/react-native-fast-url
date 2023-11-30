#include <jni.h>
#include "fast-url.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_fasturl_FastUrlModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return fasturl::multiply(a, b);
}
