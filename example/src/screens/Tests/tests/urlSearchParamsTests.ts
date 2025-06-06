import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';
import { URLSearchParams } from 'react-native-fast-url';

export function registerURLSearchParamsTests() {
  describe('URLSearchParams', () => {
    describe('Constructing the object', () => {
      it('UrlSearchParams instance should be iterable', () => {
        const params = new URLSearchParams();
        params.append('a', '1');
        for (const [key, value] of params) {
          expect(key).to.equal('a');
          expect(value).to.equal('1');
        }
        params.append('b', '2');
        expect(params.size).to.equal(2);
      });
      it('should allow for constructing UrlSearchParams with UrlSearchParams', () => {
        const params = new URLSearchParams();
        params.append('a', '1');
        const params2 = new URLSearchParams(params);
        params2.append('b', '2');
        expect(params2.size).to.equal(2);
      });
      it('should allow for constructing without any parameters', () => {
        const params = new URLSearchParams();
        expect(params.size).to.equal(0);
      });

      it('should allow for constructing with the empty string', () => {
        const params = new URLSearchParams('');
        expect(params.size).to.equal(0);
      });

      it('should allow for constructing with a record of key, value strings', () => {
        const items = { key1: 'value1', key2: 'value2' };
        const params = new URLSearchParams(items);
        expect(params.size).to.equal(2);
        expect(params.get('key1')).to.equal('value1');
        expect(params.get('key2')).to.equal('value2');
      });

      it('should allow for constructing with an iterable of key, value strings', () => {
        function* getSearchParamEntries(): IterableIterator<[string, string]> {
          yield ['key1', 'value1'];
          yield ['key2', 'value2'];
        }

        const params = new URLSearchParams(getSearchParamEntries());
        expect(params.size).to.equal(2);
        expect(params.get('key1')).to.equal('value1');
        expect(params.get('key2')).to.equal('value2');
      });

      it('should throw for invalid input', () => {
        // @ts-expect-error
        expect(() => new URLSearchParams([1])).to.throw();
      });
    });

    describe('Append, Get, and GetAll Tests', () => {
      it('should append a key-value pair and retrieve it using get', () => {
        const params = new URLSearchParams();
        params.append('key', 'value');
        expect(params.get('key')).to.equal('value');
      });

      it('should append multiple values for the same key and retrieve them using getAll', () => {
        const params = new URLSearchParams();
        params.append('key', 'value1');
        params.append('key', 'value2');
        expect(params.getAll('key')).to.deep.equal(['value1', 'value2']);
      });

      it('should return null for a non-existent key using get', () => {
        const params = new URLSearchParams();
        expect(params.get('nonexistent')).to.be.null;
      });
    });

    describe('Delete and Has Tests', () => {
      it('should delete an existing key and ensure it no longer exists', () => {
        const params = new URLSearchParams();
        params.append('key', 'value');
        expect(params.has('key')).to.be.true;
        params.delete('key');
        expect(params.has('key')).to.be.false;
      });

      it('should not affect other keys when deleting a non-existent key', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.delete('nonexistent');
        expect(params.has('key1')).to.be.true;
      });

      it('should correctly identify the existence of a key using has', () => {
        const params = new URLSearchParams();
        params.append('key', 'value');
        expect(params.has('key')).to.be.true;
        expect(params.has('nonexistent')).to.be.false;
      });
    });

    describe('Entries, Keys, and Values Iterators Tests', () => {
      it('should return all key-value pairs in the correct order using entries', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');
        const entries = Array.from(params.entries());
        expect(entries).to.deep.equal([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ]);
      });

      it('should return all keys in the correct order using keys', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');
        const keys = Array.from(params.keys());
        expect(keys).to.deep.equal(['key1', 'key2']);
      });

      it('should return all values in the correct order using values', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');
        const values = Array.from(params.values());
        expect(values).to.deep.equal(['value1', 'value2']);
      });
    });

    describe('Set and Size Tests', () => {
      it('should set a new key-value pair and verify its presence', () => {
        const params = new URLSearchParams();
        params.set('key', 'value');
        expect(params.get('key')).to.equal('value');
      });

      it('should support passing array of strings as a value', () => {
        const params = new URLSearchParams();
        params.set('key', ['value1', 'value2']);
        expect(params.get('key')).to.equal('value1,value2');
      });

      it('should update an existing key with a new value using set', () => {
        const params = new URLSearchParams();
        params.append('key', 'value1');
        params.set('key', 'value2');
        expect(params.get('key')).to.equal('value2');
      });

      it('should correctly reflect the number of unique keys in the size property', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');
        expect(params.size).to.equal(2);
      });
    });

    describe('ForEach Test', () => {
      it('should call the provided callback with each key-value pair using forEach', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');

        const result: Array<[string, string]> = [];
        params.forEach((value, key) => {
          result.push([key, value]);
        });

        expect(result).to.deep.equal([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ]);
      });
    });

    describe('Sort Test', () => {
      it('should order the parameters correctly using sort', () => {
        const params = new URLSearchParams();
        params.append('b', '2');
        params.append('a', '1');
        params.sort();
        expect(params.toString()).to.equal('a=1&b=2');
      });
    });

    describe('ToString Test', () => {
      it('should return an empty string when there are no entries', () => {
        const params = new URLSearchParams();
        expect(params.toString()).to.equal('');
      });

      it('should correctly serialize when there is only one entry', () => {
        const params = new URLSearchParams();
        params.append('key', 'value');
        expect(params.toString()).to.equal('key=value');
      });

      it('should correctly serialize the parameters into a query string using toString', () => {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');
        expect(params.toString()).to.equal('key1=value1&key2=value2');
      });
    });
  });
}
