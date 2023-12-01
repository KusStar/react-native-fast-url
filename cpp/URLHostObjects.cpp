#include "URLHostObjects.h"

namespace fasturl {
    namespace jsi = facebook::jsi;

    std::vector<jsi::PropNameID> URLSearchParamsHostObject::getPropertyNames(
        jsi::Runtime &rt) {
        std::vector<jsi::PropNameID> keys;
        const char *names[] = {"size",    "append", "delete", "entries",
                               "forEach", "get",    "getAll", "has",
                               "keys",    "set",    "sort",   "toString",
                               "values"};
        for (const auto &name : names) {
            keys.push_back(jsi::PropNameID::forAscii(rt, name));
        }
        return keys;
    };

    jsi::Value URLSearchParamsHostObject::get(
        jsi::Runtime &rt, const jsi::PropNameID &propNameID) {
        std::string key = propNameID.utf8(rt);
        if (key == "size") {
            return jsi::Value((int)_params.size());
        }
        if (key == "append") {
            return HOST_FN(rt, "append", 2, {
                if (count != 2) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString() || !args[1].isString()) {
                    return jsi::Value::undefined();
                }
                std::string key = args[0].asString(rt).utf8(rt);
                std::string value = args[1].asString(rt).utf8(rt);
                _params.append(key, value);
                return {};
            });
        }
        if (key == "delete") {
            return HOST_FN(rt, "delete", 1, {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString()) {
                    return jsi::Value::undefined();
                }
                std::string key = args[0].asString(rt).utf8(rt);
                _params.remove(key);
                return {};
            });
        }
        if (key == "entries") {
            return HOST_FN(rt, "entries", 0, {
                jsi::Array result(rt, _params.size());
                size_t index = 0;
                auto keys = _params.get_keys();
                while (keys.has_next()) {
                    auto key = keys.next();
                    if (key.has_value()) {
                        auto key_str = key.value();
                        auto value = _params.get(key_str).value();
                        result.setValueAtIndex(
                            rt, index++,
                            jsi::Array::createWithElements(
                                rt, std::string(key_str), std::string(value)));
                    }
                }
                return result;
            });
        }
        if (key == "forEach") {
            return HOST_FN(rt, "forEach", 1, {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isObject()) {
                    return jsi::Value::undefined();
                }
                auto callback = args[0].getObject(rt);
                auto keys = _params.get_keys();
                while (keys.has_next()) {
                    auto key = keys.next();
                    if (key.has_value()) {
                        auto key_str = key.value();
                        auto value = _params.get(key_str).value();
                        callback.asFunction(rt).call(
                            rt, jsi::Value::undefined(),
                            jsi::Array::createWithElements(
                                rt, std::string(value), std::string(key_str)));
                    }
                }
                return {};
            });
        }
        if (key == "get") {
            return HOST_FN(rt, "get", 1, {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString()) {
                    return jsi::Value::undefined();
                }
                std::string key = args[0].asString(rt).utf8(rt);
                auto result = _params.get(key);
                if (result.has_value()) {
                    return HOST_STR(std::string(result.value()));
                }
                return {};
            });
        }
        if (key == "getAll") {
            return HOST_FN(rt, "getAll", 1, {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString()) {
                    return jsi::Value::undefined();
                }
                std::string key = args[0].asString(rt).utf8(rt);
                auto result = _params.get_all(key);
                jsi::Array array(rt, result.size());
                size_t index = 0;
                for (auto value : result) {
                    array.setValueAtIndex(rt, index++, HOST_STR(value));
                }
                return array;
            });
        }
        if (key == "has") {
            return HOST_FN(rt, "has", 1, {
                if (count != 1) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString()) {
                    return jsi::Value::undefined();
                }
                std::string key = args[0].asString(rt).utf8(rt);
                auto result = _params.has(key);
                return jsi::Value(result);
            });
        }
        if (key == "keys") {
            return HOST_FN(rt, "keys", 0, {
                jsi::Array result(rt, _params.size());
                size_t index = 0;
                auto keys = _params.get_keys();
                while (keys.has_next()) {
                    auto key = keys.next();
                    if (key.has_value()) {
                        result.setValueAtIndex(
                            rt, index++, HOST_STR(std::string(key.value())));
                    }
                }
                return result;
            });
        }
        if (key == "set") {
            return HOST_FN(rt, "set", 2, {
                if (count != 2) {
                    return jsi::Value::undefined();
                }
                if (!args[0].isString() || !args[1].isString()) {
                    return jsi::Value::undefined();
                }
                std::string key = args[0].asString(rt).utf8(rt);
                std::string value = args[1].asString(rt).utf8(rt);
                _params.set(key, value);
                return {};
            });
        }
        if (key == "sort") {
            return HOST_FN(rt, "sort", 0, {
                _params.sort();
                return {};
            });
        }
        if (key == "toString") {
            return HOST_FN(rt, "toString", 0, {
                return HOST_STR(std::string(_params.to_string()));
            });
        }
        if (key == "values") {
            return HOST_FN(rt, "values", 0, {
                jsi::Array result(rt, _params.size());
                size_t index = 0;
                auto keys = _params.get_keys();
                while (keys.has_next()) {
                    auto key = keys.next();
                    if (key.has_value()) {
                        auto value = _params.get(key.value()).value();
                        result.setValueAtIndex(rt, index++,
                                               HOST_STR(std::string(value)));
                    }
                }
                return result;
            });
        }
        return {};
    };

    std::vector<jsi::PropNameID> URLHostObject::getPropertyNames(
        jsi::Runtime &rt) {
        std::vector<jsi::PropNameID> keys;
        const char *names[] = {"href",     "origin", "protocol", "username",
                               "password", "host",   "hostname", "port",
                               "pathname", "search", "hash",     "toString"};
        for (const auto &name : names) {
            keys.push_back(jsi::PropNameID::forAscii(rt, name));
        }
        return keys;
    };

    jsi::Value URLHostObject::get(jsi::Runtime &rt,
                                  const jsi::PropNameID &propNameID) {
        std::string key = propNameID.utf8(rt);
        if (key == "href") {
            return HOST_STR(std::string(_url.get_href()));
        }
        if (key == "origin") {
            return HOST_STR(std::string(_url.get_origin()));
        }
        if (key == "protocol") {
            return HOST_STR(std::string(_url.get_protocol()));
        }
        if (key == "username") {
            return HOST_STR(std::string(_url.get_username()));
        }
        if (key == "password") {
            return HOST_STR(std::string(_url.get_password()));
        }
        if (key == "host") {
            return HOST_STR(std::string(_url.get_host()));
        }
        if (key == "hostname") {
            return HOST_STR(std::string(_url.get_hostname()));
        }
        if (key == "port") {
            return HOST_STR(std::string(_url.get_port()));
        }
        if (key == "pathname") {
            return HOST_STR(std::string(_url.get_pathname()));
        }
        if (key == "search") {
            return HOST_STR(std::string(_url.get_search()));
        }
        if (key == "hash") {
            return HOST_STR(std::string(_url.get_hash()));
        }
        if (key == "toString") {
            return HOST_FN(rt, "toString", 0,
                           { return HOST_STR(std::string(_url.to_string())); });
        }
        return jsi::Value::null();
    }  // namespace fasturl

}  // namespace fasturl
