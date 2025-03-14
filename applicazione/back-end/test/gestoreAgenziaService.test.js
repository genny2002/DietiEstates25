import { GestoreAgenziaService } from '../Service/gestoreAgenziaService.js';
import { expect } from 'chai';

describe('Test di gestoreAgenziaService.checkCredential', () => {
    it('TCC1: copre U4-P7-E5 ritornando TRUE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'password@1', 'prova@mail.com');
        expect(result).to.be.true;
    });

    it('TCC2: copre U1-P7-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential(null, 'password@1', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC3: copre U2-P7-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('A', 'password@1', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC4: copre U3-P7-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('AAAAAAAAAAAAAAAAAAAAA', 'password@1', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC5: copre U4-P1-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', null, 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC6: copre U4-P2-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'P', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC7: copre U4-P3-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'PPPPPPPPPPPPPPPPPPPPP', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC8: copre U4-P4-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'password1', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC9: copre U4-P5-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'P@', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC10: copre U4-P6-E5 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'PPPPPPPPPPPPPPPPPPPP@', 'prova@mail.com');
        expect(result).to.be.false;
    });

    it('TCC11: copre U4-P7-E1 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'password@1', null);
        expect(result).to.be.false;
    });

    it('TCC12: copre U4-P7-E2 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'password@1', 'provamail.com');
        expect(result).to.be.false;
    });

    it('TCC13: copre U4-P7-E3 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'password@1', 'prova@mailcom');
        expect(result).to.be.false;
    });

    it('TCC14: copre U4-P7-E4 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkCredential('username1', 'password@1', 'provamailcom');
        expect(result).to.be.false;
    });
});

describe('Test di gestoreAgenziaService.checkPassword', () => {
    it('TCP1: copre NP8-OP2 ritornando TRUE', async () => {
        const result = await GestoreAgenziaService.checkPassword('newpassword@1', 'oldpassword@1');
        expect(result).to.be.true;
    });

    it('TCP2: copre NP1-OP2 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword(null, 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP3: copre NP2-OP2 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('P', 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP4: copre NP3-OP2 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('PPPPPPPPPPPPPPPPPPPPP', 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP5: copre NP4-OP2 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('newPassword1', 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP6: copre NP5-OP2 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('NP1', 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP7: copre NP6-OP6 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('PPPPPPPPPPPPPPPPPPPP@', 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP8: copre NP7-OP4 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('oldpassword@1', 'oldpassword@1');
        expect(result).to.be.false;
    });

    it('TCP9: copre NP8-OP1 ritornando FALSE', async () => {
        const result = await GestoreAgenziaService.checkPassword('oldpassword@1', null);
        expect(result).to.be.false;
    });
});