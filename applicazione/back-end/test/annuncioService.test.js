import { AnnuncioService } from "../Service/annuncioService.js";
import { expect } from 'chai';

describe('Test di annuncioService.checkOwner', () => {
    it('TC01: copre il cammino IN-1-2-NF ritornando FALSE', async () => {
        const result = await AnnuncioService.checkOwner('username', null);
        expect(result).to.be.false;
    });

    it('TC02: copre il cammino IN-1-3-4-5-NF ritornando FALSE', async () => {
        const result = await AnnuncioService.checkOwner(null, 'username');
        expect(result).to.be.false;
    });

    it('TC03: copre il cammino IN-1-3-4-6-7-9-NF ritornando TRUE', async () => {
        const result = await AnnuncioService.checkOwner('username', 'username');
        expect(result).to.be.true;
    });

    it('TC04: copre il cammino IN-1-3-4-6-7-8-NF ritornando FALSE', async () => {
        const result = await AnnuncioService.checkOwner('username1', 'username2');
        expect(result).to.be.false;
    });
});