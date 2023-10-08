import Joi from "joi";

export const accountSettingSchema = Joi.object({

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  currentPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirmNewPassword: Joi.ref("password"),

}).with("newPassword", "confirmNewPassword");