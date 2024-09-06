import { Router } from 'express'
import { GetMessages, SendMessage } from "../controllers/message.controller.js"

const router = Router()

router.post("/:id", GetMessages)
router.post("/send/:id", SendMessage)

export default router