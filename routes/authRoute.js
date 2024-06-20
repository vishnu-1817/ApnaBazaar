import express from 'express';
import {registerController, loginController, testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router()

// routing

//register 
router.post('/register',registerController)

//login
router.post('/login', loginController );


// test route
router.get('/test',requireSignIn, isAdmin, testController)

//protected route auth
router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).send({ok:true});
})

//admin protected route auth
router.get("/admin-auth", requireSignIn,isAdmin , (req, res) => {
  res.status(200).send({ ok: true });
});


export default router;

