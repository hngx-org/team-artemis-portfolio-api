import { Router } from "express";
import { createNotificationSettingController, deleteUserAccount, resetAccountSettingController } from "../controllers/settings.controller";



const router = Router();


router.put('/reset-account-setting', resetAccountSettingController);
router.post('/set-notification', createNotificationSettingController);
router.delete('/delete-account', deleteUserAccount);




export default router;