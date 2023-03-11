import { Request, Response, NextFunction } from "express";
import User from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function sendError(res: Response, error: String) {
  res.status(400).send({
    err: error,
  });
}

const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  let fixStr = req.body.avatarUrl.toString();
  let result = fixStr.replace("\\", "/");

  if (email == null || password == null) {
    return sendError(res, "please provide valid email and password");
  }

  try {
    const user = await User.findOne({ email: email });
    if (user != null) {
      return res.status(400).send(
        "user alrady exists")
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      password: encryptedPwd,
      name,
      avatarUrl: result,
    });
    await newUser.save();
    return res.status(200).send({
      newUser,
    });
  } catch (err) {
    return sendError(res, "failed ...");
  }
};

async function generateTokens(userId: string) {
  const accessToken = await jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
  );
  const refreshToken = await jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET
  );

  return { accessToken: accessToken, refreshToken: refreshToken, id: userId };
}

const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return sendError(res, "please provide valid email and password");
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) return sendError(res, "incorrect user or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendError(res, "incorrect user or password");

    const tokens = await generateTokens(String(user._id));

    if (!user?.refresh_tokens) {
      user.refresh_tokens = [tokens.refreshToken];
    } else {
      user.refresh_tokens.push(tokens.refreshToken);
    }
    await user.save();
    return res.status(200).send(tokens);
  } catch (err) {
    console.log("error: " + err);
    sendError(res, "fail checking user");
  }
};

function getTokenFromRequest(req: Request): string {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) return null;
  return authHeader.split(" ")[1];
}

type TokenInfo = {
  id: string;
};

const refresh = async (req: Request, res: Response) => {
  const refreshToken = getTokenFromRequest(req);
  if (refreshToken == null) return sendError(res, "authentication missing");

  try {
    const user: TokenInfo = <TokenInfo>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );
    const userObj = await User.findById(user.id);
    if (userObj == null) return sendError(res, "fail validating token");

    if (!userObj.refresh_tokens.includes(refreshToken)) {
      userObj.refresh_tokens = [];
      await userObj.save();
      return sendError(res, "fail validating token");
    }

    const tokens = await generateTokens(userObj.id);

    userObj.refresh_tokens[userObj.refresh_tokens.indexOf(refreshToken)] =
      tokens.refreshToken;
    console.log("refresh token: " + refreshToken);
    console.log("with token: " + tokens.refreshToken);
    await userObj.save();

    return res.status(200).send(tokens);
  } catch (err) {
    return sendError(res, "fail validating token");
  }
};

const logout = async (req: Request, res: Response) => {
  const refreshToken = getTokenFromRequest(req);
  if (refreshToken == null) return sendError(res, "authentication missing");

  try {
    const user = <TokenInfo>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );
    const userObj = await User.findById(user.id);
    if (userObj == null) return sendError(res, "fail validating token");

    if (!userObj.refresh_tokens.includes(refreshToken)) {
      userObj.refresh_tokens = [];
      await userObj.save();
      return sendError(res, "fail validating token");
    }
    userObj.refresh_tokens.splice(
      userObj.refresh_tokens.indexOf(refreshToken),
      1
    );
    await userObj.save();
    return res.status(200).send();
  } catch (err) {
    return sendError(res, "fail validating token");
  }
};

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromRequest(req);
  if (token == null) return sendError(res, "authentication missing");
  try {
    const user = <TokenInfo>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = user.id;
    console.log("token user: " + JSON.stringify(user));
    return next();
  } catch (err) {
    return sendError(res, "fail validating token");
  }
};

export = { login, register, refresh, logout, authenticateMiddleware };
