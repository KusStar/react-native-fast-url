#include "fast-url.h"

#include "URLHostObjects.h"

namespace fasturl
{
    namespace jsi = facebook::jsi;

    void install(jsi::Runtime &rt)
    {
        auto URLSearchParams = HOST_FN(rt, "URLSearchParams", 1, {
            if (count != 1)
            {
                return jsi::Value::undefined();
            }
            if (!args[0].isString())
            {
                return jsi::Value::undefined();
            }
            std::string params_raw = args[0].asString(rt).utf8(rt);
            ada::url_search_params params(params_raw);

            return jsi::Object::createFromHostObject(
                rt, std::make_shared<URLSearchParamsHostObject>(
                        URLSearchParamsHostObject(params)));
        });

        auto URL = HOST_FN(rt, "URL", 1, {
            // TODO: Technically the spec supports a second optional base parameter
            // to resolve the url against
            if (count != 1)
            {
                return jsi::Value::undefined();
            }
            if (!args[0].isString())
            {
                throw jsi::JSError(rt, "Failed to construct 'URL': Invalid URL");
            }
            std::string url_raw = args[0].asString(rt).utf8(rt);
            auto url = ada::parse<ada::url_aggregator>(url_raw);

            if (url.has_value())
            {
                return jsi::Object::createFromHostObject(
                    rt, std::make_shared<URLHostObject>(
                            URLHostObject(url.value())));
            }
            else
            {
                throw jsi::JSError(rt, "Failed to construct 'URL': Invalid URL");
            }

            return jsi::Value::undefined();
        });

        jsi::Object module = jsi::Object(rt);

        module.setProperty(rt, "URLSearchParams", std::move(URLSearchParams));
        module.setProperty(rt, "URL", std::move(URL));

        rt.global().setProperty(rt, "__FastUrl", std::move(module));
    }
} // namespace fasturl
