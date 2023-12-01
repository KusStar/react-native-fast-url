#include "URLHostObjects.h"

namespace fasturl {
    namespace jsi = facebook::jsi;

    std::vector<jsi::PropNameID> URLSearchParamsHostObject::getPropertyNames(
        jsi::Runtime &rt) {
        std::vector<jsi::PropNameID> keys;
        keys.push_back(jsi::PropNameID::forAscii(rt, "size"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "append"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "delete"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "entries"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "forEach"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "get"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "getAll"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "has"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "keys"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "set"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "sort"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "toString"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "values"));
        return keys;
    };

    jsi::Value URLSearchParamsHostObject::get(
        jsi::Runtime &rt, const jsi::PropNameID &propNameID) {
        std::string key = propNameID.utf8(rt);
        if (key == "size") {
            return jsi::Value((int)_params.size());
        }
        if (key == "append") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "append"), 2,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "delete"), 1,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "entries"), 0,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
                                    rt, std::string(key_str),
                                    std::string(value)));
                        }
                    }
                    return result;
                });
        }
        if (key == "forEach") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "forEach"), 1,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
                                    rt, std::string(value),
                                    std::string(key_str)));
                        }
                    }
                    return {};
                });
        }
        if (key == "get") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "get"), 1,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
                    if (count != 1) {
                        return jsi::Value::undefined();
                    }
                    if (!args[0].isString()) {
                        return jsi::Value::undefined();
                    }
                    std::string key = args[0].asString(rt).utf8(rt);
                    auto result = _params.get(key);
                    if (result.has_value()) {
                        return jsi::String::createFromUtf8(
                            rt, std::string(result.value()));
                    }
                    return {};
                });
        }
        if (key == "getAll") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "getAll"), 1,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
                        array.setValueAtIndex(
                            rt, index++,
                            jsi::String::createFromUtf8(rt, value));
                    }
                    return array;
                });
        }
        if (key == "has") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "has"), 1,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "keys"), 0,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
                    jsi::Array result(rt, _params.size());
                    size_t index = 0;
                    auto keys = _params.get_keys();
                    while (keys.has_next()) {
                        auto key = keys.next();
                        if (key.has_value()) {
                            result.setValueAtIndex(
                                rt, index++,
                                jsi::String::createFromUtf8(
                                    rt, std::string(key.value())));
                        }
                    }
                    return result;
                });
        }
        if (key == "set") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "set"), 2,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
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
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "sort"), 0,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
                    _params.sort();
                    return {};
                });
        }
        if (key == "toString") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "toString"), 0,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
                    return jsi::String::createFromUtf8(
                        rt, std::string(_params.to_string()));
                });
        }
        if (key == "values") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "values"), 0,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
                    jsi::Array result(rt, _params.size());
                    size_t index = 0;
                    auto keys = _params.get_keys();
                    while (keys.has_next()) {
                        auto key = keys.next();
                        if (key.has_value()) {
                            auto value = _params.get(key.value()).value();
                            result.setValueAtIndex(rt, index++,
                                                   jsi::String::createFromUtf8(
                                                       rt, std::string(value)));
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
        keys.push_back(jsi::PropNameID::forAscii(rt, "href"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "origin"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "protocol"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "username"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "password"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "host"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "hostname"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "port"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "pathname"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "search"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "hash"));
        keys.push_back(jsi::PropNameID::forAscii(rt, "toString"));
        return keys;
    };

    jsi::Value URLHostObject::get(jsi::Runtime &rt,
                                  const jsi::PropNameID &propNameID) {
        std::string key = propNameID.utf8(rt);
        if (key == "href") {
            return jsi::String::createFromUtf8(rt,
                                               std::string(_url.get_href()));
        }
        if (key == "origin") {
            return jsi::String::createFromUtf8(rt,
                                               std::string(_url.get_origin()));
        }
        if (key == "protocol") {
            return jsi::String::createFromUtf8(
                rt, std::string(_url.get_protocol()));
        }
        if (key == "username") {
            return jsi::String::createFromUtf8(
                rt, std::string(_url.get_username()));
        }
        if (key == "password") {
            return jsi::String::createFromUtf8(
                rt, std::string(_url.get_password()));
        }
        if (key == "host") {
            return jsi::String::createFromUtf8(rt,
                                               std::string(_url.get_host()));
        }
        if (key == "hostname") {
            return jsi::String::createFromUtf8(
                rt, std::string(_url.get_hostname()));
        }
        if (key == "port") {
            return jsi::String::createFromUtf8(rt,
                                               std::string(_url.get_port()));
        }
        if (key == "pathname") {
            return jsi::String::createFromUtf8(
                rt, std::string(_url.get_pathname()));
        }
        if (key == "search") {
            return jsi::String::createFromUtf8(rt,
                                               std::string(_url.get_search()));
        }
        if (key == "hash") {
            return jsi::String::createFromUtf8(rt,
                                               std::string(_url.get_hash()));
        }
        if (key == "toString") {
            return jsi::Function::createFromHostFunction(
                rt, jsi::PropNameID::forAscii(rt, "toString"), 0,
                [=](jsi::Runtime &rt, const jsi::Value &thisValue,
                    const jsi::Value *args, size_t count) -> jsi::Value {
                    return jsi::String::createFromUtf8(
                        rt, std::string(_url.to_string()));
                });
        }
        return jsi::Value::null();
    }  // namespace fasturl

}  // namespace fasturl
