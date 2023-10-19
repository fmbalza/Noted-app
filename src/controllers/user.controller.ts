import { Request, Response } from "express"
import User, {IUser} from "../models/user"
import jwt from "jsonwebtoken"
import config from '../config/config'


function createToken(user:IUser){
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.name || !req.body.lastname || !req.body.email || !req.body.password || !req.body.username){
        return res.status(400).json({msg:'Plase. Send your email, user and password'})
    }

    const user = await User.findOne({email: req.body.email});
    console.log(user)
    if(user){
        return res.status(400).json({msg: 'The user already exist'});
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
    console.log(req.body)
    if(!req.body.username || !req.body.password){
        return res.status(400).json({msg:'Plase. Send your user and password'})
    }
    const user = await User.findOne({username: req.body.username})
    if(!user){
        return res.status(400).json({msg:'The user does not exist'})
    }

    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch){
        return res.status(200).json({token: createToken(user)})
    }

    return res.status(400).json({
        msg:'The user or password are incorrect'
    });
}

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    const { email, currentPassword, newPassword } = req.body;
  
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ msg: 'Please provide email, current password, and new password' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      const isMatch = await user.comparePassword(currentPassword);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Current password is incorrect' });
      }
  
      user.password = newPassword;
      await user.save();
  
      return res.status(200).json({ msg: 'Password changed successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  
  export const changeUsername = async (req: Request, res: Response): Promise<Response> => {
    const { email, username, newUsername } = req.body;
  
    if (!email || !newUsername ) {
      return res.status(400).json({ msg: 'Please provide email and new username' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      user.username = newUsername;
      await user.save();
  
      return res.status(200).json({ msg: 'Username changed successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };