#include <iostream>

#include "ada.cpp"
#include "ada.h"

using namespace std;

int main(int, char *[]) {
    auto url =
        ada::parse<ada::url>("file:///Users/isaacs/dev/tapjs/tapjs/node_modules/ts-node/esm.mjs");
    if (!url) {
        cout << "failure" << endl;
        return EXIT_FAILURE;
    }
    cout << "hash: " << url->get_hash() << endl;
    cout << "host: " << url->get_host() << endl;
    cout << "hostname: " << url->get_hostname() << endl;
    cout << "href: " << url->get_href() << endl;
    cout << "origin: " << url->get_origin() << endl;
    cout << "passowrd: " << url->get_password() << endl;
    cout << "pathname: " << url->get_pathname() << endl;
    cout << "port: " << url->get_port() << endl;
    cout << "protocol: " << url->get_protocol() << endl;
    cout << "search: " << url->get_search() << endl;
    ada::url_search_params search_params(url->get_search());

    cout << "searchParams: " << endl;
    auto keys = search_params.get_keys();
    while (keys.has_next()) {
        auto key = keys.next();
        if (key.has_value()) {
            cout << "\t" << key.value() << ": " << search_params.get(key.value()).value() << endl;
        }
    }
    cout << "username: " << url->get_username() << endl;

    return EXIT_SUCCESS;
}
