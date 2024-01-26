#ifndef FASTURL_HOSTOBJECTS_H
#define FASTURL_HOSTOBJECTS_H

#include "utils.h"

namespace fasturl {
    namespace jsi = facebook::jsi;

    class JSI_EXPORT URLSearchParamsHostObject : public jsi::HostObject {
    public:
        URLSearchParamsHostObject(){};

        URLSearchParamsHostObject(ada::url_search_params params)
            : _params(params){};

        std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime &rt) override;

        jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propNameID) override;

    private:
        ada::url_search_params _params;
    };

    class JSI_EXPORT URLHostObject : public jsi::HostObject {
    public:
        URLHostObject(){};

        URLHostObject(ada::url_aggregator url) : _url(url){};

        std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime &rt) override;

        jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propNameID) override;

    private:
        ada::url_aggregator _url;
    };

}  // namespace fasturl

#endif
