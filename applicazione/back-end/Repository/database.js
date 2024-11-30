import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createVoteModel } from "./Vote.js";
import { createModel as createCommentModel } from "./Comment.js";
import 'dotenv/config.js';
