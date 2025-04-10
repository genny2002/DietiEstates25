import { AuthenticationService } from "../Service/AuthenticationService.js";
import { expect } from 'chai';

describe('Test di authenticationService.usernameIsValid', () => {
    it('TCUV1: copre il cammino IN-1-2-NF ritornando FALSE', async () => {
        let usernames=['usr1', 'usr2', 'usr3', 'usr4'];
        const result = await AuthenticationService.usernameIsValid(usernames, null);
        expect(result).to.be.false;
    });

    it('TCUV2: copre il cammino IN-1-3-4-7-10-4-7-10-4-7-9-10-4-11-NF ritornando FALSE', async () => {
        let usernames=['usr1', 'usr2', 'usr3'];
        const result = await AuthenticationService.usernameIsValid(usernames, 'usr3');
        expect(result).to.be.false;
    });

    it('TCUV3: copre il cammino IN-1-3-4-7-10-4-11-NF ritornando TRUE', async () => {
        let usernames=['usr'];
        const result = await AuthenticationService.usernameIsValid(usernames, 'usr1');
        expect(result).to.be.true;
    });
});