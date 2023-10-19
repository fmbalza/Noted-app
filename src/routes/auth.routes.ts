import { Router } from "express";
const router = Router();

import { signIn, signUp, changeUsername, changePassword  } from "../controllers/user.controller";

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/changeUsername', changeUsername)
router.post('/changePassword', changePassword)



export default router;
