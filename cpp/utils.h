#ifndef FASTURL_UTILS_H
#define FASTURL_UTILS_H

#include <jsi/jsi.h>

#include "ada.h"

#define HOST_FN(rt, name, functionArgCount, hostFunctionBody)        \
    jsi::Function::createFromHostFunction(                           \
        rt, jsi::PropNameID::forAscii(rt, name), (functionArgCount), \
        [=](jsi::Runtime & rt, const jsi::Value &thisValue,          \
            const jsi::Value *args,                                  \
            size_t count) -> jsi::Value hostFunctionBody)

#define HOST_STR(str) jsi::String::createFromAscii(rt, str)

#endif
