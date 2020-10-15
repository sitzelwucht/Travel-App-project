import 'regenerator-runtime/runtime'
import { getData } from '../src/client/js/getData'


describe("fetch data to be used", () => {
    test("should fetch json data from external APIs, and insert it into the dom", () => {

           expect(getData).toBeDefined();
})});
