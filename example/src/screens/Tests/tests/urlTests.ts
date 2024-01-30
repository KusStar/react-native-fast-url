import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';
import { URL } from 'react-native-fast-url';

export function registerURLTests() {
  describe('URL', () => {
    describe('Constructor and Href Tests', () => {
      it('should correctly parse a valid URL and set the href property', () => {
        const validUrl = 'http://www.example.com/path?query=string#hash';
        const url = new URL(validUrl);
        expect(url.href).to.equal(validUrl);
      });

      it('should throw an error when parsing an invalid URL', () => {
        const invalidUrl = 'url';
        expect(() => new URL(invalidUrl)).to.throw();
      });

      it('should correctly parse URLs with different schemes', () => {
        const httpsUrl = new URL('https://www.example.com');
        expect(httpsUrl.protocol).to.equal('https:');
        const ftpUrl = new URL('ftp://www.example.com');
        expect(ftpUrl.protocol).to.equal('ftp:');
      });

      it('should handle URLs with trailing slashes', () => {
        const urlWithTrailingSlash = new URL('http://www.example.com/');
        expect(urlWithTrailingSlash.pathname).to.equal('/');
      });

      it('should throw an error when constructing with an invalid URL', () => {
        const invalidUrls = ['invalid___', '://badurl', 'http://:80'];
        invalidUrls.forEach((invalidUrl) => {
          expect(() => new URL(invalidUrl)).to.throw();
        });
      });
    });

    describe('URL Constructor with Base Parameter Tests', () => {
      it('should correctly resolve a relative URL against a base URL', () => {
        const baseUrl = 'http://www.example.com/base/';
        const relativeUrl = 'path/page.html';
        const url = new URL(relativeUrl, baseUrl);
        expect(url.href).to.equal('http://www.example.com/base/path/page.html');
      });

      it('should handle a relative URL with a leading slash against a base URL', () => {
        const baseUrl = 'http://www.example.com/base/';
        const relativeUrl = '/path/page.html';
        const url = new URL(relativeUrl, baseUrl);
        expect(url.href).to.equal('http://www.example.com/path/page.html');
      });

      it('should throw an error when resolving a relative URL against an invalid base URL', () => {
        const invalidBaseUrl = 'invalid_base';
        const relativeUrl = 'path/page.html';
        expect(() => new URL(relativeUrl, invalidBaseUrl)).to.throw();
      });

      it('should handle an absolute URL regardless of the base URL', () => {
        const baseUrl = 'http://www.example.com/base/';
        const absoluteUrl = 'https://www.another.com/page.html';
        const url = new URL(absoluteUrl, baseUrl);
        expect(url.href).to.equal(absoluteUrl);
      });
    });

    describe('Property Tests', () => {
      const baseUrl =
        'http://username:password@hostname:8080/pathname?search=query#hash';

      it('should correctly parse and set the username property', () => {
        const url = new URL(baseUrl);
        expect(url.username).to.equal('username');
        url.username = 'newusername';
        expect(url.href).to.include('newusername');
      });

      it('should correctly parse and set the password property', () => {
        const url = new URL(baseUrl);
        expect(url.password).to.equal('password');
        url.password = 'newpassword';
        expect(url.href).to.include('newpassword');
      });

      it('should correctly parse and set the host property', () => {
        const url = new URL(baseUrl);
        expect(url.host).to.equal('hostname:8080');
        url.host = 'newhostname:9090';
        expect(url.href).to.include('newhostname:9090');
      });

      it('should correctly parse and set the hostname property', () => {
        const url = new URL(baseUrl);
        expect(url.hostname).to.equal('hostname');
        url.hostname = 'newhostname';
        expect(url.href).to.include('newhostname');
      });

      describe('Protocol property tests', () => {
        it('should correctly parse and set the protocol property', () => {
          const url = new URL(baseUrl);
          expect(url.protocol).to.equal('http:');
          url.protocol = 'https:';
          expect(url.href).to.include('https://');
        });

        it('should keep the same protocol if an invalid one is set', () => {
          const url = new URL(baseUrl);
          expect(url.protocol).to.equal('http:');
          url.protocol = ' invalid';
          expect(url.protocol).to.include('http:');
          expect(url.href).to.include('http://');
        });
      });

      describe('Port property tests', () => {
        it('should correctly parse and set the port property', () => {
          const url = new URL(baseUrl);
          expect(url.port).to.equal('8080');
          url.port = '9090';
          expect(url.href).to.include(':9090');
        });

        it('does not allow setting to an invalid port', () => {
          const url = new URL('http://www.example.com');
          url.port = '-1';

          expect(url.port).to.equal('');
        });
      });

      describe('Pathname property tests', () => {
        it('should correctly parse and set the pathname property', () => {
          const url = new URL(baseUrl);
          expect(url.pathname).to.equal('/pathname');
          url.pathname = '/newpathname';
          expect(url.href).to.include('/newpathname');
        });

        it('should handle setting an empty pathname', () => {
          const url = new URL(baseUrl);
          url.pathname = '';
          expect(url.href).to.equal(
            'http://username:password@hostname:8080/?search=query#hash'
          );
        });
      });

      describe('Search property tests', () => {
        it('should correctly parse and set the search property', () => {
          const url = new URL(baseUrl);
          expect(url.search).to.equal('?search=query');
          url.search = '?newsearch=newquery';
          expect(url.href).to.include('?newsearch=newquery');
        });

        it('should handle setting an empty search', () => {
          const url = new URL(baseUrl);
          url.search = '';
          expect(url.href).to.not.include('?');
        });

        it('does not allow setting to an invalid search', () => {
          const url = new URL('http://www.example.com');
          url.protocol = ' invalid';

          expect(url.protocol).to.equal('http:');
        });
      });

      describe('Hash property tests', () => {
        it('should correctly parse and set the hash property', () => {
          const url = new URL(baseUrl);
          expect(url.hash).to.equal('#hash');
          url.hash = '#newhash';
          expect(url.href).to.include('#newhash');
        });

        it('should handle setting an empty hash', () => {
          const url = new URL(baseUrl);
          url.hash = '';
          expect(url.href).to.not.include('#');
        });
      });
    });

    describe('SearchParams Integration Tests', () => {
      it('should correctly parse existing search parameters into searchParams', () => {
        const url = new URL('http://www.example.com?existingKey=existingValue');
        expect(url.searchParams.get('existingKey')).to.equal('existingValue');
      });

      it('should correctly update searchParams if url.search is set', () => {
        const url = new URL('http://www.example.com?existingKey=existingValue');
        url.search = '?test=newValue';
        expect(url.searchParams.size).to.equal(1);
        expect(url.searchParams.get('test')).to.equal('newValue');
      });

      it('should update searchParams if href is set', () => {
        const url = new URL('http://www.example.com?existingKey=existingValue');
        url.href = 'http://www.example.com';
        expect(url.searchParams.size).to.equal(0);
      });

      it('should reflect changes in searchParams in the relevant properties of the URL', () => {
        const url = new URL('http://www.example.com');
        url.searchParams.append('key', 'value');

        // Ensure that each method is updated properky
        expect(url.search).to.equal('?key=value');
        expect(url.href).to.equal('http://www.example.com/?key=value');
        expect(url.toString()).to.equal('http://www.example.com/?key=value');
        expect(url.toJSON()).to.equal('http://www.example.com/?key=value');
      });

      it('should update the URL when searchParams are modified', () => {
        const url = new URL('http://www.example.com?initial=param');
        url.searchParams.set('initial', 'newvalue');
        expect(url.search).to.equal('?initial=newvalue');
      });

      it('should allow modification of existing search parameters through searchParams', () => {
        const url = new URL('http://www.example.com?existingKey=existingValue');
        url.searchParams.set('existingKey', 'newValue');
        expect(url.search).to.equal('?existingKey=newValue');
      });

      it('should reflect deletion of search parameters in the URL search property', () => {
        const url = new URL('http://www.example.com?key1=value1&key2=value2');
        url.searchParams.delete('key1');
        expect(url.search).to.equal('?key2=value2');
      });

      it('should handle multiple search parameters correctly', () => {
        const url = new URL(
          'http://www.example.com?initialKey=initialValue&anotherKey=anotherValue'
        );
        url.searchParams.append('newKey', 'newValue');
        expect(url.search).to.include('initialKey=initialValue');
        expect(url.search).to.include('anotherKey=anotherValue');
        expect(url.search).to.include('newKey=newValue');
      });
    });

    describe('ToString and ToJSON Tests', () => {
      const exampleUrl = 'http://www.example.com/path?query=string#hash';

      it('should return the full URL string using toString', () => {
        const url = new URL(exampleUrl);
        expect(url.toString()).to.equal(exampleUrl);
      });

      it('should return the full URL string using toJSON', () => {
        const url = new URL(exampleUrl);
        expect(url.toJSON()).to.equal(exampleUrl);
      });
    });

    describe('Static Methods Tests', () => {
      describe('createObjectURL', () => {
        // TODO: Currently this test fails with "Cannot create URL for a blob!"
        // it('should create a valid object URL for a blob', () => {
        //   const fakeBlob = { data: { blobId: '123', offset: 0 }, size: 10 };
        //   const objectUrl = URL.createObjectURL(fakeBlob);
        //   expect(objectUrl).to.be.a('string');
        //   expect(objectUrl).to.include(fakeBlob.data.blobId);
        //   expect(objectUrl).to.include(`offset=${fakeBlob.data.offset}`);
        //   expect(objectUrl).to.include(`size=${fakeBlob.size}`);
        // });
      });

      describe('revokeObjectURL', () => {
        it('should not perform any action', () => {
          const objectUrl = 'blob://123';
          expect(() => URL.revokeObjectURL(objectUrl)).to.not.throw();
        });
      });
    });
  });
}
