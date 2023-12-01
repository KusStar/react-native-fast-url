#include "fast-url.h"

#include "URLHostObjects.h"

namespace fasturl {
    namespace jsi = facebook::jsi;

    void install(jsi::Runtime &rt) {
        auto URLSearchParams = jsi::Function::createFromHostFunction(
            rt, jsi::PropNameID::forAscii(rt, "URLSearchParams"), 1,
            [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                const jsi::Value *args, size_t count) -> jsi::Value {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString()) {
                    return jsi::Value::undefined();
                }
                std::string params_raw = args[0].asString(rt).utf8(rt);
                ada::url_search_params params(params_raw);

                return jsi::Object::createFromHostObject(
                    rt, std::make_shared<URLSearchParamsHostObject>(
                            URLSearchParamsHostObject(params)));
            });

        auto URL = jsi::Function::createFromHostFunction(
            rt, jsi::PropNameID::forAscii(rt, "URL"), 1,
            [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                const jsi::Value *args, size_t count) -> jsi::Value {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString()) {
                    return jsi::Value::undefined();
                }
                std::string url_raw = args[0].asString(rt).utf8(rt);
                auto url = ada::parse<ada::url_aggregator>(url_raw);

                if (url.has_value()) {
                    return jsi::Object::createFromHostObject(
                        rt, std::make_shared<URLHostObject>(
                                URLHostObject(url.value())));
                }

                return jsi::Value::undefined();
            });

        jsi::Object module = jsi::Object(rt);

        module.setProperty(rt, "URLSearchParams", std::move(URLSearchParams));
        module.setProperty(rt, "URL", std::move(URL));

        rt.global().setProperty(rt, "__FastUrl", std::move(module));
    }
}  // namespace fasturl
