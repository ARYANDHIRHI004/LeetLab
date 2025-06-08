import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const exixtingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exixtingUser) {
      return res.status(400).json({
        error: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
      include:{
        eventAssignedTo:true
      }
    });

    if (!newUser) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        Image: newUser.image,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while registring user",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("All filds are required");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        eventAssignedTo: {
          include: {
            event: {
              include: {
                problems: {
                  include: {
                    problems: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "User logedin successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "erro    r logging in user",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error logging out user",
    });
  }
};

const checkUser = async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        eventAssignedTo: {
          include: {
            event: {
              include: {
                problems: {
                  include: {
                    problems: {
                      include: {
                        description: false,
                        tags: false,
                        examples: false,
                        constraints: false,
                        hints: false,
                        editoral: false,
                        testcases: false,
                        codeSnippets: false,
                        refrenceSolution: false,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        password: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "User authorized successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "ORGANIZATION") {
      return res.status(409).json({
        message: "Unauthorized Request",
      });
    }

    const allExistingUser = await db.user.findMany();

    if (!allExistingUser) {
      return res.status(500).json({
        message: "no any user exist",
      });
    }
    return res.status(200).json({
      success: true,
      message: "users fetched successfully",
      allExistingUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser, logoutUser, checkUser, getAllUsers };
