#include "fast-url.h"

#include "URLHostObjects.h"

namespace fasturl {
    namespace jsi = facebook::jsi;

    void install(jsi::Runtime& rt) {
        auto URLSearchParams = HOST_FN(rt, "URLSearchParams", 1, {
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

        // URL accepts 1 or 2 arguments, with the second argument being an
        // optional "base" string which we need to resolve the url against
        auto URL = HOST_FN(rt, "URL", 2, {
            if (count < 1 || count > 2) {
                return jsi::Value::undefined();
            }
            if (!args[0].isString()) {
                throw jsi::JSError(rt,
                                   "Failed to construct 'URL': First argument "
                                   "must be a string");
            }
            std::string url_raw = args[0].asString(rt).utf8(rt);

            ada::url_aggregator* base_url_ptr = nullptr;
            ada::url_aggregator base_url;

            if (count == 2 && !args[1].isUndefined() && args[1].isString()) {
                std::string base_raw = args[1].asString(rt).utf8(rt);
                auto base_parse_result =
                    ada::parse<ada::url_aggregator>(base_raw);

                if (!base_parse_result) {
                    throw jsi::JSError(
                        rt, "Failed to construct 'URL': Invalid base URL");
                }

                base_url = base_parse_result.value();
                base_url_ptr = &base_url;
            }

            auto url_parse_result =
                ada::parse<ada::url_aggregator>(url_raw, base_url_ptr);

            if (url_parse_result) {
                return jsi::Object::createFromHostObject(
                    rt, std::make_shared<URLHostObject>(
                            URLHostObject(url_parse_result.value())));
            } else {
                throw jsi::JSError(rt,
                                   "Failed to construct 'URL': Invalid URL");
            }

            return jsi::Value::undefined();
        });

        jsi::Object module = jsi::Object(rt);

        module.setProperty(rt, "URLSearchParams", std::move(URLSearchParams));
        module.setProperty(rt, "URL", std::move(URL));

        rt.global().setProperty(rt, "__FastUrl", std::move(module));
    }
}  // namespace fasturl
