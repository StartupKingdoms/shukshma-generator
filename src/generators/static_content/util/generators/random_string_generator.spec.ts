import {assert } from 'chai';
import {  RandomStringGenerator } from './random_string_generator';

describe('Crypto String Generator', () => {
    
    it('Should generate a random 6 digit alphanumeric value',()=>{
        const random_string = RandomStringGenerator.generate();
        assert(typeof(random_string) == 'string');
        assert(random_string.length == 6);
    })
})
