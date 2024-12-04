//import { AgenteImmobiliare, Cliente, GestoreAgenzia } from "../Repository/database";
import { GestoreAgenziaRepository  } from "../Repository/gestoreAgenziaRepository.js";
import { AgenteImmobiliareRepository  } from "../Repository/agenteImmobiliareRepository.js";
import { ClienteRepository  } from "../Repository/clienteRepository.js";
import Jwt from "jsonwebtoken";

export class AuthenticationService {
    static async checkCredentials(req, res) {    //controlla se esiste un utente con 'req.body.usr' e 'req.body.pwd'
        let ruolo=null;

        if(await GestoreAgenziaRepository.checkGestoreByUsernamePassword(req.body.usr, req.body.pwd)){
            ruolo="gestoreAgenzia";
        }

        if(await AgenteImmobiliareRepository.checkAgenteImmobiliareByUsernamePassword(req.body.usr, req.body.pwd)){
            ruolo="agenteImmobiliare";
        }

        if(await ClienteRepository.checkClienteByUsernamePassword(req.body.usr, req.body.pwd)){
            ruolo="cliente";
        }

        return ruolo;
    }//fine checkCredentials

    static issueToken(username, ruolo) {    //genera un token per l'utente 'username' valido per 24 ore
        return Jwt.sign({ user: username, role: ruolo}, process.env.TOKEN_SECRET, { expiresIn: `${24 * 60 * 60}s` });
    }//fine issueToken

    /*static async saveUser(req, res) {    //tenta di creare un nuovo utente con 'req.body.usr' e 'req.body.pwd'
        let user = new User({   //dati dell'utente da inserire
            userName: req.body.usr,
            password: req.body.pwd
        });

        return user.save();
    }//fine saveUser

    static isTokenValid(token, callback) {   //controlla se il token è valido
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }//fine isTokenValid

    static async canUserModifyIdea(user, ideaId) {   //controlla se l'utente 'user' può modificare l'idea 'ideaId'
        const idea = await Idea.findByPk(ideaId);

        return idea && idea.UserUserName === user;
    }//fine canUserModifyIdea

    static async canUserModifyComment(user, commentId) {   //controlla se l'utente 'user' può modificare il commento 'commentId'
        const comment = await Comment.findByPk(commentId);

        return comment && comment.UserUserName === user;
    }//fine canUserModifyComment

    static async canUserModifyVote(user, ideaId) {   //controlla se l'utente 'user' può modificare il voto 'votoId'
        let vote = await Vote.findOne({    //cerca un voto positivo dell utente all'idea
            where: {
                UserUserName: user,
                IdeaId: ideaId,
            }
        });

        return vote !== null;
    }//fine canUserModifyVote

    static async canUserVoteIdea(user, ideaId) {   //controlla se l'utente 'user' può votare l'idea 'ideaId'
        const idea = await Idea.findByPk(ideaId);

        return idea && idea.UserUserName != user;
    }//fine canUserVoteIdea

    static async userVotedIdea(user, ideaId) {  //controlla se l'utente 'user' ha votato l'idea 'ideaId', quindi ritorna il valore del voto oppure NULL
        const vote = await Vote.findOne({
            where: {
                [Op.and]: [{ userName: user }, { id: ideaId }],
            },
            attributes: ['valore']
        })

        return vote ? vote.valore : null;
    }//fine userVotedIdea*/
}