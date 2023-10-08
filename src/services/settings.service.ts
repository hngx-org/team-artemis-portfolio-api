import Joi from "joi";
import bcrypt from "bcryptjs";

// password encypriction
const generateSalt = () => {
  const saltRounds = 10;
  return bcrypt.genSalt(saltRounds);
};

export const hashPassword = async (plainPassword: string) => {
  const salt = await generateSalt();
  return bcrypt.hash(plainPassword, salt);
};

export const verifyPassword = async (
  plainPassword: string,
  hashPassword: any
) => {
  return bcrypt.compare(plainPassword, hashPassword);
};

// input validation
export const accountSettingSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  currentPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirmNewPassword: Joi.ref("password"),
}).with("newPassword", "confirmNewPassword");
