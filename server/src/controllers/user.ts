import {Request, Response} from 'express'
import User from '../models/user_model'

const getUserById = async (req: Request,res: Response)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }catch(err){
        res.status(400).send({'error': 'Failed to get user from DB'})
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
      let users = {};
      users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send({ error: "fail to get users from db" });
    }
  };

const upadteUser = async (req: Request,res: Response)=>{
    const name= req.body.name;
    let fixStr = req.body.avatarUrl.toString();
    let result = fixStr.replace("\\", "/");
    const id = req.body.id

    try {
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                name,
                avatarUrl: result,
            }
        });

        await user.save();
        res.status(200).send({ msg: "Update succes", status: 200 });
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}


export = {getUserById,upadteUser, getAllUsers}