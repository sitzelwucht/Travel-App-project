import 'regenerator-runtime/runtime'
import { getAPIKey } from '../src/client/js/APIkeyGetter'


describe('fetches API key from server side file', () => {

    test('returns a string', () => {
        const mockSuccesfulResponse = () => {
            global.fetch = jest.fn().getAPIKey(() => {
              return new Promise((resolve, reject) => {
                resolve({ok: true, status, json: () => {
                    return returnBody ? returnBody : {};
                    },
                });
              });
            });
          };
        });
    });
